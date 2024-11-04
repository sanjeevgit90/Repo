import { Injectable } from '@angular/core';
import { ApiHelper } from '../helpers/api.helper';
import { ActionConstant } from '../constants/messagesConstant';
import { Observable } from 'rxjs';
import { REORDER_CONSTANT } from '../constants/constant';

@Injectable({
    providedIn: 'root',
})

export class ReorderService {
    constructor(
        private apiHelper: ApiHelper) { }

    reorder(data: { [key: string]: any }, type: string, dataList: any[], comp: string): Observable<any> {
        let index = dataList.findIndex((x: any) => x.id === data.id);
        let reorderObj: { [key: string]: any } = {};

        if (type === ActionConstant.UP) {
            reorderObj = dataList[index - 1];
        } else {
            reorderObj = dataList[index + 1];
        }

        const reorderPayload = {
            fromId: data.id,
            toId: reorderObj.id,
            direction: type,
        };
        return this.reorderAPI(reorderPayload, comp);
    }

    reorderAPI(payload: { [key: string]: any }, comp: string) {
        let endpoint = "";
        return this.apiHelper.put<any>(endpoint, payload)
    }
}  