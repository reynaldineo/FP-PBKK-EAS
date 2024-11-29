package migration

import (
	"github.com/reynaldineo/FP-PBKK-Golang/entity"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	if err := db.AutoMigrate(
		&entity.User{},
	); err != nil {
		return err
	}

	return nil

}
