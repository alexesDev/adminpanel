package main

import (
	"log"
	"net/http"

	"backend/env"
	"backend/graph"
	"backend/graph/generated"
	"backend/utils"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

func main() {
	e, err := env.New()
	if err != nil {
		log.Fatal(err)
	}

	resolver := graph.Resolver{Env: e}
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &resolver}))

	http.Handle("/", playground.Handler("GraphQL playground", "/graphql"))
	http.Handle("/graphql", srv)

	addr := utils.Getenv("ADDR", ":5588")

	log.Println("listen", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}
