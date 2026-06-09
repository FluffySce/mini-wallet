package models

type TransferRequest struct {
	ReceiverEmail string `json:"receiver_email" binding:"required,email"`
	Amount        int64  `json:"amount" binding:"required,gt=0"`
}
