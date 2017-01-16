import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';

@Component({
    selector        : 'statements-section-header',
    templateUrl     : './statements-section-header.component.html',
    styleUrls       : [ './statements-section-header.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of StatementsSectionHeaderComponent: displays header information across billing epic
 */
export class StatementsSectionHeaderComponent {
    /**
     * StatementsSectionHeaderComponent constructor
     */
    constructor() {}

    /**
     * value to display in header
     * @type {String}
     */
    @Input() title : string;

    /**
     * total amount of bills to pay
     * @type {String}
     */
    @Input() totalAmount : number;

    /**
     * event emitted when Pay All button is clicked
     * @type {EventEmitter}
     */
    @Output() payAll : EventEmitter<any> = new EventEmitter();

    /**
     * Pay All Button click event handler
     */
    doPayAll() {
        // we might do something useful with this later...
        this.payAll.emit(undefined);
    }

    /**
     * icons for use in displaying section icon
     * @type {{statement: (any|T)}}
     */
    icons : any = {
        statement : require('images/SvgIcons/icon-statement.svg')
    };
}
