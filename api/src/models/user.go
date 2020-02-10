package models

import "github.com/graph-gophers/graphql-go"

type User struct {
	ID        graphql.ID
	Username  string
	Password  string
	FirstName string
	LastName  string
}

type UserResolver struct {
	Data *User
}

func (user *UserResolver) ID() graphql.ID {
	return user.Data.ID
}

func (user *UserResolver) FirstName() string {
	return user.Data.FirstName
}

func (user *UserResolver) LastName() string {
	return user.Data.LastName
}
