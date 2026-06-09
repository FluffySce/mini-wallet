package handlers

import (
	"mini-wallet/internal/database"
	"mini-wallet/internal/models"
	"mini-wallet/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var req models.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"error": "Invalid request format",
			},
		)
		return
	}
	var existingUser models.User
	database.DB.
		Where("email = ?", req.Email).
		First(&existingUser)

	if existingUser.ID != 0 {
		c.JSON(
			http.StatusConflict,
			gin.H{
				"error": "An account with this email already exists",
			},
		)
		return
	}
	hashedPassword, err :=
		utils.HashPassword(req.Password)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"error": "Failed to process password",
			},
		)
		return
	}
	// CHANGE: only user creation
	user := models.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: hashedPassword,
	}
	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"error": "Failed to create account",
			},
		)
		return
	}
	wallet := models.Wallet{
		UserID:  user.ID,
		Balance: 0,
	}

	if err := database.DB.Create(&wallet).Error; err != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"error": "Failed to initialize wallet",
			},
		)
		return
	}
	c.JSON(
		http.StatusCreated,
		gin.H{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
		},
	)
}

func Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"error": "Invalid request format",
			},
		)
		return
	}
	var user models.User
	if err := database.DB.
		Where("email = ?", req.Email).
		First(&user).Error; err != nil {
		c.JSON(
			http.StatusUnauthorized,
			gin.H{
				"error": "Invalid email or password",
			},
		)
		return
	}
	if !utils.CheckPasswordHash(
		req.Password,
		user.Password,
	) {
		c.JSON(
			http.StatusUnauthorized,
			gin.H{
				"error": "Invalid email or password",
			},
		)
		return
	}
	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"error": "Failed to generate authentication token",
			},
		)
		return
	}
	c.JSON(
		http.StatusOK,
		gin.H{
			"token": token,
		},
	)

}
