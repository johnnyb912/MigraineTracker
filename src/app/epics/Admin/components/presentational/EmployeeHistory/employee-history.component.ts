import {Component, ChangeDetectionStrategy} from '@angular/core';

import * as moment from 'moment';

@Component({
    selector        : 'employee-history',
    templateUrl     : './employee-history.component.html',
    styleUrls       : [ './employee-history.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of EmployeeHistoryComponent: displays current employee history info to user
 */
export class EmployeeHistoryComponent {
    /**
     * EmployeeHistoryComponent constructor
     */
    constructor() {}

    /**
     * icons for use in displaying card bonus
     * @type {{user: (any|T)}}
     */
    icons : any = {
        checkmark   : require('images/SvgIcons/icon-checkmark.svg'),
        minus       : require('images/SvgIcons/icon-minus.svg'),
        plus        : require('images/SvgIcons/icon-plus.svg')
    };

    /**
     * flag for active year filter
     */
    yearValue : string = '2016';

    /**
     * flag for active day filter
     */
    dayValue : string = 'All Days';

    /**
     * flag for active month filter
     */
    monthValue : string = 'JUN';

    /**
     * month index to get default amount of days
     * according selected month
     */
    monthIndex : number = 6;

    /**
     * array of years (used for sorting)
     */
    yearsArray : Array<any> = [
        '2015', '2016'
    ];

    /**
     * array of months (used for sorting)
     */
    monthsArray : Array<any> = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
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
     * clicking on top filters
     */
    filterAction(yearValue : number, monthIndex : number) {
        this.getDays(yearValue, monthIndex);
    }

    /**
     * clicking on years and months (By Date of Hite filter)
     */
    dateAction(yearValue : any, monthValue : any, mIndex : any) {
        if (mIndex) {
            this.monthIndex = mIndex;
        }
        this.yearValue = yearValue;
        if (monthValue) {
            this.monthValue = monthValue;
        }
        this.getDays(yearValue, this.monthIndex);
    }

    daysArray : Array<any> = [];

    /**
     * get days amount according selected year and month
     */
    getDays(year : any, month : any) {
        let days = this.daysArray = [];

        if (month > 0) {
            let dayAmount = new Date(year, month, 0).getDate();
            for (let i = 0; i <= dayAmount; i++) {
                days.push(i);
            }
            this.daysArray = days.map(num => ('0' + num).slice(-2));
        }

        this.daysArray[0] = 'All Days';
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
     * flag for active updated filter
     * @type {string}
     */
    updatedValue : string = '';

    /**
     * array of updated (used for sorting)
     * @type {string[]}
     */
    updatedArray : Array<any> = [
        'Coverage',
        'Demographics',
        'Earnings',
        'Employment Information',
        'Terminations',
        'New Hires'
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
        this.dateAction(this.yearValue, this.monthValue, 6);
    }
}
