/*Handling events with React elements is very similar to handling events on DOM elements
* Inside a loop it is common to want to pass an extra parameter to an event handler.
*the e argument representing the React event will be passed as a second argument after the ID. 
*With an arrow function, we have to pass it explicitly, 
*but with bind any further arguments are automatically forwarded
*The bind() method creates a new function that, when called, has its this keyword set to the provided value
*An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
*/


/**
 * Page contains the dashboard icons
 */
import React from 'react';
/**
 * Tata Logo
 */
export const tataLogo = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4902 -599 54.348 47.583">
<g id="Group_930" data-name="Group 930" transform="translate(-4902 -599)">
     <path id="Path_587" data-name="Path 587" className="cls-1" d="M0,58.8H13.067v3.989H9.309v9.6H3.874v-9.6H0V58.8" transform="translate(0 -24.804)"/>
     <path id="Path_588" data-name="Path 588" className="cls-1" d="M28.279,64.293,25.5,72.387H20.3L25.446,58.8h5.666l5.261,13.587H31.054l-2.775-8.094" transform="translate(-8.563 -24.804)"/>
     <path id="Path_589" data-name="Path 589" className="cls-1" d="M45.9,58.8H59.024v3.989H55.266v9.6H49.774v-9.6H45.9V58.8" transform="translate(-19.362 -24.804)"/>
     <path id="Path_590" data-name="Path 590" className="cls-1" d="M74.179,64.293l-2.717,8.094H66.2L71.346,58.8h5.666l5.261,13.587H77.012l-2.833-8.094" transform="translate(-27.925 -24.804)"/>
     <path id="Path_591" data-name="Path 591" className="cls-1" d="M52.306,9.135A10.991,10.991,0,0,0,50.4,6.418,19.14,19.14,0,0,0,43,1.735,28.184,28.184,0,0,0,33,0a28.092,28.092,0,0,0-9.945,1.735,18.485,18.485,0,0,0-7.343,4.683A10.82,10.82,0,0,0,13.8,9.193,85.5,85.5,0,0,1,30.625,6.88,1.536,1.536,0,0,1,31.9,7.4c.347.4.289,1.908.289,2.6l-.231,17.172h2.081L33.863,9.887a6.22,6.22,0,0,1,.289-2.6,1.536,1.536,0,0,1,1.272-.52A90.255,90.255,0,0,1,52.306,9.135" transform="translate(-5.821 0)"/>
     <path id="Path_592" data-name="Path 592" className="cls-1" d="M69.8,18.422a70.969,70.969,0,0,0-13.3-1.735c-3.3-.173-3.353.983-3.006,3.238,0,.116.058.289.058.52,1.1,6.533,2.486,12.142,2.717,13.124,8.037-1.85,13.818-6.938,13.818-12.893a9.251,9.251,0,0,0-.289-2.255" transform="translate(-22.507 -7.032)"/>
     <path id="Path_593" data-name="Path 593" className="cls-1" d="M28.394,19.925c.347-2.255.289-3.411-3.006-3.238a76.185,76.185,0,0,0-13.3,1.735,9.55,9.55,0,0,0-.289,2.2,10.614,10.614,0,0,0,3.006,7.227,18.485,18.485,0,0,0,7.343,4.683,23.03,23.03,0,0,0,3.411.983c.231-.867,1.619-6.649,2.717-13.3a.374.374,0,0,0,.116-.289" transform="translate(-4.978 -7.032)"/>
 </g>
</svg>

/**
 * Tata Logo with text
 */
