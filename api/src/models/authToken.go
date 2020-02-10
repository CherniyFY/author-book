package models

import "github.com/graph-gophers/graphql-go"

type AuthToken struct {
	ID     graphql.ID
	Token  string
	UserID graphql.ID
}

type AuthTokenResolver struct {
	Data *AuthToken
}

func (authtoken *AuthTokenResolver) ID() graphql.ID {
	return authtoken.Data.ID
}

func (authtoken *AuthTokenResolver) Token() string {
	return authtoken.Data.Token
}

func (authtoken *AuthTokenResolver) User() *UserResolver {
	return Dm.Users[authtoken.Data.UserID]
}
