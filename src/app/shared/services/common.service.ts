import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, forkJoin } from 'rxjs';
import { SetAllRoles, SetCurrentRole, SetCurrentRoleUser, SetDistrictsAction, SetFYListAction } from 'src/app/store/actions/common-action';
import { FlushTheReduxState } from 'src/app/store/actions/redux-flush-action';
import { RootReducerState, getCurrentRoleData, getLoginData } from 'src/app/store/reducers';
import { environment } from 'src/environments/environment';
import {
	IS_USER_LOGIN_KEY,
	LOGGED_USER_ROLE,
	MUTLTI_SELECT_DD_ACTION,
	SELECTD_MENU_CODE,
	SELECTD_MENU_ID,
	TEMP_USER_TOKEN_KEY,
	TOKEN_MISSING,
	commonMessage
} from '../constants/constant';
import { SOMETHING_WENT_WRONG } from '../constants/messagesConstant';
import {
	BEFORE_LOGIN_ROUTE_PATH_LIST,
	DashBoardRoute,
	UserManagementRoutes
} from '../constants/routePathConstants';

import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Injectable({
	providedIn: 'root'
})

export class CommonService {
	loggedUserTempToken: string = "";
	matSnakDuration: any = commonMessage.snackBarDuration;
	userRolesList: Array<{ [key: string]: any }> = [];
	rolesDDList: Array<{ [key: string]: any }> = [];
	selectedRights: Array<{ [key: string]: any }> = [];
	isView: boolean;
	isDelete: boolean;
	isEdit: boolean;
	isCreate: boolean;

	constructor(
		private snackBar: MatSnackBar,
		private store: Store<RootReducerState>,
		private router: Router
	) {
	}

	// HTTP Failure
	showErrorMessage(error: string, p_bAutoHide: boolean = true) {
		this.snackBar.open(error || "", 'X', {
			duration: p_bAutoHide ? this.matSnakDuration : commonMessage.snackBarDuration,
			panelClass: ['red-snackbar'],
		});
	}

	// Http Success
	showSuccessMessage(success: string, p_bAutoHide: boolean = true) {
		this.snackBar.open(success || "", 'X', {
			duration: p_bAutoHide ? this.matSnakDuration : commonMessage.snackBarDuration,
			panelClass: ['green-snackbar'],
		});
	}

	private getAccessToken() {
		let token: string = TOKEN_MISSING;
		this.store.select(getLoginData).subscribe((data) => {
			token = _.get(data, "token", "") || sessionStorage.getItem(TEMP_USER_TOKEN_KEY) || TOKEN_MISSING;
			if (token !== TOKEN_MISSING) {
				this.loggedUserTempToken = token;
			}
		})
		return token;
	}

	// Set Token in header to use in API calling
	getTokenHeader() {
		let header: any
		header = {
			'Content-Type': 'application/json',
			'Authorization': this.getAccessToken()
		}
		return header;
	}

	getTokenHeaderMultiPart() {
		let header: any
		header = {
			'Authorization': this.getAccessToken()
		}
		return header;
	}

	getTokenHeaderMultiPartWithoutAuth() {
		let header: any
		header = {
			'Content-Type': 'multipart/form-data',
		}
		return header;
	}

	// Set content type in header
	getHeaderContentTypeOnly() {
		let header: any;
		header = {
			'Content-Type': 'application/json'
		}
		return header;
	}

