import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ACTION_BUTTON_NAME, placehoder } from 'src/app/shared/constants/constant';
import { CommonService } from 'src/app/shared/services/common.service';
import { DESIGNATION_COLUMNS, DesignationColumnsType } from './designation-list.columns';
import { TableAction } from 'src/app/shared/components/table/table-column';
import { UsersManagementService } from '../../user-management.service';
import { Sort } from '@angular/material/sort';
import { ActionConstant, WANT_TO_DELETE } from 'src/app/shared/constants/messagesConstant';
import * as _ from 'lodash';
import { Designations } from '../designation.model';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { ExcelExportService } from 'src/app/shared/services/excel-export.service';
import { PdfExportService } from 'src/app/shared/services/pdf-export.service';

declare var window: any;

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.css']
})

export class DesignationListComponent implements OnInit {

  
  constructor(
    private commonService: CommonService,
    public route: ActivatedRoute,
    private usersManagementService: UsersManagementService,
    private excelExportService: ExcelExportService,
    private pdfExportService: PdfExportService,
  ) {

  }

  ngOnInit(): void {
  }

}
