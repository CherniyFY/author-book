import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { BookItemComponent } from "./book-item/book-item.component";
import { BookListComponent } from "./book-list/book-list.component";
import { BookRoutingModule } from "./book-routing.module";

@NgModule({
  declarations: [BookListComponent, BookItemComponent],
  imports: [CommonModule, BookRoutingModule, NgZorroAntdModule, FormsModule]
})
export class BookModule {}
