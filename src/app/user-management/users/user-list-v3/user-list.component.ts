import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { TableAction } from 'src/app/shared/components/table/table-column';
import { FUNCTIONAL_RIGHTS } from 'src/app/shared/constants/constant';
import { ActionConstant, STATUS_MISSING, WANT_TO_ACTIVATE, WANT_TO_DEACTIVATE, WANT_TO_LOCK, WANT_TO_UNLOCK } from 'src/app/shared/constants/messagesConstant';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { CommonService } from 'src/app/shared/services/common.service';
import { ExcelExportService } from 'src/app/shared/services/excel-export.service';
import { PdfExportService } from 'src/app/shared/services/pdf-export.service';
import { UsersManagementService } from '../../user-management.service';
import { Users } from '../users.model';
import { USER_COLUMNS, UsersColumnsType } from './user-list.columns';

declare var window: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})

export class UserListComponent implements OnInit {

  userData!: Users[];
  usersTableColumns: UsersColumnsType = USER_COLUMNS;
  tableActions: TableAction[] = [];
  count: number = 0
  @ViewChild('dialogModal') dialogModal!: ElementRef;
  modalPopup: any;
  requestPayload: { [key: string]: any } = {};
  addEditUserRoutePath = UserManagementRoutes.ADD_EDIT_USER3;
  dialogDisplayContent: string = '';
  userDetails: { [key: string]: any } = {};
  functionControlObj: { [key: string]: any } = {};
  rightsSubscription: Subscription
  rowActionList: Array<string> = [ActionConstant.VIEW_ACTION, ActionConstant.EDIT_ACTION, ActionConstant.STATUS_TOGGLE_ACTION,
  ActionConstant.LOCK_UNLOCK_ACTION
  ]
  accessRights: { [key: string]: any } = {}
  actionType: string;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private commonService: CommonService,
    private excelExportService: ExcelExportService,
    private pdfExportService: PdfExportService,
    private usersManagementService: UsersManagementService,
  ) { }


  sortData(sortParameters: Sort) {
    this.userData = this.commonService.sortData(this.userData, sortParameters)
  }

  getUsers = () => {
    this.usersManagementService.getUsersV3().subscribe(
      {
        next: (response) => {
          this.userData = this.commonService.getAPIDataNode(response) || [];
          if (this.userData.length > 0) {
            const modifiedUserData = this.userData.map(user => {
              const updateUser = { ...user };
              updateUser.designation = user.designation.name;
              return updateUser
            })
            this.userData = modifiedUserData;
          }
          //  let totalCount: any = response
          this.count = this.userData.length;

        },
        error: (error) => {
          return this.commonService.showErrorMessage(this.commonService.getAPIErrorMSG(error));
        },
        complete: () => {

        }
      }
    );
  }



  ngOnInit(): void {
    // this.initializeActionColumns();
    this.getUsers();
    this.controlRights();
    this.getAccessRights();
  }
  controlRights() {
    const rightsList = [{ rightsName: FUNCTIONAL_RIGHTS.CREATE, rightsFlag: 0, elementName: "addNewUser" }];
    this.rightsSubscription = this.commonService.getFunctionalRights(rightsList).subscribe((p_oRightsList: any) => {
      p_oRightsList.forEach((el: { [key: string]: any }) => {
        if (el.rightsFlag) {
          this.functionControlObj[el.elementName] = 1;
        }
      });
    });
  }
  ngOnDestroy() {
    this.rightsSubscription.unsubscribe();
  }

  activateDeactivate() {
    this.requestPayload.id = this.userDetails.id;
    this.requestPayload.status = this.userDetails.status
    this.usersManagementService.updateUsersStatus(this.requestPayload).subscribe({
      next: (response) => {
        this.modalPopup.hide();
        this.commonService.showSuccessMessage(this.commonService.getAPIDataNode(response));
        this.getUsers();
      },
      error: (error) => {
        this.commonService.showErrorMessage(this.commonService.getAPIErrorMSG(error));
      },
      complete() {

      },
    })
  }

  actionMethod() {
    if (this.actionType == ActionConstant.STATUS_TOGGLE_ACTION) {
      this.activateDeactivate()
    }
    else {
      this.lockUnlockUser()
    }
  }

  lockUnlockUser() {
    let status;
    if ((this.userDetails.failureAttemptCount == 0) || (this.userDetails.failureAttemptCount < 5)) {
      status = true;
    }
    else {
      status = false;
    }

    this.requestPayload['email'] = this.userDetails.email;
    this.requestPayload['lock'] = status;
    this.usersManagementService.lockUnlockUser(this.requestPayload).subscribe({
      next: (response) => {
        this.modalPopup.hide();
        this.commonService.showSuccessMessage(this.commonService.getAPIDataNode(response));
        this.getUsers();
      },
      error: (error) => {
        this.commonService.showErrorMessage(this.commonService.getAPIErrorMSG(error));
      },
      complete() {

      },
    })
  }

  exportExcelData() {
    const toExport = this.userData.map(item => {
      const { id, password, ...rest } = item; // to remove id and passowrd
      return rest;
    });
    this.excelExportService.exportToExcel(toExport, 'User Data');
  }

  exportPDFData() {
    const toExport = this.userData.map(item => {
      const { id, password, ...rest } = item; // to remove id and passowrd
      return rest;
    });
    this.pdfExportService.exportToPdf(toExport, 'Users', 'User Data');
  }


  tableActionBtnHandler = (p_oObj: { [key: string]: any }, p_sType: string) => {
    this.userDetails = _.cloneDeep(p_oObj);
    switch (p_sType) {
      case ActionConstant.STATUS_TOGGLE_ACTION:
        let disMSG = "";
        this.actionType = ActionConstant.STATUS_TOGGLE_ACTION;
        switch (this.userDetails.status) {
          case 0:
            disMSG = WANT_TO_ACTIVATE;
            this.userDetails = { ...this.userDetails, "status": 1 };
            break;
          case 1:
            disMSG = WANT_TO_DEACTIVATE;
            this.userDetails = { ...this.userDetails, "status": 0 };
            break;
          default:
            break;
        }
        if (disMSG) {
          this.dialogDisplayContent = disMSG.replace("*", this.userDetails.name);
          this.openDialog();
        } else {
          this.commonService.showErrorMessage(STATUS_MISSING);
        }
        break;

      case ActionConstant.EDIT_ACTION:
        this.router.navigateByUrl(`${this.router.url}/${this.addEditUserRoutePath}`,
          { state: { userId: this.userDetails.id, dataStatus: this.userDetails.status, mode:'edit' } });
        break;

      case ActionConstant.VIEW_ACTION:
        this.router.navigateByUrl(`${this.router.url}/${this.addEditUserRoutePath}`,
          { state: { userId: this.userDetails.id, dataStatus: this.userDetails.status, mode:'view' } });
        break;


      case ActionConstant.LOCK_UNLOCK_ACTION:
        let disMsg1 = "";
        this.actionType = ActionConstant.LOCK_UNLOCK_ACTION;
        switch (this.userDetails.failureAttemptCount) {
          case 0:
            disMsg1 = WANT_TO_LOCK;
            this.userDetails = { ...this.userDetails, email: this.userDetails.email, "status": true };
            break;
          case 5:
            disMsg1 = WANT_TO_UNLOCK;
            this.userDetails = { ...this.userDetails, email: this.userDetails.email ,"status": false };
            break;
        }
        if (disMsg1) {
          this.dialogDisplayContent = disMsg1.replace("*", this.userDetails.name);
          this.openDialog();
        } else {
          this.commonService.showErrorMessage(STATUS_MISSING);
        }
        break;



    }
  }

  onTableAction = (p_oData: { [key: string]: any }) => {
    this.tableActionBtnHandler(p_oData.row, p_oData.action)
  }

  openDialog() {
    this.modalPopup = new window.bootstrap.Modal(this.dialogModal.nativeElement);
    this.modalPopup.show();
  }

  getAccessRights() {
    const menuCode = this.commonService.getMenuCodeInSession();
    this.commonService.getSelectedRole(menuCode)
    this.accessRights = {
      isCreate: this.commonService.isCreate
    }
  }

}
