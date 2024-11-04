// my-maxlength.directive.ts
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myMaxlengthDirective]'
})
export class MyMaxlengthDirective {
  @Input() maxLength: number = 8; // Adjust the maximum length as needed

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length > this.maxLength) {
      inputElement.value = inputElement.value.slice(0, this.maxLength);
    }
  }
}
