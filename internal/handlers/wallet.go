package handlers

import (
	"fmt"
	"mini-wallet/internal/constants"
	"mini-wallet/internal/database"
	"mini-wallet/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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
				"error": "Wallet not found",
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
				"error": "Wallet not found",
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
				"error": "Failed to update wallet",
			},
		)
		return
	}
	transaction := models.Transaction{
		SenderWalletID:   constants.SystemWalletID,
		ReceiverWalletID: wallet.ID,
		Amount:           req.Amount,

		Type:   constants.TransactionTypeTopUp,
		Status: constants.StatusSuccess,

		Description: "Wallet Topup",
	}
	if err := database.DB.Create(&transaction).Error; err != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"error": "Failed to record transaction",
			},
		)
		return
	}
	c.JSON(
		http.StatusOK,
		gin.H{
			"message":     "Top-up completed successfully",
			"new_balance": wallet.Balance,
		},
	)
}

func Transfer(c *gin.Context) {
	userID := c.MustGet("userID").(uint)

	var req models.TransferRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Printf("Receiver: %s\n", req.ReceiverEmail)
		fmt.Printf("Amount: %d\n", req.Amount)
		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"error": err.Error(),
			},
		)
		return
	}
	//finding senders wallet
	var senderWallet models.Wallet
	err := database.DB.
		Where("user_id = ?", userID).
		First(&senderWallet).
		Error
	if err != nil {
		c.JSON(
			http.StatusNotFound,
			gin.H{
				"error": "Sender wallet not found",
			},
		)
		return
	}

	// finding receiver
	var receiver models.User
	err = database.DB.
		Where("email = ?", req.ReceiverEmail).
		First(&receiver).
		Error

	if err != nil {
		c.JSON(
			http.StatusNotFound,
			gin.H{"error": "Recipient not found"},
		)
		return
	}

	// finding receivers wallet
	var receiverWallet models.Wallet
	err = database.DB.
		Where("user_id = ?", receiver.ID).
		First(&receiverWallet).
		Error
	if err != nil {
		c.JSON(
			http.StatusNotFound,
			gin.H{"error": "Recipient's wallet not found"},
		)
		return
	}

	if senderWallet.ID == receiverWallet.ID {
		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"error": "Cannot transfer to your own wallet",
			},
		)
		return
	}

	// balance check
	if senderWallet.Balance < req.Amount {
		c.JSON(
			http.StatusBadRequest,
			gin.H{"error": "Insufficient balance for this transfer"},
		)
		return
	}

	err = database.DB.Transaction(func(tx *gorm.DB) error {
		senderWallet.Balance -= req.Amount
		if err := tx.Save(&senderWallet).Error; err != nil {
			return err
		}
		receiverWallet.Balance += req.Amount
		if err := tx.Save(&receiverWallet).Error; err != nil {
			return err
		}
		transaction := models.Transaction{
			SenderWalletID:   senderWallet.ID,
			ReceiverWalletID: receiverWallet.ID,

			Amount: req.Amount,

			Type:   constants.TransactionTypeTransfer,
			Status: constants.StatusSuccess,

			Description: "Wallet Transfer",
		}
		if err := tx.Create(&transaction).Error; err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"error": "Transfer failed, please try again",
			},
		)
		return
	}
	c.JSON(
		http.StatusOK,
		gin.H{
			"message": "Transfer completed successfully",
		},
	)

}
