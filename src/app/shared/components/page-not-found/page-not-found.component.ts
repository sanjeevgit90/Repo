import { Component, OnInit } from '@angular/core';
import { UserManagementRoutes } from '../../constants/routePathConstants';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  homeRoute = UserManagementRoutes.LOGIN;
  constructor() { }

  ngOnInit(): void {
  }

}
