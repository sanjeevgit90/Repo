import {Directive, HostListener, Input, Output} from '@angular/core';
import {debounce, distinctUntilChanged, Subject, timer} from "rxjs";

@Directive({
	selector: '[appDebounceInput]'
})
export class DebounceInputDirective {
	@Input()
	debounceTime: number = 0;

	@HostListener('input', ['$event'])
	onInput(event: any): void {
		this.value$.next((event.target as HTMLInputElement).value);
	}

	private value$ = new Subject<string>();

	@Output()
	readonly debounceInput = this.value$.pipe(
		debounce(() => timer(this.debounceTime || 0)),
		distinctUntilChanged()
	);

}
