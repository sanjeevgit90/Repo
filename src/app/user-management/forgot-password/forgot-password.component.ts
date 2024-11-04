import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OTP_CONST, placehoder } from 'src/app/shared/constants/constant';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { CommonService } from 'src/app/shared/services/common.service';
import { GenericApiService } from 'src/app/shared/services/generic-api.service';
import { validationPattern } from 'src/app/shared/utility';
import { RootReducerState } from 'src/app/store/reducers';
import { UsersManagementService } from '../user-management.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any
  placeholderValue: any = placehoder.pleaseEnter;
  formGroup: FormGroup;
  captchatext: any;
  navigateToHome: any = UserManagementRoutes.LOGIN;
  // navigateToFarmerReg: any = FarmerRegistrationRoutes.FARMER_AADHAR_VERIFICATION;
  isSaveCaptcha: boolean = false;
  emailPattern: any = validationPattern.email;
  navigateToLogin: any = UserManagementRoutes.LOGIN;

  constructor(
    private store: Store<RootReducerState>,
    private router: Router,
    private commonService: CommonService,
    private usersManagementService: UsersManagementService,
    private genericApiService: GenericApiService
  ) {
    this.commonService.flushAllDateAfterLogOut();
  }

  disabledField = () => {
    this.formGroup.get('username')!.disable();
  }

  enabledField = () => {
    this.formGroup.get('username')!.enable();
  }

  back() {
    this.enabledField();
    this.initializeFormControlsUserName();
  }

  generateOtp() {
    if (this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      return
    }
     let requestPayload: any = {
      "username": this.formGroup.value.username,
      "templateId": OTP_CONST.TEMPLATE_ID,
      "notificationTypes": OTP_CONST.NOTIFICATION_TYPE
    }
    this.usersManagementService.generateOTP(requestPayload).subscribe(
      {
        next: (response) => {
         this.initializeFormControlsWithOtp();
          this.disabledField()
        },
        error: (error) => {
          this.commonService.showErrorMessage(error, false);
        },
        complete: () => {

        }
      },
    )
  }

  forgotPassword() {
    if (this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      return
    }
     let requestPayload: any = {
      "username": this.formGroup.controls.username.value,
      "otp": this.formGroup.value.otp,
      "newPassword":this.formGroup.value.newPassword,
      "confirmPassword":this.formGroup.value.confirmPassword,
    }
    this.usersManagementService.forgotPasswordApi(requestPayload).subscribe(
      {
        next: (response) => {
          this.commonService.showSuccessMessage(this.commonService.getAPIDataNode(response));

        },
        error: (error) => {
          this.commonService.showErrorMessage(this.commonService.getAPIErrorMSG(error), false);
        },
        complete: () => {
          this.router.navigate([UserManagementRoutes.LOGIN]);
        }
      },
    )
  }

  initializeFormControlsWithOtp() {
    this.formGroup = new FormGroup({
      username: new FormControl(this.formGroup.controls.username.value, [Validators.required, Validators.email]),
      otp: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  }

  initializeFormControlsUserName() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void {
    this.initializeFormControlsUserName()
  }
}
