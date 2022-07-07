package updateuser

import (
	"backend/graphqlerrors"
	"backend/model"
	"backend/utils"
	"context"
	"net/mail"
)

type Env interface {
	GetUserByID(ctx context.Context, id int) (*model.User, error)
	UpdateUser(ctx context.Context, data *model.User) error
}

func Resolve(env Env, ctx context.Context, input model.UpdateUserInput) (model.UpdateUserOrErrorPayload, error) {
	user, err := env.GetUserByID(ctx, input.ID)
	if err != nil {
		return graphqlerrors.InternalErrorf("failed to GetUserByID: %w", err)
	}

	originalEmail := user.Email

	err = utils.ApplyChanges(input.Patch, user)
	if err != nil {
		return graphqlerrors.InternalErrorf("failed to ApplyChanges: %w", err)
	}

	if user.Email != originalEmail {
		// validate
		_, err := mail.ParseAddress(user.Email)
		if err != nil {
			return &model.ErrorPayload{Message: "Invalid email"}, nil
		}

		// send notification/confirm letter/etc
	}

	err = env.UpdateUser(ctx, user)
	if err != nil {
		return graphqlerrors.InternalErrorf("failed to UpdateUser: %w", err)
	}

	return &model.UpdateUserPayload{User: user}, nil
}
