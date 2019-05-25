import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import toastr from 'toastr';
import Authorization from '../../utility/authorization';
import Application from '../../containers/Application';
import {setTitle,setMetaDescription} from '../../config';
import _ from 'lodash';
import AccessDenied from '../error/AccessDenied';
import Loadable from 'react-loadable';
import Loader from '../../containers/Loader';
import Env from '../../utility/env';

/**
 * If we have a logged-in user, display the component, otherwise redirect to login page.
 */
const PrivateRoute = ({ component: Component, dispatch:dispatch, meta:meta, path:path, permission:permission ,...rest}) => (
    <Route
        {...rest}
        render={
            (props) => {
                setTitle((meta && meta.title) ? meta.title:'');
                // setMetaDescription((meta && meta.description) ? meta.description:'');
                if (Authorization.isLoggedIn()) {

                    if(!_.isUndefined(permission) && !Authorization.isAuthorizedPage(permission)){
                        Component = Loadable({
                            loader: () => import ('../error/AccessDenied'),
                            loading: Loader,
                        })
                    }

                    return <Application {...props} isLoggedIn={Authorization.isLoggedIn} auth={Authorization} component={Component} path={path} />
                } else {
                    sessionStorage.setItem('proute',JSON.stringify(props.location));
                    toastr.error("Please login to continue.");
                    return <Redirect to={{ pathname: Env.getEnv('REACT_APP_HOMEPAGE')}} />;
                }
            }
        }
    />
);
export default connect()(PrivateRoute);