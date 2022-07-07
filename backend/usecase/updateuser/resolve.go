package updateuser

import (
	"backend/model"
)

type Env interface {
}

func Resolve(env Env, input model.UpdateUserInput) (model.UpdateUserOrErrorPayload, error) {
	return &model.UpdateUserPayload{}, nil
}
