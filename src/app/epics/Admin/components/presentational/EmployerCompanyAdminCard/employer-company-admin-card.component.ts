import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {CompanyState} from '../../../../../store/EmployerChanges/';

@Component({
    selector         :  'employer-company-admin-card',
    templateUrl     : './employer-company-admin-card.component.html',
    styleUrls       : [ './employer-company-admin-card.component.scss' ],
    changeDetection  :  ChangeDetectionStrategy.OnPush
})

/**
 * implementation for EmployerCompanyAdminCardComponent; responsible for employer company card layout
 */
export class EmployerCompanyAdminCardComponent {
    /**
     * EmployerCompanyAdminCardComponent constructor
     */
    constructor(private builder : FormBuilder) {
        // init form input fields
        this.phoneNumber        = new FormControl('', Validators.required);
        this.phoneType          = new FormControl('', Validators.required);
        this.phone              = new FormControl('', Validators.required);
        this.email              = new FormControl('', Validators.required);
        this.name               = new FormControl('', Validators.required);

        // build FormControl group
        this.companyCardForm = builder.group({
            phoneNumber         :  this.phoneNumber,
            phoneType           :  this.phoneType,
            phone               :  this.phone,
            email               :  this.email,
            name                :  this.name
        });

        // subscribe to any form changes
        this.phone.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.cardData = this.cardData.set('phone', value) as CompanyState;
        });

        this.email.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.cardData = this.cardData.set('email', value) as CompanyState;
        });

        this.name.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.cardData = this.cardData.set('name', value) as CompanyState;
        });
    }

    /**
     * information to display on card
     */
    @Input() cardData : CompanyState;

    /**
     * controls the collapsed state of company admin section
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
     * event triggered when user expands/collapses admin section
     * @type {EventEmitter}
     */
    @Output() toggleExpanded : EventEmitter<any> = new EventEmitter();

    /**
     * used to store pristine copy of card data
     * in case user cancels their changes when editing
     */
    private cardDataPristine : CompanyState = new CompanyState();

    /**
     * event triggered when user clicks on Employees link
     * @type {EventEmitter}
     */
    @Output() employeesLink : EventEmitter<any> = new EventEmitter();

    /**
     * grouping object for user profile form
     */
    companyCardForm : FormGroup;

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
     * name input field
     */
    name : FormControl;

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
     * event handler for employee link
     */
    employeesLinkState() {
        this.employeesLink.emit(undefined);
    }

    /**
     * handles enable/disable of editing fields on user profile form
     * @param action
     * @param $event
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
        iconPhoneOutline    :  require('images/SvgIcons/icon-phone-outline.svg'),
        iconEnvelope        :  require('images/SvgIcons/icon-envelope.svg'),
        iconPerson          :  require('images/SvgIcons/icon-person.svg'),
        iconEmployeeProfile :  require('images/SvgIcons/icon-employee-profile.svg'),
        iconEdit            :  require('images/SvgIcons/icon-edit.svg')
    };
}
