import React from 'react';
/**
* radioButton class
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
class radioButton extends React.Component {
  constructor (props) {
    super(props)
    this.changeButton = this.changeButton.bind(this);
  }
  changeButton(e){
    if(this.props.onChange){
      this.props.onChange(e);
    }else{
      this.props.form.handleFieldsChange(e)
    }
  }

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
    const raido_2 = (<React.Fragment><input type="radio" id={this.props.fieldName+'2'} data-name={this.props.dataName} data-validation-name={this.props.labelName} onChange={this.changeButton} checked={String(this.props.value) === String(this.props.checkValue['second'])?true:false} value={this.props.checkValue['second']} className="check" name={this.props.fieldName} />
                    <label htmlFor={this.props.fieldName+'2'}><span className="chk-span"></span>{this.props.spanLabel['second']}</label></React.Fragment>);

    const raido_1 = (<React.Fragment><input type="radio" id={this.props.fieldName+'1'} data-name={this.props.dataName} data-validation-name={this.props.labelName} onChange={this.changeButton} checked={String(this.props.value) === String(this.props.checkValue['first'])?true:false} value={this.props.checkValue['first']} className="check" name={this.props.fieldName} />
                    <label htmlFor={this.props.fieldName+'1'}><span className="chk-span"></span>{this.props.spanLabel['first']}</label></React.Fragment>);

    const raido_3 = (<React.Fragment><input type="radio" id={this.props.fieldName+'3'} data-name={this.props.dataName} data-validation-name={this.props.labelName} onChange={this.changeButton} checked={String(this.props.value) === String(this.props.checkValue['third'])?true:false} value={this.props.checkValue['third']} className="check" name={this.props.fieldName} />
                      <label htmlFor={this.props.fieldName+'3'}><span className="chk-span"></span>{this.props.spanLabel['third']}</label></React.Fragment>);
    return (<div className="form-group">
               <label>{this.props.labelName}{ (this.props.validation !== false)  && <sup>*</sup>}</label>
               <div className={"inputgroup "+this.props.separate+' '+this.props.divClass}>
                { !this.props.separate && <div className="check-btns">{raido_1}{raido_2}</div> }
                { this.props.separate && <React.Fragment>
                                          <div className="check-btns">{raido_1}</div>
                                          <div className="check-btns">{raido_2}</div>
                                          { this.props.spanLabel['third'] && <div className="check-btns">{raido_3}</div> }
                                          </React.Fragment>
                                      }

                {this.props.hint && <p className="hint">{this.props.hint}</p> }
                {this.props.form.validation(this.props.fieldName) && <p className="error-msg">{this.props.state.inputErrors[this.props.fieldName].message}</p>}
                </div>
            </div>);

  }
}

export default radioButton;
