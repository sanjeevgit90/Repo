import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Tab } from './tab.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input() tabs: Tab[] | null;

  @Input() activeTab: string | null = null;

  @Output() tabChange: EventEmitter<Tab> = new EventEmitter<Tab>();
  constructor() { }
  
  loadComponent(tab: Tab) {
    this.tabChange.emit(tab);
  }

  updateTabStatus(tabId:string, status:boolean) {
    const tabToUpdate = this.tabs?.find(tab=>tab.id===tabId)
    if(tabToUpdate) {
      tabToUpdate.status= status
    }
  }

  ngOnInit(): void {
    // this.loadComponent(this.tabs[0])
  }

}
