import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { passwordValidator } from "./password-validator";

const createUser = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      id
    }
  }
`;

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.sass"]
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  error: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        password_confirm: [null, [Validators.required]]
      },
      { validator: passwordValidator }
    );
  }

  signup() {
    this.apollo
      .mutate<any>({
        mutation: createUser,
        variables: this.signupForm.value
      })
      .subscribe(
        ({ data }) => {
          this.router.navigate(["user/signin"]);
        },
        error => {
          this.error = error;
        }
      );
  }
}
