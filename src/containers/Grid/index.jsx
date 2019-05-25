import React, { Component } from 'react';
import { connect } from 'react-redux';
import grid from '../../utility/Grid';
import Pagination from '../../components/grid/Pagination';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.grid = grid.getGrid();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSingleCheckbox = this.handleSingleCheckbox.bind(this);
        this.handleMutlipleCheckbox = this.handleMutlipleCheckbox.bind(this);
        this.handleSorting = this.handleSorting.bind(this);
        this.state = {  checkbox: [],
                        checkboxValue: [],
                        search:{ page: 1,
                                 per_page: 10
                             }
                    }
       this.checkedValue = [];
    }
    componentDidMount(){
        this.grid.handleSubmit(this.state.search,this.props);
    }

    handleInputChange(event,page = this.state.search.page,per_page = this.state.search.per_page) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const search = {...this.state.search, [name]: value,page:page,per_page:per_page};
        this.setState({'search':search});
        this.grid.handleSubmit(search,this.props);
    }

    handleSorting(keyname){
        let sort_order = 'desc';
        if(sort_order == 'desc'){
            sort_order = 'asc';
        }
        const search = {...this.state.search,sort_by:keyname,sort_order:sort_order};
        this.grid.handleSubmit(search,this.props);

    }

    handleMutlipleCheckbox(event){
       let options = {};
       var self = this;
       this.state.checkboxValue.map(function(value,index) {
            if(event.target.checked){
                options[index] = true;
                self.checkedValue.push(value);
            }else{
                self.checkedValue.splice(self.checkedValue.indexOf(value), 1);
                options[index] = false;
            }
       });
       this.setState({
            checkbox : options,
       });
    }

    handleSingleCheckbox(event,index){
        let options = this.state.checkbox
        if(event.target.checked){
            options[index] = true;
            this.checkedValue.push(event.target.value);
        }else{
            this.checkedValue.splice(this.checkedValue.indexOf(event.target.value), 1);
            options[index] = false; 
        }
        if(this.checkedValue.length > 0){
            this.refs.main_checkbox.checked = true;
        }else{
            this.refs.main_checkbox.checked = false;
        }
        this.setState({
            checkbox : options,
        });
    }

    render() {
        const { loading,records,failure,error } = this.props;

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
                                    <th>Customer ID</th>
                                    <th><span>Customer Name</span> <span className="sort-icon" onClick={(e) => this.handleSorting('name')}></span></th>
                                    <th><span>Customer Category</span></th>
                                    <th><span>Email ID</span> </th>
                                    <th><span>Phone</span></th>
                                    <th><span>Location</span> <span className="sort-icon" onClick={(e) => this.handleSorting('location')}></span></th>
                                    <th><span>Action</span> <span className="action-icon"></span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="search-item">
                                    <td>
                                        <div className="check-btns">
                                            <input type="checkbox" id="main-checkbox" onChange={this.handleMutlipleCheckbox} ref="main_checkbox" className="check"/>
                                            <label htmlFor="main-checkbox"><span className="chk-span"></span></label>
                                        </div>
                                    </td>
                                    <td>
                                       <input type="text" name="name" onChange={this.handleInputChange} />
                                    </td>
                                     <td>
                                       <input type="text" name="email" onChange={this.handleInputChange} />
                                    </td>
                                    <td>
                                       <select name="select" onChange={this.handleInputChange}>
                                        <option>Select</option>
                                        <option>2</option>
                                       </select>
                                    </td>
                                     <td>
                                       <input type="text" onChange={this.handleInputChange}/>
                                    </td>
                                     <td>
                                       <input type="text" onChange={this.handleInputChange}/>
                                    </td>
                                     <td>
                                       <input type="text" onChange={this.handleInputChange}/>
                                    </td>
                                    <td></td>
                                </tr>
                                { loading && <tr>
                                    <td><span>Loading...</span></td>
                                </tr> }
                                { failure && <tr>
                                    <td> <span>No records found</span></td>
                                </tr> }
                                { records &&

                                    records.results.map((user, index) => {
                                        return <tr key={index}>
                                    <td>
                                        <div className="check-btns">
                                            <input type="checkbox" value={this.state.checkboxValue[index] = user.name} checked={this.state.checkbox[index] === true} id={"checkbox-"+index} onChange={(e) => this.handleSingleCheckbox(e,index)}  className="check"/>
                                            <label htmlFor={"checkbox-"+index}><span className="chk-span"></span></label>
                                        </div>
                                    </td>
                                    <td><a href="customer-detail.php" className="customer-no">{user.birth_year}</a></td>
                                    <td className="customer-name">{user.name}</td>
                                    <td className="customer-catagory">{user.gender}</td>
                                    <td className="customer-email">{user.hair_color}</td>
                                    <td className="customer-phone">{user.skin_color}</td>
                                    <td className="customer-location">{user.eye_color}</td>
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
                { records &&
                    <Pagination {...this.props} pageClick={this.handleInputChange}/>
                }
            </div>
    }
}

function mapStateToProps(state) {
    const { records,loading,failure,error } = state.grid;
    return {
        records,loading,failure,error
    };
}

export default connect(mapStateToProps)(Grid);