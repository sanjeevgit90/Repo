export const USER_LOGIN_SUCCESS = "user login Success";
export const USER_LOGIN_FAILED = "user login failed";

export class UserLoginSuccessAction {
    readonly type = USER_LOGIN_SUCCESS;
    constructor(public payload?: { loginData: {} }) {
    }
}