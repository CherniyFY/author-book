import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { BehaviorSubject, Observable } from "rxjs";
import { Author } from "src/app/interfaces";

const AllAuthors = gql`
  query {
    authors {
      id
      firstName
      lastName
      books {
        id
      }
    }
  }
`;

@Component({
  selector: "app-author-list",
  templateUrl: "./author-list.component.html",
  styleUrls: ["./author-list.component.sass"]
})
export class AuthorListComponent implements OnInit {
  authors: Author[];

  _filterAuthors: BehaviorSubject<Author[]> = new BehaviorSubject([]);

  get filterAuthors(): Observable<Author[]> {
    return this._filterAuthors.asObservable();
  }

  constructor(private router: Router, private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<{ authors: Author[] }>({
        query: AllAuthors
      })
      .valueChanges.subscribe(({ data }) => {
        this.authors = data.authors;
        this._filterAuthors.next(this.authors);
      });
  }

  search(searchText: string) {
    const lowerSearchText = searchText.toLowerCase();
    const filterAuthors = this.authors.filter(author => {
      return `${author.firstName} ${author.lastName}`
        .toLowerCase()
        .includes(lowerSearchText);
    });
    this._filterAuthors.next(filterAuthors);
  }

  navToAuthor(author: Author) {
    this.router.navigate(["author", author.id]);
  }
}
