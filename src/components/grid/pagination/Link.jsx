import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Link extends React.Component {

    /**
     * Required or Optional props details of this component
     *
     * totalRecords - total records count.
     * rows - count of how many rows per page need to display.
     * currentPage - current page number
     * grid - grid object to get grid configuration details
     */
    static propTypes = {
        totalRecords: PropTypes.number.isRequired,
        rows: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        grid: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = { pager: {} };
        this.pageStart = 0;
    }
    /* componentDidMount() is invoked immediately after a component is mounted.
    * Initialization that requires DOM nodes should go here.
    * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   */
    componentDidMount(){
        // set page if items array isn't empty
        this.generatePagination(this.props);
    }
    /* componentWillReceiveProps() is invoked before a mounted component receives new props.
    *  If you need to update the state in response to prop changes (for example, to reset it),
    *  you may compare this.props and nextProps and perform state transitions using this.setState() in this method.
    */
    componentWillReceiveProps(nextProps) {
           this.generatePagination(nextProps); 
    }

    generatePagination(props){
        // set page if items array isn't empty
        if (props.totalRecords && props.totalRecords > 0) {
            this.setPage(props, props.currentPage);
        }
    }
    setPage(props, page){
        const totalRecords = props.totalRecords;
        let pager = this.state.pager;

        if (page < this.pageStart || page > pager.totalPages) {
            return;
        }
        // get new pager object for specified page
        pager = this.getPager(props, totalRecords, page);

        // update state
        this.setState({ pager: pager });
    }

    getPager(props,totalItems, currentPage, pageSize) {
        let intermediate = false;

        // default to first page
        currentPage = props.currentPage || props.grid.currentPage;
 
        // default page size or rows count
        pageSize = props.rows || props.grid.rowsPerPage;
 
        // calculate total pages
        var totalPages = (Math.ceil(parseInt(totalItems) /parseInt(pageSize))) - 1; // 55 links

        var startPage, endPage;

        if (totalPages <= 3) {
            // less than 4 total pages so show all
            startPage = this.pageStart;
            endPage = totalPages;
        } else {
            // more than 3 total pages so calculate start and end pages
            if (currentPage <= 3) {
                startPage = this.pageStart;
                endPage = 3;
            } else if (currentPage + 2 >= totalPages) { // End level
                startPage = totalPages - 3;
                endPage = totalPages;
            } else { // Intermediate level
                startPage = currentPage - 1;
                endPage = currentPage + 1;
                intermediate = true;
            }

        }
 
        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            pages: pages,
            intermediate: intermediate
        };
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
    render(){

        const pager = this.state.pager;
        const pageRows = this.props.rows;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return(
            <div className="pagination">
                <span className="dispage">{this.props.locale.pagination.displaying_page}</span>
                <ul className="pagination-split">

                    <li className={pager.currentPage === this.pageStart ? 'disabled' : ''}>
                        <a onClick={() => (pager.currentPage !== this.pageStart) && this.props.loadData(this.pageStart, pageRows)} href="javascript:void(0)">
                            First
                        </a>
                    </li>
                    <li className={pager.currentPage === this.pageStart ? 'disabled' : ''}>
                        <a onClick={() => (pager.currentPage !== this.pageStart) && this.props.loadData(pager.currentPage - 1, pageRows)} href="javascript:void(0)">
                            <i className="icon-left-arrow">
                                <svg version="1.1" id="Layer_1"  x="0px" y="0px"
                                        width="11.542px" height="6.125px" viewBox="0.958 5 11.542 6.125" enableBackground="new 0.958 5 11.542 6.125">
                                <path  d="M1.208,5.363H12.14l-5.542,5.542L1.208,5.363z"/>
                                </svg>
                            </i>
                        </a>
                    </li>
                    {pager.pages.map((page, index, pagesArr) => {
                            const links = [];
                            if(pager.intermediate && index === 0){
                                links.push(<li key={`pagination-link-${index}-first-dots`}><a>...</a></li>)
                            }
                            links.push(
                                <li key={`pagination-link-${index}`} disabled={true} onClick={() => (pager.currentPage !== page) && this.props.loadData(page, pageRows)} className={pager.currentPage === page ? 'active' : ''}>
                                    <a href="javascript:void(0)">
                                        {page+1}
                                    </a>
                                </li>
                            )
                            if(pager.intermediate && (pagesArr.length-1) === index){
                                links.push(<li key={`pagination-link-${index}-last-dots`}><a>...</a></li>)
                            }
                            return links;
                        }
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a href="javascript:void(0)" onClick={() => (pager.currentPage !== pager.totalPages) && this.props.loadData(pager.currentPage + 1, pageRows)}>
                            <i className="icon-right-arrow">
                                <svg version="1.1" id="Layer_1"  x="0px" y="0px"
                                        width="11.542px" height="6.125px" viewBox="0.958 5 11.542 6.125" enableBackground="new 0.958 5 11.542 6.125">
                                <path  d="M1.208,5.363H12.14l-5.542,5.542L1.208,5.363z"/>
                                </svg>
                            </i>
                        </a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => (pager.currentPage !== pager.totalPages) && this.props.loadData(pager.totalPages, pageRows)} href="javascript:void(0)">
                            Last
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Link;
