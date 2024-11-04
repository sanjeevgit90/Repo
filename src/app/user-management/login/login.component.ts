import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OTP_CONST, OTP_Timer, commonMessage, placehoder } from 'src/app/shared/constants/constant';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { CommonService } from 'src/app/shared/services/common.service';
import { GenericApiService } from 'src/app/shared/services/generic-api.service';
import { validationPattern } from 'src/app/shared/utility';
import { UserLoginSuccessAction } from 'src/app/store/actions/login-action';
import { RootReducerState } from 'src/app/store/reducers';
import { UsersManagementService } from '../user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any
  placeholderValue: any = placehoder.pleaseEnter;
  isPassword: boolean = true;
  formGroup: FormGroup;
  captchatext: any;
  navigateToForgotPassword: any = UserManagementRoutes.FORGOT_PASSWORD
  navigateToHome: any = UserManagementRoutes.LOGIN;
  isSaveCaptcha: boolean = false;
  captchaValue: string | null = null;
  emailPattern: any = validationPattern.email;
  selectedRights: any;
  otpTimer: number = 0;
  showResend: boolean = false;
  otpMessage: string = commonMessage.otpMessage;

  constructor(
    private store: Store<RootReducerState>,
    private router: Router,
    private commonService: CommonService,
    private usersManagementService: UsersManagementService,
    private genericApiService: GenericApiService
  ) {
    this.commonService.flushAllDateAfterLogOut();
  }

  receiveCaptcha(value: string) {
    this.captchaValue = value;
  }

  disabledField = () => {
    this.formGroup.get('username')!.disable();
  }

  enabledField = () => {
    this.formGroup.get('username')!.enable();
  }

  saveCaptcha() {
    if (this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      return
    }
    let requestPayload: any = {};
    requestPayload["username"] = this.formGroup.value.username;
    requestPayload["captcha"] = this.captchaValue;
    this.usersManagementService.saveCaptcha(requestPayload).subscribe(
      {
        next: (response) => {
          this.initializeFormControlsWithPassword();
          this.isSaveCaptcha = true;
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
 
  back() {
    this.enabledField();
    this.isSaveCaptcha = false;
    this.initializeFormControlsUserName();
  }

  // Function to filter selectedRights based on menuCode
  filterRightsByMenuCode(menuCode: string): any[] {
    return this.selectedRights.filter((right: any) => right.menuCode === menuCode);
  }

  getSelectedRight() {
    const filteredRights = this.filterRightsByMenuCode("USER_MANAGEMENT_ROLE");
    const selectedMenuRight: any = filteredRights[0].selectedRights


    // Check if the array includes a specific rightCode
    const isView = selectedMenuRight.some((right: any) => right.rightCode === "RIGHT_CODE_VIEW");
    const isDelete = selectedMenuRight.some((right: any) => right.rightCode === "RIGHT_CODE_DELETE");
    const isEdit = selectedMenuRight.some((right: any) => right.rightCode === "RIGHT_CODE_EDIT");
    const isCreate = selectedMenuRight.some((right: any) => right.rightCode === "RIGHT_CODE_CREATE");

  }

  login() {
    this.commonService.goOnDashBoard();
  }



  generateOtp(type?:string) {
    this.otpTimer = OTP_Timer;
    this.showResend = false;
    if(type=='resend') {
      this.enabledField();
      const username = this.formGroup.value.username
      this.initializeFormControlsUserName()
      username && this.formGroup.controls['username'].setValue(username);
    }
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
          this.disabledField();
          this.commonService.showSuccessMessage(this.otpMessage);
        },
        error: (error) => {
          this.commonService.showErrorMessage(error, false);
        },
        complete: () => {

        }
      },
    )
  }

  validateOtp() {
    if (this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      return
    }
    let requestPayload: any = {
      "username": this.formGroup.controls.username.value,
      "otp": this.formGroup.value.otp,
    }
    this.usersManagementService.validateOTP(requestPayload).subscribe(
      {
        next: (data) => {
          this.store.dispatch(new UserLoginSuccessAction({ loginData: this.commonService.getAPIDataNode(data) }));
          this.commonService.callCommonAPIAfterLogin([this.usersManagementService, this.genericApiService], () => {
            this.commonService.goOnDashBoard();
          }, (err: string) => {
            this.commonService.showErrorMessage(err, false);
          });

        },
        error: (error) => {
          this.commonService.showErrorMessage(this.commonService.getAPIErrorMSG(error), false);
        },
        complete: () => {

        }
      },
    )
  }

  togglePassword(item: string) {
    if (item === 'PASSWORD') {
      this.isPassword = true;
    }
    else {
      this.isPassword = false
    }
  }

  initializeFormControlsWithPassword() {
    this.formGroup = new FormGroup({
      username: new FormControl(this.formGroup.controls.username.value, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      captcha: new FormControl('', [Validators.required]),
    })
  }

  initializeFormControlsWithOtp() {
    this.formGroup = new FormGroup({
      username: new FormControl(this.formGroup.controls.username.value, [Validators.required, Validators.email]),
      otp: new FormControl('', [Validators.required]),
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

  showResendButton() {
		this.showResend = true;
	}
}
