import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookItemComponent } from "./book-item/book-item.component";
import { BookListComponent } from "./book-list/book-list.component";

const routes: Routes = [
  { path: "", component: BookListComponent },
  { path: ":id", component: BookItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {}
