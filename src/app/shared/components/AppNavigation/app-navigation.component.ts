import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {List} from 'immutable';

import {
    UserStateSelectors,
    UserActions,
    UserInfoState
} from '../../../store/User/';
import {
    DashboardStateSelectors,
    CarouselMessage
} from '../../../store/Dashboard/';
import {
    EnumNavOption,
    INavOption,
    NavActions,
    NavStateSelectors
} from '../../../store/Navigation/';

@Component({
    selector        : 'app-navigation',
    templateUrl     : './app-navigation.component.html',
    styleUrls       : [ './app-navigation.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for AppNavigationComponent: responsible for top level header menu navigation
 */
export class AppNavigationComponent {
    /**
     * AppNavigationComponent constructor
     * @param router
     * @param cd
     * @param userActions
     * @param navActions
     * @param navSelectors
     * @param dashboardSelectors
     * @param userSelectors
     */
    constructor(
        private router              : Router,
        private cd                  : ChangeDetectorRef,
        private userActions         : UserActions,
        private navActions          : NavActions,
        private navSelectors        : NavStateSelectors,
        private dashboardSelectors  : DashboardStateSelectors,
        private userSelectors       : UserStateSelectors
    ) {
        // subscribe to aggregated Redux state changes globally that we're interested in
        this.navigationSubscription = Observable.combineLatest(
            this.navSelectors.activeNavState(),
            this.userSelectors.userInfo(),
            this.dashboardSelectors.carouselMessages())
        .subscribe(val => {
            this.activeNavState = val[0];
            this.userInfo       = val[1];
            this.messages       = val[2];

            this.cd.markForCheck();
        });
    }

    /**
     * subscription to component's redux state
     */
    private navigationSubscription : Subscription;

    /**
     * controls the visible state of the sub navigation items
     * @type {boolean}
     */
    showSubMenu : boolean = false;

    /**
     * controls the visible state of the mobile navigation
     * @type {boolean}
     */
    showMobileNav : boolean = false;

    /**
     * icons for use in component
     * @type {{hamburger: any, user: any}}
     */
    icons : any = {
        hamburger : require('images/SvgIcons/icon-hamburger.svg'),
        user      : require('images/SvgIcons/icon-user.svg')
    };

    /**
     * list of possible nav states
     * @type {EnumNavOption}
     */
    navOptions : typeof EnumNavOption = EnumNavOption;

    /**
     * current active nav state
     */
    activeNavState : EnumNavOption;

    /**
     * current snapshot of user state
     */
    userInfo : UserInfoState;

    /**
     * carousel messages to display
     */
    messages : List<CarouselMessage>;

    /**
     * application navigation options with optional sub nav options
     * @type {{baseNavOption: EnumNavOption, title: string, subNav: {title: string, route: string}[]}}
     */
    appNavigation : Array<INavOption> = [
        {
            baseNavOption : this.navOptions.BILLING,
            title         : 'Billing',
            subNav        : [
                {
                    title : 'Statements',
                    route : '/Billing'
                },
                {
                    title : 'Payment History',
                    route : '/Billing/PaymentHistory'
                },
                {
                    title : 'Payment Methods',
                    route : '/Billing/PaymentMethods'
                },
                {
                    title : 'Pay Now',
                    route : '/Billing/Payment'
                }
            ]
        },
        {
            baseNavOption : this.navOptions.ADMIN,
            title         : 'Admin',
            subNav        : [
                {
                    title : 'Employer Changes',
                    route : '/Admin/EmployerChanges'
                },
                {
                    title : 'Employee Changes',
                    route : '/Admin/EmployeeChanges'
                }
            ]
        },
        {
            baseNavOption : this.navOptions.CLAIMS,
            title         : 'Claims',
            subNav        : []
        },
        {
            baseNavOption : this.navOptions.FORMS,
            title         : 'Forms',
            subNav        : []
        },
        {
            baseNavOption : this.navOptions.CONTACT,
            title         : 'Contact',
            subNav        : []
        },
        {
            baseNavOption : this.navOptions.MESSAGES,
            title         : 'Messages',
            subNav        : []
        }
    ];

    /**
     * profile navigation options
     * @type {{baseNavOption: EnumNavOption, title: string, subNav: Array}}
     */
    profileNavOption : INavOption = {
        baseNavOption : this.navOptions.PROFILE,
        title         : 'Profile',
        subNav        : []
    };

    /**
     * holds the sub navigation items for the selected main nav item
     * @type {Array}
     */
    selectedSubNav : Array<any> = [];

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
     * updates app navigation state and handle router navigation step
     * @param navItem current nav state to navigate to
     */
    doNavigation(navItem : INavOption) {
        let link : EnumNavOption = navItem.baseNavOption;

        // hide sub nav items
        this.showSubMenu = false;

        this.showMobileNav = false;

        this.selectedSubNav = [];

        // trigger nav action
        this.navActions.updateActiveNavState(link);

        if (navItem.subNav.length) {
            this.selectedSubNav = navItem.subNav;

            // show sub nav items
            this.showSubMenu = true;
        }
        else {
            // do routing
            switch (link) {
                case EnumNavOption.DASHBOARD :
                    this.router.navigate(['/Dashboard']);
                    break;
                case EnumNavOption.BILLING :
                    this.router.navigate(['/Billing']);
                    break;
                case EnumNavOption.ADMIN :
                    this.router.navigate(['/Admin']);
                    break;
                case EnumNavOption.CLAIMS :
                    this.router.navigate(['/Dashboard']);
                    break;
                case EnumNavOption.FORMS :
                    this.router.navigate(['/Dashboard']);
                    break;
                case EnumNavOption.CONTACT :
                    this.router.navigate(['/Dashboard']);
                    break;
                case EnumNavOption.MESSAGES :
                    this.router.navigate(['/Messages']);
                    break;
                case EnumNavOption.PROFILE :
                    this.router.navigate(['/Profile']);
                    break;
                default :
                    this.router.navigate(['/Dashboard']);
            }
        }
    }

    /**
     * handle router navigation step
     * @param route
     */
    doSubNavigation(route : string) {
        this.showSubMenu = false;

        this.showMobileNav = false;

        this.router.navigate([route]);
    }

    /**
     * component init lifecycle hook
     */
    ngOnInit() {
        // check for populated state first
        if (this.userInfo.get('employeeId') === '') {
            // somebody refreshed the page, get user data again
            this.userActions.userGetCurrentUser();
        }
    }

    /**
     * Component on destroy lifecycle hook
     */
    ngOnDestroy () {
        // unsubscribe
        this.navigationSubscription.unsubscribe();
    }
}
