
export const DashBoardRoute = "dashboard";

export const UserManagementRoutes = {
    LOGIN: '',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
    DESIGNATION: 'designation-master',
    ADD_DESIGNATION: 'add-designation',
    LIST_DESIGNATION: 'list-designation',
    ADD_EDIT_OFFICE:'add-edit-office',
    VIEW_OFFICE:'view-office',
    LIST_OFFICE:'list-office',
    LIST_DEPUTATION_ROLE:'list-deputationlevel-role',
    ADD_EDIT_DEPUTATION_ROLE:'add-edit-deputationlevel-role',
    LIST_OFFICETYPE_MASTER:'list-level-office-type',
    ADD_EDIT_OFFICETYPE_MASTER:'add-edit-officetype-master',
    LIST_USER: 'list-user',
    ADD_EDIT_USER: 'add-edit-user',
    ADD_EDIT_USER3: 'add-edit-user-v3',
    VIEW_USER: 'view-user',
    CHANGE_PASSWORD: 'change-password',
    LIST_LANGUAGE :'list-language',
    ADD_EDIT_LANGUAGE:'add-edit-language',
    //new components--
    MENU_ADD_EDIT:'menu-add-edit',
    MENU_LIST:'menu-list',
    ADD_ROLE_MENU:'add-role-menu',
    LIST_ROLE_MENU:'list-role-menu'
}

export const RoleManagementRoutes = {
    ADDED_ROLES_LIST: "added-role-list",
    ADD_ROLES: "add-roles"
}

export const DashboardRoutes = {
    DASHBOARD: 'dashboard',
    FARMER_DASHBOARD:'farmer-dashboard',
}

export const SharedRoute = {
    PAGE_NOT_FOUND:'page-not-found',
}
export const BEFORE_LOGIN_ROUTE_PATH_LIST = ['/', UserManagementRoutes.LOGIN, SharedRoute.PAGE_NOT_FOUND]