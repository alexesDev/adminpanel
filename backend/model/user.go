package model

type User struct {
	ID    int
	Email string
	Name  *string
	Phone *string
	Sex   *Gender
}
