package updateuser

import (
	"backend/model"
	"context"
	"reflect"
	"testing"

	"github.com/kr/pretty"
	"github.com/stretchr/testify/require"
)

//go:generate moq -out mocks_test.go . Env

func TestResolve(t *testing.T) {
	type args struct {
		env   Env
		ctx   context.Context
		input model.UpdateUserInput
	}
	tests := []struct {
		name    string
		args    args
		want    model.UpdateUserOrErrorPayload
		wantErr bool
	}{
		{"success", args{&EnvMock{
			GetUserByIDFunc: func(ctx context.Context, id int) (*model.User, error) {
				require.Equal(t, 3, id)
				return &model.User{ID: id}, nil
			},
			UpdateUserFunc: func(ctx context.Context, data *model.User) error {
				return nil
			},
		}, context.Background(), model.UpdateUserInput{
			ID:    3,
			Patch: map[string]interface{}{"email": "new@example.com"},
		}}, &model.UpdateUserPayload{
			User: &model.User{
				ID:    3,
				Email: "new@example.com",
			},
		}, false},
		{"invalid email", args{&EnvMock{
			GetUserByIDFunc: func(ctx context.Context, id int) (*model.User, error) {
				require.Equal(t, 3, id)
				return &model.User{ID: id}, nil
			},
			UpdateUserFunc: func(ctx context.Context, data *model.User) error {
				return nil
			},
		}, context.Background(), model.UpdateUserInput{
			ID:    3,
			Patch: map[string]interface{}{"email": "blabla"},
		}}, &model.ErrorPayload{
			Message: "Invalid email",
		}, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Resolve(tt.args.env, tt.args.ctx, tt.args.input)
			if (err != nil) != tt.wantErr {
				t.Errorf("Resolve() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Resolve() = %v, want %v", got, tt.want)
				for _, desc := range pretty.Diff(got, tt.want) {
					t.Error(desc)
				}
			}
		})
	}
}
