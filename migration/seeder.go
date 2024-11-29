package migration

import (
	"github.com/reynaldineo/FP-PBKK-Golang/migration/seed"
	"gorm.io/gorm"
)

func Seeder(db *gorm.DB) error {
	if err := seed.ListUserSeeder(db); err != nil {
		return err
	}

	return nil
}
