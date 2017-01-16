import {LOCALE_ID} from '@angular/core';
import {
    inject
} from '@angular/core/testing';

// suite of related tests
describe('App Module', () => {
    // setup tasks to perform before each test
    beforeEach(() => {

    });

    it('should set the default locale to "en-US"', inject([LOCALE_ID], (defaultLocale : string) => {
        expect(defaultLocale).toEqual('en-US');
    }));
});
