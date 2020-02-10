import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { AuthService } from "src/app/auth.service";

const signin = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.sass"]
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  error: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.signinForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  signin() {
    this.apollo
      .mutate<any>({
        mutation: signin,
        variables: this.signinForm.value
      })
      .subscribe(
        ({ data }) => {
          this.authService.setToken(data.login.token);
          this.router.navigate(["/author"]);
        },
        error => {
          this.error = error;
        }
      );
  }
}
