package seed

import (
	"encoding/json"
	"os"

	"github.com/reynaldineo/FP-PBKK-Golang/entity"
	"gorm.io/gorm"
)

func ListProductSeeder(db *gorm.DB) error {
	jsonFile, err := os.Open("./migration/json/product.json")
	if err != nil {
		return err
	}
	defer jsonFile.Close()

	var listEntity []entity.Product
	if err := json.NewDecoder(jsonFile).Decode(&listEntity); err != nil {
		return err
	}

	if err := db.Create(&listEntity).Error; err != nil {
		return err
	}

	return nil
}
