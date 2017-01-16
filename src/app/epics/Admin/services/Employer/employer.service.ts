import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BackendService} from '../../../../shared/services/';
import {EMPLOYER_MOCKS} from './employer.service.mocks';

@Injectable()

/**
 * Implementation of EmployerService: provides methods for use in the Billing epic
 */
export class EmployerService {
    /**
     * EmployerService constructor
     * @param backendService
     */
    constructor (private backendService : BackendService) {}

    /**
     * retrieve list of companies
     */
    getCompanies() {
        let companies;

        return Observable.create(observer => {
            // refresh dashboard data
            this.backendService.get('getCompanies', EMPLOYER_MOCKS)
                .first()
                .subscribe(response => {
                    // store dashboard data
                    companies = response;

                    // update Redux store
                    observer.next(companies);
                }, error => {
                    observer.error(undefined);
                });
        });
    }

    /**
     * retrieve list of plans
     */
    getPlans() {
        let plans;

        return Observable.create(observer => {
            // refresh dashboard data
            this.backendService.get('getPlans', EMPLOYER_MOCKS)
                .first()
                .subscribe(response => {
                    // store dashboard data
                    plans = response;

                    // update Redux store
                    observer.next(plans);
                }, error => {
                    observer.error(undefined);
                });
        });
    }
}
