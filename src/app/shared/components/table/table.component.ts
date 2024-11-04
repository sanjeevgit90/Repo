import { ActionConstant, IconConstant } from './../../constants/messagesConstant';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TableAction, TableColumn } from './table-column';
import * as _ from 'lodash';
import { GLOBAL_COLUMN_NAMES, } from '../../constants/constant';
import { CommonService } from '../../services/common.service';
declare var window: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild('dialogModal') dialogModal!: ElementRef;
  private static readonly EDIT_ACTION = {
    icon: IconConstant.EDIT_ICON,
    toolTip: "Edit",
    action: ActionConstant.EDIT_ACTION
  }

  private static readonly STATUS_ACTION = {
    toggleIcons: {
      active: IconConstant.ACTIVATE_ICON,
      deactive: IconConstant.DEACTIVATE_ICON,
    },
    toggleToolTip: {
      active: "Active",
      deactive: "Deactive",
    },
    action: ActionConstant.STATUS_TOGGLE_ACTION
  }



  private static readonly REORDER_ACTION = {
    toggleArrowIcons: {
      up: IconConstant.UP_ICON,
      down: IconConstant.DOWN_ICON,
    },
    toggleArrowToolTip: {
      up: "Up",
      down: "Down",
    },
    action: ActionConstant.REORDER_TOGGLE_ACTION
  }



  private static readonly VIEW_ACTION = {
    icon: IconConstant.VIEW_ICON,
    toolTip: "View",
    action: ActionConstant.VIEW_ACTION
  }

  private static readonly MANAGE_MATERIAL_ACTION = {
    icon: IconConstant.MANAGE_MATERIAL_ICON,
    toolTip: "Manage Material",
    action: ActionConstant.MANAGE_MATERIAL_ACTION
  }

  private static readonly DELETE_ACTION = {
    icon: IconConstant.DELETE_ICON,
    toolTip: "Delete",
    action: ActionConstant.DELETE_ACTION
  }

  private static readonly LOCK_UNLOCK_ACTION = {
    toggleLockUnlock: {
      lock: IconConstant.LOCK_ICON,
      unlock: IconConstant.UNLOCK_ICON
    },
    toggleLockUnlockToolTip: {
      lock: "Lock",
      unlock: "Unlock",
    },
    action: ActionConstant.LOCK_UNLOCK_ACTION,
  }

  private static readonly EDIT_DBT = {
    icon: IconConstant.EDIT_ICON,
    toolTip: "Edit",
    action: ActionConstant.EDIT_DBT
  }


  public tableDataSource = new MatTableDataSource<any>([]);
  public displayedColumns: string[] = [];
  @ViewChild('clientPaginator', { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[] = [];
  @Input() rowActionIcon: string;
  @Input() serialNumberDisplay: string = GLOBAL_COLUMN_NAMES.SERIAL_NUMBER
  @Input() paginationSizes: number[] = [10, 25, 50, 100];
  @Input() defaultPageSize = this.paginationSizes[0];
  @Input() recordCount: number;
  @Input() isServerSidePagination = false;
  @Input() excludeEditFromStatus: boolean = false;
  @Input() isWorkflowMaster: boolean = false;
  // @Input() accessRights:{[key:string]:any} ={}

  @Input() actions: TableAction[];
  @Input() requiredActions: Array<string> = [];
  @Input() showAction: boolean = true;

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<{ [key: string]: any }> = new EventEmitter();
  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() callback = new EventEmitter<string>();

  allActions: Array<{ [key: string]: any }> = []
  modalPopup: any;
  dialogDisplayContent: string = '';

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    // Add Serial Number to data
    this.dataWithSerialNumbers = this.addSerialNumbers(data);// Client Side Pagination data
    this.isServerSidePagination ? this.setTableDataSource(data) : this.setTableDataSource(this.dataWithSerialNumbers);
  }

  dataWithSerialNumbers: any[] = [];
  GLOBAL_COLUMN_NAMES: { [key: string]: any } = GLOBAL_COLUMN_NAMES;
  actionList = ActionConstant;
  accessRights: { [key: string]: any } = {};
  isView: boolean;
  isDelete: boolean;
  isEdit: boolean;
  // workflowStatus = WORKFLOW_STATUS

  constructor(private commonService: CommonService) {
  }

  getAccessRights() {
    const menuCode = this.commonService.getMenuCodeInSession();
    this.commonService.getSelectedRole(menuCode)
    this.accessRights = {
      isView: this.commonService.isView,
      isDelete: this.commonService.isDelete,
      isEdit: this.commonService.isEdit,
    }
  }

  performAction(action: TableAction, row: any) {
    action.handler(row);
  }

  onActionClick(action: string, row: { [key: string]: any }) {
    this.rowAction.emit({ action, row });
  }
  ngOnInit(): void {
    this.getAccessRights()
    if (this.rowActionIcon) {
      this.processRequiredActions();
    }
    const columnNames: any = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.rowActionIcon) {
      if (this.showAction) {
        this.displayedColumns = [...columnNames, this.rowActionIcon];
      } else {
        this.displayedColumns = [...columnNames];
      }

      if (this.serialNumberDisplay) {
        this.displayedColumns = [...this.displayedColumns, this.serialNumberDisplay];
        _.pull(this.displayedColumns, GLOBAL_COLUMN_NAMES.SERIAL_NUMBER);
        this.displayedColumns.unshift(GLOBAL_COLUMN_NAMES.SERIAL_NUMBER);
      }
    }
    else {
      this.displayedColumns = columnNames;
    }

  }

  // Add Serial Number in Data
  addSerialNumbers(data: any[]): any[] {
    return data?.map((element, index) => ({ ...element, [GLOBAL_COLUMN_NAMES.SERIAL_NUMBER]: index + 1 }));
  }

  processRequiredActions() {
    if (this.requiredActions && this.requiredActions.length) {
      this.requiredActions.forEach((el) => {
        switch (el) {
          case ActionConstant.EDIT_ACTION:
            this.allActions.push(TableComponent.EDIT_ACTION);
            break;
          case ActionConstant.STATUS_TOGGLE_ACTION:
            this.allActions.push(TableComponent.STATUS_ACTION);
            break;
          case ActionConstant.VIEW_ACTION:
            this.allActions.push(TableComponent.VIEW_ACTION);
            break;
          case ActionConstant.DELETE_ACTION:
            this.allActions.push(TableComponent.DELETE_ACTION);
            break;
          case ActionConstant.REORDER_TOGGLE_ACTION:
            this.allActions.push(TableComponent.REORDER_ACTION);
            break;
          case ActionConstant.REORDER_TOGGLE_ACTION:
            this.allActions.push(TableComponent.REORDER_ACTION);
            break;
          case ActionConstant.LOCK_UNLOCK_ACTION:
            this.allActions.push(TableComponent.LOCK_UNLOCK_ACTION);
            break;
          case ActionConstant.MANAGE_MATERIAL_ACTION:
            this.allActions.push(TableComponent.MANAGE_MATERIAL_ACTION);
            break;
          case ActionConstant.EDIT_DBT:
              this.allActions.push(TableComponent.EDIT_DBT);
              break;  
          default:
            break;
        }
      })
    } else {
      if (this.showAction) {
        this.allActions.push(TableComponent.EDIT_ACTION);
        this.allActions.push(TableComponent.STATUS_ACTION);

      }
    }
  }
  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.tableDataSource.filter = filterValue.trim().toLowerCase();
  //   this.recordCount = this.tableDataSource.filteredData.length
  // }
  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
    this.recordCount = this.tableDataSource.filteredData.length;
  }

  sortTable(sortParameters: Sort) {
    let sortData: any = this.tableColumns.find(column => column.name == sortParameters.active)?.dataKey
    sortParameters.active = sortData;
    this.sort.emit(sortParameters);
  }

  // getColumnValue(row: any, dataKey: string[]): string {
  //   if (dataKey.includes('status')) {
  //     return row['status'] === 0 ? 'Not-Active' : 'Active';
  //   } else {
  //     return dataKey.map(key => row[key]).join(' ');
  //   }
  // }

  onPageChange(event: PageEvent) {
    this.page.emit(event)
  }

  getLimitedText(text: string): string {
    const maxLength = 255;

    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...'; // Display ellipsis for truncated text
    } else {
      return text;
    }
  }

  openDialog(content: any) {
    this.modalPopup = new window.bootstrap.Modal(this.dialogModal.nativeElement);
    this.modalPopup.show();
    this.dialogDisplayContent = content;
    this.dialogDisplayContent = this.replaceCommasWithNumbers(this.dialogDisplayContent);
  }

  replaceCommasWithNumbers(input: string): string {
    const items = input.split(',');
    let result = '';
    items.forEach((item, index) => {
      result += `<br> <strong>${index + 1}. </strong> ${item} `;
    });

    return result.trim();
  }

}