	callCommonAPIAfterLogin = (p_aServiceObjList: any, successCallBack: any = null, failureCallBack: any = null) => {

		let apiOne = p_aServiceObjList[0].getRoles();
		let apiDistrict = p_aServiceObjList[1].getDistricts();
		let apiFYList = p_aServiceObjList[1].getFinancialYearsList();

		forkJoin({ apiOne, apiDistrict, apiFYList }).subscribe(
			{
				next: (response: { [key: string]: any }) => {
					const { apiOne } = response || {};
					const { apiDistrict } = response || {};
					const { apiFYList } = response || {};

					this.store.dispatch(new SetAllRoles({ roles: this.getAPIDataNode(apiOne) }));

					this.store.dispatch(new SetDistrictsAction({ districts: this.getAPIDataNode(apiDistrict) }));

					this.store.dispatch(new SetFYListAction({ fyList: this.getAPIDataNode(apiFYList) }));
					successCallBack && successCallBack(response);
					this.setUserLoggedFlagInSession();
				},
				error: (error) => {
					failureCallBack && failureCallBack(this.getAPIErrorMSG(error));
				},
				complete: () => {

				}
			}
		);
	}
	getAPIErrorMSG = (p_oError: any) => {
		if (_.isObject(p_oError)) {
			return _.get(p_oError, "error.error", SOMETHING_WENT_WRONG)
		}
		return p_oError;
	}
	getAPIDataNode = (p_oData: any) => {
		return _.get(p_oData, "data.content", (_.get(p_oData, "data", null)))
	}
	flushAllSessionStorage = () => {
		sessionStorage.clear();
	}

	setUserLoggedFlagInSession() {
		sessionStorage.setItem(IS_USER_LOGIN_KEY, ((environment.production) ? window.btoa("user_successfully_login") : "1"));
	}

	isUserLogged() {
		return (sessionStorage.getItem(IS_USER_LOGIN_KEY)) ? true : false;
	}

	flushAllDateAfterLogOut() {
		this.loggedUserTempToken = "";
		this.flushAllSessionStorage();
		this.store.dispatch(new FlushTheReduxState());
	}

	goOnLoginScreen() {
		this.router.navigateByUrl(`/${UserManagementRoutes.LOGIN}`);
	}

	goOnHomeScreen() {
		this.router.navigateByUrl(UserManagementRoutes.LOGIN);
	}

	goOnDashBoard() {
		this.router.navigateByUrl(DashBoardRoute);
	}

	isBeforeLoginRoute = () => {
		return BEFORE_LOGIN_ROUTE_PATH_LIST.includes(window.location.pathname)
	}

	// Sorting Data on column
	sortData<T>(data: T[], sortParameters: Sort): T[] {
		const keyName: keyof T = sortParameters.active[0] as keyof T;
		if (typeof data[0][keyName] === 'string') {
			if (sortParameters.direction === 'asc') {
				return [...data].sort((a: T, b: T) => (a[keyName] as unknown as string).localeCompare(b[keyName] as unknown as string));
			} else if (sortParameters.direction === 'desc') {
				return [...data].sort((a: T, b: T) => (b[keyName] as unknown as string).localeCompare(a[keyName] as unknown as string));
			} else {
				return data;
			}
		} else if (typeof data[0][keyName] === 'number') {
			if (sortParameters.direction === 'asc') {
				return [...data].sort((a: T, b: T) => (a[keyName] as unknown as number) >= ((b[keyName]) as unknown as number) ? 1 : -1);
			} else if (sortParameters.direction === 'desc') {
				return [...data].sort((a: T, b: T) => (a[keyName] as unknown as number) >= ((b[keyName]) as unknown as number) ? -1 : 1);
			} else {
				return data;
			}
		} else {
			return data;
		}
	}

	setCurrentRoleInState(p_sCurrRole: { [key: string]: any }) {
		this.store.dispatch(new SetCurrentRole({ currentRole: p_sCurrRole }));
		this.setUserRoleInSession(p_sCurrRole);
	}

	setSelectedUserInState(p_sCurrRole: { [key: string]: any }) {
		this.store.dispatch(new SetCurrentRoleUser({ selectedRoleUser: p_sCurrRole }));
	}

	private setUserRoleInSession(p_sCurrRole: { [key: string]: any }) {
		sessionStorage.setItem(LOGGED_USER_ROLE, ((environment.production) ? window.btoa(JSON.stringify(p_sCurrRole)) : JSON.stringify(p_sCurrRole)));
	}

