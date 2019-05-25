import { LOGOUT,USER_PROFILE,UPDATE_USER_PROFILE,CHANGE_PASSWORD, USER, PENDING, FULFILLED, REJECTED  } from "../../utility/constants";

/**
 * Add or Update user - async action creators
 * Hanlde the Pending, Fullfilled (Success), Rejected action
 *
 * @return object
 */
export function save(data){
	let method = 'POST';
	if(data.userId){
		method = 'PUT';
	}
    return {
        types: [`${USER}_${PENDING}`, `${USER}_${FULFILLED}`, `${USER}_${REJECTED}`],
        method: method,
        url: 'userservice/users',
        data: data,
        payload: {receiveType:'postData'}
    }
}

/**
 * Get the single user - async action creators
 * Hanlde the Pending, Fullfilled (Success), Rejected action
 *
 * @return object
 */
export function get(id){
	const method = 'GET';
    return {
        types: [`${USER}_${PENDING}`, `${USER}_${FULFILLED}`, `${USER}_${REJECTED}`],
        method: method,
        url: 'userservice/users/'+id,
        data: {},
        payload: {receiveType:'editData'}
    }
}

/**
 * Change user password - async action creators
 * Hanlde the Pending, Fullfilled (Success), Rejected action
 *
 * @return object
 */
export function changePassword(data){
    return {
        types: [`${CHANGE_PASSWORD}_${PENDING}`, `${CHANGE_PASSWORD}_${FULFILLED}`, `${CHANGE_PASSWORD}_${REJECTED}`],
        method: 'PUT',
        url: 'userservice/users/changepassword',
        data: data
    }
}

/**
 * get user details - async action creators
 * Hanlde the Pending, Fullfilled (Success), Rejected action
 *
 * @return object
 */
export function getUserProfile(userId){
    return {
        types: [`${USER_PROFILE}_${PENDING}`, `${USER_PROFILE}_${FULFILLED}`, `${USER_PROFILE}_${REJECTED}`],
        method: 'GET',
        url: `userservice/users/view/${userId}`
    }
}

/**
 * get user details - async action creators
 * Hanlde the Pending, Fullfilled (Success), Rejected action
 *
 * @return object
 */
export function updateUserProfile(data){
    return {
        types: [`${UPDATE_USER_PROFILE}_${PENDING}`, `${UPDATE_USER_PROFILE}_${FULFILLED}`, `${UPDATE_USER_PROFILE}_${REJECTED}`],
        method: 'PUT',
        url: 'userservice/users/profile',
        data:data
    }
}

/**
 * Logout - async action creators
 *
 * @return object
 */
export function logout(){
    return {
        type:`${LOGOUT}_${FULFILLED}`,
        payload:{
            response:{
                logout:false
            }
        }
    }
}
