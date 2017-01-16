import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector        : 'statement-card',
    templateUrl     : './statement-card.component.html',
    styleUrls       : [ './statement-card.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of StatementCardComponent: displays current billing statement to user on Billing entry page
 */
export class StatementCardComponent {
    /**
     * StatementCardComponent constructor
     * @param builder
     */
    constructor(private builder : FormBuilder) {
        // init form input fields
        this.employees      = new FormControl('', Validators.required);
        this.coverage       = new FormControl('', Validators.required);
        this.adjustments    = new FormControl('', Validators.required);
        this.premium        = new FormControl('', Validators.required);

        // build FormControl group
        this.statementCardForm = builder.group({
            email       : this.employees,
            password    : this.coverage,
            adjustments : this.adjustments,
            premium     : this.premium
        });
    }

    /**
     * flag to enable/disable editing of fields
     */
    @Input() isEditable : boolean;

    /**
     * info for the statement card to populate template
     */
    @Input() cardData : any;

    /**
     * event emitted when statement data is edited and saved
     * @type {EventEmitter}
     */
    @Output() saveStatementCard : EventEmitter<any> = new EventEmitter();

    /**
     * grouping object for statement card form
     */
    statementCardForm : FormGroup;

    /**
     * statement employees input field
     */
    employees : FormControl;

    /**
     * statement coverage input field
     */
    coverage : FormControl;

    /**
     * statement adjustments input field
     */
    adjustments : FormControl;

    /**
     * statement premium input field
     */
    premium : FormControl;

    /**
     * flag to indicate when a statement card is actively being edited or not
     * @type {boolean}
     */
    isEditingCard : boolean = false;

    /**
     * required icons for display in template
     * @type {{close: (any|T), edit: (any|T), fall: (any|T), message: (any|T), more: (any|T)}}
     */
    icons : any = {
        close   : require('images/SvgIcons/icon-close.svg'),
        edit    : require('images/SvgIcons/icon-edit.svg'),
        fall    : require('images/SvgIcons/icon-fall.svg'),
        life    : require('images/SvgIcons/icon-life.svg'),
        message : require('images/SvgIcons/icon-message.svg'),
        more    : require('images/SvgIcons/icon-more.svg')
    };

    /**
     * save statement card click handler
     */
    doSaveStatementCard() {
        // emit event with new card data
        this.saveStatementCard.emit(this.cardData);

        // turn editing flag off
        this.isEditingCard = false;
    }

    wizardSteps : Array<any> = [
        {
            question : 'How many employees were hired between Dec 1-30, 2016?',
            answer   : '',
            tooltip  : ''
        },
        {
            question : 'How many employees were terminated between Dec 1-30, 2016?',
            answer   : '',
            tooltip  : ''
        },
        {
            question : 'What is the coverage amount?',
            answer   : '',
            tooltip  : 'The coverage amount is the premium sum of coverage for all employees.'
        },
        {
            question : 'Would you like to make any adjustments?',
            answer   : '',
            tooltip  : 'You may adjust your December statement based on unreported changes which may have occured in November.'
        }
    ];
}
