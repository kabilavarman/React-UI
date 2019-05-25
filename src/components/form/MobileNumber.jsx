import React from 'react';
/**
* MobileNumber class
*
*/
/*
* State allows React components to change their output over time in response to user actions, 
 *network responses, and anything else, without violating this rule
 * React elements are plain objects
 * React DOM compares the element and its children to the previous one, 
 * and only applies the DOM updates necessary to bring the DOM to the desired state
 * To render a React element into a root DOM node
 * node whose contents has changed gets updated by React DOM
*/
class MobileNumber extends React.Component {
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
    return (<div className="form-group phonenumber">
                 <label>{this.props.labelName}{(this.props.validation !== false) && <sup>*</sup>}</label>
                  <div className="main-inputgroup"> 
                  <div className="inputgroup">
                  <span className="phonenumber-code"><input type="text" 
                                                            name={this.props.codeFieldName} 
                                                            value={this.props.codeValue}
                                                            data-name={this.props.codeDataName} 
                                                            placeholder="+91"
                                                            data-validation-name={'Country Code'}
                                                            onBlur={this.props.form.blurEventListner}
                                                            onChange={this.props.form.handleFieldsChange}
                                                            maxLength={4}
                                                      /></span>
                      <input type={"text"}
                                  data-type={"number"}
                                  data-name={this.props.dataName} 
                                  placeholder={this.props.labelName} 
                                  name={this.props.fieldName} 
                                  onBlur={this.props.form.blurEventListner} 
                                  onChange={this.props.form.handleIntegerChange} 
                                  value={this.props.value} 
                                  data-validation-name={this.props.labelName} 
                                  maxLength={10}/>
                  </div>
                  {this.props.form.validation(this.props.fieldName) && <p className="error-msg">{this.props.state.inputErrors[this.props.fieldName].message}</p>}
                  {this.props.form.validation(this.props.codeFieldName) && <p className="error-msg">{this.props.state.inputErrors[this.props.codeFieldName].message}</p>}
              </div></div>);
  }
}

export default MobileNumber;