import {Injectable} from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {BackendService} from '../Backend/';
import {USER_MOCK} from './user.service.mocks';
import {
    ILoginCreds,
    UserInfoState
} from '../../../store/User';

@Injectable()

/**
 * Implementation of UserService: handles all backend api requests related to user login/logout/update functionality
 */
export class UserService {
    /**
     * UserService constructor
     * @param backendService
     */
    constructor (private backendService : BackendService) {}

    /**
     * login the user
     * @param loginCreds username / password combo for user
     */
    login(loginCreds : ILoginCreds) {
        let user;

        // we need this to handle the POST properly
        let body    = JSON.stringify(Object.assign(loginCreds, {})),
            headers = new Headers({ 'Content-Type': 'application/json' }),
            options = new RequestOptions({ headers });

        return Observable.create(observer => {
            // create new observable
            this.backendService.post('login', USER_MOCK, body, options)
                .first()
                .subscribe(response => {
                    // store user response
                    response.length ? user = response[0] : user = response;

                    // indicate login was successful and update user state
                    observer.next(user);
                }, error => {
                    // indicate login failed
                    observer.error();
                });
        });
    }

    /**
     * logout the user
     */
    logout() {
        return Observable.create(observer => {
            // do logout call
            this.backendService.get('logout', USER_MOCK)
                .first()
                .subscribe(response => {
                    // remove user state
                    observer.next(response);
                }, error => {
                    // remove user state
                    observer.error(error);
                });
        });
    }

    /**
     * reset user's password
     * @param loginCreds username for user
     */
    resetPassword(loginCreds : ILoginCreds) {
        // we need this to handle the POST properly
        let body    = JSON.stringify({ email : loginCreds.username }),
            headers = new Headers({ 'Content-Type' : 'application/json' }),
            options = new RequestOptions({ headers });

        return Observable.create(observer => {
            this.backendService.post('resetPassword', USER_MOCK, body, options)
                .first()
                .subscribe(response => {
                    // indicate password reset was successful
                    observer.next(response);
                }, error => {
                    // indicate password reset failed
                    observer.error();
                });
        });
    }

    /**
     * updates current user profile info to api
     * @param userProfile updated user profile data
     * @returns {any}
     */
    updateUser(userProfile : UserInfoState) {
        // we need this to handle the POST properly
        let body    = JSON.stringify(Object.assign(userProfile, {})),
            headers = new Headers({ 'Content-Type': 'application/json' }),
            options = new RequestOptions({ headers });

        return Observable.create(observer => {
            this.backendService.put('updateUser', USER_MOCK, body, options)
                .first()
                .subscribe(() => {
                    // update store with user profile data
                    observer.next(userProfile);
                }, error => {
                    // update store with user profile data
                    observer.error(undefined);
                });
        });
    }

    /**
     * retrieve the current logged in user's demographic info
     */
    getCurrentUser() {
        let user;

        return Observable.create(observer => {
            this.backendService.get('getCurrentUser', USER_MOCK)
                .first()
                .subscribe(response => {
                    // store user data
                    response.length ? user = response[0] : user = response;

                    // update store
                    observer.next(user);
                }, error => {
                    // update store
                    observer.error(error);
                });
        });
    }
}
