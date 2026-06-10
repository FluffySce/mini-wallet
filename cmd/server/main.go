package main

import (
	"mini-wallet/config"
	"mini-wallet/internal/database"
	"mini-wallet/internal/routes"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	database.ConnectDB()

	// route handling
	router := gin.Default()

	//cors init
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
			os.Getenv("FRONTEND_URL"),
		},
		AllowMethods: []string{
			"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS",
		},
		AllowHeaders: []string{
			"Origin", "Content-Type", "Authorization",
		},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	routes.SetupRoute(router)
	port := os.Getenv("PORT")

	if port == "" {
		port = "8000"
	}

	router.Run(":" + port)
}
