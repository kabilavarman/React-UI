import React, { Component } from 'react';

class NotFoundComponent extends Component {
     /*Handling events with React elements is very similar to handling events on DOM elements
    * Inside a loop it is common to want to pass an extra parameter to an event handler.
    *the e argument representing the React event will be passed as a second argument after the ID. 
    *With an arrow function, we have to pass it explicitly, 
    *but with bind any further arguments are automatically forwarded
    *The bind() method creates a new function that, when called, has its this keyword set to the provided value
    *An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
    */
    goBack(e){
        e.preventDefault();
        this.props.history.goBack();
    }
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
            <div >
                <p>{this.props.locale.common.pagenotavaliable}</p>
                <a onClick={(e) => this.goBack}><span>{this.props.locale.common.GO_BACK}</span></a>
            </div>
        )
    }
}

export default NotFoundComponent;