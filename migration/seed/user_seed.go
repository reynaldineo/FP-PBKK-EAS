package seed

import (
	"encoding/json"
	"errors"
	"io"
	"os"

	"github.com/reynaldineo/FP-PBKK-Golang/entity"
	"gorm.io/gorm"
)

func ListUserSeeder(db *gorm.DB) error {
	jsonFile, err := os.Open("./migration/json/users.json")

	if err != nil {
		return err
	}

	jsonData, err := io.ReadAll(jsonFile)
	if err != nil {
		return err
	}

	var listUser []entity.User
	if err := json.Unmarshal(jsonData, &listUser); err != nil {
		return err
	}

	for _, data := range listUser {
		var user entity.User
		err := db.Where("email = ?", data.Email).First(&user).Error
		if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}

		if err == gorm.ErrRecordNotFound {
			if err := db.Create(&data).Error; err != nil {
				return err
			}
		}
	}

	return nil
}
