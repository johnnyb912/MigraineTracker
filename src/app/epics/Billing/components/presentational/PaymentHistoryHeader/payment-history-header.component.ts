import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector        : 'payment-history-header',
    templateUrl     : './payment-history-header.component.html',
    styleUrls       : [ './payment-history-header.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of PaymentHistoryHeaderComponent
 */
export class PaymentHistoryHeaderComponent {
    /**
     * PaymentHistoryHeaderComponent constructor
     */
    constructor () {}

    /**
     * value to display Title in header
     * @type {String}
     */
    @Input() title : string;

    /**
     * controls the visible state of the search field input
     * @type {boolean}
     */
    searchFieldExpand : boolean = false;

    /**
     * list of SVG icons being used in our template
     * @type {{statement: (any|T)}}
     */
    icons : any = {
        statement   : require('images/SvgIcons/icon-statement.svg'),
        search      : require('images/SvgIcons/icon-search.svg'),
        close       : require('images/SvgIcons/icon-close.svg'),
        filter      : require('images/SvgIcons/icon-filter.svg')
    };
}
