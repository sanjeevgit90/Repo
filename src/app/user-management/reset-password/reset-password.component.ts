import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import _ from 'lodash';
import { placehoder } from 'src/app/shared/constants/constant';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { CommonService } from 'src/app/shared/services/common.service';
import { UsersManagementService } from '../user-management.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  requestPayload: { [key: string]: any } = {}
  placeholderValue: any = placehoder.pleaseEnter;
  formGroup: FormGroup;
  componentExistingData: { [key: string]: any } = {}

  constructor(
    private commonService: CommonService,
    private usersManagementService: UsersManagementService,
    private router: Router,
  ) {
    this.getDataFromState()
  }

  // Disabled Form Controls
  disabledField = () => {
    this.formGroup.get('username')!.disable();
  }
  // Enabled Form Controls
  enabledField = () => {
    this.formGroup.get('username')!.enable();
  }

  getDataFromState() {
    const { extras } = this.router.getCurrentNavigation() || {};
    if (extras) {
      this.componentExistingData.email = _.get(extras, "state.USERNAME", "");
    }
  }

  resetPassword() {
    if (this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      return
    }
    this.enabledField()
    this.requestPayload = this.formGroup.value
    this.usersManagementService.resetPassword(this.requestPayload).subscribe({
      next: (response) => {
        this.commonService.showSuccessMessage(this.commonService.getAPIDataNode(response));
      },
      error: (error) => {
        return this.commonService.showErrorMessage(this.commonService.getAPIErrorMSG(error));
      },
      complete: () => {
        this.router.navigate([UserManagementRoutes.LOGIN]);
      }
    })
  }

  initializeFormControls() {
    this.formGroup = new FormGroup({
      username: new FormControl(this.componentExistingData.email, [Validators.required, Validators.email]),
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.initializeFormControls()
    this.disabledField()
  }
}
