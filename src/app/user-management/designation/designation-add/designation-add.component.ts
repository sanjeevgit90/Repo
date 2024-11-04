import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ACTION_BUTTON_NAME, placehoder } from 'src/app/shared/constants/constant';
import { CommonService } from 'src/app/shared/services/common.service';
import { TableAction } from 'src/app/shared/components/table/table-column';
import { UsersManagementService } from '../../user-management.service';
import * as _ from 'lodash';
import { UserManagementRoutes } from 'src/app/shared/constants/routePathConstants';

declare var window: any;

@Component({
  selector: 'app-designation-add',
  templateUrl: './designation-add.component.html',
  styleUrls: ['./designation-add.component.css']
})

export class DesignationAddComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    public route: ActivatedRoute,
    private usersManagementService: UsersManagementService,
    private router: Router,
  ) {

  }


  ngOnInit(): void {
  }

}
