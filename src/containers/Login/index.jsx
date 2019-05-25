import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import Form from '../../utility/Form';
import { login } from '../../actions/auth/Login';
import { SubmitButton } from "../../components/form/SubmitButton";
import $ from 'jquery';
// import '../../assets/js/jquery.particleground.js';
import {tataLogoText,tataLogo} from '../../components/Images';

class Login extends Component {
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

        // set the rules & dispatch action of signin form
        this.signin = Form.getInstance(
            this,
            { 'email': 'required', 'password': 'required' }    ,
            (fields) => {
                props.dispatch(login(fields))
            }
        );

        this.state = {fields:{email:'', password:''}, inputErrors:{}};
    }
    componentDidMount(){
          $('body').removeClass('overflowprofile');
        //   window.particleground(document.getElementById('particles'), {
        //     dotColor: '#478ecd',
        //     lineColor: '#478ecd'
        //   });
    }
    /**
     * Check whether reponse is valid or not
     * If valid, then store the user details into local storage and redirect the user to authorized pages
     * 
     * @param object
     */
    checkLogin(props){
        const response = props.login.response;
        // Check whether response status is success or not. If success, then allow user to login. If fail, then display the error message
        if(response.status && response.status === 200 && Object.keys(response.data).length > 0){
            props.auth.login(props.login.response.data);
            if (props.auth.isLoggedIn()) {
                props.auth.redirectAfterLogin(props);
            }
        }
        else{
            this.loginError(props); 
        }
    }

    /**
     * Display error message
     * 
     * @param object 
     */
    loginError(props){
        const response = props.login.response;
        toastr.error(response.message ? response.message : this.props.locale.common.login.fail);
    }

    /**
     * Handle the login process
     * If receive the response with valid data, then user will be redirected to authenticated homepage.
     * Otherwise the error message will display
     * 
     * @param object props 
     */
    handleLogin(props){
        const response = props.login.response;
        // Check whether response is success or not. If success, then allow user to logindo further login process. If fail, then display the error message
        if(!props.login.isFetching && !props.login.isError && Object.keys(response).length > 0){
            this.checkLogin(props);            
        }
        else if(!props.login.isFetching && props.login.isError){
            this.loginError(props);
        }
    }

    /**
     * Method is invoked whenever componnet receives new props.
     * If you need to update the state in response to prop changes,
     * you may compare this.props and nextProps and perform state transitions using 
     * this.setState() in this method.
     * 
     * @param object - nextProps - Component next props 
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.login.response !== this.props.login.response){
            this.handleLogin(nextProps);
        }
    }
    
    render() { 
        return <div className="main-login" id="particles">
                 <div className="tcl-login">
                        <h1><span>{this.props.locale.forgotpassword.confidently} </span> {this.props.locale.forgotpassword.connect_monitor}<span> {this.props.locale.forgotpassword.and} </span> {this.props.locale.forgotpassword.control} <span>{this.props.locale.forgotpassword.new_things_everyday}</span></h1>
                    </div>
                <div className="login">
                    
                    <form onSubmit={this.signin.handleSubmit} method="POST">
                        <h2>{this.props.locale.forgotpassword.sign_in}</h2>
                        <div className="form-group">
                            <label>{this.props.locale.customer.form.email}</label>
                            <div className="form-group-content">
                                <input type="text" placeholder="Email" onBlur={this.signin.blurEventListner} onChange={this.signin.handleFieldsChange} value={this.state.fields.email} name="email" data-validation-name="Email"  />
                                <span className="username-ic"></span>
                            </div>
                            {this.state.inputErrors.email && this.state.inputErrors.email.has && <p className="error-msg">{this.state.inputErrors.email.message}</p>}
                         </div>
                         <div className="form-group">
                            <label>{this.props.locale.customer.form.password}</label>
                            <div className="form-group-content">
                                <input type="password" placeholder="Password" onChange={this.signin.handleFieldsChange} value={this.state.fields.password} name="password" data-validation-name="password" />
                                <span className="pwd-ic"></span>
                            </div>
                                {this.state.inputErrors.password && this.state.inputErrors.password.has && <p className="error-msg">{this.state.inputErrors.password.message}</p>}
                         </div>
                         <SubmitButton className="loginbbt" text={this.props.locale.login.login} response={this.props.login} />
                         <NavLink to="/forgot/password" className="forgetpassword">{this.props.locale.login.forgetpassword}</NavLink>
                    </form>
                </div>
            </div>
    }
}

export default connect((state) => {
    return { login: state.login };
})(Login);