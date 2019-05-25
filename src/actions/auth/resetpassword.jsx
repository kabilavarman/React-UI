import { RESET_PASSWORD, PENDING, FULFILLED, REJECTED  } from "../../utility/constants";

/**
 * Reset password async action creators
 * Hanlde the Pending, Fullfilled (Success), Rejected action
 *
 * @return object
 */
export function resetpassword(data){
	return {
		types: [`${RESET_PASSWORD}_${PENDING}`, `${RESET_PASSWORD}_${FULFILLED}`, `${RESET_PASSWORD}_${REJECTED}`],
		method: 'POST',
		url: 'updatepassword',
		data: data,
		payload: {}
	}
}