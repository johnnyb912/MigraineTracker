import {fromJS, List, Map, Record} from 'immutable';

export interface IUserInfoState {
    bestTimeToCall          : string;
    city                    : string;
    companyName             : string;
    contactPreference       : Array<string>;
    DOB                     : string;
    email                   : string;
    employeeId              : string;
    firstName               : string;
    gender                  : string;
    id                      : string;
    isActive                : boolean;
    lastName                : string;
    language                : string;
    middleName              : string;
    mobilePhone             : string;
    phoneType               : string;
    name                    : string;
    phone                   : string;
    postalCode              : number;
    SSN                     : string;
    state                   : string;
    street                  : string;
    timeZone                : string;
    title                   : string;
    username                : string;
    userType                : string;
}

export const USER_INFO = Record({
    bestTimeToCall          : '',
    city                    : '',
    companyName             : '',
    contactPreference       : List<string>(),
    DOB                     : '',
    email                   : '',
    employeeId              : '',
    firstName               : '',
    gender                  : '',
    id                      : '',
    isActive                : false,
    lastName                : '',
    language                : '',
    middleName              : '',
    mobilePhone             : '',
    phoneType               : '',
    name                    : '',
    phone                   : '',
    postalCode              : 0,
    SSN                     : '',
    state                   : '',
    street                  : '',
    timeZone                : '',
    title                   : '',
    username                : '',
    userType                : ''
});

export class UserInfoState extends USER_INFO {
    bestTimeToCall          : string;
    city                    : string;
    companyName             : string;
    contactPreference       : List<string>;
    DOB                     : string;
    email                   : string;
    employeeId              : string;
    firstName               : string;
    gender                  : string;
    id                      : string;
    isActive                : boolean;
    lastName                : string;
    language                : string;
    middleName              : string;
    mobilePhone             : string;
    phoneType               : string;
    name                    : string;
    phone                   : string;
    postalCode              : number;
    SSN                     : string;
    state                   : string;
    street                  : string;
    timeZone                : string;
    title                   : string;
    username                : string;
    userType                : string;

    constructor(values? : UserInfoState | IUserInfoState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof UserInfoState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);
            }

            // contactPreference
            convertedValues = convertedValues.set('contactPreference', List(convertedValues.get('contactPreference')));
        }

        // call parent constructor
        super(convertedValues);
    }
}
