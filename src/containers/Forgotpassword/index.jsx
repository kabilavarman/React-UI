import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import Form from '../../utility/Form';
import { forgotpassword } from '../../actions/auth/forgotpassword';
// import particleground from '../../assets/js/jquery.particleground.js';
import { SubmitButton } from "../../components/form/SubmitButton";
import Utility from '../../utility/Utility';
import {tataLogoText,tataLogo} from '../../components/Images';

class Forgotpassword extends Component {

    constructor(props){
        super(props);
        const fieldsValidationRules = Form.getFieldsValidationRules();

        this.forgotpassword = Form.getInstance(
            this,
            { 'emailId': fieldsValidationRules['email'] },
            (fields) => {
                this.props.dispatch(forgotpassword(fields));
            }
        );

        this.state = {
            fields:{
                emailId:''
            },
            inputErrors:{}
        };
    }

    /**
     * Handle the response of forgot password
     * @param {*} props
     */
    handleForgotPassword(props){
        const response = props.forgotpassword.response;
        const forgotpassword = props.forgotpassword;
        // Check whether response is success or not
        // If success, then allow user to logindo further login process
        // If fail, then display the error message
        if(!forgotpassword.isFetching && !forgotpassword.isError && Object.keys(response).length > 0){
            // Check whether response status is success or not
            // If success, then allow user to login
            // If fail, then display the error message
            if(response.status && response.status === 200){
                toastr.success(Utility.emptyToDefault(response.message, this.props.locale.common.forgotpassword.success));
                props.history.push('/');
            }
            else{
                toastr.error(Utility.emptyToDefault(response.message, this.props.locale.common.processFail));
            }
        }
        else if(!forgotpassword.isFetching && forgotpassword.isError){
            toastr.error(Utility.emptyToDefault(response.message, this.props.locale.common.processFail));
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
        this.handleForgotPassword(nextProps);
    }

    componentDidMount(){
        //   window.particleground(document.getElementById('particles'), {
        //     dotColor: '#478ecd',
        //     lineColor: '#478ecd'
        //   });
    }
    headerLogo(){
      return (<h1>
                  <a href="javascript:void(0)" className="logo-symbol">
                      {tataLogo()}
                  </a>
                    <a href="javascript:void(0)" className="logo">
                      {tataLogoText()}
                   </a>
              </h1>);
    }
    render() {
        return <div className="main-login" id="particles">
                <div className="tcl-login">
                        <h1><span>{this.props.locale.forgotpassword.confidently} </span> {this.props.locale.forgotpassword.connect_monitor}<span> {this.props.locale.forgotpassword.and} </span> {this.props.locale.forgotpassword.control} <span>{this.props.locale.forgotpassword.new_things_everyday}</span></h1>
                    </div>
                <div className="login">
                    {this.headerLogo()}
                    <form onSubmit={this.forgotpassword.handleSubmit} method="POST">
                        <h2>{this.props.locale.forgotpassword.forgotpassword}</h2>
                        <p className="hint">Dont worry, Resetting your password is easy, Just tell us the email address you are registered with Us.</p>
                        <div className="form-group">
                         <label>{this.props.locale.user.email_id}</label>
                            <div className="form-group-content">
                                <input type="text" placeholder={this.props.locale.user.email_id} onBlur={this.forgotpassword.blurEventListner} onChange={this.forgotpassword.handleFieldsChange} value={this.state.fields.emailId} name="emailId" data-validation-name={this.props.locale.user.email_id}  />
                                <span className="username-ic"></span>
                            </div>
                            {this.state.inputErrors.emailId && this.state.inputErrors.emailId.has && <p className="error-msg">{this.state.inputErrors.emailId.message}</p>}
                         </div>
                         <div className="form-bbt-content">
                            <NavLink type="submit" to="/" className="backloginbbt">{this.props.locale.common.back_to_sign_in}</NavLink>
                            <SubmitButton className="loginbbt" text={this.props.locale.forgotpassword.submit} response={this.props.forgotpassword} />
                         </div>
                    </form>
                </div>
            </div>
    }
}

export default connect((state) => {
    return { forgotpassword: state.forgotpassword };
})(Forgotpassword);
