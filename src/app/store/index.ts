import {Action} from 'redux';
import * as createLogger from 'redux-logger';
import * as persistState from 'redux-localstorage';

import {deimmutify, reimmutify} from './app-store';

export interface IPayloadAction extends Action {
    payload? : any;
}

export * from './app-store';

export let middleware = [];

export let enhancers = [];

if (ENV !== 'build:prod' && ENV !== 'dev:prod' && ENV !== 'build:dev:live') {
    // sync with local storage for local debugging
    enhancers.push(persistState(
        '',
        {
            key             : 'angular2.x-seed-project',
            serialize       : store => JSON.stringify(deimmutify(store)),
            deserialize     : state => reimmutify(JSON.parse(state))
        }));

    // enable redux-logger middleware
    middleware.push(
        createLogger({
            level               : 'info',
            collapsed           : true,
            stateTransformer    : deimmutify
        }));

    const ENVIRONMENT : any = window || this;

    if (ENVIRONMENT.devToolsExtension) {
        enhancers.push(ENVIRONMENT.devToolsExtension());
    }
}
else {
    // clear any previous Redux store from local storage
    localStorage.removeItem('angular2.x-seed-project');
}
