import ReactDOM from "react-dom";
import _ from "lodash";
import $ from "jquery";
import {
  getGridRecords,
  deleteGridRecord,
  statusUpdateGridRecord
} from "../actions/gridActions";
import Authorization from "./authorization";
import RequestFactory from "./requestFactory";
import { showLoading, hideLoading } from "react-redux-loading-bar";

class Grid {
  /**
   * Get instance for utitlity
   *
   * @param object
   * @param callback
   * @return object
   */
  static getInstance(argsObj) {
    return new Grid(argsObj);
  }

  /**
   * Class initializer
   *
   * @param object
   * @param callback
   * @return void
   */
  constructor(argsObj) {
    this.currentComponent = argsObj.currentComponent;
    this.initialState = this.currentComponent.initialState(
      this.currentComponent
    );
    this.url = argsObj.url; // Current action URL
    this.action = argsObj.action || getGridRecords; // Current action method
    this.actionType = argsObj.actionType; // Action type
    this.extraParams = argsObj.extraParams;
    this.manualPagination = argsObj.manualPagination || false;
    this.sorting = argsObj.sorting || false;
    this.listName = argsObj.listName;
    this.currentPage = parseInt(argsObj.currentPage) || 0; // Current page number
    this.rowsPerPage = 10; // Records per page
    this.rowsPerPageOptions = {
      5: 5,
      10: 10,
      25: 25,
      50: 50,
      100: 100
    };
    this.sortByFieldName = ""; // Table head column sort by field name
    this.sortType = ""; // Default sort type -1 (-1 - DESC, 1 - ASC)
    this.selectedRow = [];
    this.selectedRowPerPage = 0;

    this.handleColFiltersChange = this.handleColFiltersChange.bind(this);
    this.handleColManualSorting = this.handleColManualSorting.bind(this);
    this.handleColSorting = this.handleColSorting.bind(this);
    this.handlePaginateClick = this.handlePaginateClick.bind(this);
    this.handleDateFiltersChange = this.handleDateFiltersChange.bind(this);
    this.handleGlobalFiltersChange = this.handleGlobalFiltersChange.bind(this);
    this.updateColFiltersState = this.updateColFiltersState.bind(this);
    this.toggleRow = this.toggleRow.bind(this);
    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.addSelectedCheckBox = this.addSelectedCheckBox.bind(this);
    this.isRowChecked = this.isRowChecked.bind(this);
    this.resetPagination = this.resetPagination.bind(this);
    this.resetCheckbox = this.resetCheckbox.bind(this);
    this.handleNumberEntryChange = this.handleNumberEntryChange.bind(this);
    this.handleColFiltersKeyDown = this.handleColFiltersKeyDown.bind(this);
    this.getHandlePaginate = this.getHandlePaginate.bind(this);
    this.getResponseData = this.getResponseData.bind(this);
    this.totalRecords = 0;
  }

  /**
   * build the query
   *
   * @return object
   */
  getQueryParams() {
    const extraParams = this.extraParams || {};
    const filters =
      this.currentComponent.state &&
      typeof this.currentComponent.state.filters === "object"
        ? this.currentComponent.state.filters
        : {};
    const params = Object.assign(
      {},
      extraParams,
      {
        sortByFieldName: this.sortByFieldName,
        sortType: this.sortType,
        page: this.currentPage,
        size: this.rowsPerPage
      },
      filters
    );
    return params;
  }

  /**
   * Join the nested objects by using dots
   *
   * @param object filters
   * @param string filterKey
   */
  formatFilters(filters, filterKey = "") {
    const self = this;
    let validFilters = {};
    Object.keys(filters).forEach(filter => {
      const filterName = !_.isEmpty(filterKey)
        ? `${filterKey}.${filter}`
        : filter;
      if (_.isObject(filters[filter])) {
        const subValidFilters = self.formatFilters(filters[filter], filterName);
        validFilters = _.merge(validFilters, subValidFilters);
        return;
      }

      const filterVal = filters[filter].trim();
      if (!_.isEmpty(filterVal)) {
        validFilters[filterName] = filterVal;
      }
    });
    return validFilters;
  }
  /**
   * Build the head column filter to pass in query string
   *
   * @return object
   */
  getFilters(filters) {
    const validFilters = this.formatFilters(filters);
    return !_.isEmpty(validFilters)
      ? JSON.stringify(validFilters)
          .replace("{", "")
          .replace("}", "")
      : "";
  }

