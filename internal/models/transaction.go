package models

import "time"

type Transaction struct {
	ID               uint `gorm:"primaryKey"`
	SenderWalletID   uint
	ReceiverWalletID uint
	Amount           int64

	Type        string `gorm:"not null"`
	Status      string `gorm:"default:'pending'"`
	Description string

	CreatedAt time.Time
}
