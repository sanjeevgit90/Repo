import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { SharedModule } from "src/app/shared/shared.module";
import { AddRoleMenuComponent } from './add-role-menu/add-role-menu.component';
import { ListRoleMenuComponent } from './list-role-menu/list-role-menu.component';

const routes: Routes = [
  {
    path: '',
    component: ListRoleMenuComponent
  }
  ,{
    path: UserManagementRoutes.ADD_ROLE_MENU, pathMatch: 'full',
    component: AddRoleMenuComponent,
  },
];

@NgModule({
  declarations: [ AddRoleMenuComponent, ListRoleMenuComponent],
  imports: [
    CommonModule, SharedModule, MatIconModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class RoleMenuMappingModule { }
