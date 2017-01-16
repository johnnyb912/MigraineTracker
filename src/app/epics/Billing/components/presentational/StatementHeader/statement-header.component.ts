import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'statement-header',
    templateUrl     : './statement-header.component.html',
    styleUrls       : [ './statement-header.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of StatementHeaderComponent: header component on billing entry page
 */
export class StatementHeaderComponent {
    /**
     * StatementHeaderComponent constructor
     */
    constructor() { }

    /**
     * total of all selected bills
     * @type {number}
     */
    @Input() selectedTotal : string = '';

    /**
     * due date of selected bills(s)
     * @type {string}
     */
    @Input() dueDate : string = '';

    /**
     * event triggered resizing Statement Body
     * @type {EventEmitter}
     */
    @Output() statementBodyExpand : EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * flag that triggers which side of the card to display
     * @type {boolean}
     */
    statementsBodyExpand : boolean = false;

    /**
     * required icons for display in template
     * @type {{resize: (any|T), move: (any|T)}}
     */
    icons : any = {
        resize  : require('images/SvgIcons/icon-resize.svg'),
        move    : require('images/SvgIcons/icon-move.svg')
    };

    /**
     * click event handler for Statement Body resize
     */
    doStatementBodyExpand() {
        this.statementsBodyExpand = !this.statementsBodyExpand;

        // emit Statement Body resizing event
        this.statementBodyExpand.emit(this.statementsBodyExpand);
    }
}
