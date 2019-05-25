import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '../../utility/Grid';
import Pagination from '../../components/grid/Pagination';
import { gridRecords } from '../../actions/gridActions';

class GridNew extends Component {
    constructor(props) {
        super(props);

        this.grid = Grid.getInstance(this, 'users', gridRecords);

        this.state = {
            filters:{
                id: '',
                name: '',
                email: ''
            },
        }
    }
    componentDidMount(){
        this.grid.getRecords();
    }
    
    render() {

        let response = null;
        let gridRecords = [];

        if(!this.props.grid.isFetching && this.props.grid && this.props.grid.response){
            response = this.props.grid.response.data;
            gridRecords = this.props.grid.response.data.data;
        } 

        return <div className="container customermanagement">
                <div className="header clearfix">
                    <div className="header-title-left">
                        <h2>Customer Management</h2>
                        
                    </div>
                    <div className="header-title-right">
                        <a href="create-project.php" className="create-new">
                            <span className="plus-icon"></span>
                            <span>Add Customer</span>
                        </a>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="responsivetable" >
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>{this.props.isFetching}</th>
                                    <th onClick={(e) => this.grid.handleColSorting('name', this.grid.sortByToggle, e)}><span>Customer Name</span> <span className="sort-icon"></span></th>
                                    <th><span>Customer Category</span></th>
                                    <th><span>Email ID</span> </th>
                                    <th><span>Action</span> <span className="action-icon"></span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="search-item">
                                    <td>
                                        <div className="check-btns">
                                            <input type="checkbox" id="main-checkbox" className="check"/>
                                            <label htmlFor="main-checkbox"><span className="chk-span"></span></label>
                                        </div>
                                    </td>
                                    <td>
                                       <input type="text" name="id" onChange={this.grid.handleColFiltersChange} value={this.state.filters.id} />
                                    </td>
                                     <td>
                                       <input type="text" name="name" onChange={this.grid.handleColFiltersChange} value={this.state.filters.name} />
                                    </td>
                                    <td>
                                       <select name="email" onChange={this.grid.handleColFiltersChange} value={this.state.filters.email}>
                                        <option>Select</option>
                                        <option value="Ramesh.B@Contus.In">Ramesh.B@Contus.In</option>
                                       </select>
                                    </td>
                                     <td>
                                       <input type="phone" />
                                    </td>
                                    <td></td>
                                </tr>
                                {
                                    gridRecords.map((record, index) => { 
                                        return <tr key={index}>
                                            <td>
                                                <div className="check-btns">
                                                    <input type="checkbox" id="checkbox"  className="check"/>
                                                    <label htmlFor="checkbox"><span className="chk-span"></span></label>
                                                </div>
                                            </td>
                                            <td><a href="customer-detail.php" className="customer-no">{record.id}</a></td>
                                            <td className="customer-name">{record.username}</td>
                                            <td className="customer-catagory">{record.email}</td>
                                            <td className="customer-email">{record.mobile_number}</td>
                                            <td className="customer-location">
                                                <a href="" className="edit"></a>
                                                <a href="" className="delete"></a>
                                            </td>
                                        </tr>
                                    })  
                                }
                            </tbody>
                        </table>
                     </div>
                            { response && <Pagination {...this.props} grid={this.grid} currentPage={response.current_page} rows={response.per_page} totalRecords={response.total} /> }
            </div>
    }
}

export default connect((state) => {
    return { grid:state.grid }
})(GridNew);