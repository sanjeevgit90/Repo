import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ACTION_BUTTON_NAME, ADD_EDIT_MODULE_NAV_ACTION, CONDITION_CONSTANT, SHOW_NAVIGATION_CONST, placehoder } from 'src/app/shared/constants/constant';
import { SELECT_AT_LEAST_ONE_ROLE, SOMETHING_WENT_WRONG, WANT_TO_RESET } from 'src/app/shared/constants/messagesConstant';
import { RoleManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { CommonService } from 'src/app/shared/services/common.service';
import { removeMutipleSpaces } from 'src/app/shared/utility';
import { RoleManagementService } from '../role-management.service';
import { RoleMasterFields } from '../role-management.field';

declare var window: any;
@Component({
  selector: 'app-role-add',
  templateUrl: './role-add-edit.component.html',
  styleUrls: ['./role-add-edit.component.css']
})
/**
 *
 */
export class RoleAddComponent implements OnInit {
 
  placeholderValue: any = placehoder.pleaseEnter;
  formGroup: FormGroup;
  
  roleTypeData: any = [
    {id:1, roleOption: 'District User'},
    {id:2, roleOption :'Block City User'},
    {id:3, roleOption :'Panchayat Zone User'},
    {id:4, roleOption :'Department User'},
  ]
  roleOption: { id: string; name: string; }[];
  /**
   *
   * @param roleManageService
   * @param commonService
   * @param router
   * @param location
   */
  constructor(private roleManageService: RoleManagementService, private commonService: CommonService, private router: Router, private location: Location) {
    const { extras } = this.router.getCurrentNavigation() || {};
    
  }
  /**
   *
   */
  ngOnInit(): void {

  }
  getDataByRoleID = (p_sRoleID: string) => {
   
  }
  getAllMenuRightsList = (p_aEditableMenuList: { [key: string]: any } = {}) => {
 
  }
  /**
   *
   * @param p_sMenuID
   * @returns
   */
  isSubMenuExist(p_aRoleList: Array<{ [key: string]: any }>, p_sMenuID: string) {
    return p_aRoleList.filter((el) => {
      return (el.parentMenuId === p_sMenuID);
    })
  }
  /**
   *
   * @param e
   */


  /**
 *
 */


}
