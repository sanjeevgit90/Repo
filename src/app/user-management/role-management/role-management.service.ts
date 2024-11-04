import { Injectable } from '@angular/core';
import { ROLES_MENU_API_PATHNAME, UserManagementApis } from 'src/app/shared/constants/apiEndPointPathName';
import { ApiHelper } from 'src/app/shared/helpers/api.helper';

@Injectable({
  providedIn: 'root',
})

export class RoleManagementService {

  constructor(
    private apiHelper: ApiHelper) { }

  getAllMenuRights() {
    const endpoint = ROLES_MENU_API_PATHNAME;
    return this.apiHelper.get(endpoint);
  }
  saveMenuRights(p_oPayLoad: { [key: string]: any }) {
    // const endpoint = ROLE_MENU_RIGHT_PATHNAME;
    // return this.apiHelper.post(endpoint, p_oPayLoad);
  }
  updateMenuRights(p_oPayLoad: { [key: string]: any }) {
    // const endpoint = ROLE_MENU_RIGHT_PATHNAME;
    // return this.apiHelper.put(endpoint, p_oPayLoad);
  }
  getSavedMenuRightsList() {
    // const endpoint = ROLE_MENU_RIGHT_PATHNAME; //OLD
    const endpoint = UserManagementApis.ROLES_API
    return this.apiHelper.get(endpoint);
  }
  getRoleMenuDataById(id: string) {
    // const endpoint = `${ROLE_MENU_RIGHT_PATHNAME}/${id}`
    // return this.apiHelper.get(endpoint)
  }

  deactivateRole(p_oPayLoad: { [key: string]: any }) {
    // const endpoint = `${ROLE_UPDATE_STATUS_API}`;
    // return this.apiHelper.put(endpoint, p_oPayLoad);
  }
}