export const tataLogoText = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6674 2347 255.646 14.909"><path className="a" d="M251.762,6.238c-2.006-.749-2.912-1.248-2.912-2.37,0-.811.777-1.747,2.524-1.747a7.393,7.393,0,0,1,3.042.686l.647-2.121A8.549,8.549,0,0,0,251.438,0c-3.3,0-5.372,1.809-5.372,4.117,0,2.059,1.618,3.306,4.077,4.179,1.942.686,2.718,1.31,2.718,2.37,0,1.185-.971,1.934-2.783,1.934a7.974,7.974,0,0,1-3.689-.936l-.582,2.183a9.06,9.06,0,0,0,4.077.936c3.883,0,5.76-2.059,5.76-4.3,0-2.059-1.23-3.306-3.883-4.242M240.76.25V5.24a58.483,58.483,0,0,0,.259,5.988h-.065a34.877,34.877,0,0,0-2.589-4.8L234.482.25H231.31V14.6h2.524V9.482c0-2.37,0-4.242-.129-6.113h.065A41.146,41.146,0,0,0,236.488,8.3l3.948,6.363h2.848V.312H240.76Zm-18.9,12.476c-2.654,0-4.207-2.37-4.207-5.24,0-2.994,1.424-5.427,4.207-5.427s4.207,2.558,4.207,5.3c-.065,2.994-1.553,5.365-4.207,5.365M221.926,0c-4.272,0-7.184,3.119-7.184,7.548,0,4.242,2.718,7.3,6.99,7.3,4.207,0,7.249-2.745,7.249-7.548-.065-4.117-2.654-7.3-7.055-7.3M209.564,14.6h2.783V.25h-2.783ZM196.361.25V2.433H200.7V14.6h2.783V2.433h4.336V.25Zm-7.572,8.3,1.165-3.556c.259-.873.518-1.871.712-2.682h.065a24.3,24.3,0,0,0,.777,2.682l1.165,3.556Zm3.819-8.3h-3.495L184.259,14.6h2.848l1.294-4.055h4.789l1.359,4.055h2.977ZM179.34,12.663c-3.3,0-5.307-2.059-5.307-5.178a4.923,4.923,0,0,1,5.307-5.3,7.585,7.585,0,0,1,2.977.561L182.9.686a9.87,9.87,0,0,0-3.689-.624c-4.66,0-8.09,2.869-8.09,7.61,0,4.367,2.912,7.236,7.7,7.236a9.831,9.831,0,0,0,3.883-.686l-.453-2.059a8.366,8.366,0,0,1-2.912.5M166.072,14.6h2.783V.25h-2.783ZM160.312.25V5.24a58.469,58.469,0,0,0,.259,5.988h-.065a34.87,34.87,0,0,0-2.589-4.8L154.034.25h-3.171V14.6h2.524V9.482c0-2.37,0-4.242-.129-6.113h.065A41.157,41.157,0,0,0,156.041,8.3l3.948,6.363h2.848V.312h-2.524Zm-15.4,0V8.608c0,2.807-1.165,4.117-3.171,4.117-1.877,0-3.107-1.31-3.107-4.117V.25h-2.718V8.484c0,4.554,2.265,6.363,5.76,6.363,3.624,0,6.019-1.934,6.019-6.425V.25Zm-12.685,0H128.6l-2.071,5.739c-.582,1.684-1.1,3.431-1.489,4.99h-.065c-.388-1.622-.841-3.306-1.424-4.99l-2.006-5.8H117.92l-1.036,14.347h2.589l.324-5.8c.129-1.934.194-4.242.259-6.113h.065c.388,1.809.971,3.805,1.553,5.614l2.006,6.113h2.136l2.2-6.238c.647-1.809,1.294-3.743,1.812-5.552h.065c0,1.934.065,4.179.194,6.051l.259,5.864h2.718Zm-18.575,0h-3.624l-2.071,5.739c-.582,1.684-1.1,3.431-1.489,4.99H106.4c-.388-1.622-.841-3.306-1.424-4.99L102.97.187H99.346L98.31,14.535H100.9l.324-5.8c.129-1.934.194-4.242.259-6.113h.065c.388,1.809.971,3.805,1.553,5.614l2.006,6.113h2.136l2.2-6.238c.647-1.809,1.294-3.743,1.812-5.552h.065c0,1.934.065,4.179.194,6.051l.324,5.864h2.718Zm-24.4,12.476c-2.654,0-4.207-2.37-4.207-5.24,0-2.994,1.489-5.427,4.207-5.427,2.783,0,4.207,2.558,4.207,5.3,0,2.994-1.489,5.365-4.207,5.365M89.379,0c-4.272,0-7.184,3.119-7.184,7.548,0,4.242,2.718,7.3,6.99,7.3,4.207,0,7.249-2.745,7.249-7.548C96.369,3.181,93.78,0,89.379,0M77.729,12.663c-3.3,0-5.307-2.059-5.307-5.178a4.924,4.924,0,0,1,5.307-5.3,7.585,7.585,0,0,1,2.977.561L81.289.686A9.869,9.869,0,0,0,77.6.062c-4.66,0-8.09,2.869-8.09,7.61,0,4.367,2.912,7.236,7.7,7.236a9.831,9.831,0,0,0,3.883-.686l-.453-2.059a8.993,8.993,0,0,1-2.912.5M54.43.125H48.152l-5.566,14.41h5.7L51.388,5.8l2.977,8.733h5.954Zm-25.111,0V4.367h4.336V14.535h6.213V4.367H44.01V.125Zm-4.142,0H18.834l-5.566,14.41h5.7L22,5.8l3.042,8.733h6.019ZM0,.125V4.367H4.336V14.535h6.213V4.367h4.207V.125Z" transform="translate(-6674 2347)"></path></svg>

