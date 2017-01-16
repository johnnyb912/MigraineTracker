import {fromJS, Map, Record} from 'immutable';

export interface IUserInfoFieldUpdate {
    fieldName   : string;
    fieldValue  : string;
}

const USER_INFO_FIELD_UPDATE = Record({
    fieldName   : '',
    fieldValue  : ''
});

export class UserInfoFieldUpdate extends USER_INFO_FIELD_UPDATE {
    fieldName   : string;
    fieldValue  : string;

    constructor(values? : UserInfoFieldUpdate | IUserInfoFieldUpdate) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof UserInfoFieldUpdate) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);
            }
        }

        super(convertedValues);
    }
}
