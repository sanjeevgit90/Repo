import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { UserLoginSuccessAction } from './store/actions/login-action';
import { RootReducerState } from './store/reducers';
import { TEMP_USER_TOKEN_KEY } from './shared/constants/constant';
import { CommonService } from './shared/services/common.service';
import { LoaderService } from './shared/services/loader.service';
import { UsersManagementService } from './user-management/user-management.service';
import { GenericApiService } from './shared/services/generic-api.service';
export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jan Aadhaar';
  errorMessage!: Observable<string>;
  displayErrorMsg: string = '';
  isMenu: boolean;
  loading$ = this.loader.isLoading$;
  subscription: Subscription;
  constructor(
    private router: Router,
    private commonService: CommonService,
    private usersManagementService: UsersManagementService,
    private loader: LoaderService,
    private store: Store<RootReducerState>,
    private genericApiService: GenericApiService
  ) {

    this.checkBrowserRefresh();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.toggleScrollToTopButton();
  }
 
  scrollToTop():void {
    window.scroll({top:0, behavior:'smooth'})
  }
  private toggleScrollToTopButton():void {
    const button = document.querySelector('.scroll-to-top') as HTMLElement;
    button.style.display = (window.scrollY>200)?'block':'none'
  }

  onWindowUnLoad() {
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      if (this.commonService.isUserLogged() && this.commonService.loggedUserTempToken) {
        sessionStorage.setItem(TEMP_USER_TOKEN_KEY, this.commonService.loggedUserTempToken)
      }
    });
  }
  checkBrowserRefresh() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !this.router.navigated;
        if (this.commonService.isUserLogged() && browserRefresh && (!this.commonService.isBeforeLoginRoute())) {
          const tempToken: string = _.clone(sessionStorage.getItem(TEMP_USER_TOKEN_KEY)) || "";
          this.usersManagementService.isLogin().subscribe(
            {
              next: (data) => {
                const userData = _.cloneDeep(this.commonService.getAPIDataNode(data));
                tempToken && (userData.token = tempToken);
                this.store.dispatch(new UserLoginSuccessAction({ loginData: userData }));
                this.commonService.callCommonAPIAfterLogin([this.usersManagementService, this.genericApiService], () => {
                }, (err: string) => {
                  this.commonService.showErrorMessage(err, false);
                });
                if((_.isEmpty(this.commonService.getUserRoleFromSession())) || (!this.commonService.getMenuCodeInSession())){
                  this.commonService.goOnDashBoard();
                }
              },
              error: (error) => {
                this.commonService.showErrorMessage(error, false);
                this.commonService.goOnLoginScreen();
              },
              complete: () => {
                sessionStorage.removeItem(TEMP_USER_TOKEN_KEY);
              }
            }
          );
        }
      }
    });
  }
  ngOnInit() {
    this.onWindowUnLoad();
  }
  removeCss(css: HTMLElement) {
    css.classList.remove('show');
  }

  onActivate(event:any) {
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 }
}
