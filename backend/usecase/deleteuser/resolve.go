package deleteuser

import (
	"backend/model"
	"context"
)

type Env interface {
}

func Resolve(env Env, ctx context.Context, input model.DeleteUserInput) (*model.ErrorPayload, error) {
	return nil, nil //nolint:nilnil
}
