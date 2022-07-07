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

func (e Env) GetUserByID(ctx context.Context, id int) (*model.User, error) {
	row := model.User{}
	err := e.db.NewSelect().Model(&row).Where("id = ?", id).Scan(ctx)

	return &row, err
}

func (e Env) UpdateUser(ctx context.Context, data *model.User) error {
	_, err := e.db.NewUpdate().Model(data).Where("id = ?", data.ID).Exec(ctx)
	return err
}
