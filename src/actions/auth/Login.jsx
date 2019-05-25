import { LOGIN, PENDING, FULFILLED, REJECTED  } from "../../utility/constants";

/**
 * Login async action creators
 * Hanlde the Pending, Fullfilled (Success), Rejected action
 *
 * @return object
 */
export function login(data){
	return {
		types: [`${LOGIN}_${PENDING}`, `${LOGIN}_${FULFILLED}`, `${LOGIN}_${REJECTED}`],
		method: 'POST',
		url: 'login',
		data: data,
		payload: {}
	}
}