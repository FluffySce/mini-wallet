package models

import (
	"time"
)

type User struct {
	ID        uint   `gorm:"primaryKey"`
	Name      string `gorm:"not null"`
	Email     string `gorm:"unique;not null"`
	Password  string `gorm:"not null"`
	CreateAt  time.Time
	updatedAt time.Time
}
