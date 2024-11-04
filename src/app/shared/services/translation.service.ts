import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { RootReducerState } from 'src/app/store/reducers';
import { LanguageApis } from '../constants/apiEndPointPathName';
import { DEFAULT_LANG, ENG_LANG, HINDI_LANG, loadedLangMenuCodeData } from '../constants/constant';
import { ApiHelper } from '../helpers/api.helper';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})

export class TranslationService {
  selectedLanguage: string;
  constructor(
    private translate: TranslateService,
    private apiHelper: ApiHelper,
    private store: Store<RootReducerState>,) {
    this.setLanguage(this.getSelectedLang() || DEFAULT_LANG);
  }
  setLanguage(language: string) {
    this.setSelectedLang(language);
    this.translate.use(language);
  }
  private setTranslationByAPI(p_aLanData: Array<{ [key: string]: any }>) {
    if (p_aLanData && p_aLanData.length) {
      const hindiTranslations: { [key: string]: any } = {};
      const englishTranslations: { [key: string]: any } = {};
      p_aLanData.forEach((item: { [key: string]: any }) => {
        hindiTranslations[item.fieldid] = item.hindiText;
        englishTranslations[item.fieldid] = item.englishText;
      });
      this.setAllLangTranslations(hindiTranslations, englishTranslations);
    }
  }
  private getLanguageByMenuCode(id: string) {
    const endpoint = `${LanguageApis.GET_LANGUAGE_BY_MENU_ID}/${id}`
    return this.apiHelper.getNoToken<any>(endpoint)
  }
  loadTranslationsFromAPI(menuCode: string) {
    if (menuCode) {
      if (loadedLangMenuCodeData[menuCode]) {
        this.setTranslationByAPI(loadedLangMenuCodeData[menuCode]);
      } else {
        this.getLanguageByMenuCode(menuCode).subscribe((response: { [key: string]: any }) => {
          const data = _.get(response, "data[0].languageTexts", []);
          if (data.length) {
            this.setTranslationByAPI(data);
            loadedLangMenuCodeData[menuCode] = data;
          }
        });
      }
    }
  }
  setTranslationByComponent(p_oHindiTranslations: { [key: string]: any }, p_oEnglishTranslations: { [key: string]: any }) {
    this.setAllLangTranslations(p_oHindiTranslations, p_oEnglishTranslations);
  }
  private setAllLangTranslations(p_oHindiTranslations: { [key: string]: any }, p_oEnglishTranslations: { [key: string]: any }) {
    const savedLanguage = this.getSelectedLang();
    if (savedLanguage) {
      
      this.translate.setTranslation(HINDI_LANG, p_oHindiTranslations, true);
      this.translate.setTranslation(ENG_LANG, p_oEnglishTranslations, true);
      this.translate.use(savedLanguage);
    }
  }
  getSelectedLang() {
    return localStorage.getItem('selectedLanguage')
  }
  private setSelectedLang(p_sLang: string) {
    localStorage.setItem('selectedLanguage', p_sLang);
  }
  // getTranslation(fieldId: string): Observable<string> {
  //   return this.translate.get(fieldId);
  // }
}
