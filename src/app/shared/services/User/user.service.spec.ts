import {
    async,
    inject,
    TestBed
} from '@angular/core/testing';

import {HttpModule} from '@angular/http';
import {
    APIMockService,
    BackendService
} from '../../../shared/services/';
import {UserService} from './user.service';
import {USER_MOCK} from './user.service.mocks';
import {ILoginCreds} from '../../../store/User/';

describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports     : [HttpModule],
            providers   : [
                APIMockService,
                BackendService,
                UserService
            ]
        });
    });

    it('should login user', async(inject([UserService], (userService) => {
        // mock user's security credentials
        let creds : ILoginCreds = {
                username    : 'john.doe@unum.com',
                password    : 'password'
            };

        // perform the login
        userService.login(creds).subscribe(response => {
            expect(response).toEqual(USER_MOCK.login[0]);
        }, error => {
            expect(error).toEqual(undefined);
        });
    })));

    it('should logout user', async(inject([UserService], (userService) => {
        // perform the lgout
        userService.logout().subscribe(response => {
            expect(response).toEqual(USER_MOCK.logout);
        }, error => {
            expect(error).toEqual(undefined);
        });
    })));

    it('should reset user password', async(inject([UserService], (userService) => {
        // mock user reset password credentials
        let creds : ILoginCreds = {
                username    : 'john.doe@unum.com',
                password    : ''
            };

        // reset mock user's password
        userService.resetPassword(creds).subscribe(response => {
            expect(response).toEqual(USER_MOCK.resetPassword);
        }, error => {
            expect(error).toEqual(undefined);
        });
    })));

    it('should get current logged in user info', async(inject([UserService], (userService) => {
        // trigger request for logged in user's info
        userService.getCurrentUser().subscribe(response => {
            expect(response).toEqual(USER_MOCK.getCurrentUser[0]);
        }, error => {
            expect(error).toEqual(undefined);
        });
    })));
});
