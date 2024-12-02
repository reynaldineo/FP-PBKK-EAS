package dto

import "errors"

const (
	// Failed
	MESSAGE_FAILED_GET_DATA_FROM_PARAM = "failed get data from param"
	MESSAGE_FAILED_GET_DATA_FROM_BODY  = "failed get data from body"
	MESSAGE_FAILED_VERIFY_TOKEN        = "failed to verify JWT token"
	MESSAGE_FAILED_UNAUTHORIZED        = "user are not authorized"

	// Success
)

var (
	ErrTokenInvalid  = errors.New("token invalid")
	ErrTokenExpired  = errors.New("token expired")
	ErrTokenNotFound = errors.New("token not found")
	ErrGetDataParam  = errors.New("failed get data from param")
)
