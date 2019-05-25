import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import Form from '../../utility/Form';
import { resetpassword } from '../../actions/auth/resetpassword';
// import  particleground from '../../assets/js/jquery.particleground.js';
import { SubmitButton } from "../../components/form/SubmitButton";
import {tataLogoText,tataLogo} from '../../components/Images';
import Utility from '../../utility/Utility';

class Resetpassword extends Component {
  /*
* State allows React components to change their output over time in response to user actions,
 *network responses, and anything else, without violating this rule
 * React elements are plain objects
 * React DOM compares the element and its children to the previous one,
 * and only applies the DOM updates necessary to bring the DOM to the desired state
 * To render a React element into a root DOM node
 * node whose contents has changed gets updated by React DOM
*/
    constructor(props){
        super(props);
        const fieldsValidationRules = Form.getFieldsValidationRules();
        this.resetpassword = Form.getInstance(
            this,
            { 'newPassword': fieldsValidationRules['password'],'confirmPassword':`${fieldsValidationRules['password']}|same:newPassword`},
            (fields) => {
                this.props.dispatch(resetpassword(fields));
            }
        );
        this.state = {
            fields:{
                newPassword:'',
                confirmPassword:'',
                sessionId:this.props.match.params.id,
            },
            inputErrors:{}
        };
    }

    /**
     * Handle the reset password response
     *
     * @param object - props
     */
    handleResetPassword(props){
        const response = props.resetpassword.response;
        const resetpassword = props.resetpassword;
        // Check whether response is success or not
        // If success, then allow user to logindo further login process
        // If fail, then display the error message
        if(!resetpassword.isFetching && !resetpassword.isError && Object.keys(response).length > 0){
            // Check whether response status is success or not
            // If success, then allow user to login
            // If fail, then display the error message
            if(response.status && response.status === 200){
                toastr.success(Utility.emptyToDefault(response.message, this.props.locale.common.resetpassword.success));
                props.history.push('/');
            }
            else{
                toastr.error(Utility.emptyToDefault(response.message, this.props.locale.common.processFail));
            }
        }
        else if(!resetpassword.isFetching && resetpassword.isError){
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
        this.handleResetPassword(nextProps);
    }

    componentDidMount(){
        //   window.particleground(document.getElementById('particles'), {
        //     dotColor: '#478ecd',
        //     lineColor: '#478ecd'
        //   });
    }
    render() {

        return <div className="main-login" id="particles">
                 <div className="tcl-login">
                        <h1><span>{this.props.locale.forgotpassword.confidently} </span> {this.props.locale.forgotpassword.connect_monitor}<span> {this.props.locale.forgotpassword.and} </span> {this.props.locale.forgotpassword.control} <span>{this.props.locale.forgotpassword.new_things_everyday}</span></h1>
                    </div>
                <div className="login">
                    <h1>
                        <a href="javascript:void(0)" className="logo-symbol">
                            {tataLogo()}
                        </a>
                          <a href="javascript:void(0)" className="logo">
                            {tataLogoText()}
                         </a>
                    </h1>
                    <form onSubmit={this.resetpassword.handleSubmit} method="POST">
                        <h2>{this.props.locale.resetpassword.resetpassword}</h2>
                        <div className="form-group">
                        <label>{this.props.locale.resetpassword.newPassword}</label>
                            <div className="form-group-content">
                                <input type="password" placeholder={this.props.locale.resetpassword.newPassword} data-validation-name={this.props.locale.resetpassword.newPassword} onBlur={this.resetpassword.blurEventListner} onChange={this.resetpassword.handleFieldsChange} value={this.state.fields.newPassword} name="newPassword"/>
                                <span className="pwd-ic"></span>
                            </div>
                                {this.state.inputErrors.newPassword && this.state.inputErrors.newPassword.has && <p className="error-msg">{this.state.inputErrors.newPassword.message}</p>}
                         </div>
                         <div className="form-group">
                          <label>{this.props.locale.resetpassword.confirmPassword}</label>
                            <div className="form-group-content">
                                <input type="password" placeholder={this.props.locale.resetpassword.confirmPassword} data-validation-name={this.props.locale.resetpassword.confirmPassword} onBlur={this.resetpassword.blurEventListner} onChange={this.resetpassword.handleFieldsChange} value={this.state.fields.confirmPassword} name="confirmPassword" />
                                <span className="pwd-ic"></span>
                            </div>
                                {this.state.inputErrors.confirmPassword && this.state.inputErrors.confirmPassword.has && <p className="error-msg">{this.state.inputErrors.confirmPassword.message}</p>}
                         </div>
                          <div className="form-bbt-content">
                            <NavLink type="submit" to="/" className="backloginbbt">{this.props.locale.common.back_to_login}</NavLink>
                            <SubmitButton className="loginbbt" text={this.props.locale.resetpassword.submit} response={this.props.resetpassword} />
                      </div>
                    </form>
                </div>
            </div>
    }
}

export default connect((state) => {
    return { resetpassword: state.resetpassword };
})(Resetpassword);
