import {fromJS, Map, Record} from 'immutable';

export interface ICarouselMessage {
    title       : string;
    summary     : string;
    linkDesc    : string;
}

export const CAROUSEL_MESSAGE = Record({
    title       : '',
    summary     : '',
    linkDesc    : ''
});

export class CarouselMessage extends CAROUSEL_MESSAGE {
    title       : string;
    summary     : string;
    linkDesc    : string;

    constructor(values? : CarouselMessage | ICarouselMessage) {
        let convertedValues : Map<any, any>;

        // check for defined values
        if (values) {
            // is this already correct Immutable Record type?
            if (values instanceof CarouselMessage) {
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
