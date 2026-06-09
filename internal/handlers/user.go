package handlers

import (
	"mini-wallet/internal/database"
	"mini-wallet/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// protected endpoint to access user/profile
func GetMe(c *gin.Context) {
	userId :=
		c.MustGet("userId").(uint)
	var user models.User

	database.DB.First(
		&user,
		userId,
	)
	c.JSON(
		http.StatusOK,
		gin.H{
			"id":    userId,
			"name":  user.Name,
			"email": user.Email,
		},
	)
}
