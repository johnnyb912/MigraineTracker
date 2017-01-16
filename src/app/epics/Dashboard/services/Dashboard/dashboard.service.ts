import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BackendService} from '../../../../shared/services/';
import {DASHBOARD_MOCK} from './dashboard.service.mock';

@Injectable()

/**
 * Implementation of DashBoardService: returns summary data for display on Admin dashboard
 */
export class DashBoardService {
    /**
     * DashBoardService constructor
     * @param backendService
     */
    constructor (private backendService : BackendService) {}

    /**
     * retrieve the current dashboard display data
     */
    getDashboard() {
        let dashboard;

        return Observable.create(observer => {
            // refresh dashboard data
            this.backendService.get('getDashBoard', DASHBOARD_MOCK)
                .first()
                .subscribe(response => {
                    // store dashboard data
                    response.length ? dashboard = response[0] : dashboard = response;

                    // update Redux store
                    observer.next(dashboard);
                }, error => {
                    observer.error(undefined);
                });
        });
    }

    /**
     * retrieve list of carousel summary messages
     */
    getCarouselMessages() {
        let messages;

        return Observable.create(observer => {
            // refresh carousel messages
            this.backendService.get('getCarouselMessages', DASHBOARD_MOCK)
                .first()
                .subscribe(response => {
                    // store messages
                    messages = response;

                    // update Redux store
                    observer.next(messages);
                }, error => {
                    // update Redux store
                    observer.error(undefined);
                });
        });
    }
}
