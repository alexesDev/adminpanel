package graphqlerrors

import (
	"backend/model"
	"log"
)

func InternalErrorf(msg string, args ...interface{}) (*model.ErrorPayload, error) {
	viewerErr := model.ErrorPayload{
		Message: "An internal error occurred. Please try again later",
	}

	log.Printf("internal error: "+msg+"\n", args...)

	return &viewerErr, nil
}
