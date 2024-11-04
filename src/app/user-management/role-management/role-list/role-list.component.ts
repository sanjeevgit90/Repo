import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { CommonService } from 'src/app/shared/services/common.service';
import { } from '../../menu-creation/menu-list/menu-list.columns';
import { RoleManagementService } from '../role-management.service';
import { ROLE_MASTER_COLUMNS, RoleMasterColumnsType } from './role-lisT.columns';


declare var window: any;
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  tableColumns: RoleMasterColumnsType = ROLE_MASTER_COLUMNS;
  addRoutePath = RoleManagementRoutes.ADD_ROLES;
  componentList = ['name', 'type', 'status'];
  rowActionList: any [];
  pageHeading = 'Role Master';
  btnLabel = 'Add Role';
  accessRights:{[key:string]:any} ={}

  constructor(private roleManageService: RoleManagementService, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
   
  }


}
