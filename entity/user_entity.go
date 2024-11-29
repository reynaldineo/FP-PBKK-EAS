package entity

import (
	"github.com/google/uuid"
	"github.com/reynaldineo/FP-PBKK-Golang/helper"
	"gorm.io/gorm"
)

type User struct {
	ID         uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Name       string
	TelpNumber string
	Email      string
	Password   string
	Role       string `gorm:"type:role_enum;default:'user'"`

	Timestamp
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	var err error
	u.Password, err = helper.HashPassword(u.Password)
	if err != nil {
		return err
	}
	return nil
}
