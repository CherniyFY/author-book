import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { AuthorItemComponent } from "./author-item/author-item.component";
import { AuthorListComponent } from "./author-list/author-list.component";
import { AuthorRoutingModule } from "./author-routing.module";

@NgModule({
  declarations: [AuthorListComponent, AuthorItemComponent],
  imports: [CommonModule, AuthorRoutingModule, NgZorroAntdModule]
})
export class AuthorModule {}
