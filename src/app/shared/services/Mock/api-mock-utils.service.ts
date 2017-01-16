import {IErrorTrigger, IMockOptions, IConnectionError} from './types';

import * as _isNumber from 'lodash/isNumber';

// pull in Ramda methods
import * as rForEach  from 'ramda/src/forEach';
import * as rFilter   from 'ramda/src/filter';
import * as rReduce   from 'ramda/src/reduce';
import * as rMerge    from 'ramda/src/merge';
import * as rPropEq   from 'ramda/src/propEq';

/**
 * this entire module is just a bunch of shared utility values and methods the various
 * mocking classes consume
 */

/**
 * A random number will be generated between 0 and MAX_ERROR_DISTRIBUTION.
 * The number generated will be used to determine which error will be produced.
 * Note when defining distributions of errors that you need to leave room
 * for a clean return.  So try not to make your distributions add up to this
 * number.
 */
const MAX_ERROR_DISTRIBUTION : number = 100;

/**
 * Set a specific error to be returned.  Pass in the HTTP error code.
 */
let nextError : number = undefined;

/**
 * Set to ensure you get a 200 return from the the API.  This will
 * bypass the random error generation. False to produce errors, true to prevent errors.
 */
let errorsDisabled : boolean = false;

/**
 * The list of error trigger functions that will be used to compare against
 * incoming or outgoing data.
 */
let errorTriggers : IErrorTrigger[];

/**
 * default option settings for mock library
 */
let defaultOptions : IMockOptions = {
    maxTime         : 2000,
    minTime         : 0,
    absoluteTime    : undefined,
    priorityMock    : false
};

/**
 * The default list of errors to be randomly produced. An array of error objects.
 *
 * Contains three properties:
 *   status: The HTTP status code of the error.
 *   statusText: The status text associated with the error.
 *   distribution: The chance out of 100 that the error will occur.
 *   i.e. a 5 means the error will be produced 5 percent of the time.
 */
let errors : IConnectionError[] = [{
    status          : 0, // Dropped connection
    statusText      : '',
    distribution    : 5
}, {
    status          : 400,
    statusText      : 'Bad request',
    distribution    : 1
}, {
    status          : 401,
    statusText      : 'Not authorized',
    distribution    : 3
}, {
    status          : 403,
    statusText      : 'Forbidden',
    distribution    : 3
}, {
    status          : 404,
    statusText      : 'Not found',
    distribution    : 6
}, {
    status          : 405,
    statusText      : 'Method not allowed',
    distribution    : 2
}, {
    status          : 406,
    statusText      : 'Not acceptable',
    distribution    : 2
}, {
    status          : 407,
    statusText      : 'Proxy Authentication Required',
    distribution    : 0
}, {
    status          : 408,
    statusText      : 'Request timeout',
    distribution    : 2
}, {
    status          : 409,
    statusText      : 'Conflict',
    distribution    : 1
}, {
    status          : 410,
    statusText      : 'Gone',
    distribution    : 1
}, {
    status          : 411,
    statusText      : 'Length required',
    distribution    : 1
}, {
    status          : 412,
    statusText      : 'Precondition Failed',
    distribution    : 1
}, {
    status          : 413,
    statusText      : 'Request entity too large',
    distribution    : 1
}, {
    status          : 414,
    statusText      : 'Request-URI too long',
    distribution    : 1
}, {
    status          : 415,
    statusText      : 'Unsupported media type',
    distribution    : 1
}, {
    status          : 416,
    statusText      : 'Requested range not satisfiable',
    distribution    : 1
}, {
    status          : 417,
    statusText      : 'Expectation failed',
    distribution    : 1
}, {
    status          : 500,
    statusText      : 'Internal server error',
    distribution    : 5
}, {
    status          : 501,
    statusText      : 'Not implemented',
    distribution    : 1
}, {
    status          : 502,
    statusText      : 'Bad gateway',
    distribution    : 0
}, {
    status          : 503,
    statusText      : 'Service unavailable',
    distribution    : 1
}, {
    status          : 504,
    statusText      : 'Gateway timeout',
    distribution    : 0
}, {
    status          : 505,
    statusText      : 'HTTP version not supported',
    distribution    : 0
}];

/**
 * This function will go through the list of error triggers and run
 * each of the functions against incoming data.  It will return the
 * first error found
 *
 * @param {Object} data The data to be tested
 * @param {String} method The HTTP method used.  Determines which triggers are used to compare against
 *
 * @returns {Object} HTTP error object or undefined if no trigger matches
 */
function evaluateTriggers(data : any, method : string) {
    let error = undefined;

    // catches undefined and undefined
    if (!data) {
        return undefined;
    }

    rForEach((trigger : any) => {
        if (trigger.fn(data)) {
            error = getErrorByCode(trigger.errorCode);
        }
    }, rFilter(rPropEq('method', method.toLowerCase()),
        errorTriggers));

    return error;
}

/**
 * Cleans the entry in the error array to the actual return doesn't
 * contain unwanted information
 *
 * @param {Object} error The error from the error array
 *
 * @returns {Object} The mock $http return object
 */
