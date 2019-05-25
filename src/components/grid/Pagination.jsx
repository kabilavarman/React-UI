import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Entries from './pagination/Entries';
import Link from './pagination/Link';

class Pagination extends React.Component {

    static propTypes = {
        totalRecords: PropTypes.number,
        rows: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        grid: PropTypes.object.isRequired
    }

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
        this.rowsSelected = this.rowsSelected.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    /**
     * Load the data when click on pagination link
     */
    loadData(page, pageRows){
        this.props.grid.handlePaginateClick(page, pageRows);
    }

    /**
     * Load data when change the rows per page default value
     */
    rowsSelected(e){
        this.props.grid.handleNumberEntryChange(this.props.currentPage, e.target.value);
    }

    render() {
        return (
            <div className="main-pagination">
                <Entries {...this.props} rowsSelected={this.rowsSelected} />
                { this.props.totalRecords > 0 && <Link {...this.props} loadData={this.loadData} /> }
            </div>
        )
    }

}

export default Pagination;
