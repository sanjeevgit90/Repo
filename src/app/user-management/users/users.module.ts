import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { SharedModule } from "src/app/shared/shared.module";
import { TranslationService } from 'src/app/shared/services/translation.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserAddEditComponent } from './user-add-edit-v3/user-add-edit.component';
import { UserListComponent } from './user-list-v3/user-list.component';
import { UserViewComponent } from './user-view/user-view.component';


const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: UserManagementRoutes.ADD_EDIT_USER3, pathMatch: 'full',
    component: UserAddEditComponent,
  },
  {
    path: `${UserManagementRoutes.VIEW_USER}`,
    component: UserViewComponent,
  },

];

@NgModule({
  declarations: [UserAddEditComponent, UserListComponent, UserViewComponent],
  imports: [
    CommonModule, SharedModule, MatIconModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
})

export class UsersModule {

  constructor(){
  }
  ngOnInit(): void {


  }
 }
