import {fromJS, Map, List, Record} from 'immutable';

import * as moment from 'moment';

interface IEmployeeChangesState {
    topMenuActive               : number;
    topMenu                     : List<string>;
    yearActive                  : number;
    years                       : List<number>;
    monthActive                 : string;
    months                      : List<string>;
    statusActive                : number;
    statuses                    : List<string>;
    coverageActive              : number;
    coverages                   : List<string>;
    dayActive                   : any;
    recentlyUpdatedTypeActive   : number;
    recentlyUpdatedTypes        : List<string>;
    filterActive                : number;
    filterList                  : List<any>;
    viewTypeActive              : any;
    viewType                    : List<string>;
}

export const EMPLOYEE_CHANGES_STATE = Record({
    topMenuActive               : 0,
    topMenu                     : List(['ALL', 'BY_STATEMENT', 'BY_STATUS', 'BY_COVERAGE', 'BY_DATE_OF_BIRTH', 'BY_DATE_OF_HIRE', 'RECENTLY_UPDATED']),
    yearActive                  : parseInt(moment().format('YYYY'), 10),
    years                       : List([2015, 2016]),
    monthActive                 : moment().format('MMM').toUpperCase(),
    months                      : List(['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']),
    statusActive                : 0,
    statuses                    : List(['ALL', 'ACTIVE', 'TERMINATED']),
    coverageActive              : 0,
    coverages                   : List(['SHORT_TERM_DISABILITY', 'LONG_TERM_DISABILITY', 'CRITICAL_ILLNESS']),
    dayActive                   : moment().format('DD'),
    recentlyUpdatedTypeActive   : 0,
    recentlyUpdatedTypes        : List(['COVERAGE', 'DEMOGRAPHICS', 'EARNINGS', 'EMPLOYMENT_INFORMATION', 'TERMINATIONS', 'NEW_HIRES']),
    filterActive                : '',
    filterList                  : List(['ALPHABETICALLY_LAST_NAME_A_Z', 'ALPHABETICALLY_LAST_NAME_Z_A']),
    viewTypeActive              : 0,
    viewType                    : List(['TILE', 'LIST'])
});

export class EmployeeChangesState extends EMPLOYEE_CHANGES_STATE {
    topMenuActive               : number;
    topMenu                     : List<string>;
    yearActive                  : number;
    years                       : List<number>;
    monthActive                 : string;
    months                      : List<string>;
    statusActive                : number;
    statuses                    : List<string>;
    coverageActive              : number;
    coverages                   : List<string>;
    dayActive                   : any;
    recentlyUpdatedTypeActive   : number;
    recentlyUpdatedTypes        : List<string>;
    filterActive                : any;
    filterList                  : List<any>;
    viewTypeActive              : string;
    viewType                    : List<string>;

    constructor(values? : EmployeeChangesState | IEmployeeChangesState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof EmployeeChangesState) {
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
