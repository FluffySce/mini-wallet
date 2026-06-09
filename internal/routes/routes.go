package routes

import (
	"mini-wallet/internal/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoute(router *gin.Engine) {
	router.GET(
		"/health",
		handlers.HealthCheck,
	)
	router.POST(
		"/register",
		handlers.Register,
	)
	router.POST(
		"/login",
		handlers.Login,
	)
}
