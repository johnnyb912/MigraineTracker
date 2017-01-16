import {fromJS, List, Map, Record} from 'immutable';

import {CompanyPhone} from './company-phone.model';
import {CompanyAdmin} from './company-admin.model';
import {Company} from './company.model';

interface ICompanyStateBase {
    isGroupEditing  : boolean;
    isAdminEditing  : boolean;
    selected        : boolean;
}

export const COMPANY_STATE_BASE = Record({
    isGroupEditing  : false,
    isAdminEditing  : false,
    selected        : false
});

export class CompanyStateBase extends COMPANY_STATE_BASE {
    isGroupEditing  : boolean;
    isAdminEditing  : boolean;
    selected        : boolean;

    constructor(values? : CompanyStateBase | ICompanyStateBase) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof CompanyStateBase) {
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

interface ICompanyState {
    name            : string;
    address         : string;
    city            : string;
    state           : string;
    zipCode         : number;
    phone           : Array<CompanyPhone>;
    email           : string;
    admin           : CompanyAdmin;
    isGroupEditing  : boolean;
    isAdminEditing  : boolean;
    selected        : boolean;
}

export const COMPANY_STATE = Record({
    name            : '',
    address         : '',
    city            : '',
    state           : '',
    zipCode         : 0,
    phone           : List<CompanyPhone>(),
    email           : '',
    admin           : new CompanyAdmin(),
    isGroupEditing  : false,
    isAdminEditing  : false,
    selected        : false
});

export class CompanyState extends COMPANY_STATE {
    name            : string;
    address         : string;
    city            : string;
    state           : string;
    zipCode         : number;
    phone           : List<CompanyPhone>;
    email           : string;
    admin           : CompanyAdmin;
    isGroupEditing  : boolean;
    isAdminEditing  : boolean;
    selected        : boolean;

    constructor(values? : CompanyState | ICompanyState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof CompanyState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // create combination type
                convertedValues = extend(new CompanyStateBase(values), new Company(values));

                // phone
                convertedValues = convertedValues.set('phone', List(convertedValues.get('phone').map(value => new CompanyPhone(value))));

                // administrator
                convertedValues = convertedValues.set('admin', new CompanyAdmin(convertedValues.get('admin')));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}

function extend<T extends CompanyStateBase, U extends Company>(first : T, second : U) : T & U {
    let result = <T & U> {};

    for (let id in first.toJS()) {
        if (!first.hasOwnProperty(id)) {
            (<any> result)[id] = (<any> first)[id];
        }
    }

    for (let id in second.toJS()) {
        if (!result.hasOwnProperty(id)) {
            (<any> result)[id] = (<any> second)[id];
        }
    }

    return fromJS(result);
}
