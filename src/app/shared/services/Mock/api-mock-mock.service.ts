import {Injectable} from '@angular/core';
import {ResponseOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import * as utils from './api-mock-utils.service';

// pull in lodash methods
import * as _isArray      from 'lodash/isArray';
import * as _cloneDeep    from 'lodash/cloneDeep';
import * as _isUndefined  from 'lodash/isUndefined';

// pull in Ramda methods
/*import * as rMax      from 'ramda/src/max';
import * as rPluck    from 'ramda/src/pluck';*/

@Injectable()

/**
 * Implementation of APIMockMockService: implements a fully mocked api backend for consumption in the UI
 */
export class APIMockMockService {
    /**
     * APIMockMockService constructor
     */
    constructor() {}

    /**
     * Create a mock endpoint to use in an application
     *
     * @param {*} mockData If this is a string, will be treated as a path for $http
     * to use to get a json file.  If it's an array, it will be used as the mock data
     * @param {Object} options an object of options for specifics about errors to be thrown timeouts, etc
     *
     * @returns {Object} mock api endpoint
     */
    createMock(mockData : any, options? : any) {
        let responseObj,
            disableRandomErrors = utils.disableRandomErrors,
            produceError        = utils.produceError,
            getErrorByCode      = utils.getErrorByCode,
            waitForTime         = utils.waitForTime;

        // validate input params
        if (_isArray(mockData)) {
            responseObj = setGoodResponse(mockData);
        }
        else {
            throw new Error('mockData required to be an array or .json path');
        }

        // update default options(if any)
        options                 = options || {};
        options.priorityMock    = options.priorityMock || false;

        utils.setOptions(options);

        /**
         * configures response for a successful HTTP GET request against mocked data
         *
         * @param data mocked data to include with success HTTP response
         *
         * @returns {{status: number, statusText: string, data: any}}
         */
        function setGoodResponse(data : any) {
            // create an HTTP response
            let responseOptions : ResponseOptions = new ResponseOptions({
                    status      : 200,
                    body        : _cloneDeep(data),
                    statusText  : 'OK'
                }),

                defaultResponse : Response = new Response(responseOptions);

            return defaultResponse;
        }

        /**
         * generate a random id for a newly saved record
         *
         * @returns {any}
         */
        /*function getNextId() {
            return rMax(rPluck('id', this.responseObj)) + 1;
        }*/

        /**
         * search mock data for a match by record Id
         *
         * @param requestData unique id to search for
         *
         * @returns {any} matched record result
         */
        function findItem(requestData : any) {
            return false;
        }

        /**
         * simulate an HTTP POST request with optional request parameter payload
         *
         * @param data HTTP POST request payload
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function post() {
            let delay = waitForTime(),
                error = produceError(undefined, 'post');

            // mock HTTP response
            responseObj.status      = 201;
            responseObj.statusText  = 'Created';

            return Observable.create(observer => {
                // simulate fake response delay
                setTimeout(() => {
                    // check for error
                    if (error) {
                        // send back error
                        observer.error(error);
                    }
                    // success
                    else {
                        // send mocked data response
                        observer.next(responseObj);
                    }
                }, delay);
            });
        }

        /**
         * simulate an HTTP GET request that returns matching records for provided Id
         *
         * @param dataId unique identifer to match against
         *
         * @returns {any} matched record result
         */
        function get(dataId : number) {
            let delay       = waitForTime(),
                error       = produceError(dataId, 'get'),
                foundItem   = findItem(responseObj);

            return Observable.create(observer => {
                // simulate fake response delay
                setTimeout(() => {
                    // check for error
                    if (error) {
                        // send back error
                        observer.error(error);
                    }
                    // success
                    else {
                        if (!_isUndefined(foundItem)) {
                            // mock HTTP response
                            responseObj.status      = 200;
                            responseObj.statusText  = 'OK';
                            responseObj.body        = _cloneDeep(foundItem);

                            observer.next(responseObj);
                        }
                        else {
                            // return 404
                            error = getErrorByCode(404);

                            observer.error(error);
                        }
                    }
                }, delay);
            });
        }

        /**
         * simulate an HTTP GET request that returns all available records in a given collection
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function getAll() {
            let delay = waitForTime(),
                error = produceError(undefined, 'get');

            return Observable.create(observer => {
                // simulate fake response delay
                setTimeout(() => {
                    // check for error
                    if (error) {
                        // send back error
                        observer.error(error);
                    }
                    // success
                    else {
                        // send mocked data response
                        observer.next(responseObj);
                    }
                }, delay);
            });
        }

        /**
         * simulate an HTTP PUT request with optional request payload parameter
         *
         * @param data HTTP PUT request payload
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function put() {
            let delay = waitForTime(),
                error = produceError(undefined, 'post');

            // mock HTTP response
            responseObj.status      = 200;
            responseObj.statusText  = 'OK';

            return Observable.create(observer => {
                // simulate fake response delay
                setTimeout(() => {
                    // check for error
                    if (error) {
                        // send back error
                        observer.error(error);
                    }
                    // success
                    else {
                        // send mocked data response
                        observer.next(responseObj);
                    }
                }, delay);
            });
        }

        /**
         * simulate an HTTP PUT request with optional request payload parameter
         *
         * @param data HTTP PUT request payload
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function remove() {
            let delay = waitForTime(),
                error = produceError(undefined, 'post');

            // mock HTTP response
            responseObj.status      = 200;
            responseObj.statusText  = 'OK';

            return Observable.create(observer => {
                // simulate fake response delay
                setTimeout(() => {
                    // check for error
                    if (error) {
                        // send back error
                        observer.error(error);
                    }
                    // success
                    else {
                        // send mocked data response
                        observer.next(responseObj);
                    }
                }, delay);
            });
        }

        return {
            forceError : utils.forceError,
            post,
            disableRandomErrors,
            get,
            getAll,
            put,
            remove
        };
    }

}
