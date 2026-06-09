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
	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"error": err.Error(),
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
				"error": "email already exists",
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
				"error": "hash failed",
			},
		)
		return
	}

	user := models.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: hashedPassword,
	}
	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(
			http.StatusInternalServerError,
			gin.H{
				"error": "user creation failed",
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
