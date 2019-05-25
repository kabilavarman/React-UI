import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import defultuser from "../../assets/images/defult-user.png";
import MessagePopup from "./MessagePopup";
import { fireIcon, clockIcon, waterIcon } from "../dashboard/Icons";
import { app } from "../../config/app";
import Profile from "../profile/index";
import LoadingBar from "react-redux-loading-bar";

/**
 * Header Componenet - Used to display informations about logged user utility type, notification & profile details.
 */
class Header extends Component {
  constructor(props) {
    super(props);
    this._ismounted = false;
    this.disableUtilityFilter = false;
    

    // Set the this component value
    // Reset the header utility type.
    // Because In form page, when super admin change customer, the utility type would update the based on selected customer
    // After that again user come back to other pages, the header utility type should reset to the old value

    // Get the instance of utility class
    this.getWaterIcon = this.getWaterIcon.bind(this);
  }
  /* componentWillMount() is invoked immediately after a component is mounted.
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   */
  toggleSidebar() {
    if ($(window).width() <= 1100) {
      $("body").addClass("menu-closed");
    } else {
      $("body").removeClass("menu-closed");
    }
  }

  componentWillMount() {
    $(document).on("click", function(e) {
      if ($(e.target).closest(".dropdown-togglebbt").length === 0) {
        $(".select-variable ul").hide();
      }
    });
  }
  /* componentDidMount() is invoked immediately after a component is mounted.
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   */
  componentDidMount() {
    this._ismounted = true;
    $(window).on("resize", function() {
      if ($(window).width() <= 1100) {
        $("body").addClass("menu-closed");
        $(".container").addClass("full-widthcontainer");
      } else {
        $("body").removeClass("menu-closed");
        $(".container").removeClass("full-widthcontainer");
      }
    });

    if ($(window).width() <= 1100) {
      $("body").addClass("menu-closed");
    }

    $(".dropdown-togglebbt").click(function() {
      $(".select-variable ul").toggle();
    });

    $(".menu-toggle").click(function() {
      $("body").toggleClass("menu-closed");
      if ($("body").hasClass("menu-closed")) {
        $(".menu-closed .rightsidebar-menu .treeview-menu").css(
          "display",
          "none"
        );
      } else {
        $(".rightsidebar-menu .active .treeview-menu").css("display", "block");
      }
    });

  }

  componentWillUnmount() {
    this._ismounted = false;
  }


  




  

  /**
   * return the user logo
   * If logo does not existed, then return default logo
   */
  getUserLogo() {
    return !_.isEmpty(this.props.auth.getLogo())
      ? this.props.auth.getLogo()
      : defultuser;
  }

  getWaterIcon() {
      return waterIcon("#fff");
    
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
    let name = "";
    const authUser = this.props.auth.getAuthUser();

    

    return (
      <React.Fragment>
        <header>
          <LoadingBar style={{ backgroundColor: "#13558f", top: "0px" }} />
          <div className="header-left">
            <a href="javascript:void(0)" className="menu-toggle" />
            <h1>
              <a href={this.props.auth.getUserLandingPath()} className="logo">
                {/* <img src="http://famouslogos.net/wp-content/uploads/2014/02/adidas_logo.jpg" /> */}
                {this.getWaterIcon()}
                
              </a>
            </h1>
          </div>
          <div className="header-right">
            {/* <div className="select-variable">
              <a
                href="javascript:void(0)"
                className="dropdown-togglebbt active"
              >
                <span>
                  
                  {this.getWaterIcon()}
                </span>
              </a>
              <span className="water-ic"></span>

              
            </div> */}
            {/* code may required in future */}
            {/* <div className="notifictions">
                        <a href="javascript:void(0)" className="notification-icon"></a>
                    </div> */}
            <div
              className="user-profile"
              // onClick={() =>
              //   this.profileInst.getWrappedInstance().toggleModal()
              // }
            >
              <div className="profile-link">
                <div className="image-profile">
                  <div className="image">
                    <div className="image-border">
                    {this.getWaterIcon()}
                    </div>
                  </div>

                  <div className="profile-info">
                    <span className="name">{name}</span>
                    {/* <span className="user-type">{roleName}</span> */}
                  </div>
                </div>
                <span className="dropdown-icon" />
              </div>

              {/*<div className="user-dropdown">
                            <ul>
                                <li>
                                    <NavLink to="/change/password">{this.props.locale.user.change_password}</NavLink>
                                </li>
                                <li>
                                    <a href="javascript:;" onClick={this.handleLogout}>{this.props.locale.header.logout}</a>
                                </li>
                            </ul>
                        </div>*/}
            </div>
          </div>
          <MessagePopup
            id="access-denied-popup"
            message={this.props.locale.common.no_permission}
          />
        </header>
        <Profile
          {...this.props}
          ref={instance => {
            this.profileInst = instance;
          }}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { utilities } = state;
  return {
    utilities
  };
}

export default connect(mapStateToProps)(Header);
