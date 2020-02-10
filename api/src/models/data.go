package models

import (
	"encoding/json"
	"io/ioutil"
	"log"

	"github.com/graph-gophers/graphql-go"
)

type DataManager struct {
	Books      map[graphql.ID]*BookResolver
	Authors    map[graphql.ID]*AuthorResolver
	Comments   map[graphql.ID]*CommentResolver
	Users      map[graphql.ID]*UserResolver
	AuthTokens map[graphql.ID]*AuthTokenResolver
}

var Dm DataManager

func init() {
	Dm = DataManager{
		Books:      make(map[graphql.ID]*BookResolver),
		Authors:    make(map[graphql.ID]*AuthorResolver),
		Comments:   make(map[graphql.ID]*CommentResolver),
		Users:      make(map[graphql.ID]*UserResolver),
		AuthTokens: make(map[graphql.ID]*AuthTokenResolver),
	}

	Dm.Books = LoadBooks()
	Dm.Authors = LoadAuthors()
	Dm.Users = LoadUsers()
	Dm.Comments = LoadComments()

}

func LoadBooks() map[graphql.ID]*BookResolver {
	resolver_books := make(map[graphql.ID]*BookResolver)
	file, err := ioutil.ReadFile("init_data/books.json")

	if err != nil {
		log.Fatalf("Неудалось загрузить книги из файла books.json (файл отсутствует или недостаточно прав на чтение): %v", err)
	}

	var books []Book
	err = json.Unmarshal([]byte(file), &books)

	if err != nil {
		log.Fatalf("Неудалось декодировать json файл: %v", err)
	}

	for _, book := range books {
		b := book
		resolver_books[book.ID] = &BookResolver{&b}
	}

	log.Printf("Книги успешно загружены: %v", books)

	return resolver_books
}

func LoadAuthors() map[graphql.ID]*AuthorResolver {
	resolver_authors := make(map[graphql.ID]*AuthorResolver)
	file, err := ioutil.ReadFile("init_data/authors.json")

	if err != nil {
		log.Fatalf("Неудалось загрузить авторов из файла authors.json (файл отсутствует или недостаточно прав на чтение): %v", err)
	}

	var authors []Author
	err = json.Unmarshal([]byte(file), &authors)

	if err != nil {
		log.Fatalf("Неудалось декодировать json файл: %v", err)
	}

	for _, author := range authors {
		a := author
		resolver_authors[author.ID] = &AuthorResolver{&a}
	}

	log.Printf("Авторы успешно загружены: %v", authors)

	return resolver_authors
}

func LoadUsers() map[graphql.ID]*UserResolver {
	resolver_users := make(map[graphql.ID]*UserResolver)
	file, err := ioutil.ReadFile("init_data/users.json")

	if err != nil {
		log.Fatalf("Неудалось загрузить авторов из файла users.json (файл отсутствует или недостаточно прав на чтение): %v", err)
	}

	var users []User
	err = json.Unmarshal([]byte(file), &users)

	if err != nil {
		log.Fatalf("Неудалось декодировать json файл: %v", err)
	}

	for _, user := range users {
		u := user
		resolver_users[user.ID] = &UserResolver{&u}
	}

	log.Printf("Пользователи успешно загружены: %v", users)

	return resolver_users
}

func LoadComments() map[graphql.ID]*CommentResolver {
	resolver_comments := make(map[graphql.ID]*CommentResolver)
	file, err := ioutil.ReadFile("init_data/comments.json")

	if err != nil {
		log.Fatalf("Неудалось загрузить комментарии из файла comments.json (файл отсутствует или недостаточно прав на чтение): %v", err)
	}

	var comments []Comment
	err = json.Unmarshal([]byte(file), &comments)

	if err != nil {
		log.Fatalf("Неудалось декодировать json файл: %v", err)
	}

	for _, comment := range comments {
		c := comment
		resolver_comments[comment.ID] = &CommentResolver{&c}
	}

	log.Printf("Комментарии успешно загружены: %v", comments)

	return resolver_comments
}
