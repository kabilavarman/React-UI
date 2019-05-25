import LocalizedStrings from "react-localization";
import { common } from "./common";
import { combineLocale } from "./combineLocale";
import { home } from "./home";
import { login } from "./login";
import { customer } from "./customer";
import { pagination } from "./pagination";
import { dashboard } from "./dashboard";
import { user } from "./user";
import { header } from "./header";
import { sidebar } from "./sidebar";
import { forgotpassword } from "./forgotpassword";
import { resetpassword } from "./resetpassword";

/**
 * Gets the programmatic name of the entire locale, with the language,
 *   country and variant separated by underbars. The Language is always lower case,
 *   and country is always upper case. If the language is missing,
 *   the string will begin with an underscore character.
 *   If both the language and country fields are missing,
 *   this function will return the empty string,
 *   even if the variant field is filled in (you cannot have a locale with just a variant--
 *   the variant must accompany a valid language or country code). Examples: "en"
 *
 */
export const avaliableLanguages = { en: "English" };
export const locale = new LocalizedStrings(
  /*Handling events with React elements is very similar to handling events on DOM elements
   * Inside a loop it is common to want to pass an extra parameter to an event handler.
   *the e argument representing the React event will be passed as a second argument after the ID.
   *With an arrow function, we have to pass it explicitly,
   *but with bind any further arguments are automatically forwarded
   *The bind() method creates a new function that, when called, has its this keyword set to the provided value
   *An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
   */
  combineLocale({
    common: common,
    home: home,
    login: login,
    customer: customer,
    pagination: pagination,
    dashboard: dashboard,
    user: user,
    header: header,
    sidebar: sidebar,
    forgotpassword: forgotpassword,
    resetpassword: resetpassword,
  })
);

if (typeof localStorage.getItem("language") === "string") {
  locale.setLanguage(localStorage.getItem("language"));
}
