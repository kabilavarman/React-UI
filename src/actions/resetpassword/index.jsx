import { createBrowserHistory } from 'history';
import toastr from 'toastr';
import RequestFactory from '../../utility/requestFactory';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export default function resetpassword(data) {
     /*
    * State allows React components to change their output over time in response to user actions, 
     *network responses, and anything else, without violating this rule
     * React elements are plain objects
     * React DOM compares the element and its children to the previous one, 
     * and only applies the DOM updates necessary to bring the DOM to the desired state
     * To render a React element into a root DOM node
     * node whose contents has changed gets updated by React DOM
    */
    return dispatch => {
        const history = createBrowserHistory();

        dispatch(request());

        RequestFactory.withService('BASE_API')
        .call('POST','resetpassword',data, 
        (response) => {
           dispatch(success(response));
           history.push('/');
        }, (response) => {
            dispatch(failure(response));
            toastr.error('Error','failure',{timeOut: 3000});
        });
    };

    function request() { return { type: REQUEST } }
    function success(success) { return { type: SUCCESS, success } }
    function failure(error) { return { type: FAILURE, error } }
}



