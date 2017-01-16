import {fromJS, List, Map, Record} from 'immutable';

import {CarouselMessage} from './carousel-message.model';
import {DashboardInfo} from './dashboard-info.model';

interface IDashboardState {
    bannerCollapsed : boolean;
    messages        : Array<CarouselMessage>;
    dashboard       : DashboardInfo;
}

export const DASHBOARD_STATE = Record({
    bannerCollapsed : false,
    messages        : List<CarouselMessage>(),
    dashboard       : new DashboardInfo()
});

/**
 * type definition for Redux Store dashboard state
 */
export class DashboardState extends DASHBOARD_STATE {
    bannerCollapsed : boolean;
    messages        : List<CarouselMessage>;
    dashboard       : DashboardInfo;

    constructor(values? : DashboardState | IDashboardState) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof DashboardState) {
                // convert to Map
                convertedValues = Map(values);
            }
            else {
                // convert to immutable
                convertedValues = fromJS(values);

                // messages
                convertedValues = convertedValues.set('messages', List(convertedValues.get('messages').map(value => new CarouselMessage(value))));

                // dashboard
                convertedValues = convertedValues.set('dashboard', new DashboardInfo(convertedValues.get('dashboard')));
            }
        }

        // call parent constructor
        super(convertedValues);
    }
}
