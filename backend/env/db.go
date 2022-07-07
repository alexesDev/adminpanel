package env

import (
	"context"

	"backend/model"
)

func (e Env) ListUsers(ctx context.Context) ([]*model.User, error) {
	rows := []*model.User{}
	err := e.db.NewSelect().Model(&rows).Order("id desc").Scan(ctx)

	return rows, err
}
