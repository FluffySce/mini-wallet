package routes

import (
	"mini-wallet/internal/handlers"
	"mini-wallet/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoute(router *gin.Engine) {
	auth := router.Group("/")
	auth.Use(
		middleware.AuthMiddleware(),
	)
	auth.GET(
		"/me",
		handlers.GetMe,
	)
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
	auth.GET(
		"/wallet",
		handlers.GetWallet,
	)
	auth.POST(
		"/wallet/topup",
		handlers.TopUp,
	)

}
