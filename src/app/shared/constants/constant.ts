import { environment } from "src/environments/environment"

export const placehoder = {
    pleaseEnter: "Please enter",
    pleaseSelect: "Please select"
}

export const commonMessage = {
    resetForm: "Are you sure you want to reset this form?",
    deleteMessage: "Are you sure you want to delete",
    snackBarDuration: 5000,
    mobileNumber: "Please enter 10 digit mobile number only",
    activateDeactivateHeading: "Activate / Deactivate",
    email: "Please enter valid Email id",
    submit:"Are you sure you want to submit?",
    ifsc:"Invalid IFSC code",
    otpMessage: "Otp send successfully",
    LGDcode: "Miniumum 3 length is required",
    VillageLGDCode : "Miniumum 6 length is required"
}

export const dropdownSettingsConfig = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
}

export function getDropdownSettingsConf(dynamicIdField: string = "", dynamicTextField: string = "") {
    return {
        singleSelection: false,
        idField: dynamicIdField || 'id',
        textField: dynamicTextField || 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
    };
}

export const dateFormate = {
    ddMMyyyy: 'dd-MM-yyyy'
}

export const IS_USER_LOGIN_KEY = (environment.production) ? window.btoa("is#user#login") : "is#user#login";
export const TEMP_USER_TOKEN_KEY = (environment.production) ? window.btoa("logged*user*temp*token") : "logged*user*temp*token";
export const LOGGED_USER_ROLE = (environment.production) ? window.btoa("logged*user*role") : "logged*user*role";
export const SELECTD_MENU_CODE = (environment.production) ? window.btoa("selected*menu*code") : "selected*menu*code";
export const SELECTD_MENU_ID = (environment.production) ? window.btoa("selected*menu*id") : "selected*menu*id";
export const TOKEN_MISSING = "token missing";
export const HINDI_LANG = "hi";
export const ENG_LANG = "en";
export const DEFAULT_LANG = HINDI_LANG;

export const LGD_CONSTANT = {
    STATE: "STATE",
    DISTRICT: "DISTRICT",
    TEHSIL: "TEHSIL",
    BLOCK: "BLOCK",
    VILLAGE: "VILLAGE"
}
export const FUNCTIONAL_RIGHTS = {
    CREATE: "RIGHT_CODE_CREATE",
    VIEW: "RIGHT_CODE_VIEW",
    EDIT: "RIGHT_CODE_EDIT",
    DELETE: "RIGHT_CODE_DELETE"
}

export const ACTION_BUTTON_NAME = {
    CREATE: "GLOBAL_CREATE",
    VIEW: "GLOBAL_VIEW",
    UPDATE: "GLOBAL_UPDATE",
    DELETE: "GLOBAL_DELETE",
    BACK: "GLOBAL_BACK",
    RESET: "GLOBAL_RESET",
    SAVEPROCEED: "GLOBAL_SAVEPROCEED",
    GENERATEOTP: "GLOBAL_GENERATE_OTP",
    SUBMIT: "GLOBAL_SUBMIT",
    DISCARD: "GLOBAL_DISCARD",
    PROCEED: "GLOBAL_PROCEED",
    VIEW_LAST_SANTIONED_AMOUNT: "VIEW_LAST_SANTIONED_AMOUNT",
    ADD_MORE: "GLOBAL_ADD_MORE",
    SEARCH: "GLOBAL_SEARCH",
    SAVE_AS_DRAFT: "GLOBAL_SAVE_AS_DRAFT",
    UPDATE_AS_DRAFT: "GLOBAL_UPDATE_AS_DRAFT",
    CHANGE_PASSWORD: "GLOBAL_CHANGE_PASSWORD",
    UPDATE_CONTINUE: "GLOBAL_UPDATE_CONTINUE",
    SAVE_CONTINUE: 'GLOBAL_SAVE_CONTINUE',
    APPROVE:"GLOBAL_APPROVE",
    REJECT:"GLOBAL_REJECT",
    VERIFY:"GLOBAL_VERIFY",
    AGREE: 'GLOBAL_AGREE',
    DECLINE: 'GLOBAL_DECLINE',
    FINAL_SUBMIT: "GLOBAL_FINAL_SUBMIT",
    PREVIEW: "GLOBAL_PREVIEW",
    SUBMIT_FOR_APPROVAL:"GLOBAL_SUBMIT_FOR_APPROVAL",
    SUBMIT_AND_GENERATE_STORE_RECEIPT:"GLOBAL_SUBMIT_AND_GENERATE_STORE_RECEIPT"
}

export const MUTLTI_SELECT_DD_ACTION = {
    SINGLE_ITEM_SELECT: "onItemSelect",
    SELECT_ALL_ITEM: "onSelectAll",
    SINGLE_ITEM_DESLECT: "onItemDeSelect",
    DESELECT_ALL_ITEM: "onItemDeSelectAll",
}

export const REGION_COMP_DD_INPUT_ID = {
    DISTRICT_INP_ID: "district",
    TEHSIL_INP_ID: "tehsil",
    BLOCK_INP_ID: "block",
    VILLAGE_INP_ID: "village"
}

