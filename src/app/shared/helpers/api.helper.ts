
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { CommonService } from '../services/common.service';

@Injectable({
    providedIn: 'root',
})

export class ApiHelper {

    constructor(
        private http: HttpClient,
        private commonService: CommonService
    ) { }

    get<T>(endpoint: string): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.get<T>(url, { headers: this.commonService.getTokenHeader() });
    }

    multiGet<T>(endpoints: Array<string>): Observable<T[]> {
      const apiArray = endpoints.map(endpoint => {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.get<T>(url, { headers: this.commonService.getTokenHeader() });
      })
      return forkJoin(apiArray);
    }


    getNoToken<T>(endpoint: string): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.get<T>(url, { headers: this.commonService.getHeaderContentTypeOnly() });
    }

    post<T>(endpoint: string, payload: any): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.post<T>(url, payload, { headers: this.commonService.getTokenHeader() })
    }

    put<T>(endpoint: string, payload: any): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.put<T>(url, payload, { headers: this.commonService.getTokenHeader() })
    }

    putNoToken<T>(endpoint: string, payload: any): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.put<T>(url, payload, { headers: this.commonService.getHeaderContentTypeOnly() })
    }

    delete<T>(endpoint: string): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.delete<T>(url, { headers: this.commonService.getTokenHeader() })
    }

    deleteNoToken<T>(endpoint: string): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.delete<T>(url, { headers: this.commonService.getHeaderContentTypeOnly() })
    }

    postNoToken<T>(endpoint: string, payload: any): Observable<T> {
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.post<T>(url, payload, { headers: this.commonService.getHeaderContentTypeOnly() })
    }

    postUpload<T>(endpoint: string, payload: any): Observable<T> {//TODO
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.post<T>(url, payload, { headers: this.commonService.getTokenHeaderMultiPart() })
    }
    postUploadNoToken<T>(endpoint: string, payload: any): Observable<T> {//TODO
        const url = `${environment.APIUrl}${endpoint}`;
        return this.http.post<T>(url, payload)
    }
}
