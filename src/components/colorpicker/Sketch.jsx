import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { isEmpty } from 'lodash';

class Sketch extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      displayColorPicker: false,
      color: isEmpty(props.input.defaultColor) ? "#000000" : props.input.defaultColor,
    };
  }

  /**
   * Used to display the color
   * Method call when click on button
   */
  handleClick = (e) => {
    e.preventDefault();
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  /**
   * Handle close the color picker when click outside of the picker
   */
  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  /**
   * Method call on user choosed the color from picker
   */
  handleChangeComplete = (color) => {
    const input = this.props.input;
    const name = input["data-name"] || input.name;

    this.setState({ color: color.hex });
    input.onChange(name, color.hex);
  };

  /**
     * Method is invoked whenever componnet receives new props.
     * If you need to update the state in response to prop changes,
     * you may compare this.props and nextProps and perform state transitions using 
     * this.setState() in this method.
     * 
     * @param object - nextProps - Component next props 
     */
  componentWillReceiveProps(nextProps){
    // Update the color
    // if(nextProps.input !== this.props.input){
    //   this.setState({ color: nextProps.input.defaultColor })
    // }
  }

  render() {
    /** 
     * Style to arrange the color picker & button
    */
    const styles = reactCSS({
      'default': {
        color: {
          width: '104px',
          height: '25px',
          marginRight:'10px',
          borderRadius: '2px',
          background: `${this.state.color}`,
        },
        swatch: {
          padding: '3px',
          background: '#fff',
          borderRadius: '1px',
          cursor: 'pointer',
          display:'flex',
          alignItems:"center"
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          marginTop: "-320px",
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        {/* default color is not empty, then display the UI with color * color code */}
        { !isEmpty(this.props.input.defaultColor) && <div  style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } ></div>
          <div> { this.state.color }</div>
        </div>
        }
        {/* default color is empty, then display the button with color picker */}
        { isEmpty(this.props.input.defaultColor) && <a className="cancelbbt active" href="#"  onClick={ this.handleClick }>Pick Color</a> }

        { /* Color picker element */}
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div className="close-colorpicker" style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChangeComplete={ this.handleChangeComplete } disableAlpha={true} />
        </div> : null }

      </div>
    )
  }
}

export default Sketch