/**
 * Close Icon
 */
export const closeIcon = (color) => {
    const colorFill = color || "#fff";
    return  <svg version="1.1"  viewBox="0 0 15.642 15.642"  enableBackground="new 0 0 15.642 15.642" width="18px" height="18px" className="">
                <path fill={colorFill} d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"/>
            </svg>
}

/**
 * Export Icon
 */
export const exportIcon = () => {
    return <svg height="1792" viewBox="0 0 1792 1792" width="1792" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-979-234v106h281v-106h-75l103-161q5-7 10-16.5t7.5-13.5 3.5-4h2q1 4 5 10 2 4 4.5 7.5t6 8 6.5 8.5l107 161h-76v106h291v-106h-68l-192-273 195-282h67v-107h-279v107h74l-103 159q-4 7-10 16.5t-9 13.5l-2 3h-2q-1-4-5-10-6-11-17-23l-106-159h76v-107h-290v107h68l189 272-194 283h-68z"/></svg>
}

/**
 * Choose File Icon
 */
export const chooseFileIcon = () => {
    return <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 486.3 486.3" >
    <g>
        <g>
            <path d="M395.5,135.8c-5.2-30.9-20.5-59.1-43.9-80.5c-26-23.8-59.8-36.9-95-36.9c-27.2,0-53.7,7.8-76.4,22.5    c-18.9,12.2-34.6,28.7-45.7,48.1c-4.8-0.9-9.8-1.4-14.8-1.4c-42.5,0-77.1,34.6-77.1,77.1c0,5.5,0.6,10.8,1.6,16    C16.7,200.7,0,232.9,0,267.2c0,27.7,10.3,54.6,29.1,75.9c19.3,21.8,44.8,34.7,72,36.2c0.3,0,0.5,0,0.8,0h86    c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5h-85.6C61.4,349.8,27,310.9,27,267.1c0-28.3,15.2-54.7,39.7-69    c5.7-3.3,8.1-10.2,5.9-16.4c-2-5.4-3-11.1-3-17.2c0-27.6,22.5-50.1,50.1-50.1c5.9,0,11.7,1,17.1,3c6.6,2.4,13.9-0.6,16.9-6.9    c18.7-39.7,59.1-65.3,103-65.3c59,0,107.7,44.2,113.3,102.8c0.6,6.1,5.2,11,11.2,12c44.5,7.6,78.1,48.7,78.1,95.6    c0,49.7-39.1,92.9-87.3,96.6h-73.7c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h74.2c0.3,0,0.6,0,1,0c30.5-2.2,59-16.2,80.2-39.6    c21.1-23.2,32.6-53,32.6-84C486.2,199.5,447.9,149.6,395.5,135.8z" fill="#cbcbcb"/>
            <path d="M324.2,280c5.3-5.3,5.3-13.8,0-19.1l-71.5-71.5c-2.5-2.5-6-4-9.5-4s-7,1.4-9.5,4l-71.5,71.5c-5.3,5.3-5.3,13.8,0,19.1    c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l48.5-48.5v222.9c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V231.5l48.5,48.5    C310.4,285.3,318.9,285.3,324.2,280z" fill="#cbcbcb"/>
        </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
}

