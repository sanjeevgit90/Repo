import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'indianCurrency'
})

export class IndianCurrencyPipe implements PipeTransform {
    transform(value: number): string {
        if (isNaN(value) || value == null) {
            return ''
        }
        const formattedValue = value.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR'
        });
        return formattedValue
    }

}