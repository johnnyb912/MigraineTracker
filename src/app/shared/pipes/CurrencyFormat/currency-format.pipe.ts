import {Pipe, PipeTransform} from '@angular/core';

import * as numeral from 'numeral';

@Pipe({
    name : 'currencyFormat'
})

/**
 * implementation of CurrencyFormatPipe: uses the numeral.js library to format numbers for display as currency in the UI
 */
export class CurrencyFormatPipe implements PipeTransform {
    transform(value : number, format : string) : string {
        return numeral(value).format(format);
    }
}
