import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BackendService} from '../../../../shared/services/';
import {PAYMENTS_MOCK} from './payments.service.mocks';

@Injectable()

/**
 * Implementation of PaymentsService: provides methods for use in Payment workflow
 */
export class PaymentsService {
    /**
     * PaymentsService constructor
     * @param backendService
     */
    constructor (private backendService : BackendService) {}

    /**
     * retrieve list of payment accounts for user
     */
    getPaymentAccounts() {
        let accounts;

        return Observable.create(observer => {
            // refresh dashboard data
            this.backendService.get('getPaymentAccounts', PAYMENTS_MOCK)
                .first()
                .subscribe(response => {
                    // store dashboard data
                    accounts = response;

                    // update store
                    observer.next(accounts);
                }, error => {
                    // update store
                    observer.error(undefined);
                });
        });
    }
}
