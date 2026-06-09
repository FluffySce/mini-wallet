package handlers

import (
	"mini-wallet/internal/database"
	"mini-wallet/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetWallet(c *gin.Context) {
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
				"error": "user not found",
			},
		)
		return
	}
	c.JSON(
		http.StatusOK,
		gin.H{
			"wallet_id": wallet.ID,
			"balance":   wallet.Balance,
		},
	)
}

func TopUp(c *gin.Context) {
	userID := c.MustGet("userID").(uint)
	var req models.TopUpRequest
	var wallet models.Wallet
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"error": err.Error(),
			},
		)
		return
	}
	err := database.DB.
		Where("user_id = ?", userID).
		First(&wallet).
		Error
	if err != nil {
		c.JSON(
			http.StatusNotFound,
			gin.H{
				"error": "user not found",
			},
		)
		return
	}

	wallet.Balance += req.Amount
	err = database.DB.
		Save(&wallet).
		Error
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"error": "wallet update failed",
			},
		)
		return
	}
	transaction := models.Transaction{
		ReceiverWalletID: wallet.ID,
		Amount:           req.Amount,

		Type:   "TOPUP",
		Status: "SUCCESS",

		Description: "Wallet Topup",
	}
	database.DB.Create(&transaction)
	c.JSON(
		http.StatusOK,
		gin.H{
			"message":     "top-up successful",
			"new balance": wallet.Balance,
		},
	)
}
