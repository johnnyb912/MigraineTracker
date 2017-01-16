import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'payment-methods',
    templateUrl     : './payment-methods.component.html',
    styleUrls       : [ './payment-methods.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentMethodsComponent
 */
export class PaymentMethodsComponent {
    /**
     * PaymentMethodsComponent constructor
     */
    constructor() {}

    /**
     * flag to indicate when a payment card is actively being edited or not
     * @type {boolean}
     */
    isEdit : boolean = false;

    /**
     * event handler for editing payment method page
     * @param edit
     */
    onEditCard(edit : boolean) {
        this.isEdit = edit;
    }
}
