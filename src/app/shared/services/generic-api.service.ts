import { Injectable } from '@angular/core';
import { ApiHelper } from 'src/app/shared/helpers/api.helper';
import { GenericApis,UserManagementApis } from '../constants/apiEndPointPathName';
import { SelectedRoles, Users } from 'src/app/user-management/users/users.model';
import { Language } from 'src/app/user-management/language/language.model';
import { Observable } from 'rxjs';
import { GenerateOTP } from 'src/app/user-management/login/login.model';


@Injectable({
  providedIn: 'root',
})

export class GenericApiService {

  constructor(
    private apiHelper: ApiHelper) { }


  sendOTPMobile(payload: any): Observable<any> {
    const endpoint: string = `auth/send-otp-mobile`;
    return this.apiHelper.postNoToken(endpoint, payload);
  }

  doMobileVerification(payload: any): Observable<any> {
    const endpoint: string = `auth/validate-otp-simple`;
    return this.apiHelper.postNoToken(endpoint, payload);
  }

  generateOTP(payload: GenerateOTP) {
    const endpoint = UserManagementApis.GENERATE_OTP_API
    return this.apiHelper.postNoToken<GenerateOTP>(endpoint, payload)
  }

}
