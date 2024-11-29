package entity

import "github.com/google/uuid"

type OrderItem struct {
	ID       uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Quantity int

	OrderId uuid.UUID
	Order   *Order `gorm:"foreignKey:OrderId;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`

	ProductId uuid.UUID
	Product   *Product `gorm:"foreignKey:ProductId;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}
