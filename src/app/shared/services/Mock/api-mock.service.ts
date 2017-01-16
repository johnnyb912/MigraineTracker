import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import * as utils from './api-mock-utils.service';
import {APIMockMockService} from './api-mock-mock.service';
import {APIMockWrapService} from './api-mock-wrap.service';

@Injectable()

export class APIMockService {
    constructor(private http : Http) {}

    // mocking utilities
    public utils = utils;

    // mock api endpoint functionality
    public mock : APIMockMockService = new APIMockMockService();

    // wrap api endpoint functionality
    public wrap : APIMockWrapService = new APIMockWrapService(this.http);
}
