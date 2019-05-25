// In this file, we could use to write application basic configuration details

export const app = {
	 /*Handling events with React elements is very similar to handling events on DOM elements
    * Inside a loop it is common to want to pass an extra parameter to an event handler.
    *the e argument representing the React event will be passed as a second argument after the ID.
    *With an arrow function, we have to pass it explicitly,
    *but with bind any further arguments are automatically forwarded
    *The bind() method creates a new function that, when called, has its this keyword set to the provided value
    *An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
    */
   
    image:{
        types:["jpg","jpeg","png"],
        maxSize:2097152, // Kilobytes - 2 MB,
        acceptTypes:'image/jpg,image/jpeg,image/png'
    },
    
}
