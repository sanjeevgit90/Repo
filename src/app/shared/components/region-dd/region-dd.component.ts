import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { RootReducerState, getDistrictsData } from 'src/app/store/reducers';
import { MUTLTI_SELECT_DD_ACTION, REGION_COMP_DD_BIND_ID, REGION_COMP_DD_INPUT_ID } from '../../constants/constant';
import { CommonService } from '../../services/common.service';
import { GenericApiService } from '../../services/generic-api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-region-dd',
  templateUrl: './region-dd.component.html',
  styleUrls: ['./region-dd.component.css']
})
export class RegionDdComponent implements OnInit {

  static readonly EDIT_MODE = "edit";

  @Input() formGroup: FormGroup;
  @Input() isEditMode: string;
  @Input() isTehsilReq: boolean = true;

  districtList: Array<{ [key: string]: any }> = [];
  tehsilList: Array<{ [key: string]: any }> = [];
  blockList: Array<{ [key: string]: any }> = [];
  villageList: Array<{ [key: string]: any }> = [];

  private selectedDistricts: Array<{ [key: string]: any }> = [];
  private selectedTehsils: Array<{ [key: string]: any }> = [];
  private selectedBlocks: Array<{ [key: string]: any }> = [];
  private selectedVillages: Array<{ [key: string]: any }> = [];

  DISTRICT_INP_ID: string = REGION_COMP_DD_INPUT_ID.DISTRICT_INP_ID;
  TEHSIL_INP_ID: string = REGION_COMP_DD_INPUT_ID.TEHSIL_INP_ID;
  BLOCK_INP_ID: string = REGION_COMP_DD_INPUT_ID.BLOCK_INP_ID;
  VILLAGE_INP_ID: string = REGION_COMP_DD_INPUT_ID.VILLAGE_INP_ID;

  DISTRICT_BIND_ID: string = REGION_COMP_DD_BIND_ID.DISTRICT_BIND_ID;
  TEHSIL_BIND_ID: string = REGION_COMP_DD_BIND_ID.TEHSIL_BIND_ID;
  BLOCK_BIND_ID: string = REGION_COMP_DD_BIND_ID.BLOCK_BIND_ID;
  VILLAGE_BIND_ID: string = REGION_COMP_DD_BIND_ID.VILLAGE_BIND_ID;

  private subscr: Subscription;

  @Input() isDisabled: boolean = false;

  constructor(private store: Store<RootReducerState>, private commonService: CommonService, private genericApiService: GenericApiService) { }

  ngOnInit(): void {
    if (this.isEditMode === RegionDdComponent.EDIT_MODE) {
      this.prcoessEditMode();
    } else {
      this.getAllDistrictList();
    }
  }
  convertArrToString = (p_aList: Array<{ [key: string]: any }>, p_sBindID: string) => {
    if (p_aList && p_aList.length) {
      let allIDsList = _.map(p_aList, p_sBindID);
      if (allIDsList && allIDsList.length) { return _.toString(allIDsList); }
    }
    return "";
  }
  onDropDownChange = (p_oData: { [key: string]: any }) => {
    const { type, inputId, item, bindID, bindName } = p_oData;
    this.resetNextOne(inputId);
    switch (inputId) {
      case REGION_COMP_DD_INPUT_ID.DISTRICT_INP_ID:
        {
          this.selectedDistricts = this.setSelectedData(type, _.cloneDeep(this.selectedDistricts), item, bindID);
          const districtIDsStr = this.convertArrToString(this.selectedDistricts, bindID);
          if (districtIDsStr) {
            if (this.isTehsilReq) {
           
            } else {
            }
          }
          break;
        }
      case REGION_COMP_DD_INPUT_ID.TEHSIL_INP_ID:
        {
          this.selectedTehsils = this.setSelectedData(type, _.cloneDeep(this.selectedTehsils), item, bindID);
          const tehsilsIDsStr = this.convertArrToString(this.selectedTehsils, bindID);
          if (tehsilsIDsStr) {
          }
          break;
        }
      case REGION_COMP_DD_INPUT_ID.BLOCK_INP_ID:
        {
          this.selectedBlocks = this.setSelectedData(type, _.cloneDeep(this.selectedBlocks), item, bindID);
          const blockIDsStr = this.convertArrToString(this.selectedBlocks, bindID);
          if (blockIDsStr) {
          }
          break;
        }
      case REGION_COMP_DD_INPUT_ID.VILLAGE_INP_ID:
        {
          this.selectedVillages = this.setSelectedData(type, _.cloneDeep(this.selectedVillages), item, bindID);
          break;
        }
    }
  }

