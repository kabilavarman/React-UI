import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component - Render the Grid header filter action elements
*/
class FilterActions extends Component {

    /**
     * Required or Optional props details of this component
     *
     * grid - grid object
     */
    static propTypes = {
        grid: PropTypes.object.isRequired,
    }
    /**
     * Constructor of this component
     * Used to initialize default state & instance bind for this component
     */
    constructor(props){
        super(props);
    }

    render() {
        return <React.Fragment>
                    <a href="javascript:void(0)" className="search-ic" onClick={(e) => this.props.grid.handleFilter(e) }> <span className="tooltip">Search</span></a>
                    <a href="javascript:void(0)" className="reset-ic" onClick={(e) => this.props.grid.handleResetFilter(e) }> <span className="tooltip">Reset</span></a>
                </React.Fragment>
    }
}

export default FilterActions;
