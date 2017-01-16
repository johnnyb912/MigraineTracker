import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {List} from 'immutable';

import {
    EnumPaymentStepType,
    PaymentStepState
} from '../../../../../store/Payments/';

@Component({
    selector        : 'payment-steps-header',
    templateUrl     : './payment-steps-header.component.html',
    styleUrls       : [ './payment-steps-header.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentsStepsHeaderComponent: Implements the submit payment method header
 */
export class PaymentsStepsHeaderComponent {
    /**
     * PaymentsStepsHeaderComponent constructor
     */
    constructor () {}

    /**
     * payment steps state input
     */
    @Input() paymentStepsState : List<PaymentStepState>;

    /**
     * event emitted whenever the user changes payment step
     * @type {EventEmitter}
     */
    @Output() paymentStepSelect : EventEmitter<any> = new EventEmitter();

    /**
     * list of SVG icons being used in our template
     * @type {{edit: (any|T)}}
     */
    icons : any = {
        checkmark : require('images/SvgIcons/icon-checkmark.svg')
    };

    /**
     * store payment type enums here
     * @type {EnumPaymentStepType}
     */
    paymentStepTypes : typeof EnumPaymentStepType = EnumPaymentStepType;

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
     * event handler for payment step click
     * @param step
     */
    changePaymentStep(step : EnumPaymentStepType) {
        // emit selected step
        this.paymentStepSelect.emit(step);
    }
}
