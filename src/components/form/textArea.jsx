import React from 'react';
/**
* textArea class
*
*/ 
class textArea extends React.Component {
  
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
    const textarea = (<div>
                    <textarea name={this.props.fieldName}
                              data-name={this.props.dataName}
                              onChange={this.props.form.handleFieldsChange} 
                              onBlur={this.props.form.blurEventListner} 
                              value={this.props.value}
                              placeholder={this.props.labelName}
                              data-validation-name={this.props.labelName}>
                    </textarea>
                    {this.props.form.validation(this.props.fieldName) && <p className="error-msg">{this.props.state.inputErrors[this.props.fieldName].message}</p>}
                    </div>)
    const defaultTextarea = (<div className="form-group">
                    <label>{this.props.labelName}{(this.props.validation !== false) && <sup>*</sup>}</label>
                      <div className="inputgroup">
                      {textarea}
                      </div>
                    </div>)
    return (<div>
              {this.props.Div?textarea:defaultTextarea}
          </div>);
  }
}

export default textArea;