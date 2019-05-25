import React from 'react';
import { Route } from "react-router-dom";
import Header from '../components/layouts/Header';
import SideBar from '../components/layouts/Sidebar';
import { locale } from '../locale';
import { app } from '../config/app';

const Application = ({ component: Component, isLoggedIn: isLoggedIn, auth: auth, path: path, authorizedPages: authorizedPages , ...rest}) => (


    <Route
        {...rest}
        render={
            (props) => {
                return (
                    <div className="main-body">
                        {isLoggedIn() && <Header isLoggedIn={isLoggedIn} locale={locale} auth={auth} {...props} />}
                        {isLoggedIn() && <SideBar isLoggedIn={isLoggedIn} locale={locale} auth={auth} {...props} authorizedPages={authorizedPages} />}
                        <Component isLoggedIn={isLoggedIn} locale={locale} auth={auth} {...props} app={app} authorizedPages={authorizedPages} />
                    </div>
                );
            }
        }
    />
);

export default Application;