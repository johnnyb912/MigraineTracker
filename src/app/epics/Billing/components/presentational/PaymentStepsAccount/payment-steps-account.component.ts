import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {List} from 'immutable';

import {
    PaymentMappingState,
    IPaymentMappingSelection
} from '../../../../../store/Payments/';
import {DecisionGroupOption} from '../../../../../store/User/';

@Component({
    selector   : 'payment-account',
    templateUrl     : './payment-steps-account.component.html',
    styleUrls       : [ './payment-steps-account.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentStepsAccountComponent: provides payment account selection/editing functionality during payment workflow
 */
export class PaymentStepsAccountComponent {
    /**
     * PaymentStepsAccountComponent constructor
     */
    constructor () {}

    /**
     * list of user's available payment accounts
     * @type {Array}
     */
    @Input() paymentMappings : List<PaymentMappingState>;

    /**
     * event emitted when payment account selected
     * @type {EventEmitter}
     */
    @Output() paymentSelectionsUpdated : EventEmitter<any> = new EventEmitter();

    /**
     * event emitted when user is finished with payments account step
     * @type {EventEmitter}
     */
    @Output() accountsCompleted : EventEmitter<any> = new EventEmitter();

    /**
     * event emitted when user clicks on a payment account to expand/collapse it
     * @type {EventEmitter}
     */
    @Output() accountExpanded : EventEmitter<PaymentMappingState> = new EventEmitter<PaymentMappingState>();

    /**
     * hide/show flag for the add payment account modal
     * @type {boolean}
     */
    showAddPaymentAccount : boolean = false;

    /**
     * list of SVG icons being used in our template
     * @type {{edit: (any|T)}}
     */
    icons : any = {
        close      : require('images/SvgIcons/icon-close.svg'),
        edit       : require('images/SvgIcons/icon-edit.svg')
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
     * event handler for payment account click by user
     * @param account
     */
    paymentAccountSelect(account : PaymentMappingState) {
        // emit account expanded event
        this.accountExpanded.emit(account);
    }

    /**
     * trigger the add payment account modal
     */
    showAddAccount() {
        this.showAddPaymentAccount = true;
    }

    /**
     * user is done with payment accounts step
     */
    nextStep() {
        this.accountsCompleted.emit(undefined);
    }

    /**
     * event handler for payment account to bill mapping selection
     * @param selection
     * @param account
     */
    billAssignedToAccount(selection : DecisionGroupOption, account : PaymentMappingState) {
        // emit event
        this.paymentSelectionsUpdated.emit({
            selection,
            account
        } as IPaymentMappingSelection);
    }

    /**
     * add account close event handler
     * @param event
     */
    onCloseAddAccount(event : any) {
        this.showAddPaymentAccount = false;
    }
}
