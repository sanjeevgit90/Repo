import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MUTLTI_SELECT_DD_ACTION, getDropdownSettingsConf } from './../../constants/constant';
import * as _ from 'lodash';
@Component({
  selector: 'app-multi-select-dd',
  templateUrl: './multi-select-dd.component.html',
  styleUrls: ['./multi-select-dd.component.css']
})
export class MultiSelectDdComponent implements OnInit {
  @Input() control = new FormControl();
  @Input() label: string = "";
  @Input() inputId: string = '';
  @Input() bindID = "";
  @Input() bindName = "";
  @Input() dropdownSettingsConf: { [key: string]: any } = {};
  @Input() ddList: Array<{ [key: string]: any }> = [];
  ddConfig: { [key: string]: any } = {};
  @Output() onDDChange: EventEmitter<{ [key: string]: any }> = new EventEmitter();
  @Input() isDropdownDisabled:boolean = false;
  @Input() isRequired:boolean = false;
  errorMessage: Record<string, string> = {
    required: 'The field is required',
  }

  constructor() { }

  ngOnInit(): void {
    this.ddConfig = (_.isEmpty(this.dropdownSettingsConf)) ? getDropdownSettingsConf(this.bindID, this.bindName) : this.dropdownSettingsConf
  }

  prepareData = () => {

  }
  onItemSelect(item: { [key: string]: any }) {
    this.onDDChange.emit({ item, type: MUTLTI_SELECT_DD_ACTION.SINGLE_ITEM_SELECT, inputId: this.inputId, bindID: this.bindID, bindName: this.bindName });
  }

  onSelectAll(items: []) {
    this.onDDChange.emit({ item: items, type: MUTLTI_SELECT_DD_ACTION.SELECT_ALL_ITEM, inputId: this.inputId, bindID: this.bindID, bindName: this.bindName });
  }

  onItemDeSelect(item: any) {
    this.onDDChange.emit({ item, type: MUTLTI_SELECT_DD_ACTION.SINGLE_ITEM_DESLECT, inputId: this.inputId, bindID: this.bindID, bindName: this.bindName });
  }

  onItemDeSelectAll(item: []) {
    this.onDDChange.emit({ item: [], type: MUTLTI_SELECT_DD_ACTION.DESELECT_ALL_ITEM, inputId: this.inputId, bindID: this.bindID, bindName: this.bindName });
  }

}
