import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutes } from "../shared/constants/routePathConstants";

const routes: Routes = [
  {
    path: DashboardRoutes.DASHBOARD,
    loadChildren: () =>
      import('../dashboard-management/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },


]; 

@NgModule({
  declarations: [  
  
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)]
})
export class DashboardManagementModule { }
