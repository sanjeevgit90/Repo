import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { UsersManagementService } from '../../user-management.service';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { ExcelExportService } from 'src/app/shared/services/excel-export.service';
import { PdfExportService } from 'src/app/shared/services/pdf-export.service';
import { } from '../../menu-creation/menu-list/menu-list.columns';
import { MENU_MASTER_COLUMNS, MenuMasterColumnsType } from './menu-list.columns';


declare var window: any;

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})

  
export class MenuListComponent implements OnInit {

  tableColumns: MenuMasterColumnsType = MENU_MASTER_COLUMNS;
  addRoutePath = UserManagementRoutes.MENU_ADD_EDIT;
  componentList = ['name', 'url', 'type', 'primaryMenuType'];

  
  rowActionList: any [];
  pageHeading = 'MENU_MASTER';
  btnLabel = 'Add Menu';
  accessRights:{[key:string]:any} ={}


  constructor(private commonService: CommonService,
    public route: ActivatedRoute,
    private usersManagementService: UsersManagementService,
    private excelExportService: ExcelExportService,
    private pdfExportService: PdfExportService,) { }

  ngOnInit(): void {
  }

}
