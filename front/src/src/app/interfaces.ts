export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  biography: string;
  books: Book[];
}

export interface Book {
  id: string;
  name: string;
  description: string;
  publishDate: string;
  author: Author;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  date: string;
  user: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}
