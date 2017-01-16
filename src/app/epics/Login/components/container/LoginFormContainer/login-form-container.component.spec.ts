import {
    async,
    inject,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NgRedux} from 'ng2-redux';
import {Subscription} from 'rxjs/Subscription';

import {LoginFormContainerComponent} from './login-form-container.component';
import {AppModule} from '../../../../../app.module';
import {UserState} from '../../../../../store/User/';

describe('LoginForm Component', () => {
    let fixture         : ComponentFixture<LoginFormContainerComponent>,
        compInstance    : LoginFormContainerComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports : [
                AppModule,
                RouterTestingModule
            ]
        });

        // create component fixture
        fixture = TestBed.createComponent(LoginFormContainerComponent);

        // grab instance of component class
        compInstance = fixture.componentInstance;
    }));

    it('should login user on submit', inject([NgRedux], (store) => {
        let userState : UserState = new UserState(),

        // subscribe to Redux store updates
        userSubscription : Subscription = store.select(state => state.userState).subscribe((val : UserState) => {
            // update local state
            userState = val;

            // check for user authenticated or not
            if (userState.get('userAuthenticated')) {
                // login successful
                expect(userState.get('userAuthenticated')).toEqual(true);

                // unsubscribe from Redux store updates
                userSubscription.unsubscribe();
            }
        });
    }));
});
