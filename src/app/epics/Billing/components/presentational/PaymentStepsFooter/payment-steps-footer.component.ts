import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {List} from 'immutable';

import {PaymentStepState} from '../../../../../store/Payments/';

@Component({
    selector         : 'payment-steps-footer',
    templateUrl     : './payment-steps-footer.component.html',
    styleUrls       : [ './payment-steps-footer.component.scss' ],
    changeDetection  : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for PaymentStepsFooterComponent: handles the payment workflow footer interactions
 */
export class PaymentStepsFooterComponent {
    /**
     * PaymentStepsFooterComponent constructor
     */
    constructor () {}

    /**
     * flag used to hide/show cancel payment prompt
     * @type {boolean}
     */
    @Input() showCancelPrompt : boolean = false;

    /**
     * current active payment step stored here
     */
    @Input() paymentSteps : List<PaymentStepState>;

    /**
     * event emitted whenever the BACK button is pressed
     * @type {EventEmitter}
     */
    @Output() paymentStepPrevious : EventEmitter<any> = new EventEmitter();

    /**
     * event emitted when cancel payment prompt needs to be displayed to user
     * @type {EventEmitter}
     */
    @Output() showCancelPayment : EventEmitter<any> = new EventEmitter();

    /**
     * event emmitted when user clicks a button on cancel payment prompt
     * @type {EventEmitter}
     */
    @Output() cancelPaymentAction : EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * back button click event handler
     */
    prevStep() {
        // emit paymentStepPrevious event
        this.paymentStepPrevious.emit(undefined);
    }

    /**
     * handles displaying cancel prompt to end user
     */
    doShowCancelPrompt() {
        this.showCancelPayment.emit(undefined);
    }

    /**
     * button clicks handler for cancel payment prompt
     */
    doCancelPayment(cancelPayment : boolean) {
        // emit cancel payment event
        this.cancelPaymentAction.emit(cancelPayment);
    }
}
