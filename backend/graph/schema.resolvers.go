package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"backend/graph/generated"
	"backend/model"
	"backend/usecase/deleteuser"
	"backend/usecase/updateuser"
	"context"
	"fmt"
)

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, input model.UpdateUserInput) (model.UpdateUserOrErrorPayload, error) {
	payload, err := updateuser.Resolve(r.Env, ctx, input)
	if err != nil {
		return nil, fmt.Errorf("failed to updateUser.Resolve: %w", err)
	}

	return payload, nil
}

// DeleteUser is the resolver for the deleteUser field.
func (r *mutationResolver) DeleteUser(ctx context.Context, input model.DeleteUserInput) (*model.ErrorPayload, error) {
	payload, err := deleteuser.Resolve(r.Env, ctx, input)
	if err != nil {
		return nil, fmt.Errorf("failed to deleteUser.Resolve: %w", err)
	}

	return payload, nil
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	rows, err := r.Env.ListUsers(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to ListUsers: %w", err)
	}

	return rows, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
