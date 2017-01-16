import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {Http} from '@angular/http';
import {List} from 'immutable';
import {
    TranslateModule,
    TranslateLoader,
    TranslateStaticLoader
} from 'ng2-translate/ng2-translate';

import {PaymentStepsMethodComponent} from './payment-steps-method.component';
import {
    EnumPaymentMethodType,
    PaymentMethodState
} from '../../../../../store/Payments/';
import {SvgIconComponent} from '../../../../../shared/';

// suite of related tests
describe('Payment Steps Method Component', () => {
    let fixture         : ComponentFixture<PaymentStepsMethodComponent>,
        comp            : PaymentStepsMethodComponent,
        element         : any,
        paymentsMethods : List<PaymentMethodState>;

    // setup tasks to perform before each test
    beforeEach(() => {
        // refine the initial testing module configuration
        TestBed.configureTestingModule({
            imports         : [
                TranslateModule.forRoot({
                    provide     : TranslateLoader,
                    useFactory  : (http : Http) => new TranslateStaticLoader(http, 'i18n', '.json'),
                    deps        : [Http]
                })
            ],
            declarations    : [
                SvgIconComponent,
                PaymentStepsMethodComponent
            ]
        });

        // create component fixture
        fixture = TestBed.createComponent(PaymentStepsMethodComponent);

        // grab instance of component class
        comp = fixture.componentInstance;

        // grab DOM representation
        element = fixture.nativeElement;

        // wire up @Input bindings
        paymentsMethods     = List([
            {
                type        : EnumPaymentMethodType.BANK_DRAFT,
                label       : 'Bank Account',
                code        : 0,
                selected    : false
            },
            {
                type        : EnumPaymentMethodType.CHECK,
                label       : 'Send a Check',
                code        : 1,
                selected    : false
            }
        ].map(value => new PaymentMethodState(value)));

        // bind to input
        comp.paymentMethods = paymentsMethods;

        // trigger initial bindings
        fixture.detectChanges();
    });

    // test definitions
    it('should display payment methods', () => {
        // inspect content of *ngFor for child nodes
        expect(element.getElementsByClassName('Method__Card').length).toEqual(2);
    });

    it('should raise paymentMethodSelected event when payment method is chosen', () => {
        let selectedPaymentMethod : PaymentMethodState = undefined;

        // subscribe to paymentMethodSelected event
        comp.paymentMethodSelected.subscribe((method : PaymentMethodState) => {
            // store selected payment method
            selectedPaymentMethod = method;
        });

        // trigger click event on first payment method
        element.getElementsByClassName('Method__Card')[0].click();

        // verify selection
        expect(selectedPaymentMethod).toBe(comp.paymentMethods.get(0));
    });
});
