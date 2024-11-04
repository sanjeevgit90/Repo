import { Action } from "../actions";
import { SET_ALL_ROLES, SET_CURRENT_ROLE, SET_CURRENT_ROLE_USER, SET_DISTRICTS, SET_FY_LIST } from "../actions/common-action";


export interface CommonReducerState {
    roles: [],
    currentRole: { [key: string]: any },
    selectedRoleUser: Array<{ [key: string]: any }>,
    districts: Array<{ [key: string]: any }>,
    fyList: Array<{ [key: string]: any }>
}

const initialState: CommonReducerState = {
    roles: [],
    currentRole: {},
    selectedRoleUser: [],
    districts: [],
    fyList: []
}

export function CommonReducer(state = initialState, action: Action): CommonReducerState {
    switch (action.type) {
        case SET_ALL_ROLES: {
            const { roles } = action.payload;
            return { ...state, roles }
        }
        case SET_CURRENT_ROLE: {
            const { currentRole } = action.payload;
            return { ...state, currentRole }
        }
        case SET_DISTRICTS: {
            const { districts } = action.payload;
            return { ...state, districts }
        }
        case SET_FY_LIST: {
            const { fyList } = action.payload;
            return { ...state, fyList }
        }
        case SET_CURRENT_ROLE_USER: {
            const { selectedRoleUser } = action.payload;
            return { ...state, selectedRoleUser }
        }
        default: {
            return state;
        }
    }
}
//selectors
export const getCommonRoles = (state: CommonReducerState) => state.roles;
export const getCurrentRole = (state: CommonReducerState) => state.currentRole;
export const getDistricts = (state: CommonReducerState) => state.districts;
export const getAllFYList = (state: CommonReducerState) => state.fyList;
export const getAllSelectedUserRole = (state: CommonReducerState) => state.selectedRoleUser;
