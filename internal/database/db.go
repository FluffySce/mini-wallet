package database

import (
	"fmt"
	"log"
	"os"

	"mini-wallet/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	db, err := gorm.Open(
		postgres.Open(dsn),
		&gorm.Config{},
	)

	if err != nil {
		log.Fatal("failed to connect to DB")
	}

	DB = db

	fmt.Println("Database connected")
	err = DB.AutoMigrate(
		&models.User{},
		&models.Wallet{},
		&models.Transaction{},
	)

	if err != nil {
		log.Fatal("migration failed")
	}

	fmt.Println("migration successful!")
}
