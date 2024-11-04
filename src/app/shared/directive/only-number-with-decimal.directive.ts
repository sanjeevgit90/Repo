import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[numbersOnlyWithDecimal]'
})
export class NumberWithFourDecimalDirective {
  static readonly HOW_MANY_DIGIT_ALLOW_AFTER_DECIMAL = 4;
  constructor(private _el: ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
    let val = initalValue.replace(/[^0-9.]/g, '');
    if (val.split('.').length > 2) {
      val = val.replace(/\.+$/, "");
    }
    var t = val;
    val = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), (NumberWithFourDecimalDirective.HOW_MANY_DIGIT_ALLOW_AFTER_DECIMAL) + 1)) : t;
    this._el.nativeElement.value = val;
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
// this directive allow only 4 digit after decimal