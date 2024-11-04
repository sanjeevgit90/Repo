import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHelper } from 'src/app/shared/helpers/api.helper';

@Injectable({
  providedIn: 'root',
})

export class DashboardManagementService {

  constructor(
    private apiHelper: ApiHelper) { }



}
