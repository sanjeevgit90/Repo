import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { RoleAddComponent } from "./role-add-edit/role-add-edit.component";
import { RoleListComponent } from "./role-list/role-list.component";
import { RoleManagementRoutes } from "src/app/shared/constants/routePathConstants";
import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  { path: '', component: RoleListComponent },
  {
    path: RoleManagementRoutes.ADD_ROLES, pathMatch: 'full',
    component: RoleAddComponent,
  },
];

@NgModule({
  declarations: [RoleAddComponent, RoleListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})

export class RoleManagementModule { }
