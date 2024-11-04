import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
]

@NgModule({
  declarations: [DashboardComponent],

  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)]
})
export class DashboardModule { }
