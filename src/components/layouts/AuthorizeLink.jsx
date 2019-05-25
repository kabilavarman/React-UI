import { Component } from 'react';
import _ from 'lodash';
import Authorization from '../../utility/authorization';
import { app } from '../../config/app';

class AuthorizeLink extends Component {
     
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
        let children = this.props.children;
        let arrayChildrenCount = 0;

        // Check for array permission
        if(!_.isUndefined(this.props.permission) && _.isArray(this.props.permission)){
            this.props.permission.forEach((perm) => {
                if(!Authorization.isAuthorizedPage(perm)){
                    arrayChildrenCount += 1;
                } 
            });
            
            if(this.props.permission.length === arrayChildrenCount){
                children = app.user.role.hideUnauthorizeLink ? '' : children;
            }
        }

        // Check whether logged user has access to this link or not
        if(!_.isUndefined(this.props.permission) && !_.isArray(this.props.permission) && !Authorization.isAuthorizedPage(this.props.permission) && app.user.role.hideUnauthorizeLink){
            children = '';
        }


        return (
            children
        )
    }
}

export default AuthorizeLink;