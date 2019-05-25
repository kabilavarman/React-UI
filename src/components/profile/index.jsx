import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import toastr from "toastr";
import $ from "jquery";
import _ from 'lodash';
import { isEmpty } from "lodash";
import { profileCloseIcon, editIcon } from "../Images";
import CustomerProfile from "./CustomerProfile";
import UserProfile from "./UserProfile";
import Form from "../../utility/Form";
import { getUserProfile, updateUserProfile, logout } from "../../actions/user";
import { imageUpload } from "../../actions/imageupload";
import defultuser from "../../assets/images/defult-user.png";
import { app } from "../../config/app";
import { SubmitButton } from "../form/SubmitButton";
import ImageHandler from "../../components/ImageHandler";
import Loader from "../../components/layouts/Loader";
import { ls } from "../../utility/LocalStorage";

import {
  SITESELECT_PROFILE,
  LOCATION_TYPE_PROFILE,
  ZONE_TYPE_PROFILE
} from "../../utility/constants";

const fieldsValidationRules = Form.getFieldsValidationRules();

const profileValidation = props => {
  if (props.auth.isCustomerAdmin()) {
    return {
      customerName: "required",
      mobileNumber: fieldsValidationRules["mobilenumber"],
      phoneNumber: fieldsValidationRules["phonenumber"],
      addressLine1: fieldsValidationRules["addressLine1"],
      country: fieldsValidationRules["country"],
      state: fieldsValidationRules["state"],
      city: fieldsValidationRules["city"],
      pinCode: fieldsValidationRules["pinCode"]
    };
  }

  return {
    firstName: "required",
    lastName: "required",
    mobileNumber: fieldsValidationRules["mobilenumber"],
    phoneNumber: fieldsValidationRules["phonenumber"]
  };
};

const pInitialState = () => {
  return {
    fields: {
      userId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      roleName: "",
      utilityId: "",
      utilityName: "",
      mobileNumber: "",
      phoneNumber: "",
      emailId: "",
      groupEmailId: "",
      logo: "",
      billingType: [],
      customerStatus: "",
      addressLine1: "",
      addressLine2: "",
      cityId: "",
      stateId: "",
      countryId: "",
      pinCodeId: "",
      siteId: "",
      zoneId: "",
      locationId: "",
      customerName: "",
      customerId: "",
      profilePicture: ""
    },
    inputErrors: {},
    showModal: false
  };
};

let profileState = {};

