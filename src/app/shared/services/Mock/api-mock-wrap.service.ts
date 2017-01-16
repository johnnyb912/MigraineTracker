import {Injectable} from '@angular/core';
import {Http, ResponseOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import * as utils from './api-mock-utils.service';

// pull in lodash methods
import * as _isArray      from 'lodash/isArray';
import * as _isObject     from 'lodash/isObject';
import * as _cloneDeep    from 'lodash/cloneDeep';
import * as _isUndefined  from 'lodash/isUndefined';

@Injectable()

/**
 * Implementation of APIMockWrapService: handles wrapping of incomplete development api's for consumption in the UI
 */
export class APIMockWrapService {
    /**
     * APIMockWrapService constructor
     * @param http
     */
    constructor(private http : Http) { }

    /**
     * wrap a live api endpoint to use in an application
     *
     * @param {String} endpoint the live api endpoint to wrap
     * @param {any} mockData If this is a string, will be treated as a path for $http
     * to use to get a json file.  If it's an array, it will be used as the mock data
     * @param {any} data any request payload data needed
     * @param {any} reqOptions an object of options for specifics about errors to be thrown timeouts, etc
     *
     * @returns {Object} mock api endpoint
     */
    createWrap(endpoint : string, mockData : any, data? : any, reqOptions? : any) {
        let baseEndpoint            = endpoint,
            disableRandomErrors     = utils.disableRandomErrors,
            produceError            = utils.produceError,
            payload                 = data ? data : undefined,
            requestOptions          = reqOptions,
            service                 = this,
            options;

        // validate input params
        if (_isUndefined(endpoint)) {
            throw new Error('wrapper must be provided with an endpoint');
        }

        if (_isUndefined(mockData)) {
            throw new Error('wrapper must be provided with mock data');
        }

        /*if (!_isObject(mockData)) {
         throw new Error('mock data must be an object');
         }
         else if (_isArray(mockData)) {
         throw new Error('mock data must be an object, not an array');
         }*/

        // update default options(if any)
        options                 = {};
        options.priorityMock    = options.priorityMock || true;

        utils.setOptions(options);

        /**
         * Merges two objects with the first object passed in taking priority.
         * This function will deeply merge the two objects.
         * @example
         *   var obj1 = {
         *     id: 2,
         *     name: "brian"
         *   };
         *   var obj2 = {
         *     id: 1,
         *     address: {
         *       street: "John"
         *     }
         *   }
         *   var merged = deepMerge(obj2, obj1);
         *   //merged will be:
         *   {
         *     id: 1,
         *     name: "brian",
         *     address: {
         *       street: "John"
         *     }
         *   }
         * @param priorityObj
         * @param mergingObj
         * @returns {*}
         */
        function deepMerge(mergingObj : any, priorityObj : any) {
            // Make copies so we don't hold references
            let priObj = _cloneDeep(priorityObj),
                newObj = _cloneDeep(mergingObj),
                isArray;

            // are we dealing with an array or single object in our api response??
            options.priorityMock ? isArray = _isArray(newObj) : isArray = _isArray(priObj);

            // if we have data to merge into the response and the response is not an array...
            if (priObj && !isArray) {
                // iterate over properties in the object that takes priority during the merge
                for (let prop in priObj) {
                    /**
                     * If object is defined, and is Object, and not an array then we need to
                     * deepMerge this property i.e. compare the objects against each other so
                     * we don't miss any nested properties
                     *
                     * Using void 0 to return undefined in case window.undefined is
                     * modified.
                     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
                     */
                    if (priObj[prop] !== void 0 && _isObject(priObj[prop]) && !_isArray(priObj[prop])) {
                        newObj[prop] = deepMerge(newObj[prop], priObj[prop]);
                    }
                    /**
                     * no nested property here so just compare the two
                     * and produce the expected value
                     */
                    else {
                        // check for null/undefined on newObj
                        if (typeof(newObj[prop] !== 'boolean')) {
                            if (!newObj[prop]) {
                                // replace the null value with mock data
                                newObj[prop] = priObj[prop];
                            }
                        }
                    }
                }
            }
            // if we have data to merge into the response and the response is an array...
            else if (priObj && isArray) {
                // is there anything in the returned collection??
                if (newObj.length) {
                    // iterate over each entry in the array
                    for (let arrayIndex = 0, arrayLen = newObj.length; arrayIndex < arrayLen; arrayIndex++) {
                        for (let prop in newObj[arrayIndex]) {
                            /**
                             * If object is defined, and is Object, and not an array then we need to
                             * deepMerge this property i.e. compare the objects against each other so
                             * we don't miss any nested properties
                             *
                             * Using void 0 to return undefined in case window.undefined is
                             * modified.
                             * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
                             */
                            if (newObj[arrayIndex][prop] !== void 0 && _isObject(newObj[arrayIndex][prop]) && !_isArray(newObj[arrayIndex][prop])) {
                                newObj[arrayIndex][prop] = deepMerge(newObj[arrayIndex][prop], priObj[prop]);
                            }
                            /**
                             * no nested property here so just compare the two
                             * and produce the expected value
                             */
                            else {
                                // check for null/undefined on newObj
                                if (typeof(newObj[arrayIndex][prop] !== 'boolean')) {
                                    if (!newObj[arrayIndex][prop]) {
                                        // replace the null value with mock data
                                        newObj[arrayIndex][prop] = priObj[prop];
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    newObj.push(priObj);
                }
            }

            return newObj;
        }

        /**
         * A helper method to wrap the options check.
         *
         * @param responseData The data retrieved from the server.
         * @param mergeData The mockData object.
         *
         * @returns {*} The merged object
         */
        function mergeResponse(responseData : any, mergeData : any) {
            if (options.priorityMock) {
                return deepMerge(responseData, mergeData);
            }

            return deepMerge(mergeData, responseData);
        }

        /**
         * simulate an HTTP POST request with optional request parameter payload
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function post() {
            let error = produceError(undefined, 'post'),

            // mock HTTP response
                responseOptions     : ResponseOptions,
                mockResponse        : Response;

            return Observable.create(observer => {
                if (error) {
                    // send back error
                    observer.error(error);
                }
                // success
                else {
                    // call the live api
                    service.http.post(baseEndpoint, payload, requestOptions).map((response) => response.json()).subscribe((res) => {
                        res = mergeResponse(res, mockData);

                        responseOptions = new ResponseOptions({
                            status      : 201,
                            body        : res,
                            statusText  : 'Created'
                        });

                        mockResponse = new Response(responseOptions);

                        observer.next(mockResponse);
                    }, (err) => {
                        observer.error(err);
                    });
                }
            });
        }

        /**
         * simulate an HTTP GET request that returns matching records for provided Id
         *
         * @param dataId unique identifier to match against
         *
         * @returns {any} matched record result
         */
        function get(dataId : number) {
            let error = produceError(dataId, 'get'),

            // mock HTTP response
                responseOptions     : ResponseOptions,
                mockResponse        : Response;

            return Observable.create(observer => {
                if (error) {
                    // send back error
                    observer.error(error);
                }
                // success
                else {
                    // call the live api
                    service.http.get(payload ? baseEndpoint + payload : baseEndpoint, requestOptions).map((response) => response.json()).subscribe((res) => {
                        res = mergeResponse(res, mockData);

                        responseOptions = new ResponseOptions({
                            status      : 200,
                            body        : res,
                            statusText  : 'OK'
                        });

                        mockResponse = new Response(responseOptions);

                        observer.next(mockResponse);
                    }, (err) => {
                        observer.error(err);
                    });
                }
            });
        }

        /**
         * simulate an HTTP GET request that returns all available records in a given collection
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function getAll() {
            let error = produceError(undefined, 'get'),

            // mock HTTP response
                responseOptions     : ResponseOptions,
                mockResponse        : Response;

            return Observable.create(observer => {
                if (error) {
                    // send back error
                    observer.error(error);
                }
                // success
                else {
                    // call the live api
                    service.http.get(payload ? baseEndpoint + payload : baseEndpoint, requestOptions).map((response) => response.json()).subscribe((res) => {
                        res = mergeResponse(res, mockData);

                        responseOptions = new ResponseOptions({
                            status      : 200,
                            body        : res,
                            statusText  : 'OK'
                        });

                        mockResponse = new Response(responseOptions);

                        observer.next(mockResponse);
                    }, (err) => {
                        observer.error(err);
                    });
                }
            });
        }

        /**
         * simulate an HTTP PUT request with optional request payload parameter
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function put() {
            let error = produceError(undefined, 'put'),

            // mock HTTP response
                responseOptions     : ResponseOptions,
                mockResponse        : Response;

            return Observable.create(observer => {
                if (error) {
                    // send back error
                    observer.error(error);
                }
                // success
                else {
                    // call the live api
                    service.http.put(baseEndpoint, payload, requestOptions).map((response) => response.json()).subscribe((res) => {
                        res = mergeResponse(data, mockData);

                        responseOptions = new ResponseOptions({
                            status      : 200,
                            body        : res,
                            statusText  : 'OK'
                        });

                        mockResponse = new Response(responseOptions);

                        observer.next(mockResponse);
                    }, (err) => {
                        observer.error(err);
                    });
                }
            });
        }

        /**
         * simulate an HTTP PUT request with optional request payload parameter
         *
         * @param dataId unique identifer to match against
         *
         * @returns {any} success HTTP response with supplied mock data
         */
        function remove(dataId : number) {
            let error = produceError(dataId, 'post'),

            // mock HTTP response
                responseOptions     : ResponseOptions,
                mockResponse        : Response;

            return Observable.create(observer => {
                if (error) {
                    // send back error
                    observer.error(error);
                }
                // success
                else {
                    // call the live api
                    service.http.delete(baseEndpoint, requestOptions).map((response) => response.json()).subscribe((res) => {
                        res = mergeResponse(data, mockData);

                        responseOptions = new ResponseOptions({
                            status      : 200,
                            body        : res,
                            statusText  : 'OK'
                        });

                        mockResponse = new Response(responseOptions);

                        observer.next(mockResponse);
                    }, (err) => {
                        observer.error(err);
                    });
                }
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
