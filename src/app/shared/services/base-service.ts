import {Observable} from "rxjs";

export abstract class BaseService {
	// abstract getDropDownData(): Observable<any[]>;

	abstract getById(id: string): any;

	abstract update(payload: { [key: string]: any }): any;

	abstract create(payload: { [key: string]: any }): any;
}
