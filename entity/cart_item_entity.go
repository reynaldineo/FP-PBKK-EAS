package entity

import "github.com/google/uuid"

type CartItem struct {
	ID       uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Quantity int

	CartId uuid.UUID
	Cart   *Cart `gorm:"foreignKey:CartId;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`

	ProductId uuid.UUID
	Product   *Product `gorm:"foreignKey:ProductId;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`

	Timestamp
}
