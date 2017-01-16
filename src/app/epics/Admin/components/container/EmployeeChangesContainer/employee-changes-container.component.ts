import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';

import {IAppState} from '../../../../../store/';
import {
    EmployeeChangesActions,
    EmployeeChangesState
} from '../../../../../store/EmployeeChanges/';

@Component({
    selector        : 'employee-changes',
    templateUrl     : './employee-changes-container.component.html',
    styleUrls       : [ './employee-changes-container.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation of EmployeeChangesContainerComponent
 */
export class EmployeeChangesContainerComponent {
    /**
     * EmployeeChangesContainerComponent constructor
     * @param store
     * @param cd
     * @param employeeChangesActions
     */
    constructor(
        private store                   : NgRedux<IAppState>,
        private cd                      : ChangeDetectorRef,
        private employeeChangesActions  : EmployeeChangesActions
    ) {
        // employee changes state
        this.employeeChangesSubscription = this.store.select(state => state.employeeChangesState).subscribe(val => {
            // update local state
            if (val.equals(this. employeeChangesState) !== true) {
                this.employeeChangesState = val;

                // mark the path from root of component tree to this component
                // for change detected on the next tick
                // We do this because we're set to ChangeDetectionStrategy.OnPush
                this.cd.markForCheck();
            }
        });
    }

    /**
     * Redux employee changes state subscription
     */
    private employeeChangesSubscription : Subscription;

    /**
     * current snapshot of employee changes state
     */
    employeeChangesState : EmployeeChangesState;

    /**
     * flag that triggers show or hide Modal window
     * @type {boolean}
     */
    showModal : boolean = false;

    /**
     * flag that triggers show or hide Action menu on top
     * @type {boolean}
     */
    showActions : boolean = false;

    /**
     * save reference to body tag for adding and removing modal class
     * @type {Node}
     */
    bodyRef : any = document.getElementsByTagName('body')[0];

    modal : any = {
        modalType : '',
        employee  : {}
    };

    employeeCards : Array<any> = [
        {
            initials     : 'JA',
            firstName     : 'John',
            middleInitial : 'C',
            lastName      : 'Anderson',
            codes         : 'M27 - D4Z - 23A9',
            STD           : true,
            LTD           : true,
            CI            : false,
            hiredDate     : '07/02/2014',
            dateOfBirth   : '02/19/1971',
            status        : 'Active'
        },
        {
            initials     : 'KB',
            firstName     : 'Kim',
            middleInitial : 'T',
            lastName      : 'Barrow',
            codes         : 'M73 - TM2 - 91SY',
            STD           : true,
            LTD           : false,
            CI            : false,
            hiredDate     : '03/22/2011',
            dateOfBirth   : '05/25/1984',
            status        : 'Active'
        },
        {
            initials     : 'TC',
            firstName     : 'Tom',
            middleInitial : 'E',
            lastName      : 'Christianson',
            codes         : 'M1T - 12Z - 2R04',
            STD           : true,
            LTD           : true,
            CI            : false,
            hiredDate     : '01/02/2013',
            dateOfBirth   : '06/11/1990',
            status        : 'Terminated'
        }
    ];

    /**
     * custom track by index function for ngFor directives
     * @param index
     * @returns {number}
     */
    static trackByIndex(index : number) : any {
        return index;
    }

    /**
     * highlighting of the filter
     * @param filter
     */
    setFilterList(filter : number) {
        this.onHighlightFilter(filter);
    }

    /**
     * event handler for employee action buttons
     * @param data data to pass into modal
     */
    onEmployeeActionSelected(data : any) {
        this.modal = {
            modalType : data.type,
            employee  : data.employee
        };

        // Add .Fixed class to body when modal is open to prevent page behind modal from scrolling
        this.bodyRef.className += ' Fixed';

        this.showModal = true;
    }

    /**
     * event handler for reaction on card checkbox
     */
    onCardChecked(isChecked : boolean) {
        this.showActions = isChecked;
    }

    /**
     * event handler for closing modal window
     */
    onCloseModal() {
        this.modal = {
            modalType : '',
            employee  : {}
        };

        // Remove .Fixed class on body that prevents scroll when modal is open
        this.bodyRef.className = this.bodyRef.className.replace(/((?:^|\s)Fixed(?!\S))/, '');

        this.showModal = false;
    }

    /**
     * array of the days of month
     */
    daysArray : Array<any> = [];

    /**
     * highlighting current menu item
     */
    onHighlightMenuItem(key : number) {
        this.employeeChangesActions.employeeChangesHighlightMenuItem(key);
    }

    /**
     * highlighting of the year
     */
    onHighlightYear(year : number) {
        this.employeeChangesActions.employeeChangesHighlightYear(year);
    }

    /**
     * highlighting of the month
     */
    onHighlightMonth(month : string) {
        this.employeeChangesActions.employeeChangesHighlightMonth(month);
    }

    /**
     * highlighting of the status
     */
    onHighlightStatus(status : number) {
        this.employeeChangesActions.employeeChangesHighlightStatus(status);
    }

    /**
     * highlighting of the status
     */
    onHighlightCoverage(coverage : number) {
        this.employeeChangesActions.employeeChangesHighlightCoverage(coverage);
    }

    /**
     * highlighting of the day
     */
    onHighlightDay(day : any) {
        this.employeeChangesActions.employeeChangesHighlightDay(day);
    }

    /**
     * highlighting of the recently updated type
     */
    onHighlightRecentlyUpdatedType(recentlyUpdatedType : number) {
        this.employeeChangesActions.employeeChangesHighlightRecentlyUpdatedType(recentlyUpdatedType);
    }

    /**
     * highlighting of the filter
     */
    onHighlightFilter(filterActive : number) {
        this.employeeChangesActions.employeeChangesHighlightFilter(filterActive);
    }

    /**
     * highlighting of the view type
     */
    onHighlightViewType(viewTypeActive : number) {
        this.employeeChangesActions.employeeChangesHighlightViewType(viewTypeActive);
    }

    /**
     * icons for use in component
     * @type {}
     */
    icons : any = {
        gear        : require('images/SvgIcons/icon-gear.svg'),
        person      : require('images/SvgIcons/icon-person.svg'),
        checkmark   : require('images/SvgIcons/icon-checkmark.svg'),
        collapse    : require('images/SvgIcons/icon-collapse.svg'),
        minus       : require('images/SvgIcons/icon-minus.svg'),
        plus        : require('images/SvgIcons/icon-plus.svg'),
        viewList    : require('images/SvgIcons/icon-hamburger.svg'),
        viewTile    : require('images/SvgIcons/icon-view-tile.svg')
    };

    /**
     * Show/Hide List or Tile view for Cards
     * @param viewType
     */
    changeView(viewType : number) {
        this.onHighlightViewType(viewType);
    }

    /**
     * clicking on top filters
     * @param filterValue
     */
    filterAction(filterValue : number) {
        this.onHighlightMenuItem(filterValue);
    }

    /**
     * getting month index
     * @param monthValue
     */
    getMonthIndex(monthValue : any) {
        let mIndex = 0;

        for (let i = 0; i < this.employeeChangesState.get('months').size; i++) {
            if (this.employeeChangesState.getIn(['months', i]) === monthValue) {
                mIndex = i + 1;

                break;
            }
        }

        return mIndex;
    }

    /**
     * clicking on years
     * @param yearValue
     * @param monthValue
     */
    updateYear(yearValue : any, monthValue : any) {
        this.onHighlightYear(yearValue);

        this.getDays(yearValue, this.getMonthIndex(monthValue));
    }

    /**
     * clicking on months
     * @param yearValue
     * @param monthValue
     * @param mIndex
     */
    updateMonth(yearValue : any, monthValue : any, mIndex : any) {
        this.onHighlightMonth(monthValue);

        if (typeof mIndex === 'number') {
            mIndex++;
        }

        this.getDays(yearValue, mIndex);
    }

    /**
     * clicking on years (By Statement)
     * @param statusValue
     */
    updateStatus(statusValue : number) {
        this.onHighlightStatus(statusValue);
    }

    /**
     * clicking on coverages (By Coverage)
     * @param coverageValue
     */
    updateCoverage(coverageValue : number) {
        this.onHighlightCoverage(coverageValue);
    }

    /**
     * clicking on date (By Date of Hire)
     * @param dayValue
     */
    updateDay(dayValue : any) {
        this.onHighlightDay(dayValue);
    }

    /**
     * clicking on recently updated type (Recently Updated)
     * @param recentlyUpdatedType
     */
    updateRecentlyUpdatedType(recentlyUpdatedType : number) {
        this.onHighlightRecentlyUpdatedType(recentlyUpdatedType);
    }

    /**
     * get days amount according selected year and month
     * @param year
     * @param monthIndex
     */
    getDays(year : any, monthIndex : number) {
        let days  = this.daysArray = [],
            index = monthIndex;

        if (index > 0) {
            let dayAmount = moment(year + '-' +  index, 'YYYY-MM').daysInMonth();

            for (let i = 0; i <= dayAmount; i++) {
                days.push(i);
            }

            this.daysArray = days.map(num => ('0' + num).slice(-2));
        }

        this.daysArray[0] = 'ALL_DAYS';
    }

    /**
     * array for recently updated
     * @type {{isCollapsed: boolean, date: any, events: {time: string, name: string, typeUpdate: string, from: string, to: string, by: string}[]}[]}
     */
    updatedList : Array<any> =  [
        {
            isCollapsed : false,
            date: moment('06.05.16'),
            events: [
                {
                    time: '5.45 PM',
                    name: 'Kim T. Barrow',
                    typeUpdate: 'address',
                    from: '776 22nd St, Chattanooga, TN 37377',
                    to: '123 Fifth Ave S, Chattanooga, TN 37377',
                    by: 'Tom Tompkins (Plan Administrator)'
                },
                {
                    time: '5.33 PM',
                    name: 'Kim T. Barrow',
                    typeUpdate: 'cell',
                    from: '312-231-2313',
                    to: '838-312-3884',
                    by: 'Tom Tompkins (Plan Administrator)'
                },
                {
                    time: '5.27 PM',
                    name: 'Kim T. Barrow',
                    typeUpdate: 'earnings',
                    from: '$3,000 Monthly',
                    to: '$3,500 Monthly',
                    by: 'Tom Tompkins (Plan Administrator)'
                }
            ]
        },
        {
            isCollapsed : false,
            date: moment('06.01.16'),
            events: [
                {
                    time: '5.45 PM',
                    name: 'Kim T. Barrow',
                    typeUpdate: 'address',
                    from: '776 22nd St, Chattanooga, TN 37377',
                    to: '123 Fifth Ave S, Chattanooga, TN 37377',
                    by: 'Tom Tompkins (Plan Administrator)'
                },
                {
                    time: '5.33 PM',
                    name: 'Kim T. Barrow',
                    typeUpdate: 'cell',
                    from: '312-231-2313',
                    to: '838-312-3884',
                    by: 'Tom Tompkins (Plan Administrator)'
                }
            ]
        },
        {
            isCollapsed : false,
            date: moment('04.20.16'),
            events: [
                {
                    time: '5.45 PM',
                    name: 'Kim T. Barrow',
                    typeUpdate: 'address',
                    from: '776 22nd St, Chattanooga, TN 37377',
                    to: '123 Fifth Ave S, Chattanooga, TN 37377',
                    by: 'Tom Tompkins (Plan Administrator)'
                },
                {
                    time: '5.33 PM',
                    name: 'Kim T. Barrow',
                    typeUpdate: 'cell',
                    from: '312-231-2313',
                    to: '838-312-3884',
                    by: 'Tom Tompkins (Plan Administrator)'
                },
                {
                    time: '5.27 PM',
                    name: 'Kim T. Barrow',
                    typeUpdate: 'earnings',
                    from: '$3,000 Monthly',
                    to: '$3,500 Monthly',
                    by: 'Tom Tompkins (Plan Administrator)'
                }
            ]
        }
    ];

    /**
     * flag of default value for show/hide updated list
     * @type {boolean}
     */
    action : boolean = false;

    /**
     * handles enable/disable of updated list
     * @param action
     */
    selectedItem(action : boolean) {
        this.updatedList.forEach(item => item.isCollapsed = action) ;
    }

    /**
     * onInit Interface
     */

    ngOnInit() {
        // array of the days
        this.getDays(this.employeeChangesState.get('yearActive'), this.getMonthIndex(this.employeeChangesState.get('monthActive')));
    }
}
