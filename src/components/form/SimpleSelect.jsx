import React from 'react';
import _ from 'lodash';
import {locale} from '../../locale';

 /*
    * State allows React components to change their output over time in response to user actions, 
     *network responses, and anything else, without violating this rule
     * React elements are plain objects
     * React DOM compares the element and its children to the previous one, 
     * and only applies the DOM updates necessary to bring the DOM to the desired state
     * To render a React element into a root DOM node
     * node whose contents has changed gets updated by React DOM
    */
export const SimpleSelect = ({emptyOptionText, emptyOptionValue, optionText, optionValue, data, ...rest}) => {
    emptyOptionText = !_.isUndefined(emptyOptionText) ? emptyOptionText : locale.common.select;
    emptyOptionValue = !_.isUndefined(emptyOptionValue) ? emptyOptionValue : '';
            
    return <select {...rest}>
                <option value={emptyOptionValue}>{emptyOptionText}</option>
                {
                    data.map((option) => {
                        return <option id={`simple-select-${option[optionValue]}`} key={`simple-select-${option[optionValue]}`} value={option[optionValue]}>{option[optionText]}</option>
                    })
                }
            </select>
}