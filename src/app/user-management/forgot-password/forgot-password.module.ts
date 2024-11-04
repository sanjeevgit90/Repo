import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ForgotPasswordComponent } from "./forgot-password.component";

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
  },
]

@NgModule({
  declarations: [ForgotPasswordComponent],

  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)]
})
export class ForgotPasswordModule { }
