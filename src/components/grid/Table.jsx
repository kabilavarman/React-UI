import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import toastr from "toastr";
import { locale } from "../../locale";
import Delete from "../../components/grid/Delete";
import Pagination from "../../components/grid/Pagination";
import Loader from "../layouts/Loader";
import "../../assets/js/tableHeadFixer.js";
import $ from "jquery";

class Table extends Component {
  /**
   * Required or Optional props details of this component
   *
   * pageTitleLeft - Grid current page title.
   * managementType - Current Management type name need to pass
   * grid - grid object
   * data - Pass response which need to display in grid
   * rowStatus - Pass response of status update of each row
   * rowDelete - Pass response of delete of each row
   * deletePermission - Permission details of delete
   */
  static propTypes = {
    pageTitleLeft: PropTypes.string,
    managementType: PropTypes.string.isRequired,
    grid: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    rowStatus: PropTypes.object,
    rowDelete: PropTypes.object,
    deletePermission: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.recordDeleted = this.recordDeleted.bind(this);
    this.recordStatusUpdated = this.recordStatusUpdated.bind(this);
    this.data = [];
    this.fixedActionSet = false;
  }

  /**
   * Handle the delete record response
   *
   * @param object
   */
  recordDeleted(props) {
    const response = props.rowDelete.response;
    if (response !== this.props.rowDelete.response) {
      if (
        !props.rowDelete.isFetching &&
        !props.rowDelete.isError &&
        Object.keys(response).length > 0
      ) {
        // Check whether response status is success or not
        // If success, then allow user to login
        // If fail, then display the error message
        if (response.status && response.status === 200) {
          toastr.success(response.message);
          // Refresh the customer list after delete the record.
          // So call the grid list again
          props.grid.getRecordsAfterDelete();
        } else {
          toastr.error(
            response.message || this.props.locale.common.remove.error
          );
        }
      } else if (props.rowDelete.isError) {
        toastr.error(response.message || this.props.locale.common.remove.error);
      }
    }
  }

  /**
   * Handle the record status update response
   *
   * @param object
   */
  recordStatusUpdated(props) {
    const response = props.rowStatus.response;
    if (response !== this.props.rowStatus.response) {
      if (
        !props.rowStatus.isFetching &&
        !props.rowStatus.isError &&
        Object.keys(response).length > 0
      ) {
        // Check whether response status is success or not
        // If success, then allow user to login
        // If fail, then display the error message
        if (response.status && response.status === 200) {
          toastr.success(response.message);
          // Refresh the customers list after delete the record.
          // So call the grid list again
          props.grid.getRecords();
        } else {
          toastr.error(
            response.message || this.props.locale.common.remove.error
          );
        }
      } else if (props.rowStatus.isError) {
        toastr.error(response.message || this.props.locale.common.remove.error);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // Delete customer
    if (!_.isUndefined(nextProps.rowDelete)) {
      this.recordDeleted(nextProps);
    }
    // Status update
    if (!_.isUndefined(nextProps.rowStatus)) {
      this.recordStatusUpdated(nextProps);
    }
  }

  // componentDidUpdate() {
  //   // Handle the table 'Action' fixed
  //   const tableExist = $("#fixTable").length;
  //   const tableRowLength = $("#fixTable").find("tr:not(.empty-row)").length;
  //   const tableRowDataLength =
  //     this.props.data.response && !_.isUndefined(this.props.data.response.data)
  //       ? this.props.data.response.data.length + 2
  //       : 0; // 2 - Default row(Head & Header filter)

  //   // Table fixed 'Action' column code
  //   if (
  //     (tableExist && tableRowLength <= 2) ||
  //     tableRowDataLength !== tableRowLength
  //   ) {
  //     $(".action-icons").css({ right: 0 });
  //     this.fixedActionSet = false;
  //   }
  //   if (
  //     tableExist &&
  //     tableRowLength > 2 &&
  //     tableRowDataLength === tableRowLength &&
  //     !this.fixedActionSet
  //   ) {
  //     $("#fixTable").tableHeadFixer({ right: 1 });
  //     this.fixedActionSet = true;
  //   }
  // }

  render() {
    return (
      <div
        className={
          this.props.divClassName
            ? this.props.divClassName
            : "container customermanagement"
        }
      >
        <Delete
          {...this.props}
          permission={this.props.deletePermission}
          ref={instance => {
            this.delete = instance;
          }}
        />
        <div className={`header clearfix ${this.props.headerClass}`}>
          <div className="header-title-left">
            <h2>{this.props.pageTitleLeft}</h2>
            {this.props.pageLeftCount}
          </div>
          <div
            className={`header-title-right ${this.props.pageTitleRightClass}`}
          >
            {this.props.pageTitleRight}
          </div>
        </div>

        {this.props.data.isFetching && <Loader />}
        {this.props.children}

        {!this.props.data.isFetching &&
          this.props.data.response.data &&
          this.props.data.response.data.length > 0 && (
            <Pagination
              {...this.props}
              grid={this.props.grid}
              currentPage={this.props.grid.currentPage}
              rows={this.props.grid.rowsPerPage}
              totalRecords={
                this.props.grid.totalRecords || this.props.data.response.count
              }
            />
          )}
      </div>
    );
  }
}

export default Table;
