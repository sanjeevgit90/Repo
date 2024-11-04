import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { RootReducerState, getCurrentRoleData, getLoginData } from 'src/app/store/reducers';
import { CHANGEPASSWORD_MENU, DASHBOARD_MENU, LOGOUT_MENU, MAIN_MENU_ICON } from '../../constants/sideBarConstant';
import { CommonService } from '../../services/common.service';
import { TranslationService } from '../../services/translation.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  openSidebar: boolean = true;
  sideMenuBarList: Array<{ [key: string]: any }> = [];
  userRolesList: Array<{ [key: string]: any }> = [];
  loggedUserName: any ;
  currentSubMenuParentID: string = "";
  welcomeName: any;

  constructor(
    private store: Store<RootReducerState>,
    private commonService: CommonService,
    private translationService: TranslationService,
    private router: Router,
  ) {
  }

  toggleMenu() {
    this.openSidebar = !this.openSidebar;
  }
  ngOnInit(): void {
    this.processData();
  }
  processData() {
    this.store.select(getLoginData).subscribe((p_oLoginData) => {
      this.welcomeName = p_oLoginData;
      this.loggedUserName = this.welcomeName.name;
      this.userRolesList = _.get(p_oLoginData, "roles", []);
      this.store.select(getCurrentRoleData).subscribe((p_sCurrRole) => {
        if (this.userRolesList.length) {
          if (!_.isEmpty(p_sCurrRole)) {
            const currRoleID = _.get(p_sCurrRole, "id", "");
            this.sideMenuBarList = [];
            this.sideMenuBarList.push(DASHBOARD_MENU);
            
            const currentRoleData: { [key: string]: any } = this.getCurrentRoleData(currRoleID)[0];
            const menuRights: Array<{ [key: string]: any }> = _.get(currentRoleData, "menuRights", []);
            if (menuRights.length) {
              const parentMenuList = menuRights.map(el => _.pick(el, ['parentMenu']));
              const uniqParentMenuIDList = [...new Map(parentMenuList.map(item =>
                [item.parentMenu["id"], item.parentMenu])).values()];
              uniqParentMenuIDList.forEach((el) => {
                if (el) {
                  const { id, menuNameHindi, menuNameEnglish, menuCode, route } = el;
                  const obj = { menuID: id, menuNameHindi, menuNameEnglish, menuCode, subMenu: this.getSubMenuList(menuRights, id,), icon: MAIN_MENU_ICON[menuCode] || "" }
                  this.sideMenuBarList.push(obj);
                }
              });
            }
            this.sideMenuBarList.push(CHANGEPASSWORD_MENU);
            this.sideMenuBarList.push(LOGOUT_MENU);
            this.setLangTransaltion(this.sideMenuBarList);
            this.getCurrentSubMenuParentID(menuRights);
          } else {
            const roleFromSession = this.commonService.getUserRoleFromSession();
            let _roleID = "";
            let _roleName = "";
            if (!_.isEmpty(roleFromSession)) {
              _roleID = _.get(roleFromSession, "id", "");
              _roleName = _.get(roleFromSession, "name", "");
            } else {
              _roleID = _.get(this.userRolesList[0], "roleId", "");
              _roleName = _.get(this.userRolesList[0], "roleName", "");
            }
            _roleID && this.commonService.setCurrentRoleInState({ id: _roleID, name: _roleName });
          }
        } else {
          this.sideMenuBarList = [DASHBOARD_MENU, LOGOUT_MENU, CHANGEPASSWORD_MENU];
          this.setLangTransaltion(this.sideMenuBarList);
        }
      })
    })
  }
  setLangTransaltion(p_aList: Array<{ [key: string]: any }>) {
    const hindiTranslations: { [key: string]: any } = {};
    const englishTranslations: { [key: string]: any } = {};
    p_aList.forEach((item: { [key: string]: any }) => {
      hindiTranslations[item.menuCode] = item.menuNameHindi;
      englishTranslations[item.menuCode] = item.menuNameEnglish;
      if (item.subMenu && item.subMenu.length) {
        item.subMenu.forEach((subItem: { [key: string]: any }) => {
          hindiTranslations[subItem.menuCode] = subItem.menuNameHindi;
          englishTranslations[subItem.menuCode] = subItem.menuNameEnglish;
        });
      }
    });
    this.translationService.setTranslationByComponent(hindiTranslations, englishTranslations);
  }
  getCurrentRoleData(p_sRoleID: string) {
    return this.userRolesList.filter((el) => {
      return (el.roleId === p_sRoleID);
    })
  }
  /**
  *
  * @param p_sMenuID
  * @returns
  */
  getSubMenuList(p_aMenuRightsList: Array<{ [key: string]: any }>, p_sParentMenuID: string) {
    return p_aMenuRightsList.filter((el) => {
      return ((el.parentMenu && el.parentMenu.id) === p_sParentMenuID);
    })
  }
  showSubmenu(p_sMenuID: string) {
    if(p_sMenuID === this.currentSubMenuParentID){
      this.currentSubMenuParentID = "";
    }else{
      this.currentSubMenuParentID = p_sMenuID;
    }

  }
  onMenuclick(p_sRoutePath: string, p_sMenuCode: string = "", p_sMenuId: string = "") {
    if (p_sRoutePath) {
      this.router.navigateByUrl(p_sRoutePath);
      this.commonService.setMenuCodeInSession(p_sMenuCode);
      this.commonService.setMenuIdInSession(p_sMenuId);
    }
  }
  getCurrentSubMenuParentID = (p_aMenuRights: Array<{ [key: string]: any }>) => {
    this.currentSubMenuParentID = _.get(_.find(p_aMenuRights, (item) => {
      return ((item.route && this.router.url.includes(item.route)) ? item : null);
    }), "parentMenu.id", "");
  }
}