function cleanError(error : IConnectionError) {
    return {
        status      : error.status,
        statusText  : error.statusText,
        data        : error.statusText.concat(' -- generated by Mock')
    };
}

/**
 * Set whether or not depalmaMock should randomly produce server errors
 *
 * @param {Boolean} disabled true to disable errors, false (default)
 *
 * @returns {Boolean} If called without a parameter, acts as a getter
 */
function disableRandomErrors(disabled : boolean) {
    // update strategy
    errorsDisabled = !disabled;

    return errorsDisabled;
}

/**
 * Retrieve the full error object from the errors array
 *
 * @param {Number} errorCode The HTTP error code to be retrieved
 *
 * @returns {Object} The object as is appears in the errors Array
 */
function getErrorByCode(errorCode : number) {
    let error;

    if (!_isNumber(errorCode)) {
        throw new Error('Must provide an integer error code');
    }

    error = rFilter((errorItem : IConnectionError) => {
        return errorItem.status === errorCode;
    }, errors);

    if (error.length === 0 || error.length > 1) {
        return undefined;
    }

    return cleanError(error[0]);
}

/**
 * Set the error code to the desired HTTP error
 *
 * @param {Number} errorCode The HTTP error code to be set to
 */
function forceError(errorCode : number) {
    if (!errorCode) {
        nextError = undefined;
    }
    else if (getErrorByCode(errorCode)) {
        nextError = errorCode;
    }
    else {
        throw new Error('Unsupported HTTP Code');
    }
}

/**
 * Generate a random integer
 *
 * @param {Number} min The minimum number you want to see
 * @param {Number} max The highest number you want to see
 *
 * @returns {Number} random integer within the specified range
 */
function randomInt(min : number, max : number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Produce a random HTTP error from the 400 or 500 series errors.  The
 * errors come from the internal list of possible errors by default and have
 * weights assigned to them that indicate the relative frequency that
 * the error should occur
 *
 * @param {Array} errorArray The list of possible errors to choose from.  Defaults
 * to the internal list of errors
 *
 * @returns {Object} object representing an HTTP error or null if there is no
 * error
 */
function randomError(errorArray : any[]) {
    let totalWeight,
        randomNumber,
        error,
        weightedSum;

    errorArray = errorArray || errors;

    totalWeight = rReduce((acc : number, value : IConnectionError) => {
        return acc + value.distribution;
    }, 0, errorArray);

    if (totalWeight > MAX_ERROR_DISTRIBUTION) {
        throw new Error(
            'Sum of distributions is greater than defined max');
    }

    randomNumber    = randomInt(0, MAX_ERROR_DISTRIBUTION);
    error           = undefined;
    weightedSum     = 0;

    if (!nextError) {
        if (!errorsDisabled) {
            for (let i = 0, errorLength = errorArray.length; i < errorLength; i++) {
                weightedSum += errorArray[i].distribution;

                if (randomNumber <= weightedSum && !error) {
                    error = cleanError(errorArray[i]);
                    break;
                }
            }
        }
    }
    else {
        return getErrorByCode(nextError);
    }
    if (error) { console.log('generated error: ' + JSON.stringify(error)); }
    return  error;
}

/**
 * Helper function that depalmaMock uses to determine if an error is to
 * be returned to the user. It first checks provided error triggers and if none are fired,
 * then it will call a random error generator. If neither the provided error triggers nor the random error generators
 * return an error, it returns undefined.
 *
 * @param {Object} data object to be used in trigger comparisons
 * @param {String} method The HTTP method used to determine which triggers are relevant
 * @param {Array} errorArray An array of HTTP error codes that will be used to produce random errors.
 *                Defaults to the default list of HTTP Errors
 *
 * @returns {Object} HTTP error object or undefined
 */
function produceError(data : any, method : string, errorArray? : any[]) {
    let error = evaluateTriggers(data, method);

    if (!error) {
        error = randomError(errorArray);
    }

    return error;
}

/**
 * Add a false latency to any requests made
 *
 * @returns {Boolean} True, always
 */
function waitForTime() {
    let time;

    if (defaultOptions.absoluteTime) {
        time = defaultOptions.absoluteTime;
    }
    else {
        time = randomInt(defaultOptions.minTime, defaultOptions.maxTime);
    }

    return time;
}

/**
 * Overwrite default options property
 *
 * @param {Object} newOptions object to be used in trigger comparisons
 */
function setOptions(newOptions : IMockOptions) {
    defaultOptions = rMerge(defaultOptions, newOptions);
}

/**
 * function method used to set the random error generation strategy of the mocking layer
 *
 * @param forceError http error code to force as the randomly generated error
 * @param enableRandomErrors flag used to turn on/off random error generation from mocking layer
 */
function setRandomErrorsConfig(enableRandomErrors : boolean, forceError? : number) {
    // update error generation strategy
    this.forceError(forceError);
    disableRandomErrors(enableRandomErrors);
}

// module exports
export {
    disableRandomErrors,
    getErrorByCode,
    forceError,
    randomInt,
    randomError,
    produceError,
    waitForTime,
    setOptions,
    setRandomErrorsConfig
}
