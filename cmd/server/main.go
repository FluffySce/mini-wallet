package main

import (
	"mini-wallet/config"
	"mini-wallet/internal/database"
)

func main() {
	config.LoadEnv()
	database.ConnectDB()
}
