import React from "react";
import moment from "moment";
import _ from 'lodash';


/**
 * SimpleSelect class
 *
 */
class Input extends React.Component {
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
    const changeMethod =
      this.props.onChange || this.props.form.handleFieldsChange;
    const placeHolder = !_.isUndefined(this.props.placeHolder)
      ? this.props.placeHolder
      : "";
    let input = (
      <React.Fragment>
        <input
          type={this.props.inputType ? this.props.inputType : "text"}
          data-type={this.props.dataType || "text"}
          data-name={this.props.dataName}
          placeholder={this.props.labelName + " " + placeHolder}
          name={this.props.fieldName}
          onBlur={this.props.form.blurEventListner}
          onChange={changeMethod}
          value={this.props.value || ""}
          data-validation-name={this.props.labelName}
          maxLength={this.props.maxLength}
          minLength={this.props.minLength}
          pattern={this.props.pattern}
          disabled={this.props.disabled}
        />
        {this.props.form.validation(this.props.fieldName) && (
          <p className="error-msg">
            {this.props.state.inputErrors[this.props.fieldName].message}
          </p>
        )}
      </React.Fragment>
    );
    

    const defaultForm = (
      <div className="form-group">
        {!this.props.labelHide && (
          <label>
            {this.props.labelName}
            {this.props.validation !== false && <sup>*</sup>}
          </label>
        )}
        <div className="inputgroup">{input}</div>
      </div>
    );

    return (
      <React.Fragment>{this.props.Div ? input : defaultForm}</React.Fragment>
    );
  }
}

export default Input;
