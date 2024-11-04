import { Action } from "../actions"
import { USER_LOGIN_SUCCESS } from "../actions/login-action"

export interface LoginReducerState {
    loginData: {}
}

const initialState: LoginReducerState = {
    loginData:{},
}

export function LoginReducer(state = initialState, action: Action): LoginReducerState {
    switch (action.type) {
        case USER_LOGIN_SUCCESS: {
            const { loginData } = action.payload;
            return { ...state, loginData }
        }
        default: {
            return state;
        }
    }
}
//selectors
export const getLoginData  = (state:LoginReducerState)=> state.loginData;