package main

import (
	"mini-wallet/config"
	"mini-wallet/internal/database"
	"mini-wallet/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	database.ConnectDB()

	// route handling
	router := gin.Default()
	routes.SetupRoute(router)
	router.Run(":8000")
}
