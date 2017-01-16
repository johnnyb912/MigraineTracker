import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'payment-history-card',
    templateUrl     : './payment-history-card.component.html',
    styleUrls       : [ './payment-history-card.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentHistoryComponent
 */
export class PaymentHistoryCardComponent {
    /**
     * PaymentHistoryComponent constructor
     */
    constructor() {}

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
     * paymentHistoryCard used for indicate user information on each card
     */
    paymentHistoryCard  : Array <any> = [
        {
            title     : 'Nov',
            userName  : 'Joel Morgan',
            userRole  : 'Plan Administrator',
            date      : 'Nov 21',
            year      : '2015',
            bank      : 'Pinnacle Bank',
            routing   : 'Lorem Ipsum (...7201)',
            pending   : true,
            paid      : false,
            amount    : '302,256'
        },
        {
            title     : 'Oct',
            userName  : 'Joel Morgan',
            userRole  : 'Plan Administrator',
            date      : 'Nov 21',
            year      : '2015',
            bank      : 'Pinnacle Bank',
            routing   : 'Lorem Ipsum (...7201)',
            pending   : false,
            paid      : true,
            amount    : '310,876'
        },
        {
            title     : 'Sep',
            userName  : 'Joel Morgan',
            userRole  : 'Plan Administrator',
            date      : 'Nov 21',
            year      : '2015',
            bank      : 'Pinnacle Bank',
            routing   : 'Lorem Ipsum (...7201)',
            pending   : false,
            paid      : true,
            amount    : '310,876'
        },
        {
            title     : 'Aug',
            userName  : 'Joel Morgan',
            userRole  : 'Plan Administrator',
            date      : 'Nov 21',
            year      : '2015',
            bank      : 'Pinnacle Bank',
            routing   : 'Lorem Ipsum (...7201)',
            pending   : false,
            paid      : true,
            amount    : '310,876'
        },
        {
            title     : 'Jul',
            userName  : 'Joel Morgan',
            userRole  : 'Plan Administrator',
            date      : 'Nov 21',
            year      : '2015',
            bank      : 'Pinnacle Bank',
            routing   : 'Lorem Ipsum (...7201)',
            pending   : false,
            paid      : true,
            amount    : '310,876'

        }
    ];
}
