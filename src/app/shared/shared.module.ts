import { CommonModule, DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppMaterialModule } from '../app-material/app-material.module';
import { OnlyNumbersDirective } from './directive/numbers.directive';
import { NumberWithFourDecimalDirective } from './directive/only-number-with-decimal.directive';
import { NumberDirective } from './directive/only-number.directive';
import { DataPropertyGetterPipe } from '../shared/components/table/data-property-getter-pipe/data-property-getter.pipe';
import { TRANSLATE_MODULE } from '../shared/services/translation.config';
import { TranslationService } from '../shared/services/translation.service';
import { AddEditModuleNavigationComponent } from './components/add-edit-module-navigation/add-edit-module-navigation.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ExportPdfExcelComponent } from './components/export-pdf-excel/export-pdf-excel.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { HeaderComponent } from './components/header/header.component';
import { MultiSelectDdComponent } from './components/multi-select-dd/multi-select-dd.component';
import { PageHeadingComponent } from './components/page-heading/page-heading.component';
import { RegionDdComponent } from './components/region-dd/region-dd.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './components/table/table.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { LANGUAGE_CODE_CONST } from './constants/constant';

import { CommonService } from './services/common.service';
import { DebounceInputDirective } from './directive/debounce-input.directive';
import { IndianCurrencyPipe } from './directive/indian-currency.directive'
import { CountdownClockComponent } from './components/countdown-clock/countdown-clock.component';
import { CustomFileUploadComponent } from './components/file-upload/custom-file-upload/custom-file-upload.component';
import { MyMaxlengthDirective } from './directive/input-number-maxlength.directive';
import { TodoTableMultipleDDComponent } from './components/todo-table-multiple-dd/todo-table-multiple-dd.component';
import { OtpDialogueComponent } from './components/otp-dialogue/otp-dialogue.component';

@NgModule({
  declarations: [
    FormControlComponent,
    TableComponent,
    DataPropertyGetterPipe,
    HeaderComponent,
    FooterComponent,
    PageHeadingComponent,
    DialogComponent,
    SidebarComponent,
    FileUploadComponent,
    CustomFileUploadComponent,
    ButtonsComponent,
    ExportPdfExcelComponent,
    CaptchaComponent,
    TabsComponent,  
    TodoTableComponent,
    MultiSelectDdComponent,
    RegionDdComponent,
    AddEditModuleNavigationComponent,
    NumberDirective,
    OnlyNumbersDirective,
    NumberWithFourDecimalDirective,
    DebounceInputDirective,
    IndianCurrencyPipe,
    CountdownClockComponent,
    MyMaxlengthDirective,
    TodoTableMultipleDDComponent,
    OtpDialogueComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppMaterialModule,
    TRANSLATE_MODULE,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    FormControlComponent,
    TableComponent,
    RouterModule,
    AppMaterialModule,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    PageHeadingComponent,
    DialogComponent,
    SidebarComponent,
    FileUploadComponent,
    CustomFileUploadComponent,
    ButtonsComponent,
    ExportPdfExcelComponent,
    CaptchaComponent,
    TabsComponent,   
    TodoTableComponent,
    MultiSelectDdComponent,
    RegionDdComponent,
    AddEditModuleNavigationComponent,
    NumberWithFourDecimalDirective,
    NumberDirective,
    DebounceInputDirective,
    IndianCurrencyPipe,
    CountdownClockComponent,
    MyMaxlengthDirective,
    TodoTableMultipleDDComponent,
    OtpDialogueComponent
  ],
  providers: [DatePipe, TranslationService],
})


export class SharedModule {

  constructor(private translationService: TranslationService, private commonService: CommonService) {
    this.translationService.loadTranslationsFromAPI(LANGUAGE_CODE_CONST.GLOBAL);
    if (this.commonService.isUserLogged()) {
      const menuCode = this.commonService.getMenuCodeInSession();
      menuCode && this.translationService.loadTranslationsFromAPI(menuCode);
    };
  }
}
