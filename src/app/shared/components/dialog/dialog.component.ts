import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  @Output() callback = new EventEmitter<string>();
  @Input() dialogContent:string='';
  @Input() actionButtonText:string = '';
  @Input() closeText:string='';
  @Input() closeBtn:boolean=true;
  @Input() dialogHeading:string='';
  @Input() cssClass:string='';
  @Input() isAction:boolean=true;
  @Input() isSrNumber:boolean = false;
  constructor(
    // private tabsComponent: TabsComponent
    ) { }

  ngOnInit(): void {
   
  }

  updateTab2Status() {
    // this.tabsComponent.updateTabStatus('tab2', true);
  }

}
