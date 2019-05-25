import _ from 'lodash';
import $ from 'jquery';
import Utility from './Utility';
import UtilityType from './UtilityType';
import { ls } from './LocalStorage';
import {ROUTE} from '../config';

class Authorization {

    constructor(){
      this.authUser = null;
      this.authUserId = null;
      this.authRole = null;
      this.sessionTimer = null;
      this.sessionExpireTime = (1000 * 60) * 10; // (1000 * 60) = 1 minute & multiply 3 equal t0 3 minutes (time is in milliseconds (1000 is 1 second))
    }
    /**
    *  this.idleTimer();
    * set auth user details to class property
    *
    * @return void
    */
    setAuthUser(){
      this.authUser = JSON.parse(ls.getItem("authorizedUserDetails"));
    }
    /**
    * check is active user is logged in
    *
    * @return boolean
    */
    isLoggedIn(){
      return typeof ls.getItem("authorizedUserDetails") === 'string'
    }
    /**
    * check user is having the expected role
    *
    * @param role
    * @return boolean
    */
    isUserRole(role){
      const user = this.getAuthUser();

      return (
        Utility.isObject(user)
        && Utility.isObject(user.userRole)
        && user.userRole.name === role
      );
    }
    /**
    * get logged in user details
    *
    * @return boolean
    */
    getAuthUser(){
      if(this.isLoggedIn()){
        this.setAuthUser();
      }

      return this.authUser;
    };
    /**
    * get auth user identifier
    *
    * @return int
    */
    getAuthUserId(){
      const user = this.getAuthUser();

      return (Utility.isObject(user) && user.userId) ? user.userId : 0;
    };
    /**
    * Get authentication access token
    *
    * @return string
    */
    getAccessToken(){
      let accessToken = null;
      const authUser = this.getAuthUser();
      if(authUser && Utility.isString(authUser.token)){
        accessToken = authUser.token;
      }

      return accessToken;
    };
    /**
    *
    * @return boolean
    */


    /**
     * Check logged user is customer admin
     *
     * @return boolean
     */
    isCustomerAdmin(){
      const userRole = this.getUserRole();

      return (
        _.isObject(userRole)
        && !_.isEmpty(userRole)
        && !_.isUndefined(userRole.roleId)
        && userRole.roleId == "2002"
      );
    }
    /**
    * get the logged user utility type ID
    *
    * @return stinr
    */
    getUtilityTypeId(){
      const user = this.getAuthUser();

      return _.isObject(user) && !_.isUndefined(user.utilityId) ? user.utilityId : '';
    }

    /**
    * get the current page utility type ID
    *
    * @return stinr
    */
    getPageUtilityType(){
      return ls.getItem("pageUtilityType");
    }

    /**
    * login the user by setting it in local storage
    *
    * @return boolean
    */
    login(userDetails){
      if (typeof(Storage) !== "undefined") {
          ls.removeItem("authorizedUserDetails");
          ls.setItem("authorizedUserDetails",JSON.stringify(userDetails));
          // set utility type
          const utilityType = _.isObject(userDetails) && !_.isUndefined(userDetails.utilityId) && userDetails.utilityId ? userDetails.utilityId : 'UT0003';
          UtilityType.setPageUtilityType(utilityType);
      } else {
          console.error("local storage is not supported");
      }

      /*if(this.isLoggedIn()){
        window.location.href = 'home';
      }*/
    }

