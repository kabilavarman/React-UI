import React, { Component } from "react";
import $ from "jquery";
import _ from "lodash";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ls } from "../../utility/LocalStorage";

import { app } from "../../config/app";


/**
 * Remove the forward slash from start and end of the given string
 * @param string
 */
const trimForwardSlash = str => {
  return str.replace(/^\/+|\/+$/gm, "");
};

/**
 * Check whether given paths is matched with current path or not
 * If matched, return true. Otherwise false
 *
 * @param object
 * @param array | string
 */
const isMatchedPath = (props, paths) => {
  const urlPath = props.match.path;
  if (_.isArray(paths)) {
    let pathAccess = false;
    paths.forEach(path => {
      if (
        trimForwardSlash(urlPath) === trimForwardSlash(path) ||
        _.startsWith(trimForwardSlash(urlPath), trimForwardSlash(path))
      ) {
        pathAccess = true;
        return;
      }
    });
    return pathAccess;
  }
  return (
    trimForwardSlash(urlPath) === trimForwardSlash(paths) ||
    _.startsWith(trimForwardSlash(urlPath), trimForwardSlash(paths))
  );
};
/**
 * Return the active class if current path matched with given path
 * @param object - props
 * @param string - paths
 * @return string
 */
const isActivePath = (props, paths) => {
  if (isMatchedPath(props, paths)) {
    return "active";
  }
  return "";
};

