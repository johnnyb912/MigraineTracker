import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';

import {
    NavActions,
    EnumNavOption
} from '../../store/Navigation';

@Component({
    templateUrl     : './dashboard-entry.component.html',
    styleUrls       : [ './dashboard-entry.component.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})

/**
 * implementation for DashboardEntryComponent: responsible for dashboard page layout
 */
export class DashboardEntryComponent {
    /**
     * DashboardEntryComponent constructor
     * @param navActions
     */
    constructor (private navActions : NavActions) {}

    /**
     * component init lifecycle hook
     */
    ngOnInit() {
        // set active epic to dashboard
        this.navActions.updateActiveNavState(EnumNavOption.DASHBOARD);
    }
}
