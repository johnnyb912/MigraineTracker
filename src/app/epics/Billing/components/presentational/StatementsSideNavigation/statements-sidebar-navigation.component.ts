import {Component, Input, ElementRef, ChangeDetectionStrategy, Output, EventEmitter, ViewChildren} from '@angular/core';
import {List} from 'immutable';

import {
    BillingStatementSummaryState,
    BillingStatementState
} from '../../../../../store/Statements/';

@Component({
    selector        : 'statements-sidebar-navigation',
    templateUrl     : './statements-sidebar-navigation.component.html',
    styleUrls       : [ './statements-sidebar-navigation.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation for StatementsSideBarNavigationComponent: handles billing page navigation functionality
 */
export class StatementsSideBarNavigationComponent {
    /**
     * StatementsSideBarNavigationComponent constructor
     * @param elementRef
     */
    constructor(elementRef : ElementRef) {
        // store DOM reference to component element
        this.elementRef = elementRef;
    }

    /**
     * list of statements to display for summary
     */
    @Input() statementSummary : List<BillingStatementSummaryState>;

    /**
     * event triggered when statements are selected for display
     * @type {EventEmitter}
     */
    @Output() statementSelected : EventEmitter<any> = new EventEmitter();

    /**
     * flag to show/hide Statement Sidebar
     * @type {boolean}
     */
    @Input() statementSidebarView : boolean;

    /**
     * DOM reference to sidebarContainer element
     */
    @ViewChildren('sidebarContainer') sidebarContainer;

    /**
     * reference to DOM element of component
     */
    private elementRef : ElementRef;

    /**
     * flag to hide/show previous year
     * @type {boolean}
     */
    showPreviousYear : boolean = true;

    /**
     * flag to hide/show next year
     * @type {boolean}
     */
    showNextYear : boolean = false;

    /**
     * list of icons requird by component template
     * @type {{checkmark: (any|T)}}
     */
    icons : any = {
        checkmark  : require('images/SvgIcons/icon-checkmark.svg')
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
     * method to slide the sidebar between years
     * @param direction
     * @param index
     */
    doNavigateYear(direction : string, index : number) {
        // Get the dom elements for each year container
        let sidebarArray = this.sidebarContainer.toArray();

        let elementToHide = sidebarArray[index].nativeElement;

        if (direction === 'next') {
            let elementToShow = sidebarArray[index - 1].nativeElement;

            elementToHide.className += ' Left';
            elementToShow.className += ' Active';

            setTimeout(() => {
                elementToHide.className = elementToHide.className.replace(/((?:^|\s)Active Left(?!\S))/, ' Prev');
                elementToShow.className = elementToShow.className.replace(/((?:^|\s)Next(?!\S))/, '');
            }, 400);

            if (index - 1 === 0) {
                this.showPreviousYear = true;
                this.showNextYear     = false;
            }
            else {
                this.showPreviousYear = true;
                this.showNextYear     = true;
            }
        }
        else {
            let elementToShow = sidebarArray[index + 1].nativeElement;

            elementToHide.className += ' Right';
            elementToShow.className += ' Active';

            setTimeout(() => {
                elementToHide.className = elementToHide.className.replace(/((?:^|\s)Active Right(?!\S))/, ' Next');
                elementToShow.className = elementToShow.className.replace(/((?:^|\s)Prev(?!\S))/, '');
            }, 400);

            if (index + 2 === sidebarArray.length) {
                this.showPreviousYear = false;
                this.showNextYear     = true;
            }
            else {
                this.showPreviousYear = true;
                this.showNextYear     = true;
            }
        }
    }

    /**
     * event handler for statement selection
     * @param statement
     * @param statementIndex
     */
    selectionMade(statement : BillingStatementState, statementIndex : number) {
        // handle DOM event
        event.preventDefault();
        event.stopPropagation();

        // emit selected statement
        this.statementSelected.emit(statement);
    }
}
