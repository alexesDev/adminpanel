package env

import (
	"log"
	"os"
)

func getenv(key string, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		value = defaultValue
		log.Printf("Uses default %s: %s\n", key, defaultValue)
	}

	return value
}
