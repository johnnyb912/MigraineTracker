import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {CompanyState} from '../../../../../store/EmployerChanges/';

@Component({
    selector        : 'employer-company-group-card',
    templateUrl     : './employer-company-group-card.component.html',
    styleUrls       : [ './employer-company-group-card.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for EmployerCompanyGroupCardComponent; responsible for employer company card layout
 */
export class EmployerCompanyGroupCardComponent {
    /**
     * EmployerCompanyGroupCardComponent constructor
     */
    constructor(private builder : FormBuilder) {
        // init form input fields
        this.address            = new FormControl('', Validators.required);
        this.city               = new FormControl('', Validators.required);
        this.state              = new FormControl('', Validators.required);
        this.zipCode            = new FormControl('', Validators.required);
        this.phoneNumber        = new FormControl('', Validators.required);
        this.phoneType          = new FormControl('', Validators.required);
        this.phone              = new FormControl('', Validators.required);
        this.email              = new FormControl('', Validators.required);

        // build FormControl group
        this.companyCardForm = builder.group({
            address             : this.address,
            city                : this.city,
            state               : this.state,
            zipCode             : this.zipCode,
            phoneNumber         : this.phoneNumber,
            phoneType           : this.phoneType,
            phone               : this.phone,
            email               : this.email
        });

        // subscribe to any form changes
        this.address.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.cardData = this.cardData.set('address', value) as CompanyState;
        });

        this.city.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.cardData = this.cardData.set('city', value) as CompanyState;
        });

        this.state.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.cardData = this.cardData.set('state', value) as CompanyState;
        });

        this.zipCode.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.cardData = this.cardData.set('zipCode', value) as CompanyState;
        });

        this.phone.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.cardData = this.cardData.set('phone', value) as CompanyState;
        });

        this.email.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.cardData = this.cardData.set('email', value) as CompanyState;
        });
    }

    /**
     * information to display on card
     */
    @Input() cardData : CompanyState;

    /**
     * controls the collapsed state of company group section
     * @type {boolean}
     */
    @Input() isExpanded : boolean = false;

    /**
     * event triggered when user edits card information section
     * @type {EventEmitter}
     */
    @Output() updateCompanyInfo : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user changes form state card information section
     * @type {EventEmitter}
     */
    @Output() toggleEditing : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user expands/collapses group section
     * @type {EventEmitter}
     */
    @Output() toggleExpanded : EventEmitter<any> = new EventEmitter();

    /**
     * used to store pristine copy of card data
     * in case user cancels their changes when editing
     */
    private cardDataPristine : CompanyState = new CompanyState();

    /**
     * grouping object for user profile form
     */
    companyCardForm : FormGroup;

    /**
     * address input field
     */
    address : FormControl;

    /**
     * city input field
     */
    city : FormControl;

    /**
     * state input field
     */
    state : FormControl;

    /**
     * zipCode input field
     */
    zipCode : FormControl;

    /**
     * phoneNumber input field
     */
    phoneNumber : FormControl;

    /**
     * phoneType input field
     */
    phoneType : FormControl;

    /**
     * phone input field
     */
    phone : FormControl;

    /**
     * email input field
     */
    email : FormControl;

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
     * handles enable/disable of editing fields on user profile form
     * @param action boolean that indicates whether or not edit workflow is triggered or canceled
     * @param $event DOM click event
     */
    enableEdit(action : boolean, $event : any) {
        $event.preventDefault();
        $event.stopPropagation();

        // if user is editing, make a pristine copy of form data
        // if they are canceling an edit without saving we need to restore
        // the form data with the original values passed back from api
        action ? this.cardDataPristine = this.cardDataPristine.mergeDeep(this.cardData) as CompanyState : this.cardData = this.cardData.mergeDeep(this.cardDataPristine) as CompanyState;

        // update current editing state of form
        this.toggleEditing.emit(action);

        // expand section below when edit icon clicked
        if (!this.isExpanded && action) {
            this.toggleExpanded.emit(undefined);
        }
    }

    saveUserProfile($event : any) {
        $event.preventDefault();
        $event.stopPropagation();

        // disable editing and update current editing state of form
        this.toggleEditing.emit(false);

        // trigger save button
        this.updateCompanyInfo.emit(this.cardData);
    }

    /**
     * icons for use in component
     * @type {}
     */
    icons : any = {
        iconAddressMap      : require('images/SvgIcons/icon-address-map.svg'),
        iconPhoneOutline    : require('images/SvgIcons/icon-phone-outline.svg'),
        iconEnvelope        : require('images/SvgIcons/icon-envelope.svg'),
        iconEdit            : require('images/SvgIcons/icon-edit.svg')
    };
}
