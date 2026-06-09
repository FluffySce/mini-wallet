package handlers

import (
	"mini-wallet/internal/database"
	"mini-wallet/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// protected endpoint to access user/profile
func GetMe(c *gin.Context) {
	userID :=
		c.MustGet("userID").(uint)
	var user models.User

	database.DB.First(
		&user,
		userID,
	)
	c.JSON(
		http.StatusOK,
		gin.H{
			"id":    userID,
			"name":  user.Name,
			"email": user.Email,
		},
	)
}
