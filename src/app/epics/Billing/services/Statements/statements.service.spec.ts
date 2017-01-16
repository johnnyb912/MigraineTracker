import {
    async,
    inject,
    TestBed
} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {StatementsService} from './statements.service';
import {STATEMENTS_MOCK} from './statements.service.mocks';
import {
    APIMockService,
    BackendService
} from '../../../../shared/services/';

describe('StatementsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports     : [HttpModule],
            providers   : [
                APIMockService,
                BackendService,
                StatementsService
            ]
        });
    });

    it('should get a list of billing statements', async(inject([StatementsService], (statementsService) => {
        // trigger request to retrieve billing statements
        statementsService.getStatements().subscribe(response => {
            expect(response).toEqual(STATEMENTS_MOCK.getStatements);
        }, error => {
            expect(error).toEqual(undefined);
        });
    })));
});
