package entity

import "github.com/google/uuid"

type Order struct {
	ID     uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Status string    `gorm:"type:status_order_enum;default:'pending'"`

	UserId uuid.UUID
	User   *User `gorm:"foreignKey:UserId;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`

	OrderItems []OrderItem `gorm:"foreignKey:OrderId;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`

	Timestamp
}
