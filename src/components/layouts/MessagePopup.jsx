import React, { Component } from 'react';
import $ from 'jquery';
import {locale} from '../../locale';

class MessagePopup extends Component {
     /*Handling events with React elements is very similar to handling events on DOM elements
    * Inside a loop it is common to want to pass an extra parameter to an event handler.
    *the e argument representing the React event will be passed as a second argument after the ID. 
    *With an arrow function, we have to pass it explicitly, 
    *but with bind any further arguments are automatically forwarded
    *The bind() method creates a new function that, when called, has its this keyword set to the provided value
    *An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
    */
    constructor(props){
        super(props);
        this.id = this.props.id ? this.props.id : 'message-popup';
    }

    close(e){
        e.preventDefault();
        $(`#${this.id}`).hide();
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
            <div id={this.props.id ? this.props.id : 'message-popup'} className="delete-popup-overlay permision" style={{display:"none"}}>
                <div className="delete-popup-content ">
                    <h6>{this.props.message}</h6>
                    <div className="delete-popupbbt">
                    <a href="" className="done" onClick={(e) => this.close(e)}>{locale.common.ok}</a>
                    </div>
                    <svg onClick={(e) => this.close(e)} version="1.1" viewBox="0 0 15.642 15.642"  enableBackground="new 0 0 15.642 15.642" width="24px" height="24px" className="">
                        <path fillRule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"/>
                    </svg>
                </div>
            </div>
        )
    }
}

export default MessagePopup;