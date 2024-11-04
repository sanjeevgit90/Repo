import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildParentService {
  onParentReset = new Subject<void>();
  private errorSource = new BehaviorSubject<{ [key: string]: any }>({});
  private addFG = new BehaviorSubject<Array<string>>([]);
  private removeFG = new BehaviorSubject<Array<string>>([]);
  onParentError = this.errorSource.asObservable();
  onAddFG = this.addFG.asObservable();
  onRemoveFG = this.removeFG.asObservable();
  parentReset(): void {
    this.onParentReset.next();
  };
  sendErrorFromParentToChild(errorList: { [key: string]: any }) {
    this.errorSource.next(errorList);
  };
  addFormGroup(list: Array<string>) {
    this.addFG.next(list);
  }
  removeFormGroup(list: Array<string>) {
    this.removeFG.next(list);
  }
}