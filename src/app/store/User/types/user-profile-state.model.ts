import {fromJS, List, Map, Record} from 'immutable';

import {DecisionGroupOption} from './decision-group-option.model';

interface IUserProfileState {
    contactPreferenceOptions    : Array<DecisionGroupOption>;
    personalInfoEditing         : boolean;
    personalInfoExpanded        : boolean;
    communicationExpanded       : boolean;
}

export const USER_PROFILE_STATE = Record({
    contactPreferenceOptions    : List<DecisionGroupOption>(),
    personalInfoEditing         : false,
    personalInfoExpanded        : true,
    communicationExpanded       : true
});

export class UserProfileState extends USER_PROFILE_STATE {
    contactPreferenceOptions    : List<DecisionGroupOption>;
    personalInfoEditing         : boolean;
    personalInfoExpanded        : boolean;
    communicationExpanded       : boolean;

    constructor(values? : UserProfileState | IUserProfileState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof UserProfileState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // contactPreferenceOptions
                convertedValues = convertedValues.set('contactPreferenceOptions', List(convertedValues.get('contactPreferenceOptions').map(value => new DecisionGroupOption(value))));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
