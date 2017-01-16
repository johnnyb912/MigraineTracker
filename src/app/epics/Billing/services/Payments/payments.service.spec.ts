import {
    async,
    inject,
    TestBed
} from '@angular/core/testing';

import {BackendService} from '../../../../shared/services/Backend/backend.service';
import {APIMockService} from '../../../../shared/services/Mock/api-mock.service';
import {PaymentsService} from './payments.service';
import {PAYMENTS_MOCK} from './payments.service.mocks';
import {HttpModule} from '@angular/http';

describe('PaymentsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports     : [HttpModule],
            providers   : [
                APIMockService,
                BackendService,
                PaymentsService
            ]
        });
    });

    it('should get a list of payment accounts', async(inject([PaymentsService], (paymentsService) => {
        // trigger request to retrieve payment accounts
        paymentsService.getPaymentAccounts().subscribe(response => {
            expect(response).toEqual(PAYMENTS_MOCK.getPaymentAccounts);
        }, error => {
            expect(error).toEqual(undefined);
        });
    })));
});
