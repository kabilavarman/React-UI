import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter, Switch } from 'react-router-dom';
import { createLogger } from 'redux-logger';
import toastr from 'toastr';
import reducer from './reducers';
import callAPIMiddleware from './middleware/callAPIMiddleware';
import NotFound from './components/layouts/NotFoundComponent';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import './assets/scss/common.css';
import 'toastr/build/toastr.min.css';
import { ROUTE } from './config';
import Login from './containers/Login';
import Env from './utility/env';
import serviceWorker from './serviceWorker';


/*Handling events with React elements is very similar to handling events on DOM elements
* Inside a loop it is common to want to pass an extra parameter to an event handler.
*the e argument representing the React event will be passed as a second argument after the ID. 
*With an arrow function, we have to pass it explicitly, 
*but with bind any further arguments are automatically forwarded
*The bind() method creates a new function that, when called, has its this keyword set to the provided value
*An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
*/

const middleware = [thunkMiddleware, callAPIMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

toastr.options.timeOut = 3000;
toastr.options.extendedTimeOut = 3500;

const setRoutes = () => {
    const route = ROUTE;
    return route.map((eachRoute, index) => {
        if (eachRoute.private === true) {
            return <PrivateRoute key={index} path={eachRoute.path} meta={eachRoute.meta} exact={eachRoute.exact} path={eachRoute.path} section={eachRoute.component} component={eachRoute.component} permission={eachRoute.permission} />;
        } else {
            return <PublicRoute key={index} path={eachRoute.path} meta={eachRoute.meta} exact={eachRoute.exact} path={eachRoute.path} section={eachRoute.component} component={eachRoute.component}/>;
        }
    });

}

ReactDOM.render(
    <Provider store={createStore(reducer,composeEnhancers(applyMiddleware(...middleware)))}>
            <BrowserRouter basename={Env.getEnv('REACT_APP_HOMEPAGE')}>
                <Switch>
                    {setRoutes()}
                    <PublicRoute exact={true} path='/login' component={Login}/>
                    <PublicRoute component={NotFound}/>
                </Switch>
            </BrowserRouter>
    </Provider>, document.getElementById('root'));
serviceWorker();
