import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../app-store';
import {DashBoardService} from '../../epics/Dashboard/services';
import {
    DashboardInfo,
    ICarouselMessage
} from './types/';

@Injectable()

export class DashboardActions {
    static DASHBOARD_BANNER_COLLAPSED = 'DASHBOARD_BANNER_COLLAPSED';
    static DASHBOARD_REFRESH          = 'DASHBOARD_REFRESH';
    static MESSAGES_REFRESH           = 'MESSAGES_REFRESH';

    constructor(
        private store               : NgRedux<IAppState>,
        private dashboardService    : DashBoardService
    ) {}

    dashboardGetDashboard() {
        this.dashboardService.getDashboard().subscribe(response => {
            this.dashboardRefresh(response);
        }, error => {
            this.dashboardRefresh(error);
        });
    }

    dashboardGetCarouselMessages() {
        this.dashboardService.getCarouselMessages().subscribe(response => {
            this.dashboardMessagesRefresh(response);
        }, error => {
            this.dashboardMessagesRefresh(error);
        });
    }

    private dashboardRefresh(data? : DashboardInfo) {
        this.store.dispatch({
            type    : DashboardActions.DASHBOARD_REFRESH,
            payload : data
        });
    }

    dashboardMessagesRefresh(messages : Array<ICarouselMessage>) {
        this.store.dispatch({
            type    : DashboardActions.MESSAGES_REFRESH,
            payload : messages
        });
    }

    dashboardToggleBannerCollapse(collapse : boolean) {
        this.store.dispatch({
            type    : DashboardActions.DASHBOARD_BANNER_COLLAPSED,
            payload : collapse
        });
    }
}