  setSelectedData = (p_sType: string, p_aSelectedArr: Array<{ [key: string]: any }>, p_oItem: any, p_sBindID: string) => {
    switch (p_sType) {
      case MUTLTI_SELECT_DD_ACTION.SINGLE_ITEM_SELECT:
        p_aSelectedArr.push(p_oItem)
        break;
      case MUTLTI_SELECT_DD_ACTION.SINGLE_ITEM_DESLECT:
        p_aSelectedArr = p_aSelectedArr.filter((el) => {
          return el[p_sBindID] !== p_oItem[p_sBindID]
        })
        break;
      case MUTLTI_SELECT_DD_ACTION.SELECT_ALL_ITEM:
        p_aSelectedArr = _.clone(p_oItem);
        break;
      case MUTLTI_SELECT_DD_ACTION.DESELECT_ALL_ITEM:
        p_aSelectedArr = [];
        break;
      default:
        break;
    }
    return p_aSelectedArr;
  }
  resetNextOne = (inputId: string) => {
    switch (inputId) {
      case REGION_COMP_DD_INPUT_ID.DISTRICT_INP_ID:
        {
          if (this.isTehsilReq) {
            this.tehsilList = [];
            this.selectedTehsils = [];
            this.formGroup.controls[REGION_COMP_DD_INPUT_ID.TEHSIL_INP_ID].setValue([]);
          }

          this.blockList = [];
          this.selectedBlocks = [];
          this.formGroup.controls[REGION_COMP_DD_INPUT_ID.BLOCK_INP_ID].setValue([]);

          this.villageList = [];
          this.selectedVillages = [];
          this.formGroup.controls[REGION_COMP_DD_INPUT_ID.VILLAGE_INP_ID].setValue([]);
          break;
        }
      case REGION_COMP_DD_INPUT_ID.TEHSIL_INP_ID:
        {

          // this.blockList = [];
          // this.selectedBlocks = [];
          // this.formGroup.controls[REGION_COMP_DD_INPUT_ID.BLOCK_INP_ID].setValue([]);

          // this.villageList = [];
          // this.selectedVillages = [];
          // this.formGroup.controls[REGION_COMP_DD_INPUT_ID.VILLAGE_INP_ID].setValue([]);

          break;
        }
      case REGION_COMP_DD_INPUT_ID.BLOCK_INP_ID:
        {

          this.villageList = [];
          this.selectedVillages = [];
          this.formGroup.controls[REGION_COMP_DD_INPUT_ID.VILLAGE_INP_ID].setValue([]);
          break;
        }
      case REGION_COMP_DD_INPUT_ID.VILLAGE_INP_ID:
        {

          break;
        }
    }
  }
  getAllDistrictList = () => {
    this.store.select(getDistrictsData).subscribe((data) => {
      if (data && data.length) {
        this.districtList = [...data];
      }
    })
  }
  prcoessEditMode = () => {
    this.subscr = this.formGroup.valueChanges.subscribe((val) => {
      if (this.isTehsilReq) {
        if (val[this.DISTRICT_INP_ID] && val[this.TEHSIL_INP_ID] && val[this.BLOCK_INP_ID] && val[this.VILLAGE_INP_ID].length) {
          this.subscr.unsubscribe();
          this.getAllDistrictList();
          this.setEditModeData(val, this.DISTRICT_BIND_ID, this.DISTRICT_INP_ID, this.TEHSIL_INP_ID);
          this.setEditModeData(val, this.TEHSIL_BIND_ID, this.TEHSIL_INP_ID, this.BLOCK_INP_ID);
          this.setEditModeData(val, this.BLOCK_BIND_ID, this.BLOCK_INP_ID, this.VILLAGE_INP_ID);
          this.setEditModeData(val, this.VILLAGE_BIND_ID, this.VILLAGE_INP_ID, this.VILLAGE_INP_ID);
        }
      } else {
        if (val[this.DISTRICT_INP_ID] && val[this.BLOCK_INP_ID] && val[this.VILLAGE_INP_ID].length) {
          this.subscr.unsubscribe();
          this.getAllDistrictList();
          this.setEditModeData(val, this.DISTRICT_BIND_ID, this.DISTRICT_INP_ID, this.BLOCK_INP_ID);
          this.setEditModeData(val, this.BLOCK_BIND_ID, this.BLOCK_INP_ID, this.VILLAGE_INP_ID);
          this.setEditModeData(val, this.VILLAGE_BIND_ID, this.VILLAGE_INP_ID, this.VILLAGE_INP_ID);
        }
      }
    })
  }
  setEditModeData = (p_aFormVal: any, p_sFromBindID: string, p_sFromInpID: string, p_sToInpID: string) => {
    const obj = {
      bindID: p_sFromBindID,
      inputId: p_sFromInpID,
      item: p_aFormVal[p_sFromInpID],
      type: MUTLTI_SELECT_DD_ACTION.SELECT_ALL_ITEM
    }
    this.onDropDownChange(obj);
    this.formGroup.controls[p_sToInpID].setValue(p_aFormVal[p_sToInpID]);
  }
  ngOnDestroy() {
    this.subscr && this.subscr.unsubscribe();
  }
}