	getUserRoleFromSession() {
		let currRole = sessionStorage.getItem(LOGGED_USER_ROLE);
		if (currRole) {
			currRole = (environment.production) ? window.atob(JSON.stringify(currRole)) : currRole;
			return JSON.parse(currRole);
		}
		return {};
	}

	setMenuCodeInSession(p_sMenuCode: string) {
		if (p_sMenuCode) {
			sessionStorage.setItem(SELECTD_MENU_CODE, ((environment.production) ? window.btoa(p_sMenuCode) : p_sMenuCode));
		} else {
			sessionStorage.removeItem(SELECTD_MENU_CODE);
		}
	}

	getMenuCodeInSession() {
		const menuCode = sessionStorage.getItem(SELECTD_MENU_CODE) || "";
		if (menuCode && environment.production) {
			return window.atob(menuCode)
		}
		return menuCode;
	}

	setMenuIdInSession(p_sMenuId: string) {
		if (p_sMenuId) {
			sessionStorage.setItem(SELECTD_MENU_ID, ((environment.production) ? window.btoa(p_sMenuId) : p_sMenuId));
		} else {
			sessionStorage.removeItem(SELECTD_MENU_ID);
		}
	}

	getMenuIdInSession() {
		const menuId = sessionStorage.getItem(SELECTD_MENU_ID) || "";
		if (menuId && environment.production) {
			return window.atob(menuId);
		}
		return menuId
	}

	getFunctionalRights(p_sFunctionalRightsList: Array<{ [key: string]: any }>) {
		return new Observable((observer) => {
			if (p_sFunctionalRightsList) {
				const menuCode = this.getMenuCodeInSession();
				this.store.select(getLoginData).subscribe((p_oLoginData) => {
					const _userRolesList: Array<{ [key: string]: any }> = _.get(p_oLoginData, "roles", []);

					this.store.select(getCurrentRoleData).subscribe((p_sCurrRole) => {
						const currRoleID: string = _.get(p_sCurrRole, "id", "");

						const currentRoleObj = _.find(_userRolesList, function (item) {
							return item.roleId === currRoleID
						})

						const currentMenuRights = _.find(((currentRoleObj && currentRoleObj.menuRights) || []), function (item) {
							return item.menuCode === menuCode
						});

						p_sFunctionalRightsList.forEach((el) => {
							const currentSelectedRights = _.find(((currentMenuRights && currentMenuRights.selectedRights) || []), function (item) {
								return item.rightCode === el.rightsName
							});
							if (!_.isEmpty(currentSelectedRights)) {
								el["rightsFlag"] = 1;
							}
						})
						observer.next(p_sFunctionalRightsList);
					});
				});
			}
		});
	}


	transformData(inputData: any, keyMapping: any): any {
		const outputData: any = {};

		Object.keys(keyMapping).forEach(outputKey => {
			const inputKey = keyMapping[outputKey];
			if (inputData[inputKey]) {
				outputData[outputKey] = { [`${outputKey}Id`]: inputData[inputKey] };
			}
		});

		return outputData;
	}
	// Function to clean spaces in object properties
	cleanSpacesInObject(input: any): any {
		const cleanedObject: any = {};
		for (const key in input) {
			if (input.hasOwnProperty(key)) {
				cleanedObject[key] = typeof input[key] === 'string' ? input[key].trim().replace(/\s+/g, ' ') : input[key];
			}
		}
		return cleanedObject;
	}


	noWhitespaceValidator(control: any) {
		const isWhitespace = (control.value || '').trim().length === 0;
		const isValid = !isWhitespace;
		return isValid ? null : { 'whitespace': true };
	}

