import React from 'react';
import $ from 'jquery';

export const RowCheckbox = ({name, value, grid}) => {
    /*Handling events with React elements is very similar to handling events on DOM elements
    * Inside a loop it is common to want to pass an extra parameter to an event handler.
    *the e argument representing the React event will be passed as a second argument after the ID.
    *With an arrow function, we have to pass it explicitly,
    *but with bind any further arguments are automatically forwarded
    *The bind() method creates a new function that, when called, has its this keyword set to the provided value
    *An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
    */
    return <React.Fragment>
                <input type="checkbox"
                        name={name || "rowCheckboxId"}
                        id={`checkbox-${value}`}
                        onChange={grid.toggleRow}
                        value={value}
                        defaultChecked={grid.isRowChecked(value)}
                        className="check rowCheckbox"/>
                <label htmlFor={`checkbox-${value}`}>
                    <span className="chk-span"></span>
                </label>
            </React.Fragment>
}

export const SelectAll = ({grid}) => {
    /*Handling events with React elements is very similar to handling events on DOM elements
    * Inside a loop it is common to want to pass an extra parameter to an event handler.
    *the e argument representing the React event will be passed as a second argument after the ID.
    *With an arrow function, we have to pass it explicitly,
    *but with bind any further arguments are automatically forwarded
    *The bind() method creates a new function that, when called, has its this keyword set to the provided value
    *An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target
    */
    if(grid.selectedRow.length > 0){
      $('#selectAllCheckbox').prop('checked',true);
    }else{
      $('#selectAllCheckbox').prop('checked',false);
    }
    return <React.Fragment>
                <input type="checkbox"
                        name="selectAll"
                        id={`selectAllCheckbox`}
                        onChange={grid.toggleSelectAll}
                        className="check"/>
                <label htmlFor={`selectAllCheckbox`}>
                    <span className="chk-span"></span>
                </label>
            </React.Fragment>
}
