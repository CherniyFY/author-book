package models

import "github.com/graph-gophers/graphql-go"

type Book struct {
	ID          graphql.ID
	Name        string
	Description string
	PublishDate string
	AuthorID    graphql.ID
}

type BookResolver struct {
	Data *Book
}

func (book *BookResolver) ID() graphql.ID {
	return book.Data.ID
}

func (book *BookResolver) Name() string {
	return book.Data.Name
}

func (book *BookResolver) Description() string {
	return book.Data.Description
}

func (book *BookResolver) PublishDate() string {
	return book.Data.PublishDate
}

func (book *BookResolver) Author() *AuthorResolver {
	return Dm.Authors[book.Data.AuthorID]
}

func (book *BookResolver) Comments() []*CommentResolver {
	comments := make([]*CommentResolver, 0, 1)

	for _, comment := range Dm.Comments {
		if comment.Data.BookID == book.ID() {
			comments = append(comments, comment)
		}
	}

	return comments
}