	getSelectedRole(menuCode: string) {
		this.store.select(getLoginData).subscribe((p_oLoginData) => {
			this.userRolesList = _.get(p_oLoginData, "roles", []);
			if (this.userRolesList.length) {
				// this.userRolesList.forEach((el) => {
				// 	if (el) {
				// 		this.rolesDDList.push({ id: el.roleId, name: el.roleName })
				// 	}
				// });
				this.store.select(getCurrentRoleData).subscribe((p_sCurrRole) => {
					if (!_.isEmpty(p_sCurrRole)) {
						const currRoleID = _.get(p_sCurrRole, "id", "");
						var filter_role = this.userRolesList.filter(x => x.roleId == currRoleID);
						this.selectedRights = filter_role[0].menuRights;
						this.getSelectedRight(menuCode)
					}
				})
			}
		});
	}

	// Function to filter selectedRights based on menuCode
	filterRightsByMenuCode(menuCode: string): any[] {
		return this.selectedRights.filter((right: any) => right.menuCode === menuCode);
	}

	getSelectedRight(menuCode: string) {
		const filteredRights = this.filterRightsByMenuCode(menuCode);
		const selectedMenuRight: any = filteredRights[0].selectedRights
		this.isView = selectedMenuRight.some((right: any) => right.rightCode === "RIGHT_CODE_VIEW");
		this.isDelete = selectedMenuRight.some((right: any) => right.rightCode === "RIGHT_CODE_DELETE");
		this.isEdit = selectedMenuRight.some((right: any) => right.rightCode === "RIGHT_CODE_EDIT");
		this.isCreate = selectedMenuRight.some((right: any) => right.rightCode === "RIGHT_CODE_CREATE");


	}

	noDoubleZerosAtStartValidator(): ValidatorFn {
		const pattern = /^(?!00)/;
		return (control: AbstractControl): { [key: string]: any } | null => {
			const value = control.value;
			if (!pattern.test(value)) {
				return { 'noDoubleZerosAtStart': true };
			}
			return null;
		};
	}

    noTripleZerosAtStartValidator(): ValidatorFn {
      const pattern = /^(?!000)/;
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (!pattern.test(value)) {
          return { 'noTripleZerosAtStart': true };
        }
        return null;
      };
    }
	convertArrToString = (p_aList: Array<{ [key: string]: any }>, p_sBindID: string) => {
		if (p_aList && p_aList.length) {
		  let allIDsList = _.map(p_aList, p_sBindID);
		  if (allIDsList && allIDsList.length) { return _.toString(allIDsList); }
		}
		return "";
	  }
	  setSelectedData = (p_sType: string, p_aSelectedArr: Array<{ [key: string]: any }>, p_oItem: any, p_sBindID: string) => {
		switch (p_sType) {
		  case MUTLTI_SELECT_DD_ACTION.SINGLE_ITEM_SELECT:
			p_aSelectedArr.push(p_oItem)
			break;
		  case MUTLTI_SELECT_DD_ACTION.SINGLE_ITEM_DESLECT:
			p_aSelectedArr = p_aSelectedArr.filter((el) => {
			  return el[p_sBindID] !== p_oItem[p_sBindID]
			})
			break;
		  case MUTLTI_SELECT_DD_ACTION.SELECT_ALL_ITEM:
			p_aSelectedArr = _.clone(p_oItem);
			break;
		  case MUTLTI_SELECT_DD_ACTION.DESELECT_ALL_ITEM:
			p_aSelectedArr = [];
			break;
		  default:
			break;
		}
		return p_aSelectedArr;
	  }
	  
	generatePDF(elementId: string, fileName: string) {
		const element: HTMLElement | null = document.getElementById(elementId);
		if (!element) {
			console.error("Element not found");
			return;
		}

		html2canvas(element).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jspdf.jsPDF();
			const imgWidth = 210;
			const imgHeight = canvas.height * imgWidth / canvas.width;
			pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
			pdf.save(fileName + '.pdf');
		});
	}


}
