package entity

import "github.com/google/uuid"

type Product struct {
	ID            uuid.UUID `gorm:"type:uuid;primary_key;default:uuid_generate_v4()" json:"id"`
	Name          string    `json:"name"`
	Description   string    `json:"description"`
	Price         int       `json:"price"`
	StockQuantity int       `json:"stock_quantity"`
	Category      string    `json:"category"`
	ImageUrl      string    `json:"image_url"`

	Timestamp
}