export const REGION_COMP_DD_BIND_ID = {
    DISTRICT_BIND_ID: "districtId",
    TEHSIL_BIND_ID: "tehsilId",
    BLOCK_BIND_ID: "blockId",
    VILLAGE_BIND_ID: "villageId"
}



export const GLOBAL_COLUMN_NAMES = {
    SERIAL_NUMBER: "GLOBAL_SERIAL_NO",
    SR_NO: "GLOBAL_SR_NO",
}

export const loadedLangMenuCodeData: { [key: string]: any } = {};

export const ADD_EDIT_MODULE_NAV_ACTION = {
    CREATE_ACTION: "onCreateAction",
    UPDATE_ACTION: "onUpdateAction",
    RESET_ACTION: "onResetAction",
    BACK_ACTION: "onBackAction",
    SUBMIT_ACTION: "onSubmitAction",
    SAVE_AS_DRAFT_ACTION: "onSaveDraftAction",
    UPDATE_AS_DRAFT_ACTION: "onUpdateDraftAction",
    FINAL_SUBMIT_ACTION: "onFinalSubmitAction",
    APPROVE : 'APPROVE',
    REJECT : 'REJECT'
}

export const FILE_UPLOAD_ALLOWED_TYPES = {
    PDF: ".pdf",
    JPG_JPEG_PNG: ".jpg, .png, .jpeg",
    JPG_JPEG_PNG_PDF: ".jpg, .png, .jpeg, .pdf",
    VDO: ".mp4, .webm, .avi, .mkv, .wmv, .mov, .flv, 3gp, .mpeg, .ogv",
    EXCEL:".xlsx,.xls"
}
export const OTP_CONST = {
    TEMPLATE_ID: "LOGIN_OTP",
    NOTIFICATION_TYPE: ["EMAIL", "SMS"]
}

export const LANGUAGE_CODE_CONST = {
    GLOBAL: "GLOBAL",
}
export const API_SAVE_STATUS = {
    DELETE: 0,
    DRAFT: 1,
    SUBMIT: 2,
    PARTIAL_SUBMIT: 3
}

export const REORDER_CONSTANT = {
    FAQ: "FAQ",
    LEADER: "LEADER",
    CIRCULAR:"CIRCULAR",
    ANNOUNCEMENT:"ANNOUNCEMENT",
    ADVISORY:"ADVISORY",
    MULTIMEDIA:"MULTIMEDIA",
    WHATSNEW:"WHATSNEW",
    IMAGE:"IMAGE",
    VIDEO:"VIDEO",
    INTERNAL_CIRCULAR:"INTERNAL_CIRCULAR"

}

export const LEVEL_CONSTANT = {
    STATE: "STATE",
    CENTRAL: "CENTRAL",

}


export const SYMBOL = {
    RUPEE: "₹"
}

export const CONDITION_CONSTANT = {
    VIEW: "view",
    EDIT: "edit",
    VIEW_AND_WORKFLOW:'view_workflow'

}

export const SHOW_NAVIGATION_CONST = {
  CREATE: "create",
  SUBMIT: "submit",
  SchemeCumulativeSame: "schemeCumulativeSame",
  TICKET_SUBMIT:'ticket_submit',
  VIEW_AND_WORKFLOW:'view_workflow',
  SUBMIT_AND_GENERATE_RECEIPT:'submit_and_generate_receipt',
  VIEW_SANSTHA:'view_sanstha',
  APPROVE : 'approve',
  REJECT : 'reject'

}

export const UPLOAD_TYPE = {
    PRIVATE:'private'
}

export const OTP_Timer: number = 60;


export const RESTRICTIONS =[
    { "id": 0, "name": 0 },
    { "id": 1, "name": 1 },
    { "id": 2, "name": 2 },
    { "id": 3, "name": 3 },
    { "id": 4, "name": 4 },
    { "id": 5, "name": 5 }
  ]

export const OFFICE_TYPE_ID = {
    STATE: 1,
    REVENUE_DIVISION:2,
    FUNCTIONAL_DIVISION:3,
    DISTRICT: 4,
    UNIT: 5,
    TEHSIL: 6,
    BLOCK:7,
    CLUSTER:8,
    VILLAGE:9
}


export const USER_TYPES = {
    Scheme_Related_Users: 'Scheme Related Users',
    Help_Desk_Scheme_Related: 'Help Desk (Scheme Related)',
    Non_Scheme_Related_Users: 'Non Scheme Related Users',
    Help_Desk: 'Help Desk'
}

export const OFFICE_TYPE = {
    STATE: 'State',
    REVENUE_DIVISION: '',
    FUNCTIONAL_DIVISION:'',
    DISTRICT: '',
    UNIT: '',
    TEHSIL: 'Tehsil',
    BLOCK:'',
    CLUSTER:'',
    VILLAGE:''
}


export const GENDER = [
	{id: '1', name: 'Male', genderId: 'Male', genderName: 'Male'},
	{id: '2', name: 'Female', genderId: 'Female', genderName: 'Female'},
	{id: '3', name: 'Others', genderId: 'Others', genderName: 'Others'}
];





