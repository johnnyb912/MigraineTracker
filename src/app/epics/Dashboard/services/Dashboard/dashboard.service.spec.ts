import {
    async,
    inject,
    TestBed
} from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import {DashBoardService} from './dashboard.service';
import {DASHBOARD_MOCK} from './dashboard.service.mock';
import {
    APIMockService,
    BackendService
} from '../../../../shared/services/';

describe('DashBoardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports     : [HttpModule],
            providers   : [
                APIMockService,
                BackendService,
                DashBoardService
            ]
        });
    });

    it('should get dashboard summary data', async(inject([DashBoardService], (dashboardService) => {
        // trigger request to get dashboard data
        dashboardService.getDashboard().subscribe(response => {
            expect(response).toEqual(DASHBOARD_MOCK.getDashBoard[0]);
        }, error => {
            expect(error).toEqual(undefined);
        });
    })));

    it('should get carousel summary messages', async(inject([DashBoardService], (dashboardService) => {
        // trigger request to retrieve carousel messages
        dashboardService.getCarouselMessages().subscribe(response => {
            expect(response).toEqual(DASHBOARD_MOCK.getCarouselMessages);
        }, error => {
            expect(error).toEqual(undefined);
        });
    })));
});
