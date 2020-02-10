import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  logoutModalVisible = false;

  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkToken();
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  showLogoutModal() {
    this.logoutModalVisible = true;
  }

  handleCancel() {
    this.logoutModalVisible = false;
  }

  async handleOk() {
    this.authService.removeToken();
    this.logoutModalVisible = false;
  }
}
