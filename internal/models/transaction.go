package models

import "time"

type Transaction struct {
	ID               uint  `gorm:"primaryKey" json:"id"`
	SenderWalletID   uint  `json:"sender_wallet_id"`
	ReceiverWalletID uint  `json:"receiver_wallet_id"`
	Amount           int64 `json:"amount"`

	Type        string `gorm:"not null" json:"type"`
	Status      string `gorm:"default:'pending'" json:"status"`
	Description string `json:"description"`

	CreatedAt time.Time `json:"created_at"`
}
