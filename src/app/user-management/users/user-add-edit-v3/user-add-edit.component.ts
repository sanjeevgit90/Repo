import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { ACTION_BUTTON_NAME, ADD_EDIT_MODULE_NAV_ACTION, CONDITION_CONSTANT, SHOW_NAVIGATION_CONST, USER_TYPES, placehoder } from 'src/app/shared/constants/constant';
import { SOMETHING_WENT_WRONG, WANT_TO_RESET } from 'src/app/shared/constants/messagesConstant';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { ChildParentService } from 'src/app/shared/services/childParent.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { GenericApiService } from 'src/app/shared/services/generic-api.service';
import { validationPattern } from 'src/app/shared/utility';
import { UsersManagementService } from '../../user-management.service';
import { UserFields } from '../user.fields';
import { TableAction } from 'src/app/shared/components/table/table-column';
import { Sort } from '@angular/material/sort';
import { ActionConstant, WANT_TO_DELETE } from 'src/app/shared/constants/messagesConstant';
import { ExcelExportService } from 'src/app/shared/services/excel-export.service';
import { PdfExportService } from 'src/app/shared/services/pdf-export.service';



declare var window: any;

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})

export class UserAddEditComponent implements OnInit {

  
  
  placeholderValue: any = placehoder.pleaseEnter;
  formGroup: FormGroup;

  roleNameData: any = [
    {id:1, roleNameOption: 'Block/City Verifier'},
    {id:2, roleNameOption :'Block/City Admin'},
    {id:3, roleNameOption :'District Admin'},
    {id:4, roleNameOption :'Panchayat/Zone Verifier'},
  ]
  roleNameOption: { id: string; name: string; }[];

  locationHierarchyData: any = [
    {id:1, locationOption: 'District'},
    {id:2, locationOption :'City'},
    {id:3, locationOption :'Block'},
    {id:4, locationOption :'Zone'},
    {id:4, locationOption :'Panchayat'},
  ]
  locationOption: { id: string; name: string; }[];

  constructor(
    private commonService: CommonService,
    public route: ActivatedRoute,
    private usersManagementService: UsersManagementService,
    private router: Router,
    private childParentService: ChildParentService,
    private genericApiService: GenericApiService
  ) {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
