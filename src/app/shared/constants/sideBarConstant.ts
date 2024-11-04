import { DashBoardRoute, RoleManagementRoutes, UserManagementRoutes } from "./routePathConstants"

export const DASHBOARD_MENU = {
    menuID: "0",
    menuCode: "DASABOARD",
    menuNameHindi: "डैशबोर्ड",
    menuNameEnglish: "Dashboard",
    route: `/${DashBoardRoute}`,
    icon: "bx bx-grid-alt"
}


export const LOGOUT_MENU = {
    menuID: "9999",
    menuCode: "LOGOUT",
    menuNameHindi: "लॉग आउट",
    menuNameEnglish: "Logout",
    route: `/${UserManagementRoutes.LOGIN}`,
    icon: "bx bxs-log-out-circle"
}

export const CHANGEPASSWORD_MENU = {
    menuID: "9999",
    menuCode: "CHANGEPASSWORD",
    menuNameHindi: "पासवर्ड बदलें",
    menuNameEnglish: "Change Password",
    route: `/${UserManagementRoutes.CHANGE_PASSWORD}`,
    icon: "bx bxs-log-out-circle"
}

export const MAIN_MENU_ICON: { [key: string]: any } = {
    USER_MANAGEMENT: "bx bxs-user-detail",
    MASTER_MANAGEMENT: "bx bxs-cube-alt",
    SCHEME_MANAGEMENT: "bx bxs-dashboard",
    CONTENT_MANAGEMENT_SYSTEM: "bx bxs-color",
    COMPLAINT_MONITORING_SYSTEM: "bx bxs-message-dots",
    LGD_MANAGEMENT:"bx bxs-objects-horizontal-center",
    FARMER_MANAGEMENT: "bx bxs-user-rectangle",
    INVENTORY_MANAGEMENT:"bx bx-hive",
    REGISTRATION_MANAGEMENT:"bx bx-hive",
    DBT_MANAGEMENT: "bx bxs-user-rectangle",
    ONLINE_BOOKING: "bx bxs-color"
    // please add as per menuCode
}
