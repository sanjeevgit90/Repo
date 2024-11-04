import { ADD_EDIT_MODULE_NAV_ACTION, API_SAVE_STATUS, SHOW_NAVIGATION_CONST } from './../../constants/constant';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ACTION_BUTTON_NAME } from '../../constants/constant';

@Component({
  selector: 'app-add-edit-module-navigation',
  templateUrl: './add-edit-module-navigation.component.html',
  styleUrls: ['./add-edit-module-navigation.component.css']
})
export class AddEditModuleNavigationComponent implements OnInit {
  actionButton = ACTION_BUTTON_NAME;
  navActions = ADD_EDIT_MODULE_NAV_ACTION;
  @Input() showUpdateBtn: boolean = false;
  @Input() showResetBtn: boolean = true;
  @Input() showUpdateAsDraftBtn:boolean = false;
  @Input() hideSaveAsDraft: boolean = true;
  @Input() navigationShowType: string = "create";
  @Output() onNavBtnClick: EventEmitter<{ [key: string]: any }> = new EventEmitter();
  API_SAVE_STATUS = API_SAVE_STATUS;
  showNavigationConst = SHOW_NAVIGATION_CONST;
  @Input() isBack: boolean = true;
  @Input() workflowOrder:number;
  @Input() bankStatus:number;
  @Input() systemStatus:number;
  @Input() isWorkFlowInitiated:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  onBtnClick = (p_sType: string) => {
    switch (p_sType) {
      case this.navActions.CREATE_ACTION:
        break;
      case this.navActions.UPDATE_ACTION:
        break;
      case this.navActions.RESET_ACTION:
        break;
      case this.navActions.BACK_ACTION:
        break;
      case this.navActions.SUBMIT_ACTION:
        break;
      case this.navActions.SAVE_AS_DRAFT_ACTION:
        break;
      case this.navActions.UPDATE_AS_DRAFT_ACTION:
        break;
      case this.navActions.APPROVE:
        break;
      case this.navActions.REJECT:
          break;  
      default:
        break;
    }
    this.onNavBtnClick.emit({ navType: p_sType });
  }
}
