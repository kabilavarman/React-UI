import React from "react";
import { Route, Redirect } from "react-router-dom";
import Authorization from '../../utility/authorization';
import Application from '../../containers/Application';
import {setTitle,setMetaDescription} from '../../config';
/**
 * If we have a logged-in user, redirect to the home page. Otherwise, display the component.
 */
const PublicRoute = ({ component: Component,meta:meta,path:path, ...rest }) => {
    return (
        <Route {...rest}
            render={
                (props) => {
                    if (Authorization.isLoggedIn()) {
                        return <Redirect to={{ pathname: '/dashboard' }} />;
                    }
                    setTitle((meta && meta.title)?meta.title:'');
                    // setMetaDescription((meta && meta.description)?meta.description:'');
                    return <Application {...props} isLoggedIn={Authorization.isLoggedIn} auth={Authorization} component={Component} path={path}/>
                }
            }
        />
    )
};

export default PublicRoute;
