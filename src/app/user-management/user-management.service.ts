import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { ApiHelper } from 'src/app/shared/helpers/api.helper';
import {  UserManagementApis } from '../shared/constants/apiEndPointPathName';
import { Designations } from './designation/designation.model';
import { GenerateOTP, Login, SaveCaptcha, ValidateOTP } from './login/login.model';
import { ResetPassword } from './reset-password/reset-password.model';
import { Users } from './users/users.model';
import { ForgotPassword } from './forgot-password/forgot-password.model';
import { ChangePassword } from './change-password/change-password.model';


@Injectable({
  providedIn: 'root',
})

export class UsersManagementService {

  constructor(
    private apiHelper: ApiHelper) { }

  saveCaptcha(payload: SaveCaptcha) {
    const endpoint = UserManagementApis.SAVE_CAPTCHA_API
    return this.apiHelper.postNoToken<SaveCaptcha>(endpoint, payload)
  }

  login(payload: Login) {
    const endpoint = UserManagementApis.LOGIN_API
    return this.apiHelper.postNoToken<Login>(endpoint, payload)
  }
  isLogin() {
    const endpoint = UserManagementApis.IS_LOGIN_API
    return this.apiHelper.post(endpoint, {});
  }


  getUsers(pageNumber: number, pageSize: number, sortBy: string, sortDir: string) {
    const endpoint = `${UserManagementApis.USER_API}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
    return this.apiHelper.get<Users[]>(endpoint);
  }

  createUser(payload: { [key: string]: any }) {
    const endpoint = `${UserManagementApis.USER_API}`
    return this.apiHelper.post<Users>(endpoint, payload)
  }

  getUserById(id: string) {
    const endpoint = `${UserManagementApis.USER_API}/${id}`
    return this.apiHelper.get<Users>(endpoint)
  }

  updateUser(payload: { [key: string]: any }) {
    const endpoint = `${UserManagementApis.USER_API}/${payload.id}`;
    return this.apiHelper.put<Users>(endpoint, payload)
  }

  deleteUser(id: any) {
    const endpoint = `${UserManagementApis.USER_API}/${id}`
    return this.apiHelper.delete(endpoint)
  }

  getDeputationDropdownList() {
    const endpoint = `${UserManagementApis.DEPUTATIONLEVELDROPDOWN_API}`;
    return this.apiHelper.get<Users>(endpoint)
  }

  getDeputationLevelRoleLists() {
    const endpoint = `${UserManagementApis.DEPUTATION_LEVEL_ROLE_API}`;
    return this.apiHelper.get<Users[]>(endpoint);
  }

  updateDeputationLevelRole(payload: { [key: string]: any }) {
    const endpoint = `${UserManagementApis.update_PROJECTDEPUTATIONLEVELROLE}`
    return this.apiHelper.put<Users>(endpoint, payload)
  }

  getDeputationByRoleId(id: any) {
    const endpoint = `${UserManagementApis.EDIT_DEPUTATIONROLELEVELS}/${id}`
    return this.apiHelper.get<Users>(endpoint)
  }

  getRoles() {
    const endpoint = `${UserManagementApis.ROLES_API}`;
    return this.apiHelper.get(endpoint)
  }


  resetPassword(payload: { [key: string]: any }) {
    const endpoint = UserManagementApis.FIRST_LOGIN_CHANGE_PASSWORD_API;
    return this.apiHelper.postNoToken<ResetPassword>(endpoint, payload)
  }

  createDesignationMaster(payload: { [key: string]: any }) {
    const endpoint = `${UserManagementApis.DESIGNATION_API}`
    return this.apiHelper.post<Designations>(endpoint, payload)
  }

  updateDesignationMaster(payload: { [key: string]: any }) {
    const endpoint = `${UserManagementApis.DESIGNATION_API}/${payload.id}`;
    return this.apiHelper.put<Designations>(endpoint, payload)
  }

  getDesignationMasterList() {
    const endpoint = `${UserManagementApis.DESIGNATION_API}`;
    return this.apiHelper.get<Designations[]>(endpoint);
  }

  getDesignationList() {
    const endpoint = `${UserManagementApis.DESIGNATION_DROPDOWN_API}`;
    return this.apiHelper.get<Designations[]>(endpoint);
  }

  getDesignationMasterById(id: any) {
    const endpoint = `${UserManagementApis.DESIGNATION_API}/${id}`
    return this.apiHelper.get<Designations>(endpoint)
  }

  deleteDesignation(id: any) {
    const endpoint = `${UserManagementApis.DESIGNATION_API}/${id}`
    return this.apiHelper.delete(endpoint)
  }


  getLanguageByMenuCode(id: string) {
  
  }

  getDistricts() {
    return new Observable((observer) => {
      observer.next("");
    });
    // need to delete this function
  }

  getTehsilByDistrictId(districtId: string) {
    return new Observable((observer) => {
      observer.next("");
    });
    // need to delete this function
  }

  getVillageByBlockId(tehsilId: string) {
    return new Observable((observer) => {
      observer.next("");
    });
    // need to delete this function
  }

  getBlockByTehsilId(blockId: string) {
    return new Observable((observer) => {
      observer.next("");
    });
    // need to delete this function
  }


  updateOfficeList(data: any) {
    const endpoint = `${UserManagementApis.OFFICES_API}/updateStatus`;
    return this.apiHelper.put(endpoint, data);
  }

  deleteOffice(id: any) {
    const endpoint = `${UserManagementApis.OFFICES_API}/${id}`
    return this.apiHelper.delete(endpoint)
  }

  generateOTP(payload: GenerateOTP) {
    const endpoint = UserManagementApis.GENERATE_OTP_API
    return this.apiHelper.postNoToken<GenerateOTP>(endpoint, payload)
  }

  validateOTP(payload: ValidateOTP) {
    const endpoint = UserManagementApis.VALIDATE_OTP_API
    return this.apiHelper.postNoToken<ValidateOTP>(endpoint, payload)
  }

  getUsersTemp() {
    const endpoint = `${UserManagementApis.USER_TEMP_API}`;
    return this.apiHelper.get<Users[]>(endpoint);
  }

  createUserTemp(payload: { [key: string]: any }) {
    const endpoint = `${UserManagementApis.USER_TEMP_API}`
    return this.apiHelper.post<Users>(endpoint, payload)
  }

  updateUserTemp(payload: { [key: string]: any }) {
    const endpoint = `${UserManagementApis.USER_TEMP_API}`
    return this.apiHelper.put<Users>(endpoint, payload)
  }

  getUsersV3() {
    const endpoint = `${UserManagementApis.USER_API_V3}`;
    return this.apiHelper.get<Users[]>(endpoint);
  }

  createUserV3(payload: { [key: string]: any }) {
    const endpoint = `${UserManagementApis.USER_API_V3}`
    return this.apiHelper.post<Users>(endpoint, payload)
  }

  updateUserV3(payload: { [key: string]: any }) {
    const endpoint = `${UserManagementApis.USER_API_V3}`
    return this.apiHelper.put<Users>(endpoint, payload)
  }

  getUserByIdTemp(id: string) {
    const endpoint = `${UserManagementApis.USER_TEMP_API}/${id}`
    return this.apiHelper.get<Users>(endpoint)
  }

  getUserByIdV3(id: string) {
    const endpoint = `${UserManagementApis.USER_API_V3}/${id}`
    return this.apiHelper.get<Users>(endpoint)
  }

  deleteUserTemp(id: any) {
    const endpoint = `${UserManagementApis.USER_TEMP_API}/${id}`
    return this.apiHelper.delete(endpoint)
  }

  getRoleDropdownList() {
    const endpoint = `${UserManagementApis.ROLES_DROPDOWN_API}`;
    return this.apiHelper.get(endpoint)
  }




  callForkApi(p_aServiceObjList: any): Observable<{ [key: string]: any }> {//TODO
    const schemeList = p_aServiceObjList[1].getUmbrellaDropdownList();
    const projectList = p_aServiceObjList[1].getProjectDropdownList();
    const officeTypeList = p_aServiceObjList[1].getDeputationDropdownList();
    const officeList = p_aServiceObjList[0].getOfficeDropdownList();
    const roleList = p_aServiceObjList[0].getRoleDropdownList();
    return forkJoin({ schemeList, projectList, officeTypeList, officeList, roleList });
  }

  forgotPasswordApi(payload: ForgotPassword) {
    const endpoint = UserManagementApis.FORGOT_PASSWORD_API
    return this.apiHelper.postNoToken<ForgotPassword>(endpoint, payload)
  }

  changePassword(payload: Login) {
    const endpoint = UserManagementApis.CHANGE_PASSWORD_API
    return this.apiHelper.postNoToken<ChangePassword>(endpoint, payload)
  }

  updateUsersStatus(payload: { [key: string]: any }) {
    const endpoint = `${UserManagementApis.USER_TEMP_API}/updateStatus`;
    return this.apiHelper.put<Users>(endpoint, payload)
  }


  lockUnlockUser(payload: { [key: string]: any }) {
    const endpoint = `${UserManagementApis.USER_TEMP_API}/lock-unlock`;
    return this.apiHelper.put<Users>(endpoint, payload)
  }
}

