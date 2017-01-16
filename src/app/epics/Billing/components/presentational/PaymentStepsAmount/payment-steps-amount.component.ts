import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {List} from 'immutable';

import {
    PaymentMappingStatementState,
    PaymentMappingState
} from '../../../../../store/Payments/';

// pull in lodash cloneDeep
// import * as _isUndefined from 'lodash/isUndefined';
// import * as _add from 'lodash/add';
// import * as _round from 'lodash/round';
// import * as _toNumber from 'lodash/toNumber';

@Component({
    selector        : 'payment-steps-amount',
    templateUrl     : './payment-steps-amount.component.html',
    styleUrls       : [ './payment-steps-amount.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentStepsAmountComponent: handles functionality for the Confirm Amount step of Payment Workflow
 */
export class PaymentStepsAmountComponent {
    /**
     * PaymentStepsAmountComponent constructor
     * @param builder
     */
    constructor (private builder : FormBuilder) {
        // init form input fields
        this.editAmount = new FormControl('', Validators.required);

        // build FormControl group
        this.confirmAmountForm = builder.group({
            editAmount : this.editAmount
        });

        // subscribe to any form changes
        this.editAmount.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value

        });
    }

    /**
     * the list of bills, etc user has decided to pay
     * @type {Array}
     */
    @Input() paymentMappings : List<PaymentMappingState>;

    /**
     * event emitted when payment amounts edited by user
     * @type {EventEmitter}
     */
    @Output() paymentAmountsUpdated : EventEmitter<any> = new EventEmitter();

    /**
     * event emitted when user is finished with payments amount step
     * @type {EventEmitter}
     */
    @Output() amountsCompleted : EventEmitter<any> = new EventEmitter();

    /**
     * event emitted when user edits a statement's amount
     * @type {EventEmitter}
     */
    @Output() editingStatement : EventEmitter<PaymentMappingStatementState> = new EventEmitter<PaymentMappingStatementState>();

    /**
     * when user edits a bill we store the index of the item here
     */
    private statementIndex : number;

    /**
     * used to store pristine copy of statement data
     */
    private statementPristine : any;

    /**
     * grouping object for login form
     */
    confirmAmountForm : FormGroup;

    /**
     * payment amount edit input field
     */
    editAmount : FormControl;

    /**
     * list of SVG icons being used in our template
     * @type {{message: (any|T), edit: (any|T), collapse: (any|T)}}
     */
    icons : any = {
        message  : require('images/SvgIcons/icon-message.svg'),
        edit     : require('images/SvgIcons/icon-edit.svg'),
        collapse : require('images/SvgIcons/icon-collapse.svg')
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
     * user is done with payment amounts step
     */
    nextStep() {
        // update totals just in case
        // this.updatePaymentAmount(undefined);

        this.amountsCompleted.emit(undefined);
    }

    /**
     * enable editing of the selected statement
     * @param action
     * @param statement
     */
    editStatement(action : boolean, statement : PaymentMappingStatementState) {
        // if user is editing, make a pristine copy of form data
        // if they are canceling an edit without saving we need to restore
        // the form data with the original values passed back from api
        // action ? this.statementPristine = this.statementPristine.mergeDeep(statement) as PaymentMappingStatementState : this.paymentMappings = statement.mergeDeep(this.statementPristine);

        // store index of statement being edited
        /*if (action) {
            this.statementIndex = index;
        }
        else {
            this.statementIndex = undefined;
        }*/

        // update current editing state of form
        this.editingStatement.emit(statement);
    }

    /**
     * handler for user editing an employee list bill total amount
     * @param statement
     */
    updatePaymentAmount(statement : PaymentMappingStatementState) {
        // modify the total of the statements based on adjustments made by user
        /*this.statements.forEach(account => {
            let selfAccountingAmount = account.selfAccounting.reduce((acc, item) => {
                return _round(_add(acc + _toNumber(item.premium)), 2);
            }, 0);

            account.amount = _round(_add(selfAccountingAmount + _toNumber(account.employeeListBill[0].total)), 2);
        });

        // emit payment amount updated event
        this.paymentAmountsUpdated.emit(this.statements);

        // close editing flow
        if (!_isUndefined(statement)) {
            statement.isEditingAmount = false;
        }*/
        this.paymentAmountsUpdated.emit(statement);
    }
}
