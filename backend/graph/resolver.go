package graph

import (
	"context"

	"backend/model"
	"backend/usecase/deleteuser"
	"backend/usecase/updateuser"
)

//go:generate go run github.com/99designs/gqlgen generate

type Env interface {
	updateuser.Env
	deleteuser.Env

	ListUsers(ctx context.Context) ([]*model.User, error)
}

type Resolver struct {
	Env Env
}
