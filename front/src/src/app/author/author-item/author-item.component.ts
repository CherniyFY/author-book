import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { BehaviorSubject, Observable } from "rxjs";
import { Author, Book } from "src/app/interfaces";

const GetAuthor = gql`
  query Author($id: ID!) {
    author(id: $id) {
      firstName
      lastName
      biography
      books {
        id
        name
        publishDate
      }
    }
  }
`;

@Component({
  selector: "app-author-item",
  templateUrl: "./author-item.component.html",
  styleUrls: ["./author-item.component.sass"]
})
export class AuthorItemComponent implements OnInit {
  author = {} as Author;

  _filterAuthorBooks: BehaviorSubject<Book[]> = new BehaviorSubject([]);

  get filterAuthorBooks(): Observable<Book[]> {
    return this._filterAuthorBooks.asObservable();
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const authorId = params.get("id");
      if (authorId !== undefined) {
        this.apollo
          .watchQuery<{ author: Author }>({
            query: GetAuthor,
            variables: {
              id: authorId
            }
          })
          .valueChanges.subscribe(({ data }) => {
            if (!data.author) {
              this.router.navigate(["author"]);
            }
            this.author = data.author;
            this._filterAuthorBooks.next(this.author.books);
          });
      } else {
        this.router.navigate(["author"]);
      }
    });
  }

  search(searchText: string) {
    const lowerSearchText = searchText.toLowerCase();
    const filterAuthors = this.author.books.filter(book => {
      return book.name.toLowerCase().includes(lowerSearchText);
    });
    this._filterAuthorBooks.next(filterAuthors);
  }

  navToBook(book: Book) {
    this.router.navigate(["book", book.id]);
  }
}
