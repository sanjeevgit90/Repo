import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { SharedModule } from "src/app/shared/shared.module";
import { MenuAddEditComponent } from './menu-add-edit/menu-add-edit.component';
import { MenuListComponent } from './menu-list/menu-list.component';

const routes: Routes = [
  
  // {
  //   path: '',
  //   component: MenuAddEditComponent
  // },
  {
    path: '',
    component: MenuListComponent
  }
  ,{
    path: UserManagementRoutes.MENU_ADD_EDIT, pathMatch: 'full',
    component: MenuAddEditComponent,
  },
 
];

@NgModule({
  declarations: [ MenuAddEditComponent, MenuListComponent ],
  imports: [
    CommonModule, SharedModule, MatIconModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class MenuCreationModule { }
