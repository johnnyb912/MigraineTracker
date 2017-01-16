import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'payment-history',
    templateUrl     : './payment-history.component.html',
    styleUrls       : [ './payment-history.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentHistoryComponent
 */
export class PaymentHistoryComponent {
    /**
     * PaymentHistoryComponent constructor
     */
    constructor() {}
}
