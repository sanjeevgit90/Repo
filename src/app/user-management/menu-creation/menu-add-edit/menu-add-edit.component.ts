import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ACTION_BUTTON_NAME, placehoder } from 'src/app/shared/constants/constant';
import { CommonService } from 'src/app/shared/services/common.service';
// import { DESIGNATION_COLUMNS, DesignationColumnsType } from './designation-list.columns';
import { TableAction } from 'src/app/shared/components/table/table-column';
import { UsersManagementService } from '../../user-management.service';
import { Sort } from '@angular/material/sort';
import { ActionConstant, WANT_TO_DELETE } from 'src/app/shared/constants/messagesConstant';
import * as _ from 'lodash';
// import { Designations } from '../designation.model';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { ExcelExportService } from 'src/app/shared/services/excel-export.service';
import { PdfExportService } from 'src/app/shared/services/pdf-export.service';

declare var window: any;

@Component({
  selector: 'app-menu-add-edit',
  templateUrl: './menu-add-edit.component.html',
  styleUrls: ['./menu-add-edit.component.css']
})
export class MenuAddEditComponent implements OnInit {
  placeholderValue: any = placehoder.pleaseEnter;
  formGroup: FormGroup;
  
  menuTypeData: any = [
    {id:1, menuOption: 'Primary'},
    {id:2, menuOption :'Secondary'},
  ]
  menuOption: { id: string; name: string; }[];

  priMenuTypeData: any = [
    {id:1, priMenuOption: 'Dashboard'},
    {id:2, priMenuOption :'Enrollment'},
    {id:3, priMenuOption: 'DBT'},
    {id:4, priMenuOption :'Card Management'},
    {id:5, priMenuOption: 'Incident Management'},
    {id:6, priMenuOption :'User Management'},
    {id:6, priMenuOption :'Admin'}
  ]
  priMenuOption: { id: string; name: string; }[];

  // iconTypeData: any = [
  //   {id:1, iconOption: 'icon1'},
  //   {id:2, iconOption :'icon2'},
  // ]
  // iconOption: { id: string; name: string; }[];

  

  constructor(private commonService: CommonService,
    public route: ActivatedRoute,
    private usersManagementService: UsersManagementService,
    private excelExportService: ExcelExportService,
    private pdfExportService: PdfExportService,
    ) { }

  ngOnInit(): void {
  }

}




 
  
