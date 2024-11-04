export const SOMETHING_WENT_WRONG = "Something went wrong";
export const CommonMessages = {
    API_STATUS_SUCCESS: 'success'
}
export const SELECT_AT_LEAST_ONE_ROLE = "Please Select at least one role";
export const ROLE_ID_MISSING = "Role ID Missing!";
export const ID_MISSING = "ID Missing!";
export const WANT_TO_RESET = "Are you sure you want to reset?";
export const WANT_TO_REMOVE = "Are you sure you want to delete?";

export const WANT_TO_DELETE = "Are you sure you want to deactivate *?"
export const WANT_TO_ACTIVATE = "Are you sure you want to activate *?"
export const WANT_TO_DEACTIVATE = "Are you sure you want to deactivate *?"
export const STATUS_MISSING = "Status Missing!"
export const WANT_TO_LOCK = "Are you sure you want to lock *?"
export const WANT_TO_UNLOCK = "Are you sure you want to unlock *?"
export const ActionConstant = {
    DELETE_ACTION: "delete_action",
    EDIT_ACTION: "edit_action",
    VIEW_ACTION: "view_action",
    VIEW_TICKET_ACTION: "view_ticket_action",
    STATUS_TOGGLE_ACTION: "status_toggle_action",
    DEACTIVATE_ACTION: "deactivate_action",
    ACTIVATE_ACTION:"activate_action",
    REORDER_TOGGLE_ACTION:"reorder_action",
    DOWN:"DOWN",
    UP:"UP",
    LOCK_UNLOCK_ACTION: "lock_unlock_action",
    LOCK_ACTION: "lock_action",
    UNLOCK_ACTION:"lock_unlock_action",
    MANAGE_MATERIAL_ACTION:"manage_material_action",
    EDIT_DBT: "edit_dbt",

}

export const PaginationConstant = {
    PAGE_NUMBER: 0,
    PAGE_SIZE: 10,
    SORT_BY: "id",//createdAt
    SORT_DIR: "desc",
    SEARCH_STR:""
}

export const IconConstant = {
    DELETE_ICON: "delete",
    EDIT_ICON: "edit",
    VIEW_ICON: "remove_red_eye",
    ACTIVATE_ICON: "check_circle",
    DEACTIVATE_ICON: "block",
    DOWN_ICON: "arrow_downward",
    UP_ICON: "arrow_upward",
    LOCK_ICON: "lock",
    UNLOCK_ICON: "lock_open",
    MANAGE_MATERIAL_ICON:"list"
}

export const PageModeConstant = {
    EDIT_MODE: "edit",
    VIEW_MODE: "view",
}

export const PROJECT_BUDGET_ALLOCATION_MSG = {
    BUDGET_AMOUT_ZERO_VALIDATION: "Budget Amount should be greater than zero",
    ALL_PROJECTS_SUM_VALIDATION:"All Projects * sum should be less than equal to $",
    INCORRECT_PROJECT_DATA:"Incorrect data!"
}
