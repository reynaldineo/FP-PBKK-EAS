package migration

import (
	"github.com/reynaldineo/FP-PBKK-Golang/migration/seed"
	"gorm.io/gorm"
)

func Seeder(db *gorm.DB) error {
	seeders := []func(*gorm.DB) error{
		seed.ListUserSeeder,
		seed.ListProductSeeder,
	}

	for _, seeder := range seeders {
		if err := seeder(db); err != nil {
			return err
		}
	}

	return nil
}
