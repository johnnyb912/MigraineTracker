import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../app-store';

@Injectable()

/**
 * implementation for EmployeeChangesStateSelectors: responsible for exposing custom state subscriptions to EmployeeChangesState
 */
export class EmployeeChangesStateSelectors {
    /**
     * EmployeeChangesStateSelectors constructor
     * @param store
     */
    constructor(private store : NgRedux<IAppState>) {}
}
