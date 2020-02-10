import { registerLocaleData } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import en from "@angular/common/locales/en";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgZorroAntdModule, NZ_I18N, ru_RU } from "ng-zorro-antd";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthInterceptor } from "./auth-request";
import { AuthService } from "./auth.service";
import { GraphQLModule } from "./graphql.module";
import { IconsProviderModule } from "./icons-provider.module";

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GraphQLModule
  ],
  providers: [
    AuthService,
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    { provide: NZ_I18N, useValue: ru_RU }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
