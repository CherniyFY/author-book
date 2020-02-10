package models

import "github.com/graph-gophers/graphql-go"

type Author struct {
	ID        graphql.ID
	FirstName string
	LastName  string
	Biography string
}

type AuthorResolver struct {
	Data *Author
}

func (author *AuthorResolver) ID() graphql.ID {
	return author.Data.ID
}

func (author *AuthorResolver) FirstName() string {
	return author.Data.FirstName
}

func (author *AuthorResolver) LastName() string {
	return author.Data.LastName
}

func (author *AuthorResolver) Biography() string {
	return author.Data.Biography
}

func (author *AuthorResolver) Books() []*BookResolver {

	books := make([]*BookResolver, 0, 1)

	for _, book := range Dm.Books {
		if book.Data.AuthorID == author.Data.ID {
			books = append(books, book)
		}
	}

	return books
}
