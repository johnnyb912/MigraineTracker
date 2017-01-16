import {fromJS, List, Map, Record} from 'immutable';

import {CompanyAdmin} from './company-admin.model';
import {CompanyPhone} from './company-phone.model';

export interface ICompany {
    name            : string;
    address         : string;
    city            : string;
    state           : string;
    zipCode         : number;
    phone           : Array<CompanyPhone>;
    email           : string;
    admin           : CompanyAdmin;
}

export const COMPANY = Record({
    name            : '',
    address         : '',
    city            : '',
    state           : '',
    zipCode         : 0,
    phone           : List<CompanyPhone>(),
    email           : '',
    admin           : new CompanyAdmin()
});

export class Company extends COMPANY {
    name            : string;
    address         : string;
    city            : string;
    state           : string;
    zipCode         : number;
    phone           : List<CompanyPhone>;
    email           : string;
    admin           : CompanyAdmin;

    constructor(values? : Company | ICompany) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof Company) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // administrator
                convertedValues = convertedValues.set('admin', new CompanyAdmin(convertedValues.get('admin')));

                // phone
                convertedValues = convertedValues.set('phone', List(convertedValues.get('phone').map(value => new CompanyPhone(value))));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
