package models

import "github.com/graph-gophers/graphql-go"

type Comment struct {
	ID     graphql.ID
	Text   string
	Date   string
	BookID graphql.ID
	UserID graphql.ID
}

type CommentResolver struct {
	Data *Comment
}

func (comment *CommentResolver) ID() graphql.ID {
	return comment.Data.ID
}

func (comment *CommentResolver) Text() string {
	return comment.Data.Text
}

func (comment *CommentResolver) Date() string {
	return comment.Data.Date
}

func (comment *CommentResolver) Book() *BookResolver {
	return Dm.Books[comment.Data.BookID]
}

func (comment *CommentResolver) User() *UserResolver {
	return Dm.Users[comment.Data.UserID]
}
