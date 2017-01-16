import {fromJS, List, Map, Record} from 'immutable';

import {CompanyPhone} from './company-phone.model';

interface ICompanyAdmin {
    name        : string;
    phone       : Array<CompanyPhone>;
    email       : string;
}

export const COMPANY_ADMIN = Record({
    name        : '',
    phone       : List<CompanyPhone>(),
    email       : ''
});

export class CompanyAdmin extends COMPANY_ADMIN {
    name        : string;
    phone       : List<CompanyPhone>;
    email       : string;

    constructor(values? : CompanyAdmin | ICompanyAdmin) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof CompanyAdmin) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // phone
                convertedValues = convertedValues.set('phone', List(convertedValues.get('phone').map(value => new CompanyPhone(value))));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
