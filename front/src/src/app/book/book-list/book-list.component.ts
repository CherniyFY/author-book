import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { BehaviorSubject, Observable } from "rxjs";
import { Book } from "src/app/interfaces";

const AllBooks = gql`
  query {
    books {
      id
      name
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.sass"]
})
export class BookListComponent implements OnInit {
  books: Book[];

  _filterBooks: BehaviorSubject<Book[]> = new BehaviorSubject([]);

  get filterBooks(): Observable<Book[]> {
    return this._filterBooks.asObservable();
  }

  constructor(private router: Router, private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<{ books: Book[] }>({
        query: AllBooks
      })
      .valueChanges.subscribe(({ data }) => {
        this.books = data.books;
        this._filterBooks.next(this.books);
      });
  }

  search(searchText: string) {
    const lowerSearchText = searchText.toLowerCase();
    const filterBooks = this.books.filter(book => {
      return `${book.name}`.toLowerCase().includes(lowerSearchText);
    });
    this._filterBooks.next(filterBooks);
  }

  navToBook(book: Book) {
    this.router.navigate(["book", book.id]);
  }
}
