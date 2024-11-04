import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromLogin from "./login-reducer";
import * as fromCommon from "./common-reducer";

export interface RootReducerState {
    login: fromLogin.LoginReducerState
    common: fromCommon.CommonReducerState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    login: fromLogin.LoginReducer,
    common: fromCommon.CommonReducer,
}

export const getLoginState = (state: RootReducerState) => state.login;
export const getCommonState = (state: RootReducerState) => state.common;

export const getLoginData = createSelector(getLoginState, fromLogin.getLoginData);
export const getCommonRolesData = createSelector(getCommonState, fromCommon.getCommonRoles);
export const getCurrentRoleData = createSelector(getCommonState, fromCommon.getCurrentRole);
export const getDistrictsData = createSelector(getCommonState, fromCommon.getDistricts);
export const getFYListData = createSelector(getCommonState, fromCommon.getAllFYList);
export const getAllSelectedUserRoleData = createSelector(getCommonState, fromCommon.getAllSelectedUserRole);
