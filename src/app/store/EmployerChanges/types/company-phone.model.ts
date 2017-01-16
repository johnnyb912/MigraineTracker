import {fromJS, Map, Record} from 'immutable';

interface ICompanyPhone {
    type    : string;
    number  : string;
}

export const COMPANY_PHONE = Record({
    type   : '',
    number : ''
});

export class CompanyPhone extends COMPANY_PHONE {
    type    : string;
    number  : string;

    constructor(values? : CompanyPhone | ICompanyPhone) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof CompanyPhone) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
