import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoleManagementRoutes, UserManagementRoutes } from "../shared/constants/routePathConstants";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  {
    path: UserManagementRoutes.LOGIN,
    loadChildren: () =>
      import('../user-management/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: UserManagementRoutes.FORGOT_PASSWORD,
    loadChildren: () =>
      import('../user-management/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule)
  },
  {
    path: UserManagementRoutes.RESET_PASSWORD,
    loadChildren: () =>
      import('../user-management/reset-password/reset-password.module').then((m) => m.ResetPasswordModule)
  },

  {
    path: RoleManagementRoutes.ADDED_ROLES_LIST,
    loadChildren: () =>
      import('../user-management/role-management/role-management.module').then(m => m.RoleManagementModule)
  },
  {
    path: UserManagementRoutes.LIST_DESIGNATION,
    loadChildren: () =>
      import('../user-management/designation/designation.module').then((m) => m.DesignationsModule),
  },
    
  {
    path: UserManagementRoutes.LIST_USER,
    //canActivate: [AuthGuard],
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: UserManagementRoutes.CHANGE_PASSWORD,
    loadChildren: () =>
      import('../user-management/change-password/change-password.module').then((m) => m.ChangePasswordModule),
  },
  // LanguageList
  { 
    path:UserManagementRoutes.LIST_LANGUAGE,
    loadChildren:()=>
      import('../user-management/language/language.module').then((m)=>m.LanguageModule)
  } ,

  { path:UserManagementRoutes.MENU_ADD_EDIT,
  loadChildren:()=>
    import('../user-management/menu-creation/menu-creation.module').then((m)=>m.MenuCreationModule)
  },

  { path:UserManagementRoutes.MENU_LIST,
    loadChildren:()=>
      import('../user-management/menu-creation/menu-creation.module').then((m)=>m.MenuCreationModule)
  },

  { path:UserManagementRoutes.ADD_ROLE_MENU,
    loadChildren:()=>
      import('../user-management/role-menu-mapping/role-menu-mapping.module').then((m)=>m.RoleMenuMappingModule)
  },

  { path:UserManagementRoutes.LIST_ROLE_MENU,
    loadChildren:()=>
      import('../user-management/role-menu-mapping/role-menu-mapping.module').then((m)=>m.RoleMenuMappingModule)
  },

  { path:UserManagementRoutes.ADD_EDIT_USER3,
    loadChildren:()=>
      import('../user-management/users/users.module').then((m)=>m.UsersModule)
  },

  { path:UserManagementRoutes.LIST_USER,
    loadChildren:()=>
      import('../user-management/users/users.module').then((m)=>m.UsersModule)
  }


];

@NgModule({
  declarations: [
  
     ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)]
})
export class UserManagementModule { }
