import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ACTION_BUTTON_NAME, ADD_EDIT_MODULE_NAV_ACTION, placehoder } from 'src/app/shared/constants/constant';
import { WANT_TO_RESET } from 'src/app/shared/constants/messagesConstant';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';
import { CommonService } from 'src/app/shared/services/common.service';
import { GenericApiService } from 'src/app/shared/services/generic-api.service';
import { LanguageListField } from '../language.field';

declare var window: any;

@Component({
  selector: 'app-language-add-edit',
  templateUrl: './language-add-edit.component.html',
  styleUrls: ['./language-add-edit.component.css']
})
export class LanguageAddEditComponent implements OnInit {


  constructor(private router: Router,
    private commonService: CommonService,
    private genericLang: GenericApiService,
  ) {
  }


  ngOnInit(): void {

  }

}
