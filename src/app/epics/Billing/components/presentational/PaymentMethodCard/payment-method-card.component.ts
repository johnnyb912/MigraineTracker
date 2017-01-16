import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'payment-method-card',
    templateUrl     : './payment-method-card.component.html',
    styleUrls       : [ './payment-method-card.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentMethodComponent
 */
export class PaymentMethodCardComponent {
    /**
     * PaymentMethodComponent constructor
     */
    constructor() {}

    /**
     * flag to edit or not the card
     */
    @Input() isEdit : boolean;

    /**
     * icons required by template
     * @type {{bank: (any|T), trash: (any|T), check: (any|T)}}
     */
    icons : any = {
        bank        : require('images/SvgIcons/icon-bank.svg'),
        trash       : require('images/SvgIcons/icon-trash.svg'),
        checkmark   : require('images/SvgIcons/icon-checkmark.svg')
    };

    paymentMethodCard : Array<any> = [
        {
            title     : 'Regions',
            phone     : '123-456-7890',
            account   : 'Loerm Ipsum (...7201)',
            routing   : '...0055',
            default   : true
        },
        {
            title     : 'Pinnacle',
            phone     : '123-456-7890',
            account   : 'Loerm Ipsum (...7201)',
            routing   : '...0055',
            default   : false
        },
        {
            title     : 'Other',
            phone     : '123-456-7890',
            account   : 'Loerm Ipsum (...7201)',
            routing   : '...0055',
            default   : false
        }
    ];

    /**
     * custom track by index function for ngFor directives
     * @param index
     * @param obj
     * @returns {number}
     */
    static trackByIndex(index : number, obj : any) : any {
        return index;
    }
}
