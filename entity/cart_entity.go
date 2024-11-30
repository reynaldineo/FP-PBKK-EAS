package entity

import "github.com/google/uuid"

type Cart struct {
	ID         uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	IsCheckout bool      `gorm:"default:false" json:"is_checked"`

	UserId uuid.UUID
	User   *User `gorm:"foreignKey:UserId;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`

	Timestamp
}
