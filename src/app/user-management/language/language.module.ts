import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageListComponent } from './language-list/language-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LanguageAddEditComponent } from './language-add-edit/language-add-edit.component';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';


const routes : Routes =[
  {
    path:'',
    component:LanguageListComponent
  },
  {
    path:UserManagementRoutes.ADD_EDIT_LANGUAGE, pathMatch: 'full',
    component:LanguageAddEditComponent
  }
]

@NgModule({
  declarations: [
    LanguageListComponent,
    LanguageAddEditComponent
  ],
  imports: [
    CommonModule, SharedModule, MatIconModule,
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot()
  ],
})
export class LanguageModule { 

}
