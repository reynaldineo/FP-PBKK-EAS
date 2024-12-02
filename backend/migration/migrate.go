package migration

import (
	"github.com/reynaldineo/FP-PBKK-Golang/entity"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	if err := db.AutoMigrate(
		&entity.User{},
		&entity.Product{},
		&entity.Cart{},
		&entity.CartItem{},
		&entity.Order{},
		&entity.OrderItem{},
	); err != nil {
		return err
	}

	return nil

}
