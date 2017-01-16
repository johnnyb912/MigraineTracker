import {Injectable} from '@angular/core';
import {NgRedux} from 'ng2-redux';

import {IAppState} from '../app-store';

@Injectable()

/**
 * implementation for EmployerChangesStateSelectors: responsible for exposing custom state subscriptions to EmployerChangesState
 */
export class EmployerChangesStateSelectors {
    /**
     * EmployerChangesStateSelectors constructor
     * @param store
     */
    constructor(private store : NgRedux<IAppState>) {}
}
