package service

import (
	"context"

	"github.com/reynaldineo/FP-PBKK-Golang/constant"
	"github.com/reynaldineo/FP-PBKK-Golang/dto"
	"github.com/reynaldineo/FP-PBKK-Golang/entity"
	"github.com/reynaldineo/FP-PBKK-Golang/helper"
	"github.com/reynaldineo/FP-PBKK-Golang/repository"
	"gorm.io/gorm"
)

type (
	UserService interface {
		RegisterUser(ctx context.Context, req dto.UserRegisterRequest) (dto.UserResponse, error)
		VerifyUser(ctx context.Context, req dto.UserLoginRequest) (dto.UserLoginResponse, error)
		GetUserByID(ctx context.Context, userId string) (dto.UserResponse, error)
		DeleteByUserId(ctx context.Context, userId string) error
	}

	userService struct {
		userRepo   repository.UserRepository
		jwtService JWTService
	}
)

func NewUserService(userRepo repository.UserRepository, jwtService JWTService) UserService {
	return &userService{
		userRepo:   userRepo,
		jwtService: jwtService,
	}
}

func (s *userService) RegisterUser(ctx context.Context, req dto.UserRegisterRequest) (dto.UserResponse, error) {
	_, isEmailExist, err := s.userRepo.GetUserByEmail(ctx, req.Email)
	if err != nil && err != gorm.ErrRecordNotFound {
		return dto.UserResponse{}, err
	}

	if isEmailExist {
		return dto.UserResponse{}, dto.ErrEmailAlreadyExist
	}

	user := entity.User{
		Name:       req.Name,
		Email:      req.Email,
		TelpNumber: req.TelpNumber,
		Password:   req.Password,
		Role:       constant.ENUM_ROLE_USER,
	}

	userRes, err := s.userRepo.CreateUser(ctx, user)
	if err != nil {
		return dto.UserResponse{}, err
	}

	return dto.UserResponse{
		ID:         userRes.ID.String(),
		Name:       userRes.Name,
		Email:      userRes.Email,
		TelpNumber: userRes.TelpNumber,
		Role:       string(userRes.Role),
	}, nil
}

func (s *userService) VerifyUser(ctx context.Context, req dto.UserLoginRequest) (dto.UserLoginResponse, error) {
	user, isEmailExist, err := s.userRepo.GetUserByEmail(ctx, req.Email)
	if err != nil || !isEmailExist {
		return dto.UserLoginResponse{}, dto.ErrEmailNotFound
	}

	isPasswordMatch, err := helper.CompareHashPassword(user.Password, []byte(req.Password))
	if err != nil || !isPasswordMatch {
		return dto.UserLoginResponse{}, dto.ErrPasswordNotMatch
	}

	token := s.jwtService.GenerateToken(user.ID.String(), string(user.Role))

	return dto.UserLoginResponse{
		Token: token,
		Role:  string(user.Role),
	}, nil

}

func (s *userService) GetUserByID(ctx context.Context, userId string) (dto.UserResponse, error) {
	user, err := s.userRepo.GetUserById(ctx, userId)
	if err != nil {
		return dto.UserResponse{}, dto.ErrGetUserById
	}

	return dto.UserResponse{
		ID:         user.ID.String(),
		Name:       user.Name,
		Email:      user.Email,
		TelpNumber: user.TelpNumber,
		Role:       string(user.Role),
	}, nil
}

func (s *userService) DeleteByUserId(ctx context.Context, userId string) error {
	_, err := s.userRepo.GetUserById(ctx, userId)
	if err != nil {
		return err
	}

	err = s.userRepo.DeleteByUserId(ctx, userId)
	if err != nil {
		return err
	}
	return nil
}