  /**
   * Update the header filter state value
   */
  updateColFiltersState(name, value) {
    let filters = JSON.parse(
      JSON.stringify(this.currentComponent.state.filters)
    );
    filters = _.set(filters, name, value);
    this.currentComponent.setState({ filters: filters });
  }

  /**
   * Handle grid column filter text change
   */
  handleColFiltersChange(e) {
    this.updateColFiltersState(e.target.name, e.target.value);
  }

  /**
   * Handle grid column filter keyDown
   */
  handleColFiltersKeyDown(e) {
    // Call table header filter when user press 'Enter key'
    if (e.keyCode === 13 || e.which === 13) {
      this.handleFilter();
    }
  }

  /**
   * Handle grid column filter select input change
   */
  handleColFiltersSelectChange(name, value) {
    this.updateColFiltersState(name, value);
  }
  handleColManualSorting(columnName, e) {
    this.sortByFieldName = columnName;
    this.sortType = this.sortType === 1 ? -1 : 1; // (-1 - DESC, 1 - ASC)
    this.resetPagination();
    var results = [];
    var list = this.getResponseData();
    results = _.orderBy(
      list,
      columnName,
      this.sortType === -1 ? "asc" : "desc"
    );
    this.currentComponent.setData(results);
  }
  /**
   * Handle grid column filter change
   */
  handleColSorting(columnName, e) {
    this.sortByFieldName = columnName;
    this.sortType = this.sortType === 1 ? -1 : 1; // (-1 - DESC, 1 - ASC)

    if (this.manualPagination) {
      // this.resetPagination();
      var results = [];
      var list = this.getResponseData();
      results = _.orderBy(
        list,
        columnName,
        this.sortType === -1 ? "asc" : "desc"
      );
      this.currentComponent.setData(results);
    } else if (this.sorting) {
      var results = [];
      var list = this.getResponseData();
      results = _.orderBy(
        list,
        columnName,
        this.sortType === -1 ? "asc" : "desc"
      );
      this.currentComponent.setData(results);
    } else {
      this.getRecords();
    }
  }