/**
 * Header Componenet - Used to display informations about logged user utility type, notification & profile details.
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.checkTokenExpiry = this.checkTokenExpiry.bind(this);
    this.handleGetUserProfile = this.handleGetUserProfile.bind(this);
    this.handleUpdateUserProfile = this.handleUpdateUserProfile.bind(this);
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.state = !isEmpty(profileState) ? profileState : pInitialState();

    this.profile = Form.getInstance(
      this,
      profileValidation(props),
      fields => {
        this.props.dispatch(updateUserProfile(fields));
      },
      //file upload
      fields => {
        this.props.dispatch(
          imageUpload(fields, this.props.auth.getAuthUser().userName, "logo")
        );
      },
      {
        logo: { mime: app.image.types, fileSize: app.image.maxSize }
      }
    );

    this.profilePicForm = Form.getInstance(
      this,
      null,
      null,
      //file upload
      fields => {
        this.props.dispatch(
          imageUpload(
            fields,
            this.props.auth.getAuthUser().userName,
            "profilePicture"
          )
        );
      },
      {
        profilePicture: { mime: app.image.types, fileSize: app.image.maxSize }
      }
    );
  }

  toggleModal() {
    const self = this;
    // If global variable is set then take the value from that variable to avoid repeated request
    const state = !isEmpty(profileState) ? profileState : this.state;
    state.showModal = !this.state.showModal;
    this.setState(state, () => {
      // if global variable 'profileState' is empty, then dispatch the action to get user details
      // baecause we stroe the user details in 'profileState' global varible after first get success
      if (self.state.showModal && isEmpty(profileState)) {
        // Dispatch action to get user Profile details
        self.props.dispatch(getUserProfile(self.props.auth.getAuthUserId()));
      }

      if (self.state.showModal) {
        $("body").addClass("overflowprofile");
      } else {
        $("body").removeClass("overflowprofile");
      }
    });
  }

  /**
   * Handle the change password process
   */
  changePassword() {
    this.toggleModal();
    this.props.history.push("/change/password");
  }

  /**
   * Handle the logout process
   */
  handleLogout() {
    if (this.props.isLoggedIn()) {
      profileState = {}; // Clear the global variable
      this.props.auth.logout();
      this.props.history.push("/");
    }
  }

  /**
   * Used to logout the application when receive token expired response
   * @param {*} props
   */
  checkTokenExpiry(props) {
    if (
      props.logout.response !== this.props.logout.response &&
      props.logout.response.logout
    ) {
      toastr.error(
        props.logout.response.message || props.locale.login.token_expiry
      );
      this.handleLogout();
      this.props.dispatch(logout());
    }
  }

  /**
   * Handle the response of get user profile details
   * success - Update the user profile detials in state
   * failure - Display the error message
   * @param object - props
   */
  handleGetUserProfile(props) {
    const response = props.userProfile.response;
    if (response !== this.props.userProfile.response) {
      if (
        Object.keys(response).length > 0 &&
        response.status &&
        response.status === 200
      ) {
        // Success
        const currentFields = Object.assign(
          {},
          this.state.fields,
          response.data,
          { regId: response.data.userId }
        );
        this.setState({ fields: currentFields }, () => {
          // Update the global variable with current state
          // to display the updated value in profile
          profileState = this.state;
        });

        if (this.userProfileInst) {
          this.userProfileInst
            .getWrappedInstance()
        }
      } else if (!props.userProfile.isFetching && props.userProfile.isError) {
        // Failure
        toastr.error(
          response.message || this.props.locale.user.profile.get.error
        );
      }
    }
  }

  /**
   * Handle the response of update user profile details
   * success - Display the success message
   * failure - Display the error message
   * @param object - props
   */
  handleUpdateUserProfile(props) {
    const response = props.updateUserProfile.response;
    if (response !== this.props.updateUserProfile.response) {
      if (
        Object.keys(response).length > 0 &&
        response.status &&
        response.status === 200
      ) {
        toastr.success(
          response.message || this.props.locale.user.profile.update.success
        );
        // Update the global variable with current state
        // to display the updated value in profile
        profileState = this.state;
        // Update the customer logo
        if (
          this.props.auth.isCustomerAdmin() &&
          this.props.auth.getLogo() !== this.state.fields.logo
        ) {
          this.props.auth.updateLogo(this.state.fields.logo);
        }
        let authorizedUserDetails = JSON.parse(
          ls.getItem("authorizedUserDetails")
        );
        authorizedUserDetails.profilePicture = this.state.fields.profilePicture;
        ls.setItem(
          "authorizedUserDetails",
          JSON.stringify(authorizedUserDetails)
        );
        let fields = this.props.auth.authUser;
        fields = _.set(
          fields,
          "profilePicture",
          this.state.fields.profilePicture
        );
        // this.toggleModal();
        window.location.reload();
      } else if (
        !props.updateUserProfile.isFetching &&
        props.updateUserProfile.isError
      ) {
        toastr.error(
          response.message || this.props.locale.user.profile.update.error
        );
      }
    }
  }

  /**
   * Handle the upload image response
   * Sucess - Update the image url in state fields
   * @param object - props
   */
  handleUploadImage(props) {
    const response = props.image.response;
    if (
      Object.keys(response).length > 0 &&
      response.status &&
      response.status === 200
    ) {
      // Success
      const fields = this.state.fields;
      const uploadName = props.image.uploadName;
      // Check the uploadname is exist in state fields
      if (uploadName in fields) {
        fields[uploadName] =
          response.data && response.data.imageToken
            ? response.data.imageToken
            : "";
        //this.setState({fields: fields});
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.checkTokenExpiry(nextProps);
    this.handleGetUserProfile(nextProps);
    this.handleUpdateUserProfile(nextProps);
    this.handleUploadImage(nextProps);
  }

  triggerFileUpload() {
    this.profilePic.click();
  }

  render() {
    return (
      <aside className="profilebar">
        <div
          className="overlay"
          onClick={this.toggleModal}
          style={{ display: this.state.showModal ? "block" : "none" }}
        />
        <div className={"myprofile " + (this.state.showModal ? "open" : "")}>
          {/* {(this.props.image.isFetching ||
            this.props.userProfile.isFetching) && <Loader />} */}
          <div className="myprofile-image">
            <div className="myprofilechangepwd">
              <a
                href="javascript:void(0)"
                className="close"
                onClick={this.toggleModal}
              >
                {profileCloseIcon()}
              </a>
            </div>

            <div className="userprofile" onClick={this.triggerFileUpload}>
              <a>
                <ImageHandler
                  imageUrl={
                    !isEmpty(this.state.fields.profilePicture)
                      ? this.state.fields.profilePicture
                      : defultuser
                  }
                />
              </a>
              <i className="camera">
                <input
                  type="file"
                  id="profilepic"
                  name="profilePicture"
                  accept={app.image.acceptTypes}
                  ref={instance => (this.profilePic = instance)}
                  onChange={this.profilePicForm.handleFileSelect}
                />
                <label htmlFor="profilepic" />
                {editIcon()}
              </i>
            </div>
            <div className="profilename">
              <h2>
                {this.props.auth.isCustomerAdmin()
                  ? this.state.fields.customerName
                  : `${this.state.fields.firstName} ${
                      this.state.fields.middleName
                    } ${this.state.fields.lastName}`}
              </h2>
              <span>{this.state.fields.roleName}</span>
              <div className="changepwdlogout">
                <a
                  href="javascript:void(0);"
                  className="password"
                  onClick={this.changePassword}
                >
                  {this.props.locale.user.change_password}
                </a>
                {/*<NavLink to="/change/password" className="password" >{this.props.locale.user.change_password}</NavLink>*/}
                <a
                  href="javascript:void(0);"
                  className="logout"
                  onClick={this.handleLogout}
                >
                  {this.props.locale.header.sign_out}
                </a>
              </div>
            </div>
          </div>
          <div className="profileformdetails">
            <form onSubmit={this.profile.handleSubmit}>
              {this.props.auth.isCustomerAdmin() && (
                <CustomerProfile
                  ref={instance => (this.customerProfileInst = instance)}
                  {...this.props}
                  form={this.profile}
                  state={this.state}
                />
              )}
              {!this.props.auth.isCustomerAdmin() && (
                <UserProfile
                  ref={instance => (this.userProfileInst = instance)}
                  {...this.props}
                  form={this.profile}
                  state={this.state}
                />
              )}

              <div className="formsubmit">
                <a
                  href="javascript:void(0)"
                  className="cancelbbt"
                  onClick={this.toggleModal}
                >
                  cancel
                </a>
                <SubmitButton
                  className="addcustomerbbt"
                  text={this.props.locale.customer.form.submit}
                  response={this.props.updateUserProfile}
                />
              </div>
            </form>
          </div>
        </div>
      </aside>
    );
  }
}

export default connect(
  state => {
    return {
      image: state.image,
      logout: state.logout,
      userProfile: state.userProfile,
      updateUserProfile: state.updateUserProfile
    };
  },
  null,
  null,
  { forwardRef: true }
)(Profile);
