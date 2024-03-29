import _ from 'lodash';
import RequestFactory from '../utility/requestFactory';
import { DEFAULT_STATE, DEFAULT_STATE_FF_EF, DEFAULT_STATE_FF_ET, LOGOUT,FULFILLED } from "../utility/constants";

export default function callAPIMiddleware({ dispatch, getState }) {
    /*Handling events with React elements is very similar to handling events on DOM elements
    * Inside a loop it is common to want to pass an extra parameter to an event handler.
    *the e argument representing the React event will be passed as a second argument after the ID.
    *With an arrow function, we have to pass it explicitly,
    *but with bind any further arguments are automatically forwarded
    *The bind() method creates a new function that, when called, has its this keyword set to the provided value
    *An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
    */
    return next => action => {
        const {
            types,
            method = 'GET',
            url,
            data = {},
            queryParams = {},
            service = 'BASE_API',
            requestBodyType = 'Json',
            payload = {},
            returnExistObject,
            setEmptyObject = false
          } = action

        if (!types) {
            // Normal action: pass it on
            return next(action)
        }

        if (
            !Array.isArray(types) ||
            types.length !== 3 ||
            !types.every(type => typeof type === 'string')
          ) {
            throw new Error('Expected an array of three string types.')
          }

        const [requestType, successType, failureType] = types;

        // Check the given 'returnExistObject' exist in state or not
        // If exist and response status is success, then return the same state, do not call the API
        if(returnExistObject){
            const state = getState();
            const existObject = state[returnExistObject];
            if(existObject.response && Object.keys(existObject.response).length > 0 && existObject.response.status === 200 && !_.isUndefined(existObject.response.data) && existObject.response.data.length > 0){
                // Normal action: pass it on
                action = {
                    type: successType,
                    payload: existObject
                }
                return next(action)
            }
        }

        // Check whether given URL is valid or not
        if(!url && typeof url !== 'string'){
                throw new Error('URL must not be empty and Expected callAPI to be a string');
        }

        const pending = Object.assign({}, payload, DEFAULT_STATE,{method:method});

        dispatch({
            type: requestType,
            payload: pending
        })
        // Call the API request
        return RequestFactory.withRequestBodyType(requestBodyType).withService(service).call(method, url, data, (response) => {
                        // Success status
                        if(response && response.status === 200){ // Success dispatch
                            const success = Object.assign({}, payload, DEFAULT_STATE_FF_EF, {
                                response
                            },{method:method})

                            dispatch({
                                type: successType,
                                payload: success
                            })
                        }
                        else if(response && response.status === 401){ // Token expired status
                            dispatch({
                                type: `${LOGOUT}_${FULFILLED}`,
                                payload: Object.assign({},{response},{response:{logout:true}})
                            })
                        }
                        else{ // Other errors dispatch action
                            const error = Object.assign({}, payload, DEFAULT_STATE_FF_ET, {
                                response
                            },{method:method})

                            dispatch({
                                type: failureType,
                                payload: error
                            })
                        }

                }, (response) => {
                    // Error
                    if(response && response.status === 401){ // Token expired status
                        dispatch({
                            type: `${LOGOUT}_${FULFILLED}`,
                            payload: Object.assign({},{response},{response:{logout:true}})
                        })
                    }
                    else{ // Other errors dispatch action
                        const error = Object.assign({}, payload, DEFAULT_STATE_FF_ET, {
                                        response
                                    },{method:method})
                        dispatch({
                            type: failureType,
                            payload: error
                        })
                    }

            }, queryParams,false,setEmptyObject);
    }
}
