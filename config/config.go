package config

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

// LoadEnv tries a few common locations for a local .env file.
// It is safe to call even when no .env file exists because production
// deployments often inject environment variables directly.
func LoadEnv() {
	candidates := []string{
		".env",
		filepath.Join("..", ".env"),
		filepath.Join("..", "..", ".env"),
	}

	for _, candidate := range candidates {
		if _, err := os.Stat(candidate); err == nil {
			if err := godotenv.Load(candidate); err != nil {
				log.Fatalf("Error loading %s: %v", candidate, err)
			}
			fmt.Printf("Loaded environment from %s\n", candidate)
			return
		}
	}

	log.Println("No .env file found; using existing environment variables")
}
