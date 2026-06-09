package models

type TopUpRequest struct {
	Amount int64 `json:"amount" binding:"required,gt=0"`
}
