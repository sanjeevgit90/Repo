import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { MUTLTI_SELECT_DD_ACTION, placehoder } from '../../constants/constant';
import { ActionConstant } from '../../constants/messagesConstant';
import { ChildParentService } from '../../services/childParent.service';
@Component({
  selector: 'app-todo-table-multiple-dd',
  templateUrl: './todo-table-multiple-dd.component.html',
  styleUrls: ['./todo-table-multiple-dd.component.css']
})
export class TodoTableMultipleDDComponent implements OnInit {
  @Input() parentFormGroup: FormGroup;
  @Input() compData: { [key: string]: any } = {};
  @Input() inputId: string = "";
  @Output() addedData: EventEmitter<{ [key: string]: any }> = new EventEmitter();
  //----------internal-----------
  childFormGroup: FormGroup;
  placeholderValue: string = placehoder.pleaseEnter;
  @Input() todoList: Array<{ [key: string]: any }> = [];
  todoListTableColumns: Array<{ [key: string]: any }> = [];
  isEditMode: boolean = false;
  rowEditIndex = -1;
  dataKeyList: Array<string> = [];
  rowActionList: Array<string> = [ActionConstant.DELETE_ACTION];
  childParentServiceSubscription: Subscription

  @Output() callback = new EventEmitter<any>();

  constructor(private childParentService: ChildParentService) { }

  ngOnInit(): void {
    this.initializeFormControls();
    //-------------------------------------
    this.compData.todoList.forEach((element: any) => {
      const { dropdownSwitchKey, dropdownData } = element;
      if (dropdownSwitchKey && (!_.isEmpty(dropdownSwitchKey))) {
        const { idKey, nameKey } = dropdownSwitchKey;
        const cloneData = _.cloneDeep(dropdownData);
        element.dropdownData = cloneData.map(function (row: any) {
          return { [idKey || element.dropdownIdKey]: row[element.dropdownIdKey], [nameKey || element.dropdownNameKey]: row[element.dropdownNameKey] }
        });
        idKey && (element.dropdownIdKey = idKey);
        nameKey && (element.dropdownNameKey = nameKey);
      }
    });
    //-------------------------------------
    this.todoListTableColumns = _.map(this.compData.todoList, (el: { [key: string]: any }) => {
      return el.tableList
    })
    //-------------------------------------
    this.dataKeyList = _.map(this.compData.todoList, "dataKey");

    if (this.todoList.length) {
      this.todoList.forEach((el, index) => {
        el["rowIndex"] = index;
      })
      this.prepareData();
    }
    //-------------------------------------
    this.childParentServiceSubscription = this.childParentService.onParentReset.subscribe(() => {
      this.todoList = [];
      this.reset();
      // this.childParentServiceSubscription.unsubscribe();
    });
    this.childParentServiceSubscription = this.childParentService.onAddFG.subscribe((res) => {
      if (res && res.length) {
        res.forEach((el: string) => {
          this.updateDynamicValidators(el, false);
        })
      }
    });
    this.childParentServiceSubscription = this.childParentService.onRemoveFG.subscribe((res) => {
      if (res && res.length) {
        res.forEach((el: string) => {
          this.updateDynamicValidators(el, true);
        })
      }
    });
  }
  ngOnDestroy() {
    this.childParentServiceSubscription.unsubscribe();
  }

