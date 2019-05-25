import Loadable from "react-loadable";
import Loader from "./containers/Loader";

export const siteTitle = "BANK";
export const siteMetaDescription = "BANK";

export const setTitle = title => {
  document.title = title ? title : siteTitle;
};

// export const setMetaDescription = description => {
//   document
//     .querySelector('meta[name="description"]')
//     .setAttribute("content", description ? description : siteMetaDescription);
// };

/**
 * List of routes for the page
 */
export const ROUTE = [
  {
    private: false,
    exact: true,
    path: "/",
    meta: {
      title: siteTitle,
      description: siteMetaDescription
    },
    component: Loadable({
      loader: () => import("./containers/Login"),
      loading: Loader
    })
  },
  {
    private: true,
    exact: true,
    path: "/access/denied",
    meta: {
      title: siteTitle,
      description: siteMetaDescription
    },
    component: Loadable({
      loader: () => import("./components/error/AccessDenied"),
      loading: Loader
    })
  },
  {
    private: false,
    exact: true,
    path: "/dashboard",
    meta: {
      title: siteTitle,
      description: siteMetaDescription
    },
    component: Loadable({
      loader: () => import("./containers/Dashboard"),
      loading: Loader
    })
  },
  
  
  {
    private: true,
    exact: true,
    path: "/grid",
    meta: {
      title: siteTitle,
      description: siteMetaDescription
    },
    component: Loadable({
      loader: () => import("./containers/Grid"),
      loading: Loader
    })
  },

  
];
