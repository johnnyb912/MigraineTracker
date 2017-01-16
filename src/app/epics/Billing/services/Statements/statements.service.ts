import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BackendService} from '../../../../shared/services';
import {STATEMENTS_MOCK} from './statements.service.mocks';

@Injectable()

/**
 * Implementation of StatementsService: provides methods for use in the Billing epic
 */
export class StatementsService {
    /**
     * StatementsService constructor
     * @param backendService
     */
    constructor (private backendService : BackendService) {}

    /**
     * retrieve list of billing statements
     */
    getStatements() {
        let statements;

        return Observable.create(observer => {
            // refresh dashboard data
            this.backendService.get('getStatements', STATEMENTS_MOCK)
                .first()
                .subscribe(response => {
                    // store dashboard data
                    statements = response;

                    // update Redux store
                    observer.next(statements);
                }, error => {
                    observer.error(undefined);
                });
        });
    }
}
