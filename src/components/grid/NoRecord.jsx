import React, { Component } from 'react';
import {locale} from '../../locale';

class NoRecord extends Component {
     
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
        const rowSpan = this.props.rowspan || 0;
        const colSpan = this.props.colspan || 3;

        if(this.props.isFetching){
            return <tr className="empty-row"></tr>;
        }

        return <tr>
                <td colSpan={colSpan} rowSpan={rowSpan}>{this.props.message || locale.common.norecord}</td>
            </tr>
    }
}

export default NoRecord;