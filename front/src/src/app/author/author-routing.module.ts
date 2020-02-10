import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorItemComponent } from "./author-item/author-item.component";
import { AuthorListComponent } from "./author-list/author-list.component";

const routes: Routes = [
  { path: "", component: AuthorListComponent },
  { path: ":id", component: AuthorItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule {}
