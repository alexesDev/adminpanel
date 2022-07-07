package env

import (
	"database/sql"

	"github.com/jinzhu/inflection"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
	"github.com/uptrace/bun/schema"
)

type Env struct {
	db *bun.DB
}

func New() (*Env, error) {
	env := Env{}

	schema.SetTableNameInflector(func(n string) string {
		return "app." + inflection.Plural(n)
	})

	dsn := getenv("CONNECTION_STRING", "postgres://staging:staging@localhost:7232/staging?sslmode=disable")
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
	env.db = bun.NewDB(sqldb, pgdialect.New())

	return &env, nil
}
