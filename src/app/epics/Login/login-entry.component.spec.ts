import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {LoginModule} from './login.module';
import {LoginEntryComponent} from './login-entry.component';
import {
    NavActions,
    EnumNavOption
} from '../../store/Navigation/';

// Mock the NavActions with the methods we need to trigger
class MockNavActions {
    constructor() {}

    updateActiveNavState() {
        return false;
    }
}

describe('Login Component', () => {
    let fixture         : ComponentFixture<LoginEntryComponent>,
        compInstance    : LoginEntryComponent,
        element         : any,
        mockNavActions  : MockNavActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports     : [
                RouterTestingModule,
                LoginModule
            ],
            providers   : [
                {
                    provide     : NavActions,
                    useClass    : MockNavActions
                }
            ]
        });

        // create component fixture
        fixture = TestBed.createComponent(LoginEntryComponent);

        // grab instance of component class
        compInstance = fixture.componentInstance;

        // grab DOM representation
        element = fixture.nativeElement;

        // grab MockPaymentActions from the root injector
        mockNavActions = fixture.debugElement.injector.get(NavActions);

        // trigger initial bindings
        fixture.detectChanges();
    });

    it('should set activeNavState to LOGIN on Init', () => {
        // spy on mock updateActiveNavState method
        spyOn(mockNavActions, 'updateActiveNavState');

        // trigger initial bindings
        compInstance.ngOnInit();

        expect(mockNavActions.updateActiveNavState).toHaveBeenCalled();
        expect(mockNavActions.updateActiveNavState).toHaveBeenCalledWith(EnumNavOption.LOGIN);
    });
});
