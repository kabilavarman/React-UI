import React ,{ Component } from'react';
import $ from 'jquery';
import _ from 'lodash';
import toastr from 'toastr';
import Authorization from '../../utility/authorization';

class Delete extends Component {
     /*Handling events with React elements is very similar to handling events on DOM elements
    * Inside a loop it is common to want to pass an extra parameter to an event handler.
    *the e argument representing the React event will be passed as a second argument after the ID.
    *With an arrow function, we have to pass it explicitly,
    *but with bind any further arguments are automatically forwarded
    *The bind() method creates a new function that, when called, has its this keyword set to the provided value
    *An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
    */
    constructor(props) {
        super(props);
        this.handleToogleModal = this.handleToogleModal.bind(this);
        const confirmMsg = `${this.props.locale.common.remove.confirm_message} ${_.lowerCase(this.props.managementType)}?`
        this.state = {
          showModal: false,
          message: confirmMsg,
          confirmCount: 0
        };
        this.deleteDetails = {};
    }
    /**
     * Cancel the confirmation box by press enter button
     */
    triggerCancel(){
      const self = this;
        $(document).on("keyup", function (event) {
            if (event.which === 13 && self.state.showModal) {
                $("#cancel").trigger('click');
            }
        });
    }

    /**
     * Handle the popup toggle when click on delete icon from grid
     *
     * @param object - (deleteObj - Required data to perform delete operation)
     */
    handleToogleModal(deleteObj, e) {
      e.preventDefault();
      // Check whether logged user has access to delete
      if(!_.isUndefined(this.props.permission) && !Authorization.isAuthorizedPage(this.props.permission)){
          $('#access-denied-popup').show();
          return false;
      }

      // If required ID is empty, then display the error message
      if(_.isEmpty(deleteObj.id) && _.isEmpty(deleteObj.deleteParams)){
        toastr.error(`Please select atleast one ${_.lowerCase(this.props.managementType)}`);
        return false;
      }

      this.deleteDetails = deleteObj;
      if(this.state.showModal){
        this.setState({showModal: false});
      }else{
        this.setState({showModal: true});
      }
    }

    /**
     * Handle the two confirmation box to perform delete operation
     * @param boolean - (confirmStatus)
     */
    handleDeleteConfirmation(confirmStatus, e){
      e.preventDefault();
      this.triggerCancel();
      const confirmMsg = `${this.props.locale.common.remove.confirm_message} ${_.lowerCase(this.props.managementType)}?`
      if(confirmStatus && this.state.confirmCount === 1){
        this.setState({showModal: false, message: confirmMsg, confirmCount:0});
        this.props.grid.deleteRecord(this.deleteDetails);
      }
      else if(confirmStatus){
        this.setState({showModal: true, message: this.props.locale.common.remove.confirm_message1, confirmCount:1});
      }
      else{
        this.setState({showModal: false, message: confirmMsg, confirmCount:0});
      }
    }

    render() {
      return (
              <div className="delete-popup-overlay" style={{display: this.state.showModal ? 'block' : 'none' }}>
                  <div className="delete-popup-content">
                      <h6>{this.state.message}</h6>
                      <div className="delete-popupbbt">
                          <a id="cancel" href="" className="cancel" onClick={(e) => this.handleDeleteConfirmation(false, e)}>{ this.state.confirmCount ? this.props.locale.common.no : this.props.locale.common.cancel}</a>
                          <a href="" className="delete" onClick={(e) => this.handleDeleteConfirmation(true, e)}>{this.state.confirmCount ? this.props.locale.common.yes: this.props.locale.common.delete}</a>
                      </div>
                     <svg onClick={(e) => this.handleDeleteConfirmation(false, e)} version="1.1" viewBox="0 0 15.642 15.642"  enableBackground="new 0 0 15.642 15.642" width="24px" height="24px" className="">
                    <path fillRule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"/>
                  </svg>
                  </div>
              </div>
           )
        }
      }
export default Delete;
