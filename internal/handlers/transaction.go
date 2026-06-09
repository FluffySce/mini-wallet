package handlers

import (
	"mini-wallet/internal/database"
	"mini-wallet/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTransactions(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	var wallet models.Wallet

	err := database.DB.
		Where("user_id = ?", userID).
		First(&wallet).
		Error
	if err != nil {
		c.JSON(
			http.StatusNotFound,
			gin.H{
				"error": "Wallet not found",
			},
		)
		return
	}
	var transactions []models.Transaction
	err = database.DB.
		Where("sender_wallet_id = ? OR receiver_wallet_id = ?",
			wallet.ID,
			wallet.ID).
		Order("created_at DESC").
		Find(&transactions).
		Error
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{"error": "Failed to retrieve transactions"},
		)
		return
	}
	c.JSON(
		http.StatusOK,
		transactions,
	)
}
