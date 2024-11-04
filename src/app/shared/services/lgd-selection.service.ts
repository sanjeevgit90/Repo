import { Injectable } from '@angular/core';
import { LGD_CONSTANT } from '../constants/constant';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LgdSelectionService {

    lgdConstant = LGD_CONSTANT;
    constructor() { }

    selectItem(item: {}, type: string, selectedItems: any[]) {
        selectedItems.push(item)
    }

    deselectItem(item: any, type: string, selectedItems: any[], formGroup: any) {
        const id = item.id;
        selectedItems = selectedItems.filter((item) => item.id !== id);
        if (selectedItems.length === 0) {
            this.resetFormFields(type, formGroup);
            return of(selectedItems);
        }
        return of(selectedItems);
    }
    selectAll(items: any[], type: string, selectedItems: any[]) {
        selectedItems.length = 0
        selectedItems.push(...items)
    }
    

    deselectAll(type: string, selectedItems: any[], formGroup: any) {
        selectedItems.length = 0;
        this.resetFormFields(type, formGroup);
    }
    private resetFormFields(type: string, formGroup: any) {
        switch (type) {
            case this.lgdConstant.DISTRICT:
                formGroup.get('tehsil')?.reset('');
                formGroup.get('village')?.reset('');
                formGroup.get('block')?.reset('');
                
                break;
            case this.lgdConstant.TEHSIL:
                formGroup.get('village')?.reset('');
                formGroup.get('block')?.reset('');
                break;
            case this.lgdConstant.BLOCK:
                formGroup.get('village')?.reset('');
                break;
            default:
                break;
        }
    }
}