  /**
   * build the query
   *
   * @return object
   */
  camelCaseRelace(str) {
    const replace = "_";
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0
          ? letter.toLowerCase()
          : replace.concat(letter.toLowerCase());
      })
      .replace(/\s+/g, "");
  }

  /**
   * Handle grid global search change
   */
  handleGlobalFiltersChange(e) {
    // This Comment code required in future
    this.currentComponent.setState({ search: e.target.value });
  }

  /**
   * Handle grid column filter change
   */
  handleDateFiltersChange(selected, value) {
    /**
     * Declare the handle Select Change
     */
    const selectedDom = ReactDOM.findDOMNode(selected);
    const name = selectedDom.getAttribute("data-name")
      ? selectedDom.getAttribute("data-name")
      : selectedDom.getAttribute("name");
    const filters = Object.assign({}, this.currentComponent.state.filters);
    filters[name] = value;
    this.currentComponent.setState({ filters: filters, search: value });
  }
  /**
   * Handle field changes from Plugin
   *
   * @param name
   * @param value
   * @return void
   */
  handleFieldsChangeByJson(json) {
    let fields = JSON.parse(
      JSON.stringify(this.currentComponent.state.filters)
    );
    for (let result of json) {
      fields = _.set(fields, result.name, result.value);
    }
    this.currentComponent.setState({ filters: fields });
  }
  /**
   * Declare the handle Select Change
   */
  handleSelectChange(selected, value) {
    const selectedDom = ReactDOM.findDOMNode(selected);
    const name = selectedDom.getAttribute("data-name")
      ? selectedDom.getAttribute("data-name")
      : selectedDom.getAttribute("name");
    const filters = Object.assign({}, this.currentComponent.state.filters);
    filters[name] = value;
    this.currentComponent.setState({ filters: filters, search: value });
  }
  /**
   * Handle the getHandlePaginate
   */
  getHandlePaginate(records, totalRecords) {
    const currentPage = this.currentPage;
    const rowsPerPage = this.rowsPerPage;
    const from = currentPage * rowsPerPage;
    const to = from + rowsPerPage;
    records = _.slice(records, from, to);
    return records;
  }
  /**
   * Handle the pagination click
   */
  handlePaginateClick(page, pageRows) {
    var data;
    this.currentPage = page;
    if (this.rowsPerPage !== pageRows) {
      this.resetPagination();
    }
    this.rowsPerPage = parseInt(pageRows);
    if (this.manualPagination) {
      data = this.getResponseData();
      this.currentComponent.setState({ [this.listName]: data });
    } else {
      this.getRecords();
    }
  }

  /**
   * Handle the No Of Entries change
   */
  handleNumberEntryChange(page, pageRows) {
    this.resetCheckbox();
    this.handlePaginateClick(page, pageRows);
  }

  /**
   * Set additional parameters into queryparams
   */
  setExtraParams(extraParams) {
    this.extraParams =
      extraParams && typeof extraParams === "object"
        ? Object.assign({}, this.extraParams, extraParams)
        : null;
  }

  /**
   * Get the records for table
   */
  getRecords(extraParams) {
    if (extraParams) {
      this.setExtraParams(extraParams);
    }
    return this.currentComponent.props.dispatch(
      this.action({
        url: this.url,
        actionType: this.actionType,
        queryParams: this.getQueryParams()
      })
    );
  }

  /**
   * Handle the delete funtionality
   */
  deleteRecord(deleteModalObj) {
    if (typeof deleteModalObj !== "object") {
      // This is the error statement to the developers
      console.error('The "Delete Record" method arguments must be an object.');
      return;
    }
    const action = deleteModalObj.action || deleteGridRecord;
    return this.currentComponent.props.dispatch(action(deleteModalObj));
  }

  /**
   * Handle the status update functionality
   */
  statusUpdate(statusUpdateObj, e) {
    e.preventDefault();
    if (typeof statusUpdateObj !== "object") {
      // This is the error statement to the developers
      console.error('The "Status Update" method arguments must be an object.');
      return;
    }

    const action = statusUpdateObj.action || statusUpdateGridRecord;
    statusUpdateObj.params["regId"] = Authorization.getAuthUserId();
    return this.currentComponent.props.dispatch(action(statusUpdateObj));
  }

  /**
   * Handle the status update functionality
   */
  statusUpdateUser(statusUpdateObj, e) {
    e.preventDefault();
    if (typeof statusUpdateObj !== "object") {
      // This is the error statement to the developers
      console.error('The "Status Update" method arguments must be an object.');
      return;
    }

    const action = statusUpdateObj.action || statusUpdateGridRecord;
    statusUpdateObj.params["regId"] = Authorization.getAuthUserId();
    return this.currentComponent.props.dispatch(action(statusUpdateObj));
  }
  /**
   * Handle the checkIfResponse
   */
  getResponseData() {
    var data;
    data = this.currentComponent.props[this.listName];
    data = (data.response && data.response.data) || [];
    return data;
  }

  /**
   * Handle the column based filter
   */
  handleFilter() {
    this.resetPagination();
    if (this.manualPagination) {
      var list = this.getResponseData();
      var results = [];
      var filters = this.currentComponent.state.filters;
      results = _.filter(list, function(data) {
        for (var filter in filters) {
          return (
            data[filter].toLowerCase().indexOf(filters[filter].toLowerCase()) >
            -1
          );
        }
      });
      this.totalRecords = results.length || 1;

      this.currentComponent.setData(results);
    } else {
      this.getRecords();
    }
  }

  /**
   * Handle the column based filter reset
   */
  handleResetFilter() {
    this.resetPagination();
    this.currentComponent.setState(
      { filters: this.initialState.filters, search: this.initialState.search },
      () => this.handleFilter()
    );
  }

  /**
   * Reset the pagination
   */
  resetPagination() {
    this.currentPage = 0;
    this.rowsPerPage = 10;
  }

  /**
   * Reset the all & row checkbox
   */
  resetCheckbox() {
    this.selectedRow = [];
    this.selectedRowPerPage = this.currentPage;
  }

  /**
   * When user bulk delete the all the of the current page,
   * then currentPage is more than 0, need to reset the page to one level back
   * So it will fetch the previous page record.
   * Suppose if we do not reset to one page back, then it will show the 'No record exist' message on current page
   *
   */
  getRecordsAfterDelete() {
    if (this.selectedRow.length > 0) {
      this.resetCheckbox();
      this.currentPage =
        this.currentPage > 0 ? this.currentPage - 1 : this.currentPage;
    }
    this.getRecords();
  }
  /**
   * Download csv
   *
   */
  downloadCsv(url, fileName, queryParams) {
    this.currentComponent.props.dispatch(showLoading());
    var test = this;
    url = RequestFactory.getUrl(url, queryParams);
    fileName = fileName + ".xls";
    fetch(url, {
      headers: RequestFactory.getHeaders(),
      mode: "cors",
      method: "get"
    })
      .then(function(response) {
        return response.blob();
      })
      .then(function(blob) {
        var a = document.createElement("a");
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          var url = window.URL.createObjectURL(blob);
          document.body.appendChild(a);
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }
        test.currentComponent.props.dispatch(hideLoading());
      });
  }

  /**
   * Function is used to add\remove record id to selectedCheckbox variable to delete records
   *
   * @param int id
   * @return void
   */
  addSelectedCheckBox(id) {
    // Grid checkbox workflow
    // User could select the checkbox from current page.
    // After selected the rows when user switched to next page and select the row at that time reset the previously selected rows and update the current page selected rows
    // After switched next page, But not select any rows and coming back to previously selected rows page, need to display the selected rows.
    if (this.selectedRowPerPage !== this.currentPage) {
      this.resetCheckbox();
    }

    const idIndex = this.selectedRow.indexOf(id);
    if (idIndex > -1) {
      this.selectedRow.splice(idIndex, 1);
    } else {
      this.selectedRow.push(id);
    }
  }

  // Check whether current row is selected or not
  isRowChecked(id) {
    return this.selectedRow.indexOf(id) > -1;
  }

  /**
   * Function is used to toggle select all check box when user click each record instead of select all checkbox
   *
   * @param int id
   * @return void
   */
  toggleRow(e) {
    // Get the total checkbox length of current page
    const totalCheckBoxLength = $(".rowCheckbox").length;
    // Get the checked or selected checkbox length of current page
    const checkedCheckboxLength = $(".rowCheckbox:checked").length;

    // Check whether total checkbox and checked checkbox on the current page is equal or not
    // If equal, then make check the 'selectAll' checkbox
    // If not, then uncheck the 'selectAll' checkbox
    if (checkedCheckboxLength === totalCheckBoxLength) {
      $("#selectAllCheckbox").prop("checked", true);
    } else {
      $("#selectAllCheckbox").prop("checked", false);
    }

    this.addSelectedCheckBox(e.target.value);
  }

  /**
   * Function is used to toggle select all check box
   *
   * @return void
   */
  toggleSelectAll(e) {
    const self = this;
    if ($("#selectAllCheckbox").prop("checked")) {
      $(".rowCheckbox").each(function() {
        if ($(this).is(":checked") === false) {
          $(this).prop("checked", true);
          self.addSelectedCheckBox($(this).attr("value"));
        }
      });
      //$('.options-drop').show();
    } else {
      $(".rowCheckbox").each(function() {
        $(this).prop("checked", false);
        self.addSelectedCheckBox($(this).attr("value"));
      });
      //$('.options-drop').hide();
    }
  }
}

export default Grid;
