import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FontSizeService } from '../../services/font-size.service';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store/reducers';
import { ENG_LANG, HINDI_LANG } from '../../constants/constant';
import * as _ from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  static readonly ENGLISH_TEXT = "English";
  static readonly HINDI_TEXT = "हिंदी  ";
  supportedLanguages: string[] = [];
  displayLanguage: string = "";
  isSavedTheme: boolean;
  getLanguage: any;
  @ViewChild('main') myDivRef: ElementRef;
  @Input() isMenu: boolean = false;
  constructor(
    private themeService: ThemeService,
    private fontSizeService: FontSizeService,
    private translationService: TranslationService,
    private store: Store<RootReducerState>,
    protected router: Router,
  ) {
  }

  toggleTheme(event: any) {
    if (event.target.checked) {
      this.themeService.toggleTheme(true)
    }
    else {
      this.themeService.toggleTheme(false)
    }
  }

  LocalStorageToggleTheme(theme: any) {
    this.themeService.toggleTheme(theme)
  }

  increaseFontSize() {
    this.fontSizeService.increaseFontSize();
  }

  decreaseFontSize() {
    this.fontSizeService.decreaseFontSize();
  }

  resetFontSize() {
    this.fontSizeService.resetFontSize();
  }

  scroll() {
    const mainContent = document.getElementById('main');
    mainContent ? window.scroll(0, 430) : window.scroll(0, 100);
  }
  ngOnInit(): void {
    let tempSavedTheme: any = localStorage.getItem('selectedTheme');
    this.isSavedTheme = JSON.parse(tempSavedTheme);
    this.LocalStorageToggleTheme(this.isSavedTheme)
    let tempSavedFontSize: any = localStorage.getItem('SETFONTSIZE');
    let convert2NumberFont: number = +tempSavedFontSize;
    if (convert2NumberFont == 0) {
      convert2NumberFont = 14
    }
    this.fontSizeService.applyFontSize(convert2NumberFont);
    this.displayLanguage = (this.translationService.getSelectedLang() == ENG_LANG) ? HeaderComponent.HINDI_TEXT : HeaderComponent.ENGLISH_TEXT;
  }
  ngAfterViewInit(): void {
  }
  changeLanguage(): void {
    const currentLang = _.clone(this.displayLanguage);
    switch (currentLang) {
      case HeaderComponent.ENGLISH_TEXT:
        this.displayLanguage = HeaderComponent.HINDI_TEXT;
        this.translationService.setLanguage(ENG_LANG);
        break;
      case HeaderComponent.HINDI_TEXT:
        this.displayLanguage = HeaderComponent.ENGLISH_TEXT;
        this.translationService.setLanguage(HINDI_LANG);
        break;
      default:
        break;
    }
  }

}


