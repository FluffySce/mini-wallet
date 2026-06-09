package models

import (
	"time"
)

type Wallet struct {
	ID      uint  `gorm:"primaryKey"`
	UserID  uint  `gorm:"uniqueIndex;not null"`
	Balance int64 `gorm:"default:0"` //paise

	CreatedAt time.Time
	UpdatedAt time.Time
}
