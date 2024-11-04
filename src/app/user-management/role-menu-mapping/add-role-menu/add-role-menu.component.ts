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
import $ from 'jquery';

function toggleCardAll(): void {
  $(".card-body").removeClass("show");
  if ($("#collapse_card").hasClass("toggleActivated")) {
    $(".toggleBtn").removeClass("IconActivated");
    $(".fa-solid").removeClass("fa-square-minus").addClass("fa-square-plus");
    $("#collapse_card").removeClass("toggleActivated");
    const showAll: string = "Show All";
    $("#collapse_card").html(showAll);
    $(".card-body").removeClass("show");
  } else {
    $(".toggleBtn").addClass("IconActivated");
    $(".fa-solid").addClass("fa-square-minus").removeClass("fa-square-plus");
    $("#collapse_card").addClass("toggleActivated");
    const collapseAll: string = "Collapse All";
    $("#collapse_card").html(collapseAll);
    $(".card-body").toggleClass("show").css("height", "250px");
  }
}



@Component({
  selector: 'app-add-role-menu',
  templateUrl: './add-role-menu.component.html',
  styleUrls: ['./add-role-menu.component.css']
})
export class AddRoleMenuComponent implements OnInit {
  placeholderValue: any = placehoder.pleaseEnter;
  formGroup: FormGroup;
  
  roleTypeData: any = [
    {id:1, roleOption: 'District User'},
    {id:2, roleOption :'Block City User'},
    {id:3, roleOption :'Panchayat Zone User'},
    {id:4, roleOption :'Department User'},
  ]
  roleOption: { id: string; name: string; }[];

  roleNameData: any[];


  // menuData: any = [
  //   {id:1, menu: 'Enrollment'},
  //   {id:2, menu :'Dashboard'},
  //   {id:3, menu :'DBT'},
  //   {id:4, menu :'Card Management'},
  // ]
  // menuOption: { id: string; name: string; }[];




  constructor() { }

  ngOnInit(): void {
  }

}


