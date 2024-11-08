import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminFooComponent } from "./admin-foo/admin-foo.component";
import { AdminBarComponent } from "./admin-bar/admin-bar.component";

export const booksRoutes: Routes = [
  { path: 'books', component: DashboardComponent },
  { path: 'books/admin', component: AdminComponent, children: [
    { path: 'foo', component: AdminFooComponent },
    { path: 'bar', component: AdminBarComponent },
  ] },
  { path: 'books/:isbn', component: BookDetailsComponent }
];
