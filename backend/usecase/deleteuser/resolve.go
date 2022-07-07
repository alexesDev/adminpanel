package deleteuser

import (
	"backend/model"
)

type Env interface {
}

func Resolve(env Env, input model.DeleteUserInput) (*model.ErrorPayload, error) {
	return nil, nil //nolint:nilnil
}
