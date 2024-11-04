import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, map, tap, throwError } from 'rxjs';
import { TOKEN_MISSING } from '../shared/constants/constant';
import { CommonService } from '../shared/services/common.service';
import { LoaderService } from '../shared/services/loader.service';
import * as _ from 'lodash';
@Injectable()
export class ApplicationInterceptor implements HttpInterceptor {
    constructor(private loader: LoaderService, private commonService: CommonService) { }

    showLoader = () => {
        Promise.resolve().then(() => this.loader.show());
    }
    hideLoader = () => {
        Promise.resolve().then(() => this.loader.hide());
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showLoader();
        if (req.headers && req.headers.get("authorization") && (req.headers.get("authorization") === TOKEN_MISSING)) {
            this.hideLoader();
            this.commonService.goOnLoginScreen();
            return EMPTY;
        }
        return next.handle(req)
            .pipe(
                map(res => {
                    const apiError = _.get(res, "body.error", "");

                    if (apiError) {
                        throw new HttpErrorResponse({
                            error: apiError,
                            status: -1,
                        });
                    }
                    return res;
                }),
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    this.hideLoader();
                    if (error.error instanceof ErrorEvent) {
                        //This is client side error
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        //This is server side error
                        // if (error.status === 401 || error.status === 403) {
                        if (error.status === 401) {
                            // 401 - Unauthorized request
                            // 403 - Access Denied
                            this.commonService.goOnLoginScreen();
                            const errMSG = (error.error && error.error.error) || error.message || "";
                            errorMsg = `Message: ${errMSG}`;
                        }
                        else if (error && (error.status === -1) && error.error) {
                            errorMsg = error.error
                        }
                        else {
                            const errMSG = (error.error && error.error.error) || error.message || "";
                            errorMsg = `Message: ${errMSG}`;
                        }
                    }
                    return throwError(() => errorMsg);
                }),
                finalize(() => {
                    this.hideLoader();
                })
            )
    }
}
