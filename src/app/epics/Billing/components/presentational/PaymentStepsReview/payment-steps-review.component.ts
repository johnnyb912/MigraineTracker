import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {List} from 'immutable';

import {PaymentMappingState} from '../../../../../store/Payments/';

@Component({
    selector        : 'payment-steps-review',
    templateUrl     : './payment-steps-review.component.html',
    styleUrls       : [ './payment-steps-review.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentStepsReviewComponent: handles functionality for the payment review step in payment workflow
 */
export class PaymentStepsReviewComponent {
    /**
     * PaymentStepsReviewComponent constructor
     */
    constructor (private cd : ChangeDetectorRef) {}

    /**
     * datepicker DOM element reference
     */
    @ViewChild('datepickerButton') datepickerButton;

    /**
     * the list of bills, etc user has decided to pay
     * @type {Array}
     */
    @Input() paymentMappings : List<PaymentMappingState>;

    /**
     * selected payment date
     */
    @Input() selectedPaymentDate : string;

    /**
     * total of all selected payments
     */
    @Input() selectedPaymentTotal : string;

    /**
     * event emitted when user selects their payment date
     * @type {EventEmitter}
     */
    @Output() paymentDateSelected : EventEmitter<string> = new EventEmitter<string>();

    /**
     * event emitted when user clicks method edit icon
     * @type {EventEmitter}
     */
    @Output() paymentMethodEdit : EventEmitter<string> = new EventEmitter<string>();

    /**
     * event emitted when user presses the Pay button
     * @type {EventEmitter}
     */
    @Output() submitPayment : EventEmitter<any> = new EventEmitter();

    /**
     * list of SVG icons being used in our template
     * @type {{edit: (any|T)}}
     */
    icons : any = {
        edit : require('images/SvgIcons/icon-edit.svg')
    };

    /**
     * Date format to use in date picker
     * @type {string}
     */
    dateFormat : string = 'MM/DD/YYYY';

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
     * format date func for the pikaday datepicker
     * @param date
     */
    formatDate(date : string) {
        // trigger change detection
        this.cd.markForCheck();

        // emit payment date selected event
        this.paymentDateSelected.emit(date);
    }

    /**
     * click event handler for payment method edit icon
     * @param account
     */
    editPayment(account : any) {
        this.paymentMethodEdit.emit(account);
    }

    /**
     * click handler for Pay button
     */
    payNow() {
        // emit payment event
        this.submitPayment.emit(undefined);
    }
}