class Sidebar extends Component {
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
    this.state = {
      collpaseTreeView: false,
      treeStructure: {},
     
    };
    // this.setTreeStructure = this.setTreeStructure.bind(this);
  }

  /* componentDidMount() is invoked immediately after a component is mounted.
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   */
  toggleSidebar() {
    if ($(window).width() <= 1100) {
      $(".rightsidebar-menu").addClass("toggle-menu");
      $(".container").addClass("full-widthcontainer");
      $("body").addClass("res-container");
    } else {
      $(".rightsidebar-menu").removeClass("toggle-menu");
      $(".container").removeClass("full-widthcontainer");
      $("body").removeClass("res-container");
    }
  }
  componentDidMount() {

    const self = this;
    // this.grid.getRecords();
    $(window).resize(function() {
      // Toggle sidebar when resize the window
      self.toggleSidebar();
    });
    // Toggle sidebar in normal window
    self.toggleSidebar();

    // $(".rightsidebar-menu").mCustomScrollbar({
    //   axis: "y", // horizontal scrollbar,
    //   setTop: ls.getItem("top") + "px",
    //   callbacks: {
    //     onScroll: function() {
    //       ls.setItem("top", Math.abs(this.mcs.top));
    //     },
    //     whileScrolling: function() {
    //       ls.setItem("top", Math.abs(this.mcs.top));
    //     }
    //   }
    // });
    // $(".treeview-menu").css("display", "none");
    $(".rightsidebar-menu").hover(
      function() {
        $("body").addClass("menu-hover");
      },
      function() {
        $("body").removeClass("menu-hover");
      }
    );

    $(".rightsidebar-menu").mouseout(function() {
      if ($("body").hasClass("menu-closed")) {
        $(
          ".menu-closed .rightsidebar-menu .treeview-menu.menu-open,.menu-closed .rightsidebar-menu .active .treeview-menu"
        ).css("display", "none");
      }
      if ($("body").hasClass("menu-closed menu-hover")) {
        $(".menu-hover .rightsidebar-menu .active .treeview-menu").css(
          "display",
          "block"
        );
      }
    });

    $.sidebarMenu = function(menu) {
      const animationSpeed = 300;

      $(menu).on("click", "li a", function(e) {
        const $this = $(this);
        const checkElement = $this.next();

        if (checkElement.is(".treeview-menu") && checkElement.is(":visible")) {
          checkElement.slideUp(animationSpeed, function() {
            checkElement.removeClass("menu-open");
          });
          checkElement.parent("li").removeClass("active");
        }

        //If the menu is not visible
        else if (
          checkElement.is(".treeview-menu") &&
          !checkElement.is(":visible")
        ) {
          //Get the parent menu
          const parent = $this.parents("ul").first();
          //Close all open menus within the parent
          const ul = parent.find("ul:visible").slideUp(animationSpeed);
          //Remove the menu-open class from the parent
          ul.removeClass("menu-open");
          //Get the parent li
          const parent_li = $this.parent("li");

          //Open the target menu and add the menu-open class
          checkElement.slideDown(animationSpeed, function() {
            //Add the class active to the parent li
            checkElement.addClass("menu-open");
            parent.find("li.active").removeClass("active");
            parent_li.addClass("active");
            $(".rightsidebar-menu").mCustomScrollbar("scrollTo", parent_li);
          });
        }
        //if this isn't a link, prevent the page from being redirected
        // if (checkElement.is(".treeview-menu")) {
        //   e.preventDefault();
        // }
      });
    };
    $.sidebarMenu($(".sidebar-menu"));

    $(document).on("click", function(e) {
      if (
        !$(".rightsidebar-menu").is(e.target) &&
        $(".rightsidebar-menu").has(e.target).length === 0
      ) {
        $("body").removeClass("menu-hover");
      }
    });
  }



  sidebarDashboard() {
    return (
     
     
        <li
          className={
            "dropdown treeview" +
            (isMatchedPath(this.props, ["dashboard"]) ? "active" : "")
          }
        >
          <a href="/dashboard" >
            <span className="dashboard-ic" />
            <span className="name">
                {this.props.locale.sidebar.dashboard}
            </span>
          </a>
          
        </li>
    );
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
    return (
      <div className="rightsidebar-menu mCustomScrollbar">
        <div className="overlay" />
        <div className="menu">
          <ul className="sidebar-menu">
            <li className="logo">
              <a href="/dashboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-6674 2347 255.646 14.909"
                >
                  <path
                    className="a"
                    d="M251.762,6.238c-2.006-.749-2.912-1.248-2.912-2.37,0-.811.777-1.747,2.524-1.747a7.393,7.393,0,0,1,3.042.686l.647-2.121A8.549,8.549,0,0,0,251.438,0c-3.3,0-5.372,1.809-5.372,4.117,0,2.059,1.618,3.306,4.077,4.179,1.942.686,2.718,1.31,2.718,2.37,0,1.185-.971,1.934-2.783,1.934a7.974,7.974,0,0,1-3.689-.936l-.582,2.183a9.06,9.06,0,0,0,4.077.936c3.883,0,5.76-2.059,5.76-4.3,0-2.059-1.23-3.306-3.883-4.242M240.76.25V5.24a58.483,58.483,0,0,0,.259,5.988h-.065a34.877,34.877,0,0,0-2.589-4.8L234.482.25H231.31V14.6h2.524V9.482c0-2.37,0-4.242-.129-6.113h.065A41.146,41.146,0,0,0,236.488,8.3l3.948,6.363h2.848V.312H240.76Zm-18.9,12.476c-2.654,0-4.207-2.37-4.207-5.24,0-2.994,1.424-5.427,4.207-5.427s4.207,2.558,4.207,5.3c-.065,2.994-1.553,5.365-4.207,5.365M221.926,0c-4.272,0-7.184,3.119-7.184,7.548,0,4.242,2.718,7.3,6.99,7.3,4.207,0,7.249-2.745,7.249-7.548-.065-4.117-2.654-7.3-7.055-7.3M209.564,14.6h2.783V.25h-2.783ZM196.361.25V2.433H200.7V14.6h2.783V2.433h4.336V.25Zm-7.572,8.3,1.165-3.556c.259-.873.518-1.871.712-2.682h.065a24.3,24.3,0,0,0,.777,2.682l1.165,3.556Zm3.819-8.3h-3.495L184.259,14.6h2.848l1.294-4.055h4.789l1.359,4.055h2.977ZM179.34,12.663c-3.3,0-5.307-2.059-5.307-5.178a4.923,4.923,0,0,1,5.307-5.3,7.585,7.585,0,0,1,2.977.561L182.9.686a9.87,9.87,0,0,0-3.689-.624c-4.66,0-8.09,2.869-8.09,7.61,0,4.367,2.912,7.236,7.7,7.236a9.831,9.831,0,0,0,3.883-.686l-.453-2.059a8.366,8.366,0,0,1-2.912.5M166.072,14.6h2.783V.25h-2.783ZM160.312.25V5.24a58.469,58.469,0,0,0,.259,5.988h-.065a34.87,34.87,0,0,0-2.589-4.8L154.034.25h-3.171V14.6h2.524V9.482c0-2.37,0-4.242-.129-6.113h.065A41.157,41.157,0,0,0,156.041,8.3l3.948,6.363h2.848V.312h-2.524Zm-15.4,0V8.608c0,2.807-1.165,4.117-3.171,4.117-1.877,0-3.107-1.31-3.107-4.117V.25h-2.718V8.484c0,4.554,2.265,6.363,5.76,6.363,3.624,0,6.019-1.934,6.019-6.425V.25Zm-12.685,0H128.6l-2.071,5.739c-.582,1.684-1.1,3.431-1.489,4.99h-.065c-.388-1.622-.841-3.306-1.424-4.99l-2.006-5.8H117.92l-1.036,14.347h2.589l.324-5.8c.129-1.934.194-4.242.259-6.113h.065c.388,1.809.971,3.805,1.553,5.614l2.006,6.113h2.136l2.2-6.238c.647-1.809,1.294-3.743,1.812-5.552h.065c0,1.934.065,4.179.194,6.051l.259,5.864h2.718Zm-18.575,0h-3.624l-2.071,5.739c-.582,1.684-1.1,3.431-1.489,4.99H106.4c-.388-1.622-.841-3.306-1.424-4.99L102.97.187H99.346L98.31,14.535H100.9l.324-5.8c.129-1.934.194-4.242.259-6.113h.065c.388,1.809.971,3.805,1.553,5.614l2.006,6.113h2.136l2.2-6.238c.647-1.809,1.294-3.743,1.812-5.552h.065c0,1.934.065,4.179.194,6.051l.324,5.864h2.718Zm-24.4,12.476c-2.654,0-4.207-2.37-4.207-5.24,0-2.994,1.489-5.427,4.207-5.427,2.783,0,4.207,2.558,4.207,5.3,0,2.994-1.489,5.365-4.207,5.365M89.379,0c-4.272,0-7.184,3.119-7.184,7.548,0,4.242,2.718,7.3,6.99,7.3,4.207,0,7.249-2.745,7.249-7.548C96.369,3.181,93.78,0,89.379,0M77.729,12.663c-3.3,0-5.307-2.059-5.307-5.178a4.924,4.924,0,0,1,5.307-5.3,7.585,7.585,0,0,1,2.977.561L81.289.686A9.869,9.869,0,0,0,77.6.062c-4.66,0-8.09,2.869-8.09,7.61,0,4.367,2.912,7.236,7.7,7.236a9.831,9.831,0,0,0,3.883-.686l-.453-2.059a8.993,8.993,0,0,1-2.912.5M54.43.125H48.152l-5.566,14.41h5.7L51.388,5.8l2.977,8.733h5.954Zm-25.111,0V4.367h4.336V14.535h6.213V4.367H44.01V.125Zm-4.142,0H18.834l-5.566,14.41h5.7L22,5.8l3.042,8.733h6.019ZM0,.125V4.367H4.336V14.535h6.213V4.367h4.207V.125Z"
                    transform="translate(-6674 2347)"
                  />
                </svg>
              </a>
            </li>
            {this.sidebarDashboard()}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {

  };
})(Sidebar);
