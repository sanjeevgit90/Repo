import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ACTION_BUTTON_NAME, dateFormate } from 'src/app/shared/constants/constant';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { CommonService } from 'src/app/shared/services/common.service';
import { UsersManagementService } from '../../user-management.service';
import { Users } from '../users.model';
import { USER_VIEW_COLUMNS, UserViewColumnsType } from './user-view.columns';

@Component({
  selector: 'app-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
})

export class UserViewComponent implements OnInit {

  userDetails: Users = new Users()
  ddMMyyyy = dateFormate.ddMMyyyy;
  pageTitle="USER_DETAILS"
  static readonly VIEW_MODE = "view";
  componentExistingData: { [key: string]: any } = {}
  userListRoutes = UserManagementRoutes.LIST_USER;
  actionButton=ACTION_BUTTON_NAME;
  roleDetails: { [key: string]: any } = {};
  roleTableColumns: UserViewColumnsType = USER_VIEW_COLUMNS;

  constructor(
    private router: Router,
    private usersManagementService: UsersManagementService,
    private commonService: CommonService,
  ) {
    this.getDataFromState()
  }

  getDataFromState() {
    const { extras } = this.router.getCurrentNavigation() || {};
    if (extras) {
      const userId = _.get(extras, "state.userId", "");
      if (userId) {
        this.componentExistingData.userId = userId;
        this.componentExistingData.modeType = UserViewComponent.VIEW_MODE;
      }
    }
  }

  ngOnInit(): void {
    const { userId, modeType } = this.componentExistingData;
    if ((modeType === UserViewComponent.VIEW_MODE) && userId) {
      this.getDataByUserID(userId);
    }
  }

  // Get User Details
  getDataByUserID(id: string) {
    this.usersManagementService.getUserByIdV3(id).subscribe(
      {
        next: (response) => {
          this.userDetails = this.commonService.getAPIDataNode(response);
        },
        error: (error) => {
          return this.commonService.showErrorMessage(this.commonService.getAPIErrorMSG(error));
        },
        complete: () => {
        }
      }
    );
  }

}
