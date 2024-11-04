import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { SharedModule } from "src/app/shared/shared.module";
import { DesignationAddComponent } from './designation-add/designation-add.component';
import { DesignationListComponent } from './designation-list/designation-list.component';

const routes: Routes = [
  {
    path: '',
    component: DesignationListComponent,
  },
  {
    path: UserManagementRoutes.ADD_DESIGNATION, pathMatch: 'full',
    component: DesignationAddComponent,
  },
];

@NgModule({
  declarations: [ DesignationAddComponent, DesignationListComponent ],
  imports: [
    CommonModule, SharedModule, MatIconModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
})

export class DesignationsModule { }
