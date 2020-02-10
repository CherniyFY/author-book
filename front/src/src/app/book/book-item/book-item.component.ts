import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "src/app/auth.service";
import { Author, Book, Comment } from "src/app/interfaces";

const GetBook = gql`
  query Book($id: ID!) {
    book(id: $id) {
      id
      name
      publishDate
      description
      author {
        id
        firstName
        lastName
      }
      comments {
        id
        text
        date
        user {
          firstName
          lastName
        }
      }
    }
  }
`;

const createComment = gql`
  mutation createComment($text: String!, $bookid: ID!) {
    createComment(text: $text, bookid: $bookid) {
      id
      text
      date
      user {
        firstName
        lastName
      }
    }
  }
`;

@Component({
  selector: "app-book-item",
  templateUrl: "./book-item.component.html",
  styleUrls: ["./book-item.component.sass"]
})
export class BookItemComponent implements OnInit {
  book = { author: {} as Author, comments: [] as Comment[] } as Book;

  _commentsPage: BehaviorSubject<Comment[]> = new BehaviorSubject([]);

  get commentsPage(): Observable<Comment[]> {
    return this._commentsPage.asObservable();
  }

  inputValue: string;

  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.route.paramMap.subscribe(params => {
      const bookId = params.get("id");
      if (bookId !== undefined) {
        this.apollo
          .watchQuery<{ book: Book }>({
            query: GetBook,
            variables: {
              id: bookId
            }
          })
          .valueChanges.subscribe(({ data }) => {
            if (!data.book) {
              this.router.navigate(["book"]);
            }
            this.book = data.book;
            this.book.comments = this.book.comments.sort(
              (c1, c2) => parseInt(c2.id) - parseInt(c1.id)
            );
            this._commentsPage.next(data.book.comments.slice(0, 10));
          });
      } else {
        this.router.navigate(["book"]);
      }
    });
  }

  changePage(page: number) {
    this._commentsPage.next(
      this.book.comments.slice(10 * (page - 1), 10 * page)
    );
  }

  navToBook(book: Book) {
    this.router.navigate(["book", book.id]);
  }

  comment() {
    this.apollo
      .mutate<{ createComment: Comment }>({
        mutation: createComment,
        variables: {
          text: this.inputValue,
          bookid: this.book.id
        }
      })
      .subscribe(
        ({ data }) => {
          this.inputValue = "";
          this.book.comments.unshift(data.createComment);
          this._commentsPage.next(this.book.comments.slice(0, 10));
        },
        error => {
          this.authService.removeToken();
        }
      );
  }
}
