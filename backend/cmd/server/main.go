package main

import (
	"log"
	"net/http"
	"os"

	"backend/env"
	"backend/graph"
	"backend/graph/generated"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

func main() {
	addr := os.Getenv("ADDR")
	if addr == "" {
		addr = ":5588"
	}

	e, err := env.New()
	if err != nil {
		log.Fatal(err)
	}

	resolver := graph.Resolver{Env: e}
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &resolver}))

	http.Handle("/", playground.Handler("GraphQL playground", "/graphql"))
	http.Handle("/graphql", srv)

	log.Println("listen", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}
