import React, {Component} from 'react';
import { connect } from 'react-redux';
import {isEmpty} from 'lodash';
import MobileNumber from '../form/MobileNumber';
import Input from '../form/input';

const upInitialState = () => {
    return {
        zones:[],
        locations:[],
        sites:[],
    }
}

let upGlobalState = {};

class UserProfile extends Component{

    constructor(props){
        super(props);
        this.state = !isEmpty(upGlobalState) ? upGlobalState : upInitialState();

        // this.locationMas = Location.getInstance();

       

        // this.handleLocationDetails = this.handleLocationDetails.bind(this);
    }

 


    /**
     * Get the location, zone, site data at first time
     *
     * @param object - currentState
     */


    render(){
        return  <div className="profilepersonaldtails profiledtailsset">
                    <h2>{this.props.locale.common.personal_information}</h2>
                    
                    <Input {...this.props}
                    fieldName = {'firstName'}
                    value={this.props.state.fields.firstName}
                    labelName={this.props.locale.user.first_name}
                    validation={true}
                    maxLength={30}
                    />
                    <Input {...this.props}
                        fieldName = {'middleName'}
                        value={this.props.state.fields.middleName}
                        labelName={this.props.locale.user.middle_name}
                        validation={false}
                        />
                    <Input {...this.props}
                        fieldName = {'lastName'}
                        value={this.props.state.fields.lastName}
                        labelName={this.props.locale.user.last_name}
                        validation={true}
                        />
                    <div className="form-group">
                        <label>{this.props.locale.user.email_id}</label>
                        <label>{this.props.state.fields.emailId}</label>
                    </div>
                    <MobileNumber {...this.props}
                              codeFieldName = {'userCountryCode'}
                              codeValue = {''}
                              fieldName = {'mobileNumber'}
                              value={this.props.state.fields.mobileNumber}
                              labelName={this.props.locale.user.mobile_number}
                          />

                    <Input {...this.props}
                        dataType={"number"}
                        onChange={this.props.form.handleIntegerWithDashChange}
                        fieldName = {'phoneNumber'}
                        value={this.props.state.fields.phoneNumber || ''}
                        labelName={this.props.locale.user.phone_number}
                        validation={true}
                        maxLength={12}
                    />
                   
                </div>
    }
}

export default connect((state) => {
    return {
      
    }
}, null, null, { forwardRef: true })(UserProfile);
