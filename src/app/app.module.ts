import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from "src/app/shared/shared.module";
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DashboardManagementModule } from './dashboard-management/dashboard-management.module';
import { ApplicationInterceptor } from './interceptors/application.interceptor';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { PageNotFoundModule } from './shared/components/page-not-found/page-not-found.module';
import { RootEffects } from "./store/effects";
import { rootReducer } from './store/reducers';
import { clearState } from './store/reducers/meta-reducer';
import { UserManagementModule } from './user-management/user-management.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserManagementModule,
    DashboardManagementModule,
    SharedModule,
    StoreModule.forRoot(rootReducer, {  runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
      metaReducers: [clearState] }),
    EffectsModule.forRoot([...RootEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    PageNotFoundModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApplicationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
