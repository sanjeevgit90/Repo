import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableAction } from 'src/app/shared/components/table/table-column';
import { ActionConstant, ROLE_ID_MISSING, STATUS_MISSING, WANT_TO_ACTIVATE, WANT_TO_DEACTIVATE, WANT_TO_DELETE } from 'src/app/shared/constants/messagesConstant';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { CommonService } from 'src/app/shared/services/common.service';
import * as _ from 'lodash';
import { RoleManagementService } from '../../role-management/role-management.service';
import { GenericApiService } from 'src/app/shared/services/generic-api.service';
import { LangColumnsType, LANG_COLUMNS } from './lang.column'
import { Sort } from '@angular/material/sort';

declare var window: any;

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent implements OnInit {

  constructor(private roleManageService: RoleManagementService, 
    private commonService: CommonService, private router: Router,
    private genericLang: GenericApiService
  ) { }



  ngOnInit(): void {
    
  }


}