/**
 * Right triangle arrow
 */
export const rightTriangleArrow = () => {
    return <svg version="1.1" id="Layer_1"  x="0px" y="0px"
                width="11.542px" height="6.125px" viewBox="0.958 5 11.542 6.125" enableBackground="new 0.958 5 11.542 6.125">
                <path  d="M1.208,5.363H12.14l-5.542,5.542L1.208,5.363z"/>
            </svg>
}

/**
 * View profile close Icon
 */
export const profileCloseIcon = () => {
    return <svg version="1.1" id="Capa_1"  x="0px" y="0px"
    viewBox="0 0 212.982 212.982" >
 <g id="Close">
   <path  d={`M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312
     c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312
     l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937
     c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z`}/>
 </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
}

/**
 * Camera Icon
 */
export const cameraIcon = () => <svg version="1.1" id="Capa_1"  x="0px" y="0px" viewBox="0 0 100 100" >
    <g>
      <g>
        <path  d={`M50,40c-8.285,0-15,6.718-15,15c0,8.285,6.715,15,15,15c8.283,0,15-6.715,15-15
          C65,46.718,58.283,40,50,40z M90,25H78c-1.65,0-3.428-1.28-3.949-2.846l-3.102-9.309C70.426,11.28,68.65,10,67,10H33
          c-1.65,0-3.428,1.28-3.949,2.846l-3.102,9.309C25.426,23.72,23.65,25,22,25H10C4.5,25,0,29.5,0,35v45c0,5.5,4.5,10,10,10h80
          c5.5,0,10-4.5,10-10V35C100,29.5,95.5,25,90,25z M50,80c-13.807,0-25-11.193-25-25c0-13.806,11.193-25,25-25
          c13.805,0,25,11.194,25,25C75,68.807,63.805,80,50,80z M86.5,41.993c-1.932,0-3.5-1.566-3.5-3.5c0-1.932,1.568-3.5,3.5-3.5
          c1.934,0,3.5,1.568,3.5,3.5C90,40.427,88.433,41.993,86.5,41.993z`}/>
      </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
/**
 * Edit Icon
 */
export const editIcon = () => <svg version="1.1" id="Layer_1"  x="0px" y="0px" viewBox="0 0 18 18" enableBackground="new 0 0 18 18">
<path fill="#13558F" d={`M2.258,13.087l-0.016,3.09c0,0.176,0.063,0.35,0.19,0.477c0.127,0.125,0.286,0.188,0.46,0.188l0,0
  l3.077-0.015c0.174,0,0.333-0.063,0.46-0.19L17.058,6.018c0.254-0.253,0.254-0.666,0-0.935l-3.046-3.075
  c-0.254-0.253-0.666-0.253-0.936,0l-2.126,2.14l0,0l-8.501,8.48C2.338,12.753,2.258,12.912,2.258,13.087z M13.553,3.403l2.141,2.139
  l-1.205,1.205l-2.142-2.139L13.553,3.403z M3.575,13.371l7.836-7.829l2.142,2.14l-7.836,7.814l-2.158,0.015L3.575,13.371z`}/>
</svg>