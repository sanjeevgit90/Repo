import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { TableAction } from 'src/app/shared/components/table/table-column';
import * as _ from 'lodash';
import { DashboardRoutes, UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { ACTION_BUTTON_NAME, ADD_EDIT_MODULE_NAV_ACTION, SHOW_NAVIGATION_CONST, commonMessage, dropdownSettingsConfig, placehoder} from 'src/app/shared/constants/constant';
import { PageModeConstant } from 'src/app/shared/constants/messagesConstant';
import { ChangePasswordFields } from '../change-password.fields';
import { UsersManagementService } from '../../user-management.service';
import { RootReducerState, getLoginData } from 'src/app/store/reducers';
import {Store} from "@ngrx/store";

declare var window: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  placeholderValue: any = placehoder.pleaseEnter;
  formGroup: FormGroup;
  pageTitle: string = 'CHANGE_PASSWORD';
  modalPopup: any;
  @ViewChild('dialogModal') dialogModal!: ElementRef;
  componentExistingData: { [key: string]: any } = {};
  actionButton = ACTION_BUTTON_NAME;
  ChangePasswordFields: {[key:string]:any} =ChangePasswordFields;
  resetForm: string = commonMessage.resetForm;
  emailId: any;
  requestPayload: any;
  showNavigationType:string =SHOW_NAVIGATION_CONST.CREATE;

  constructor(
    private commonService: CommonService,
    public route: ActivatedRoute,
    private usersManagementService: UsersManagementService,
    private router: Router,
    private store: Store<RootReducerState>, private formBuilder: FormBuilder
  ) {

  }

  initializeFormControls() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(2)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  openDialog() {
    this.modalPopup = new window.bootstrap.Modal(this.dialogModal.nativeElement);
    this.modalPopup.show();
  }

  reset() {
    this.formGroup.reset();
    this.modalPopup.hide();
  }

  save() {
    if (this.formGroup.status == 'INVALID') {
      this.formGroup.markAllAsTouched();
      return
    }
    this.requestPayload = this.formGroup.value;
    this.requestPayload.username = this.emailId.email;
    this.usersManagementService.changePassword(this.requestPayload).subscribe(
      {
        next: (response) => {
          this.commonService.showSuccessMessage(this.commonService.getAPIDataNode(response));
        },
        error: (error) => {
          return this.commonService.showErrorMessage(this.commonService.getAPIErrorMSG(error));
        },
        complete: () => {
          this.router.navigate([DashboardRoutes.DASHBOARD]);
        }
      }
    );
  }

  getUserObjectData() {
    this.store.select(getLoginData).subscribe((data) => {
      this.emailId = data
      const userEmail = this.emailId.email;
      this.formGroup.get('username')?.setValue(userEmail);
    });
	}

  disabledField(){
    this.formGroup.get('username')!.disable();
  }

  ngOnInit(): void {
    this.initializeFormControls();
    this.disabledField();
    this.getUserObjectData();
  }

  onBottomBtnClick(p_oData: { [key: string]: any }) {
    const { navType } = p_oData || {};
    switch (navType) {
      case ADD_EDIT_MODULE_NAV_ACTION.CREATE_ACTION:
        this.save();
        break;
      default:
        break;
    }
  }

}

