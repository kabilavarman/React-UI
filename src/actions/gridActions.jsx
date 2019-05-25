import { isArray,isObject} from 'lodash';
import { GRID, PENDING, FULFILLED, REJECTED  } from "../utility/constants";

/*Handling events with React elements is very similar to handling events on DOM elements
* Inside a loop it is common to want to pass an extra parameter to an event handler.
*the e argument representing the React event will be passed as a second argument after the ID.
*With an arrow function, we have to pass it explicitly,
*but with bind any further arguments are automatically forwarded
*The bind() method creates a new function that, when called, has its this keyword set to the provided value
*An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
*/

/**
 * Get the records to Grid - async action creators
 * Hanlde the Pending, Fullfilled (Success), Rejected action
 *
 * @return object
 */
export function gridRecords(url, params){
    return {
		types: [`${GRID}_${PENDING}`, `${GRID}_${FULFILLED}`, `${GRID}_${REJECTED}`],
		method: 'GET',
		url: url,
		queryParams: params,
		payload: {}
	}
}

/**
 * Get the records to Grid - async action creators
 * Hanlde the dynamic action based on given action type to Pending, Fullfilled (Success), Rejected actions
 *
 * @return object
 */
export function getGridRecords(actionDetails){
	const {url, actionType, queryParams} = actionDetails;
	return {
		types: [`${actionType}_${PENDING}`, `${actionType}_${FULFILLED}`, `${actionType}_${REJECTED}`],
		method: 'GET',
		url: url,
		queryParams: {...queryParams, breakcache:Math.random()},
		payload: {}
	}
}

/**
 * Deleted a record from Grid - async action creators
 * Hanlde the dynamic action based on given action type to Pending, Fullfilled (Success), Rejected actions
 *
 * @return object
 */
export function deleteGridRecord(actionDetails){
    let {url, actionType, id, idKey, deleteParams} = actionDetails;
    let params = {};
    if(deleteParams && isObject(deleteParams)){
        params = deleteParams;
    }
    else if(id && idKey){
        id = isArray(id) ? id : [id];
        params = { [idKey] : id };
    }

    return {
        types: [`${actionType}_${PENDING}`, `${actionType}_${FULFILLED}`, `${actionType}_${REJECTED}`],
        method: 'DELETE',
        url: `${url}`,
        payload: {},
        data: params
    }
}

/**
 * Record status updated - async action creators
 * Hanlde the dynamic action based on given action type to Pending, Fullfilled (Success), Rejected actions
 *
 * @return object
 */
export function statusUpdateGridRecord(actionDetails){
	const {url, actionType, params} = actionDetails;
	return {
		types: [`${actionType}_${PENDING}`, `${actionType}_${FULFILLED}`, `${actionType}_${REJECTED}`],
		method: 'PUT',
		url: `${url}`,
		payload: {},
		data: params
	}
}
