import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions} from '@angular/http';

import {APIMockService} from '../Mock/';

// pull in lodash isUndefined
import * as _isUndefined from 'lodash/isUndefined';

@Injectable()

export class BackendService {
    constructor (
        private http            : Http,
        private apiMockService  : APIMockService
    ) {}

    /**
     * flag to keep track of when we're hitting a live api
     * @type {boolean}
     */
    private isLive : boolean = false;

    /**
     *
     * @param handle endpoint name that maps to an actual api endpoint location
     * @param mock mock data for the endpoint in question
     * @param data any data params to be passed with the http call
     * @param options http request options
     *
     * @returns {Boolean} http client for consuming service to use
     */
    private getEndPoint(handle : string, mock : any, data : any, options? : RequestOptions) : any {
        let endpoint = undefined;

        // go ahead and turn off random error generation
        this.apiMockService.utils.setRandomErrorsConfig(false);

        // determine appropriate endpoint to access
        if (ENV === 'dev:mock' || ENV === 'build:dev:mock' || ENV === 'test-watch' || ENV === 'test') {
            // set isLive flag to true
            this.isLive = false;

            // return mocked api endpoint
            endpoint = this.apiMockService.mock.createMock(mock[handle]);
        }
        else if (ENV === 'dev:wrap' || ENV === 'build:dev:wrap') {
            // set isLive flag to true
            this.isLive = true;

            // return wrapped api endpoint
            endpoint = this.apiMockService.wrap.createWrap(API_ROOT + API_CONFIG[handle], mock[handle + 'Wrap'], data, options);
        }
        else {
            // set isLive flag to true
            this.isLive = true;

            // return live api endpoint
            endpoint = {
                get : () => {
                    if (!_isUndefined(data)) {
                        return this.http.get(API_ROOT + API_CONFIG[handle] + data);
                    }
                    else {
                        return this.http.get(API_ROOT + API_CONFIG[handle], options);
                    }
                },
                getAll : () => {
                    if (!_isUndefined(data)) {
                        return this.http.get(API_ROOT + API_CONFIG[handle] + data, options);
                    }
                    else {
                        return this.http.get(API_ROOT + API_CONFIG[handle], options);
                    }
                },
                post : () => {
                    if (!_isUndefined(options)) {
                        return this.http.post(API_ROOT + API_CONFIG[handle], data, options);
                    }
                    else {
                        return this.http.post(API_ROOT + API_CONFIG[handle], data);
                    }
                },
                put : () => {
                    return this.http.put(API_ROOT + API_CONFIG[handle], data, options);
                },
                remove : () => {
                    return this.http.delete(API_ROOT + API_CONFIG[handle], data);
                }
            };
        }

        return endpoint;
    }

    /**
     * perform an HTTP GET operation against appropriate backend type (mock, wrap, or live)
     *
     * @param endpoint name that maps to an actual api endpoint location
     * @param mock mock data for the endpoint in question
     * @param data any data params to be passed with the http call
     * @param options http request options
     *
     * @returns {Observable<any>}
     */
    get(endpoint : string, mock : any, data? : any, options? : RequestOptions) {
        let api = this.getEndPoint(endpoint, mock, data, options);

        return Observable.create(observer => {
            if (typeof api !== 'undefined') {
                return api.getAll()
                    .map(res => res.json())
                    .first()
                    .subscribe(res => {
                        observer.next(res);
                    }, error => {
                        observer.error(error.message);
                    });
            }
            else {
                // indicate there was a problem
                observer.error('no configuration data present for specified endpoint');
            }
        });
    }

    /**
     * perform an HTTP POST operation against appropriate backend type (mock, wrap, or live)
     *
     * @param endpoint name that maps to an actual api endpoint location
     * @param mock mock data for the endpoint in question
     * @param data any data params to be passed with the http call
     * @param options http request options
     *
     * @returns {Observable<any>}
     */
    post(endpoint : string, mock : any, data? : any, options? : RequestOptions) {
        let api = this.getEndPoint(endpoint, mock, data, options);

        return Observable.create(observer => {
            if (typeof api !== 'undefined') {
                return api.post()
                    .map(res => res.json())
                    .first()
                    .subscribe(res => {
                        observer.next(res);
                    }, error => {
                        observer.error(error.message);
                    });
            }
            else {
                // indicate there was a problem
                observer.error('no configuration data present for specified endpoint');
            }
        });
    }

    /**
     * perform an HTTP PUT operation against appropriate backend type (mock, wrap, or live)
     *
     * @param endpoint name that maps to an actual api endpoint location
     * @param mock mock data for the endpoint in question
     * @param data any data params to be passed with the http call
     * @param options http request options
     *
     * @returns {Observable<any>}
     */
    put(endpoint : string, mock : any, data? : any, options? : RequestOptions) {
        let api = this.getEndPoint(endpoint, mock, data, options);

        return Observable.create(observer => {
            if (typeof api !== 'undefined') {
                return api.put()
                    .map(res => res.json())
                    .first()
                    .subscribe(res => {
                        observer.next(res);
                    }, error => {
                        observer.error(error.message);
                    });
            }
            else {
                // indicate there was a problem
                observer.error('no configuration data present for specified endpoint');
            }
        });
    }

    /**
     * perform an HTTP PUT operation against appropriate backend type (mock, wrap, or live)
     *
     * @param endpoint name that maps to an actual api endpoint location
     * @param mock mock data for the endpoint in question
     * @param data any data params to be passed with the http call
     * @param options http request options
     *
     * @returns {Observable<any>}
     */
    delete(endpoint : string, mock : any, data? : any, options? : RequestOptions) {
        let api = this.getEndPoint(endpoint, mock, data, options);

        return Observable.create(observer => {
            if (typeof api !== 'undefined') {
                return api.remove()
                    .map(res => res.json())
                    .first()
                    .subscribe(res => {
                        observer.next(res);
                    }, error => {
                        observer.error(error.message);
                    });
            }
            else {
                // indicate there was a problem
                observer.error('no configuration data present for specified endpoint');
            }
        });
    }
}
