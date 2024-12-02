package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/reynaldineo/FP-PBKK-Golang/constant"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func SetUpDatabaseConnection() *gorm.DB {
	if os.Getenv("APP_ENV") == constant.ENUM_RUN_PRODUCTION {
		err := godotenv.Load(".env.production")
		if err != nil {
			panic(err)
		}
	} else {
		err := godotenv.Load(".env")
		if err != nil {
			panic(err)
		}
	}

	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v TimeZone=Asia/Jakarta", dbHost, dbUser, dbPass, dbName, dbPort)

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	return db
}

func CloseDatabaseConnection(db *gorm.DB) {
	dbSQL, err := db.DB()
	if err != nil {
		panic(err)
	}
	dbSQL.Close()
}

// https://gorm.io/docs/connecting_to_the_database.html#PostgreSQL