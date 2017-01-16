import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {List} from 'immutable';

import {
    EnumPaymentMethodType,
    PaymentMethodState
} from '../../../../../store/Payments/';

@Component({
    selector        : 'payment-steps-method',
    templateUrl     : './payment-steps-method.component.html',
    styleUrls       : [ './payment-steps-method.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentStepsMethodComponent: handles functionality for payment method selection step of bill payment
 */
export class PaymentStepsMethodComponent {
    /**
     * PaymentStepsMethodComponent
     */
    constructor() {}

    /**
     * list of available payment methods stored here
     * @type {Array}
     */
    @Input() paymentMethods : List<PaymentMethodState>;

    /**
     * selected payment method event
     * @type {EventEmitter}
     */
    @Output() paymentMethodSelected : EventEmitter<any> = new EventEmitter();

    /**
     * list of payment methods for use in template
     * @type {EnumPaymentMethodType}
     */
    paymentMethodTypes : typeof EnumPaymentMethodType = EnumPaymentMethodType;

    /**
     * icons required by template
     * @type {{bank: (any|T), check: (any|T)}}
     */
    icons : any = {
        bank   : require('images/SvgIcons/icon-bank.svg'),
        check  : require('images/SvgIcons/icon-check.svg')
    };

    /**
     * custom track by index function for ngFor directives
     * @param index
     * @param obj
     * @returns {number}
     */
    static trackByIndex(index : number, obj : any) : any {
        return index;
    }

    /**
     * Set current payment method as selected
     * @param method
     */
    selectPaymentMethod(method : PaymentMethodState) {
        this.paymentMethodSelected.emit(method);
    }
}