  initializeFormControls() {
    if (this.compData.todoList && this.compData.todoList.length) {
      const obj: { [key: string]: any } = {};
      this.compData.todoList.forEach((element: { [key: string]: any }) => {
        obj[element.dataKey] = new FormControl('', [Validators.required]);
      });
      this.childFormGroup = new FormGroup(obj);
    }
  }
  updateDynamicValidators(p_sID: string, p_bIsClear: boolean) {
    const fbControl = this.childFormGroup.get(p_sID);
    if (fbControl) {
      if (p_bIsClear) {
        fbControl?.clearValidators();
      } else {
        fbControl?.setValidators([Validators.required]);
      }
      fbControl?.updateValueAndValidity();
    }
  }
  tableActionBtnHandler = (p_oObj: { [key: string]: any }, p_sType: string) => {
    const { rowIndex } = p_oObj;
    switch (p_sType) {
      case ActionConstant.DELETE_ACTION:
        this.todoList = this.todoList.filter(((el) => {
          return (el.rowIndex !== rowIndex);
        }))
        this.reset();
        this.prepareData();
        break;
      case ActionConstant.EDIT_ACTION:
        if (this.compData.todoList && this.compData.todoList.length) {
          const newObj: { [key: string]: any } = {};
          this.compData.todoList.forEach((element: { [key: string]: any }) => {
            if (element.type === "dropdown") {
              newObj[element.dataKey] = p_oObj[`${element.dataKey}`];
            } else {
              newObj[element.dataKey] = p_oObj[element.dataKey];
            }
          });
          this.childFormGroup.setValue(newObj);
          this.isEditMode = true;
          this.rowEditIndex = rowIndex;
        }
        break;
      default:
        break;
    }
  }
  processDropDownValue = () => {
    const formValues = _.cloneDeep(this.childFormGroup.value);
    Object.keys(formValues).forEach((keyName: string) => {
      const currentTodo = _.find(this.compData.todoList, function (item) { return item.dataKey === keyName });
      if (!_.isEmpty(currentTodo)) {
        const objType = _.get(currentTodo, "type", "");
        if (objType === "dropdown") {
          const dropdownIdKey = _.get(currentTodo, "dropdownIdKey", "");
          const dropdownNameKey = _.get(currentTodo, "dropdownNameKey", "");
          const currentDD = _.find(currentTodo.dropdownData, function (item) { return item[dropdownIdKey] === formValues[keyName] });
          const dropDownItemName = _.get(currentTodo.tableList, "dataKey", "");
          if (!_.isEmpty(currentDD)) {
            formValues[dropDownItemName] = _.get(currentDD, dropdownNameKey, "");
          }
        }
        else if (objType === "multidropdown") {
          const dropdownNameKey = _.get(currentTodo, "dropdownNameKey", "");
          const dataKey = _.get(currentTodo, "dataKey", "");
          let allNamesList = _.map(formValues[dataKey], dropdownNameKey);
          if (allNamesList && allNamesList.length) {
            const dropDownItemName = _.get(currentTodo.tableList, "dataKey", "");
            formValues[dropDownItemName] = _.toString(allNamesList)
          }
        }
      }
    });
    return formValues;
  }
  onAddUpdateClick = () => {
    if (this.childFormGroup.status == 'INVALID') {
      this.childFormGroup.markAllAsTouched();
      return
    }

    const finalData = this.processDropDownValue();
    if (this.isEditMode) {
      const cloneList = _.cloneDeep(this.todoList);
      const obj = this.todoList[this.rowEditIndex];
      cloneList[this.rowEditIndex] = { ...obj, ...finalData };
      this.todoList = _.cloneDeep(cloneList);
    } else {
      finalData["rowIndex"] = this.todoList.length;
      this.todoList = [...this.todoList, ...[finalData]];
    }
    this.reset();
    this.prepareData();
  }
  onEditCancelClick = () => {
    this.reset();
  }
  reset = () => {
    this.rowEditIndex = -1;
    this.isEditMode = false;
    this.childFormGroup.reset();
  }
  prepareData = () => {
    const actualList = this.todoList.map((el: { [key: string]: any }) => _.pick(el, this.dataKeyList));
    this.addedData.emit(actualList);
    this.parentFormGroup.controls[this.inputId].setValue(actualList);
  }
  onTableAction = (p_oData: { [key: string]: any }) => {
    this.tableActionBtnHandler(p_oData.row, p_oData.action);
  }
  onSelectionChange(event: any, dataKey: string, p_oCurrentItem: { [key: string]: any }) {
    const selectedId = event.target.value;
    const { resetNextDDIDList } = p_oCurrentItem;
    if (resetNextDDIDList && resetNextDDIDList.length) {
      resetNextDDIDList.forEach((el: string) => {
        this.childFormGroup.controls[el] && this.childFormGroup.controls[el].setValue([]);
      });
    }
    if (selectedId) {
      this.callback.emit({ selectedId, dataKey });
    }
  }
  onMultiDropDownChange = (event: any, p_oCurrentItem: { [key: string]: any }) => {
    const { dataKey, dropdownIdKey, resetNextDDIDList } = p_oCurrentItem || {};
    if (resetNextDDIDList && resetNextDDIDList.length) {
      resetNextDDIDList.forEach((el: string) => {
        this.childFormGroup.controls[el] && this.childFormGroup.controls[el].setValue([]);
      });
    }
    const { type, item } = event || {};
    let allIDsList: Array<String> = [];
    switch (type) {
      case MUTLTI_SELECT_DD_ACTION.SELECT_ALL_ITEM:
        allIDsList = _.map(item, dropdownIdKey);
        break;
      case MUTLTI_SELECT_DD_ACTION.DESELECT_ALL_ITEM:
        allIDsList = [];
        break;
      default:
        allIDsList = _.map(this.childFormGroup.get(dataKey)!.value, dropdownIdKey);
        break;
    }
    const selectedId = allIDsList.length ? _.toString(allIDsList) : "";
    this.callback.emit({ selectedId, dataKey });
  }

}