export const ADDUSER_FAILURE = 'ADDUSER_FAILURE';
export const ADDUSER_PENDING = 'ADDUSER_PENDING';
export const ADDUSER_SUCCESS = 'ADDUSER_SUCCESS';
/*Handling events with React elements is very similar to handling events on DOM elements
* Inside a loop it is common to want to pass an extra parameter to an event handler.
*the e argument representing the React event will be passed as a second argument after the ID. 
*With an arrow function, we have to pass it explicitly, 
*but with bind any further arguments are automatically forwarded
*The bind() method creates a new function that, when called, has its this keyword set to the provided value
*An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
*/
function addUserPending(){
	return{
		type:'ADDUSER_PENDING',
		payload:{error: false, isAdding: true, response: {}}
	}
}

export const addUser = (data) => (dispatch) => {
	dispatch(addUserPending());

	// Request to Server
	dispatch({
		type: 'ADDUSER_SUCCESS',
		payload:{
			isAdding: false,
			error: false,
			response:{
				user: {
					firstName: 'Santhosh',
					email: 'santhoshkumar.s@contus.in',
					phone: '7708222567',
					data: data
				}	
			}
		}
	});

	dispatch({
		type: 'ADDUSER_FAILURE',
		payload:{
			isAdding:false,
			error:true
		}
	})

	
	}