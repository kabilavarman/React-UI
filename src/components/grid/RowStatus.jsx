import React, { Component } from 'react';
import {locale} from '../../locale';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';

class RowStatus extends Component {
     /*Handling events with React elements is very similar to handling events on DOM elements
    * Inside a loop it is common to want to pass an extra parameter to an event handler.
    *the e argument representing the React event will be passed as a second argument after the ID. 
    *With an arrow function, we have to pass it explicitly, 
    *but with bind any further arguments are automatically forwarded
    *The bind() method creates a new function that, when called, has its this keyword set to the provided value
    *An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
    */
    static propTypes = {
        url: PropTypes.string,
        actionType: PropTypes.string,
        grid: PropTypes.object.isRequired,
        status: PropTypes.bool.isRequired,
        params: PropTypes.object
    }

    constructor(props){
        super(props);
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
        let {url, actionType, status, params} = this.props;
        params = Object.assign({}, params);
        return <a href={void(0)} className={status ? "activatebbt" : "deactivatebbt"} onClick={(e) => !isEmpty(url) && !isEmpty(actionType) ? this.props.grid.statusUpdate({ url: url, actionType: actionType, params:params }, e) : true}>{status ? locale.common.active : locale.common.inactive }</a>
    }
}

export default RowStatus;