    /**
     * Once user is logged in, redirect the user to view permission page
     * By default will redirect to 'dashboard' page.
     * If user does not have permission to access dashboard page,
     * find the view permission page from the his permission object
     * and redirect the user to respective path.
     *
     * @param {*} props
     */
    redirectAfterLogin(props){
      const userRolePermission = this.getUserRolePermission();
      // Default set access denied page when user does not have permission to access any page
      let redirectPath = '/access/denied';
      if(Object.keys(userRolePermission).length){
          // Set the dashboard page when user have permission to access pages
          if(!_.isEmpty(userRolePermission.dashboardManagement) && !_.isUndefined(userRolePermission.dashboardManagement.view) && userRolePermission.dashboardManagement.view){
            redirectPath = '/dashboard';
          }
          // else{

          //   // If user page does not have access to dashboard page
          //   // then find the access permission page from their own permission
          //   Object.keys(authorizedPages).some((managementNameKey) => {
          //     const managementObj = authorizedPages[managementNameKey];
          //     if(managementObj.view){
          //       const managementName = managementObj.view.split('.').shift();
          //       if(userRolePermission[managementName] && userRolePermission[managementName].view){
          //         redirectPath = _.find(ROUTE, {permission:`${managementName}.view`}).path;
          //         return true;
          //       }
          //     }
          //   });
          // }
      }
      ls.removeItem("userLandingPath");
      ls.setItem("userLandingPath",redirectPath);
      props.history.push(redirectPath);
    }

    /**
    * get logged in user details
    *
    * @return boolean
    */
    logout(){
      if (typeof(Storage) !== "undefined") {
          ls.removeItem("authorizedUserDetails");
          ls.removeItem("userUtilityType");
          ls.removeItem("formUtilityType");
          ls.removeItem("pageUtilityType");
          ls.removeItem("top");
          ls.removeItem("userLandingPath");
          this.authUser = null;
      } else {
          console.error("local storage is not supported");
      }
    }

    /**
     * return the landing page path of user
     */
    getUserLandingPath(){
      return !_.isEmpty(ls.getItem("userLandingPath")) ? ls.getItem("userLandingPath") : '';
    }

    /**
     * Reset the idle time based on listed action
     */
    idleTimer() {
      let self = this;

      let sessionExpire = function() {
            self.logout();
            window.location.reload();  //Reloads the current
      }

      let resetTimer = function() {
        if(self.isLoggedIn()){
          clearTimeout(self.sessionTimer);
          self.sessionTimer = setTimeout(sessionExpire, self.sessionExpireTime);  // time is in milliseconds (1000 is 1 second)
        }
      }

      // This code required in future process
      document.getElementsByTagName('input').onkeypress = resetTimer;
      window.onmousemove = resetTimer; // catches mouse movements
      window.onmousedown = resetTimer; // catches mouse movements
      window.onclick = resetTimer;     // catches mouse clicks
      window.onscroll = resetTimer;    // catches scrolling
      window.onkeypress = resetTimer;  //catches keyboard
    }

    /**
     * Get the user roles
     */
    getUserRole(){
      const user = this.getAuthUser();
      return (_.isObject(user) && _.isObject(user.roleMaster)) ? user.roleMaster : '';
    }

    /**
     * Get role permisions of the user roles
     */
    getUserRolePermission(){
      const role = this.getUserRole();
      return !_.isEmpty(role) && _.isObject(role) && !_.isUndefined(role.rolePermission) && _.isObject(role.rolePermission) ? role.rolePermission : '';
    }

    /**
     * Check whether given page is authorized or not to in user permission object to logged user.
     * If user is authorized, return true. Otherwise, false.
     *
     * @param string - page
     * @return boolean
     */
    isAuthorizedPage(page){
      const rolePermission = this.getUserRolePermission();

      if(_.isEmpty(rolePermission)){
        return false;
      }

      // Check for multiple permission
      if(_.isArray(page)){
        let permission = false;
        page.forEach((singlePage) => {
            let pagePermission = this.isAuthorizedPage(singlePage);
            if(pagePermission){
              permission = true;
              return;
            }
        });
        return permission;
      }

      return (_.has(rolePermission, page) && _.get(rolePermission, page, false));
    }
    /**
     * Get the customer current logo
     */
    getLogo(){
      const user = this.getAuthUser();
      return (_.isObject(user) && !_.isEmpty(user.logo)) ? user.logo : '';
    }

    /**
     * Update the customer logo
     */
    updateLogo(logoUrl){
      const userDetails = this.getAuthUser();
      if(userDetails && !_.isUndefined(userDetails.logo)){
        userDetails.logo = logoUrl;
        ls.removeItem("authorizedUserDetails");
        ls.setItem("authorizedUserDetails",JSON.stringify(userDetails));
      }


    }
}


export default new Authorization();
