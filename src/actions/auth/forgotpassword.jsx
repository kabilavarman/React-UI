import { FORGOT_PASSWORD, PENDING, FULFILLED, REJECTED  } from "../../utility/constants";
/**
 * Forgot password async action creators
 * Hanlde the Pending, Fullfilled (Success), Rejected action
 *
 * @return object
 */
export function forgotpassword(data){
	return {
		types: [`${FORGOT_PASSWORD}_${PENDING}`, `${FORGOT_PASSWORD}_${FULFILLED}`, `${FORGOT_PASSWORD}_${REJECTED}`],
		method: 'POST',
		url: 'forgotpassword',
		data: data,
		payload: {}
	}
}