import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ViewChild
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

import {
    IDropdownOption,
    UserInfoState,
    IUserInfoFieldUpdate
} from '../../../../../store/User/';

@Component({
    selector        : 'user-info',
    templateUrl     : './user-info.component.html',
    styleUrls       : [ './user-info.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation for UserInfoComponent: displays user profile info and handles updates to the information
 */
export class UserInfoComponent {
    /**
     * UserInfoComponent constructor
     */
    constructor (private builder : FormBuilder) {
        // init form input fields
        this.employeeId     = new FormControl('', Validators.required);
        this.language       = new FormControl('', Validators.required);
        this.street         = new FormControl('', Validators.required);
        this.city           = new FormControl('', Validators.required);
        this.state          = new FormControl('', Validators.required);
        this.postalCode     = new FormControl('', Validators.required);
        this.phoneNumber    = new FormControl('', Validators.required);
        this.emailAddress   = new FormControl('', Validators.required);

        // build FormControl group
        this.userProfileForm = builder.group({
            employeeId      : this.employeeId,
            language        : this.language,
            street          : this.street,
            city            : this.city,
            state           : this.state,
            postalCode      : this.postalCode,
            phoneNumber     : this.phoneNumber,
            emailAddress    : this.emailAddress
        });

        // subscribe to any form changes
        this.employeeId.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.userFieldValueUpdate.emit({
                fieldName   : 'employeeId',
                fieldValue  : value
            });
        });

        this.language.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.userFieldValueUpdate.emit({
                fieldName   : 'language',
                fieldValue  : value
            });
        });

        this.street.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.userFieldValueUpdate.emit({
                fieldName   : 'street',
                fieldValue  : value
            });
        });

        this.city.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.userFieldValueUpdate.emit({
                fieldName   : 'city',
                fieldValue  : value
            });
        });

        this.state.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.userFieldValueUpdate.emit({
                fieldName   : 'state',
                fieldValue  : value
            });
        });

        this.postalCode.valueChanges.debounceTime(500).subscribe((value : string) => {
            // update model with latest value
            this.userFieldValueUpdate.emit({
                fieldName   : 'postalCode',
                fieldValue  : value
            });
        });
    }

    /**
     * DOM reference for pikaday datepicker
     */
    @ViewChild('datePickerButton') datePickerButton;

    /**
     * logged in user's display name
     * @type {UserInfoState}
     */
    @Input() profileDetails : UserInfoState;

    /**
     * controls the collapsed state of User Info section
     * @type {boolean}
     */
    @Input() isExpanded : boolean = false;

    /**
     * flag to keep track of when the user profile form is being edited
     * @type {boolean}
     */
    @Input() isEditing : boolean = false;

    /**
     * flag to allow component to
     */
    @Input() isCollapsible : boolean;

    /**
     * event triggered when user's profile information is edited/saved
     * @type {"events".EventEmitter}
     */
    @Output() updateProfile : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user expands/collapses Personal Information section
     * @type {EventEmitter}
     */
    @Output() toggleExpanded : EventEmitter<any> = new EventEmitter();

    /**
     * event triggered when user edits the personal information section
     * @type {EventEmitter}
     */
    @Output() toggleEditing : EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * event triggered whenever user edits a user info details field value
     * @type {EventEmitter<IUserInfoFieldUpdate>}
     */
    @Output() userFieldValueUpdate : EventEmitter<IUserInfoFieldUpdate> = new EventEmitter<IUserInfoFieldUpdate>();

    /**
     * grouping object for user profile form
     */
    userProfileForm : FormGroup;

    /**
     * user's employeeId input field
     */
    employeeId : FormControl;

    /**
     * user's language preference input field
     */
    language : FormControl;

    /**
     * user's street address input field
     */
    street : FormControl;

    /**
     * user's city input field
     */
    city : FormControl;

    /**
     * user's state input field
     */
    state : FormControl;

    /**
     * user's zip code input field
     */
    postalCode : FormControl;

    /**
     * user's phone number input field
     */
    phoneNumber : FormControl;

    /**
     * user's email addy input field
     */
    emailAddress : FormControl;

    /**
     * Date format to use in date picker
     * @type {string}
     */
    dateFormat : string = 'MM/DD/YYYY';

    /**
     * store user's selected phone type here for their contact phone #
     * @type {string}
     */
    selectedPhoneType : string = 'Phone';

    /**
     * store user's selected gender here
     * @type {string}
     */
    selectedGender : string = 'Male';

    /**
     * list of SVG icons being used in our template
     * @type {{edit: (any|T), employeeId: (any|T), language: (any|T), address: (any|T), gender: (any|T), birthday: (any|T), phone: (any|T), email: (any|T)}}
     */
    icons : any = {
        edit       : require('images/SvgIcons/icon-edit.svg'),
        employeeId : require('images/SvgIcons/icon-employee-id.svg'),
        language   : require('images/SvgIcons/icon-language.svg'),
        address    : require('images/SvgIcons/icon-address.svg'),
        gender     : require('images/SvgIcons/icon-gender.svg'),
        birthday   : require('images/SvgIcons/icon-birthday.svg'),
        phone      : require('images/SvgIcons/icon-phone.svg'),
        email      : require('images/SvgIcons/icon-email.svg'),
        minus      : require('images/SvgIcons/icon-minus.svg'),
        plus       : require('images/SvgIcons/icon-plus.svg')
    };

    /**
     * list of available phone types for user to select
     * @type {{id: number; value: string}[]}
     */
    phoneTypes : Array<IDropdownOption> = [
        {
            id    : 0,
            value : 'Home'
        },
        {
            id    : 1,
            value : 'Phone'
        },
        {
            id    : 2,
            value : 'Other'
        }
    ];

    /**
     * list of available gender types for user to select
     * @type {{id: number; value: string}[]}
     */
    genders : Array<IDropdownOption> = [
        {
            id    : 0,
            value : 'Male'
        },
        {
            id    : 1,
            value : 'Female'
        }
    ];

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
     * format the selected birth date
     * @param date
     */
    updateSelectedDOB(date : string) {
        this.userFieldValueUpdate.emit({
            fieldName   : 'DOB',
            fieldValue  : date
        });
    }

    /**
     * event handler for hide/show collapse toggle
     */
    toggleExpandedState() {
        // is enabled for hide/show??
        if (this.isCollapsible) {
            // trigger event
            this.toggleExpanded.emit();
        }
    }

    /**
     * handles enable/disable of editing fields on user profile form
     * @param action
     * @param $event
     */
    enableEdit(action : boolean, $event : any) {
        $event.preventDefault();
        $event.stopPropagation();

        // update current editing state of form
        this.toggleEditing.emit(action);

        // expand section below when edit icon clicked
        if (!this.isExpanded && action) {
            this.toggleExpanded.emit(undefined);
        }
    }

    /**
     * event handler for phone type selection event
     * @param choice selected phone tye
     * @param event DOM event
     */
    updatePhoneType(choice : { id : number, value : string }, event : any) {
        // update profile phone type
        this.userFieldValueUpdate.emit({
            fieldName   : 'phoneType',
            fieldValue  : choice.value
        });
    }

    /**
     * event handler for gender selection event
     * @param choice selected phone tye
     * @param event DOM event
     */
    updateGender(choice : { id : number, value : string }, event : any) {
        // update profile phone type
        this.userFieldValueUpdate.emit({
            fieldName   : 'gender',
            fieldValue  : choice.value
        });
    }

    /**
     * triggers save of user's edited profile data
     * @param $event
     */
    saveUserProfile($event : any) {
        $event.preventDefault();
        $event.stopPropagation();

        // trigger save user event
        this.updateProfile.emit(this.profileDetails);
    }
}
