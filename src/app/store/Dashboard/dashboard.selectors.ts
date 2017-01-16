import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NgRedux} from 'ng2-redux';
import {List} from 'immutable';

import {IAppState} from '../app-store';
import {CarouselMessage} from './types/carousel-message.model';
import {DashboardInfo} from './types/dashboard-info.model';

@Injectable()

/**
 * implementation for DashboardStateSelectors: responsible for exposing custom state subscriptions to DashboardState
 */
export class DashboardStateSelectors {
    /**
     * DashboardStateSelectors constructor
     * @param store
     */
    constructor(private store : NgRedux<IAppState>) {}

    /**
     * expose Observable to DashboardState.messages
     * @returns {Observable<List<CarouselMessage>>}
     */
    carouselMessages() : Observable<List<CarouselMessage>> {
        return this.store.select(state => state.dashboardState.get('messages'));
    }

    /**
     * expose Observable to DashboardState.bannerCollapsed
     * @returns {Observable<boolean>}
     */
    isBannerCollapsed() : Observable<boolean> {
        return this.store.select(state => state.dashboardState.get('bannerCollapsed'));
    }

    /**
     * expose Observable to DashboardState.dashboard
     * @returns {Observable<DashboardInfo>}
     */
    dashboardInfo() : Observable<DashboardInfo> {
        return this.store.select(state => state.dashboardState.get('dashboard'));
    }
}
