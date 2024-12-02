package dto

import "errors"

const (
	// Failed
	MESSAGE_FAILED_CREATE_USER    = "failed create user"
	MESSAGE_FAILED_LOGIN          = "login failed"
	MESSAGE_FAILED_GET_USER       = "failed get user"
	MESSAGE_FAILED_DELETE_USER    = "failed delete user"
	MESSAGE_FAILED_USER_NOT_FOUND = "user not found"

	// Success
	MESSAGE_SUCCESS_REGISTER_USER = "success create user"
	MESSAGE_SUCCESS_LOGIN         = "login success"
	MESSAGE_SUCCESS_GET_USER      = "success get user"
	MESSAGE_SUCCESS_DELETE_USER   = "success delete user"
)

var (
	ErrEmailAlreadyExist = errors.New("email already exist")
	ErrEmailNotFound     = errors.New("email not found")
	ErrPasswordNotMatch  = errors.New("password not match")
	ErrGetUserById       = errors.New("failed to get user by id")
	ErrRoleNotAllowed    = errors.New("denied access for \"%v\" role")
)

type (
	UserRegisterRequest struct {
		Name       string `json:"name" binding:"required"`
		TelpNumber string `json:"telp_number" binding:"required"`
		Email      string `json:"email" binding:"required"`
		Password   string `json:"password" binding:"required"`
	}

	UserResponse struct {
		ID         string `json:"id"`
		Name       string `json:"name"`
		Email      string `json:"email"`
		TelpNumber string `json:"telp_number"`
		Role       string `json:"role"`
	}

	UserLoginRequest struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	UserLoginResponse struct {
		Token string `json:"token"`
		Role  string `json:"role"`
	}
)
