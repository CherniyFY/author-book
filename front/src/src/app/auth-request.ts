import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.auth.getToken();
    let authReq = req.clone();
    if (authToken) {
      authReq = req.clone({
        headers: req.headers.set("Authorization", `Token ${authToken}`)
      });
    }

    return next.handle(authReq);
  }
}
