package entity

import "github.com/google/uuid"

type Product struct {
	ID            uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Name          string
	Description   string
	Price         int
	StockQuantity int
	Category      string

	Timestamp
}
