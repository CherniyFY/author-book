import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/author" },
  {
    path: "author",
    loadChildren: () =>
      import("./author/author.module").then(m => m.AuthorModule)
  },
  {
    path: "book",
    loadChildren: () => import("./book/book.module").then(m => m.BookModule)
  },
  {
    path: "user",
    loadChildren: () => import("./core/core.module").then(m => m.CoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
