import React, { Component } from 'react';
/**
* AccessDenied class
*
*/ 
class AccessDenied extends Component {
	 /*
    * State allows React components to change their output over time in response to user actions, 
     *network responses, and anything else, without violating this rule
     * React elements are plain objects
     * React DOM compares the element and its children to the previous one, 
     * and only applies the DOM updates necessary to bring the DOM to the desired state
     * To render a React element into a root DOM node
     * node whose contents has changed gets updated by React DOM
    */
    render() {
        return (
            <div className="container">
                <h1>Permission denied</h1>
            </div>
        )
    }
}

export default AccessDenied;