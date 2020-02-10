import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

const TOKEN_NAME = "token";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor() {}

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
    this.loggedIn.next(true);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_NAME);
    this.loggedIn.next(false);
  }

  checkToken(): boolean {
    if (localStorage.getItem(TOKEN_NAME)) {
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }
}
