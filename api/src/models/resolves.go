package models

import (
	"context"
	"fmt"
	"log"
	"time"

	graphql "github.com/graph-gophers/graphql-go"
	uuid "github.com/nu7hatch/gouuid"
)

type Resolver struct {
}

func (r *Resolver) User(ctx context.Context, args struct{ ID graphql.ID }) *UserResolver {
	return Dm.Users[args.ID]
}

func (r *Resolver) Authors(ctx context.Context) []*AuthorResolver {
	authors := make([]*AuthorResolver, 0, len(Dm.Books))

	for _, author := range Dm.Authors {
		authors = append(authors, author)
	}

	return authors
}

func (r *Resolver) Author(ctx context.Context, args struct{ ID graphql.ID }) *AuthorResolver {
	return Dm.Authors[args.ID]
}

func (r *Resolver) Books(ctx context.Context) []*BookResolver {
	books := make([]*BookResolver, 0, len(Dm.Books))

	for _, book := range Dm.Books {
		books = append(books, book)
	}

	return books
}

func (r *Resolver) Book(ctx context.Context, args struct{ ID graphql.ID }) *BookResolver {
	return Dm.Books[args.ID]
}

func (r *Resolver) CreateComment(ctx context.Context, args struct {
	Bookid graphql.ID
	Text   string
}) (*CommentResolver, error) {
	userResolver, _ := ctx.Value("User").(*UserResolver)
	if userResolver == nil {
		return nil, fmt.Errorf("Комментарии могут оставлять только зарегистированные пользователи.")
	}

	id := graphql.ID(fmt.Sprintf("%d", len(Dm.Comments)+1))
	newComment := &Comment{
		ID:     id,
		BookID: args.Bookid,
		UserID: userResolver.ID(),
		Text:   args.Text,
		Date:   time.Now().Format("2006-01-02"),
	}
	newCommentResolve := &CommentResolver{newComment}
	Dm.Comments[id] = newCommentResolve

	log.Printf("Добавлен коментарий %v", newComment)
	return newCommentResolve, nil
}

func (r *Resolver) CreateUser(ctx context.Context, args struct {
	Username  string
	Password  string
	FirstName string
	LastName  string
}) (*UserResolver, error) {
	for _, user := range Dm.Users {
		if user.Data.Username == args.Username {
			return nil, fmt.Errorf("Пользователь с таким именем пользователя уже существует.")
		}

	}

	id := graphql.ID(fmt.Sprintf("%d", len(Dm.Users)+1))
	newUser := &User{
		ID:        id,
		Username:  args.Username,
		Password:  args.Password,
		FirstName: args.FirstName,
		LastName:  args.LastName,
	}
	newUserResolve := &UserResolver{newUser}
	Dm.Users[id] = newUserResolve

	log.Printf("Добавлен пользователь %v", newUser)
	return newUserResolve, nil
}

func (r *Resolver) Login(ctx context.Context, args struct {
	Username string
	Password string
}) (*AuthTokenResolver, error) {
	for _, user := range Dm.Users {
		if (user.Data.Username == args.Username) && (user.Data.Password == args.Password) {
			uuid, err := uuid.NewV4()
			if err != nil {
				log.Printf("Ошибка генерации токена: %v", err)
			}
			id := graphql.ID(fmt.Sprintf("%d", len(Dm.AuthTokens)+1))
			newToken := &AuthToken{
				ID:     id,
				Token:  uuid.String(),
				UserID: user.Data.ID,
			}
			newTokenResolve := &AuthTokenResolver{newToken}
			Dm.AuthTokens[id] = newTokenResolve
			return newTokenResolve, nil
		}
	}
	return nil, fmt.Errorf("Неверные имя пользователя или пароль.")
}
