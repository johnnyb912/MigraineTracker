import {Component, Output, Renderer, ViewChild, EventEmitter, ElementRef, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {IPaymentNewAccount} from '../../../../../store/Payments/';

@Component({
    selector        : 'payment-steps-add-account',
    templateUrl     : './payment-steps-add-account.component.html',
    styleUrls       : [ './payment-steps-add-account.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentStepsAddAccountComponent: provides payment account creation during payment workflow
 */
export class PaymentStepsAddAccountComponent {
    /**
     * PaymentStepsAddAccountComponent constructor
     * @param renderer
     * @param builder
     */
    constructor (
        private renderer    : Renderer,
        private builder     : FormBuilder

    ) {
        // init form input fields
        this.accountName    = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
        this.accountRouting = new FormControl('', Validators.compose([Validators.required, Validators.minLength(9)]));
        this.accountNumber  = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(17)]));
        this.accountPhone   = new FormControl('', Validators.required);

        // build FormControl group
        this.newAccountForm = builder.group({
            accountName     : this.accountName,
            accountRouting  : this.accountRouting,
            accountNumber   : this.accountNumber,
            accountPhone    : this.accountPhone
        });

    }

    /**
     * list of SVG icons being used in our template
     * @type {{edit: (any|T)}}
     */
    icons : any = {
        close : require('images/SvgIcons/icon-close.svg')
    };

    @ViewChild('accountNameInput') input : ElementRef;

    /**
     * event triggered by close icon click
     * @type {EventEmitter}
     */
    @Output() closeAddAccount : EventEmitter<any> = new EventEmitter();

    /**
     * grouping object for new account entry form
     */
    newAccountForm : FormGroup;

    /**
     * bank account name input field
     */
    accountName : FormControl;

    /**
     * bank account routing # input field
     */
    accountRouting : FormControl;

    /**
     * bank account number input field
     */
    accountNumber : FormControl;

    /**
     * bank phone number input field
     */
    accountPhone : FormControl;

    /**
     * flag indicating account name entry completed
     * @type {boolean}
     */
    accountNameComplete : boolean = false;

    /**
     * flag indicating account entry form completed
     * @type {boolean}
     */
    accountFormComplete : boolean = false;

    /**
     * store new account model data here
     * @type {IPaymentNewAccount}
     */
    accountDetails : IPaymentNewAccount = <IPaymentNewAccount> {};

    /**
     * ENTER keypress handler for account name field
     * @param event
     */
    accountNameEntered(event : any) {
        event.preventDefault();
        event.stopPropagation();

        // check for valid entry
        this.accountName.valid ? this.accountNameComplete = true : this.accountNameComplete = false;
    }

    /**
     * ENTER and TAB keypress handler for account phone field
     * @param event
     */
    accountPhoneEntered(event : any) {
        event.preventDefault();
        event.stopPropagation();

        // check if form is valid
        this.newAccountForm.valid ? this.accountFormComplete = true : this.accountFormComplete = false;
    }

    /**
     * catch any ENTER keypresses on the form itself
     * @param event
     */
    formSubmit(event : any) {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * close icon click handler
     */
    hideAddAccount() {
        this.closeAddAccount.emit(undefined);
    }

    /**
     * create account button click handler
     */
    createNewAccount() {
        this.hideAddAccount();
    }

    /**
     * component after view render lifecycle hook
     */
    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus', undefined);
    }
}
