import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {List} from 'immutable';

import {
    DashboardActions,
    CarouselMessage,
    DashboardStateSelectors
} from '../../../../../store/Dashboard/';

@Component({
    selector        : 'dashboard-carousel-container',
    templateUrl     : './dashboard-carousel-container.component.html',
    styleUrls       : [ './dashboard-carousel-container.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * Implementation of DashboardCarouselContainerComponent: handles the display of slides in the carousel banner on dashboard
 */
export class DashboardCarouselContainerComponent {
    /**
     * DashboardCarouselContainerComponent constructor
     * @param cd
     * @param dashboardActions
     * @param dashboardSelectors
     */
    constructor (
        private cd                  : ChangeDetectorRef,
        private dashboardActions    : DashboardActions,
        private dashboardSelectors  : DashboardStateSelectors
    ) {
        // observe dashboard state
        this.dashboardStateSubscription = Observable.combineLatest(
            this.dashboardSelectors.isBannerCollapsed(),
            this.dashboardSelectors.carouselMessages())
        .subscribe(val => {
            this.bannerCollapsed    = val[0];
            this.slides             = val[1];

            this.cd.markForCheck();
        });
    }

    /**
     * Redux state subscription
     */
    private dashboardStateSubscription : Subscription;

    /**
     * current snapshot of carousel slides
     */
    slides : List<CarouselMessage>;

    /**
     * current visibility state of carousel
     */
    bannerCollapsed : boolean;

    /**
     * number of seconds used for carousel interval setting
     * @type {number}
     */
    carouselInterval : number = 5000;

    /**
     * boolean flag used to stop carousel from continuously cycling through slides
     * @type {boolean}
     */
    noWrapSlides : boolean = false;

    /**
     * icon requires for collapse/expand icon
     * @type {{collapse: (any|T), expand: (any|T)}}
     */
    icons : any = {
        collapse    : require('images/SvgIcons/icon-collapse.svg'),
        expand      : require('images/SvgIcons/icon-expand.svg')
    };

    /**
     * image required for display carousel background
     * @type {any|T[]}
     */
    carouselImages : any = [
        require('images/banner-1@2x.png'),
        require('images/banner-2@2x.png'),
        require('images/banner-3@2x.png')
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
     * hides/shows the carousel banner
     * @param collapse
     */
    collapseBanner (collapse : boolean) {
        // trigger action
        this.dashboardActions.dashboardToggleBannerCollapse(collapse);
    }

    /**
     * component init lifecycle hook
     */
    ngOnInit () {
        // check for populated state first
        if (this.slides.size === 0) {
            // refresh state
            this.dashboardActions.dashboardGetCarouselMessages();
        }
    }

    ngOnDestroy() {
        // unsubscribe from state
        this.dashboardStateSubscription.unsubscribe();
    }
}
