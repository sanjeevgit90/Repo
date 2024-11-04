import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  { path: '404', component: PageNotFoundComponent },
	{ path: '**', redirectTo: '/404' },
  
]

@NgModule({
  declarations: [PageNotFoundComponent],
  
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
})
export class PageNotFoundModule {
  constructor() {
  }
}
