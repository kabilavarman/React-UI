import React, {Component} from 'react';
import { connect } from 'react-redux';
import {isEmpty,find,isUndefined} from 'lodash';
import MobileNumber from '../form/MobileNumber';
import Input from '../form/input';
import Formatter from '../../utility/Formatter';

const cpInitialState = () => {
    return {
        countries:[],
        states:[],
        cities:[],
        pincodes:[],
    }
}

let cpGlobalState = {};

class CustomerProfile extends Component{
    constructor(props){
        super(props);
        this.state = !isEmpty(cpGlobalState) ? cpGlobalState : cpInitialState();


        this.handleLocationDetails = this.handleLocationDetails.bind(this);
    }

    /**
     * handle the response of country, city, state, pincode
     *
     * @param object - props
     */
    handleLocationDetails(props){
        // this.countryMas.set(props.countries);
        // this.stateMas.set(props.statesProfile);
        // this.cityMas.set(props.citiesProfile);
        // this.pincodeMas.set(props.pincodesProfile);
        // this.setState({
        //     countries:this.countryMas.getAll(),
        //     states:this.stateMas.getAll(),
        //     cities:this.cityMas.getAll(),
        //     pincodes:this.pincodeMas.getAll()
        // });
    }

    componentWillReceiveProps(props){
        this.handleLocationDetails(props);
    }

    componentWillUnmount() {
        // Remember state for the next mount
        cpGlobalState = this.state;
    }

    /**
     * Find the value in given data
     * @param string - key
     * @param string - value
     * @param array - data
     * @return boolean
     */
    findValue(key, value, data){
        const val = find(data, {[key]: value});
        return isUndefined(val);
    }


    render(){
        return  <React.Fragment>
                    <div className="profilepersonaldtails profiledtailsset">
                        <h2>{this.props.locale.common.personal_information}</h2>
                        
                        <Input {...this.props}
                            fieldName = {'customerName'}
                            value={this.props.state.fields.customerName}
                            labelName={this.props.locale.customer.form.customer_name}
                            validation={true}/>
                        <div className="form-group">
                            <label>{this.props.locale.customer.form.email_id}</label>
                            <label>{this.props.state.fields.emailId}</label>
                        </div>

                        
                        <MobileNumber {...this.props}
                                codeFieldName = {'userCountryCode'}
                                codeValue={''}
                                fieldName={'mobileNumber'}
                                value={this.props.state.fields.mobileNumber}
                                labelName={this.props.locale.user.mobile_number}
                            />
                        <Input {...this.props}
                            dataType={"number"}
                            onChange={this.props.form.handleIntegerWithDashChange}
                            fieldName = {'phoneNumber'}
                            value={this.props.state.fields.phoneNumber}
                            labelName={this.props.locale.user.phone_number}
                            validation={true}
                            maxLength={12}
                        />
                        
                    </div>
                    <div className="profileaddressdtails profiledtailsset">
                        <h2>{this.props.locale.common.address_information}</h2>
                        {
                            <Input {...this.props}
                                fieldName = {'addressLine1'}
                                dataName={'addressLine1'}
                                value={this.props.state.fields.addressLine1}
                                labelName={this.props.locale.customer.form.address_line1}
                                validation={true}/>
                        }
                        {
                            <Input {...this.props}
                                fieldName = {'addressLine2'}
                                dataName={'addressLine2'}
                                value={this.props.state.fields.addressLine2}
                                labelName={this.props.locale.customer.form.address_line2}
                                validation={false}/>
                        }
                        
                    </div>
                </React.Fragment>
    }
}

export default connect((state) => {
    return {
    }
}, null, null, { forwardRef: true })(CustomerProfile);
