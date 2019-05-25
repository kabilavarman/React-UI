import toastr from "toastr";
import _ from "lodash";
import ReactDOM from "react-dom";
import Validator from "./Validator";
import Utility from "./Utility";
import RequestFactory from "./requestFactory";

// import { dependsOnActions } from "../config/roles";

class Form {
  /**
   * Get instance for utitlity
   *
   * @param object
   * @param object
   * @param callback
   * @param callback
   * @return object
   */
  static getInstance(
    currentComponent,
    rules,
    afterSubmit,
    afterFileSelect,
    fileRules
  ) {
    return new Form(
      currentComponent,
      rules,
      afterSubmit,
      afterFileSelect,
      fileRules
    );
  }
  /**
   * Class initializer
   *
   * @param object
   * @param object
   * @param callback
   * @param callback
   * @return void
   */
  constructor(
    currentComponent,
    rules,
    afterSubmit,
    afterFileSelect,
    fileRules
  ) {
    this.currentComponent = currentComponent;
    this.validator = Object.assign({}, Validator);
    this.validator.setComponent(currentComponent).setRules(rules);
    this.rules = rules;
    this.handleFieldsChange = this.handleFieldsChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handlePermissionCheckboxChange = this.handlePermissionCheckboxChange.bind(
      this
    );
    this.handleIntegerChange = this.handleIntegerChange.bind(this);
    this.blurEventListner = this.blurEventListner.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.afterSubmit = afterSubmit;
    this.afterFileSelect = afterFileSelect;
    this.fileRules = fileRules;
    this.validation = this.validation.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleFileData = this.handleFileData.bind(this);
    this.csvJSON = this.csvJSON.bind(this);
    this.updateFormFieldsState = this.updateFormFieldsState.bind(this);
    this.handleIntegerWithDashChange = this.handleIntegerWithDashChange.bind(
      this
    );
    this.getSelectedDom = this.getSelectedDom.bind(this);
  }

  /**
   * Handle to delete the key from object
   *
   * @param object
   * @return void
   */
  deleteFromObject(keyPart, obj) {
    for (var k in obj) {
      // Loop through the object
      if (~k.indexOf(keyPart)) {
        // If the current key contains the string we're looking for
        delete obj[k]; // Delete obj[key];
      }
    }
    return obj;
  }

  /**
   * Handle to update the form rules
   *
   * @param object
   * @return void
   */
  getValidationRules() {
    return this.rules;
  }

  /**
   * Handle to update the form rules
   *
   * @param object
   * @return void
   */
  updateRules(rules) {
    if (_.isObject(rules) && !_.isEmpty(rules)) {
      this.rules = rules;
    }
  }

  /**
   * Handle to update the form input fields state
   *
   * @param mixed | name
   * @param mixed | value
   */
  updateFormFieldsState(name, value) {
    if (this.currentComponent && name) {
      let fields = JSON.parse(
        JSON.stringify(this.currentComponent.state.fields)
      );
      fields = _.set(fields, name, value);
      this.currentComponent.setState({ fields: fields });
    }
  }
  /**
   * Handle field changes
   *
   * @param object
   * @return void
   */
  handleFieldsChange(e) {
    const name = e.target.dataset.hasOwnProperty("name")
      ? e.target.dataset.name
      : e.target.name;
    this.updateFormFieldsState(name, e.target.value);
  }

  /**
   * Handle field changes
   *
   * @param object
   * @return void
   */
  handleCheckboxChange(e) {
    const name = e.target.dataset.hasOwnProperty("name")
      ? e.target.dataset.name
      : e.target.name;
    this.updateFormFieldsState(name, e.target.checked);
  }

  /**
   * Handle roles & permissions checkbox changes
   * We wrote separately this method, because need to update view action state,
   * based on 'edit' & 'delete' state
   *
   * @param object
   * @return void
   */
  handlePermissionCheckboxChange(e) {
    const name = e.target.dataset.hasOwnProperty("name")
      ? e.target.dataset.name
      : e.target.name;
    if (this.currentComponent && name) {
      // Find the last occurance of dot position from string
      let dotLast = name.lastIndexOf(".");
      // Get the action name as string
      let actionName = name.substring(dotLast + 1);
      // get the action management name
      let actionParentName = name.substring(0, dotLast + 1);
      let fields = JSON.parse(
        JSON.stringify(this.currentComponent.state.fields)
      );

      // Here we check whether the any action is depends on other action
      // If yes, then perform dependent action as well
      // if (_.has(dependsOnActions, actionName)) {
      //   let denpendsOn = dependsOnActions[actionName];
      //   denpendsOn.map((actions, index) => {
      //     if (actions.checked == e.target.checked) {
      //       if (_.isArray(actions.name)) {
      //         actions.name.map(name => {
      //           _.set(fields, `${actionParentName}${name}`, e.target.checked);
      //         });
      //       } else {
      //         _.set(
      //           fields,
      //           `${actionParentName}${actions.name}`,
      //           e.target.checked
      //         );
      //       }
      //     }
      //   });
      // }

      fields = _.set(fields, name, e.target.checked);
      this.currentComponent.setState({ fields: fields });
    }
  }

  /**
   * update state if value is number, otherwise nothing would happen
   * @param {*} e
   */
  handleIntegerChange(e) {
    if (this.currentComponent && !isNaN(e.target.value)) {
      this.updateFormFieldsState(e.target.name, e.target.value);
    }
  }

  /**
   * update state if value is number with dash or hyphen, otherwise nothing would happen
   * @param {*} e
   */
  handleIntegerWithDashChange(e) {
    const value = e.target.value;
    var objRegex = /(^[0-9]+[-0-9]+$)/;
    if (this.currentComponent && (!isNaN(value) || objRegex.test(value))) {
      this.updateFormFieldsState(e.target.name, value);
    }
  }
  /**
   * Handle field changes from Plugin
   *
   * @param name
   * @param value
   * @return void
   */
  handleFieldsChangeByPlugin(name, value) {
    if (this.currentComponent && name) {
      let fields = JSON.parse(
        JSON.stringify(this.currentComponent.state.fields)
      );
      fields = _.set(fields, name, value);
      this.currentComponent.setState({ fields: fields });
    }
  }
  /**
   * Get file rule by element name handleed
   *
   * @param name
   * @return mixed
   */
  getFileRuleByElementName(name) {
    return Utility.isObject(this.fileRules) &&
      name &&
      this.fileRules.hasOwnProperty(name)
      ? this.fileRules[name]
      : false;
  }
  /**
   * Handle file select
   *
   * @param object
   * @return void
   */
  handleFile(e) {
    e.preventDefault();

    const fileList = e.target.files || e.dataTransfer.files;
    const file = fileList[0];

    if (file && file.name) {
      let fields = JSON.parse(
        JSON.stringify(this.currentComponent.state.fields)
      );
      let files = this.currentComponent.state.files;
      fields = _.set(fields, e.target.name, file.name);
      files[e.target.name] = file;
      this.currentComponent.setState({ fields: fields, files: files });
    }
  }
  /**
   * Handle file select
   *
   * @param object
   * @return void
   */
  handleFileData(e) {
    e.preventDefault();
    const fileList = e.target.files || e.dataTransfer.files;
    const file = fileList[0];
    let state = JSON.parse(JSON.stringify(this.currentComponent.state));
    let fields = JSON.parse(JSON.stringify(this.currentComponent.state.fields));
    fields = _.set(fields, e.target.name, file.name);
    state = _.set(state, "tempFile", file);
    state["fields"] = fields;
    this.currentComponent.setState(state);
  }
  /**
   * Handle file select
   *
   * @param object
   * @return void
   */
  csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers;
    for (var i = 0; i < lines.length; i++) {
      headers = lines[i].split("\n");
    }
    var cont = 0;
    for (var i = 0; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split("\n");
      for (var j = 0; j < headers.length; j++) {
        obj[cont] = currentline[j];
      }
      cont++;
      result.push(obj);
    }

    return JSON.stringify(result); //JSON
  }
  /**
   * Process the selected file
   *
   * @param object file
   * @param object rules
   * @return void
   */
  processFiles(file, rules) {
    const errors = this.validateFile(file, rules);

    if (errors.length === 0) {
      if (this.isImage(file)) {
        this.loadImage(file);
      }

      if (this.afterFileSelect) {
        return true;
      }
    } else {
      toastr.error(errors.shift(errors), "", { timeOut: 3000 });
    }
  }
  /**
   * Handle file select
   *
   * @param object
   * @return void
   */
  handleFileSelect(e) {
    e.preventDefault();
    const fileList = e.target.files || e.dataTransfer.files;
    const inputErrors = Object.assign(
      {},
      this.currentComponent.state.inputErrors
    );

    if (fileList && fileList.length > 0) {
      if (inputErrors[e.target.name] !== undefined) {
        inputErrors[e.target.name]["has"] = false;
        this.currentComponent.setState({ inputErrors: inputErrors });
      }
      const file = fileList[0];
      file.fileName = e.target.name;
      this.handleFieldsChangeByPlugin(e.target.name, file.name);
      this.processFile(file, this.getFileRuleByElementName(e.target.name));
    }
  }
  /**
   * Handle file select
   *
   * @param object
   * @return void
   */
  handleFileDrop(dataTransfer, name) {
    const fileList = dataTransfer.files;
    const inputErrors = Object.assign(
      {},
      this.currentComponent.state.inputErrors
    );

    if (fileList && fileList.length > 0) {
      if (inputErrors[name] !== undefined) {
        inputErrors[name]["has"] = false;
        this.currentComponent.setState({ inputErrors: inputErrors });
      }
      const file = fileList[0];
      this.handleFieldsChangeByPlugin(name, file.name);
      this.processFile(file, this.getFileRuleByElementName(name));
    }
  }
  /**
   * Clean the file dom
   * @return void
   */
  cleanFileElement(file) {
    try {
      file.value = null;
    } catch (ex) {}

    if (file.value) {
      file.parentNode.replaceChild(file.cloneNode(true), file);
    }
  }
  /**
   * Process the selected file
   *
   * @param object file
   * @param object rules
   * @return void
   */
  processFile(file, rules) {
    const errors = this.validateFile(file, rules);

    if (errors.length === 0) {
      if (this.isImage(file)) {
        this.loadImage(file);
      }

      if (this.afterFileSelect) {
        return true;
      }
    } else {
      toastr.error(errors.shift(errors), "", { timeOut: 3000 });
    }
  }
  /**
   * Validate the image file selected
   *
   * @param object file
   * @return object
   */
  validateImageFile(file, rules) {
    const errors = [];

    /**
     * Valid file size selected
     * @rule fileSize
     */
    if (rules.fileSize && file.size > rules.fileSize) {
      errors.push(
        `File size should not be greater than ${rules.fileSize /
          (1024 * 1024)} MB`
      );
    }

    /**
     * Valid selected mime type
     * @rule mime
     */
    if (
      rules.mime &&
      rules.mime.indexOf(file.type.replace(/image\//g, "")) === -1
    ) {
      errors.push(
        "Invalid file uploaded ,Please make sure you select a file with " +
          rules.mime.join(",")
      );
    }

    return errors;
  }
  /**
   * Validate the file selected
   *
   * @param object file
   * @return object
   */
  validateFile(file, rules) {
    const errors = [];
    /**
     * Valid file size selected
     * @rule fileSize
     */
    if (rules.fileSize && file.size > rules.fileSize) {
      errors.push(
        `File size should not be greater than ${rules.fileSize /
          (1024 * 1024)} MB`
      );
    }
    /**
     * Valid selected mime type
     * @rule mime
     */
    if (
      rules.mime &&
      file.type.length > 0 &&
      rules.mime.indexOf(file.type.substring(file.type.indexOf("/") + 1)) === -1
    ) {
      errors.push(
        "Invalid file uploaded ,Please make sure you select a file with " +
          rules.mime.join(",") +
          " extension"
      );
    }
    if (errors.length > 0) {
      this.handleFieldsChangeByPlugin(file.fileName, "");
      this.cleanFileElement(file);
    }
    return errors;
  }
  /**
   * Load selected image file with fileReader
   *
   * @param object file
   * @return void
   */
  loadImage(file) {
    const reader = new FileReader();

    reader.onload = e => {
      file.src = e.target.result;

      if (this.afterFileSelect) {
        this.afterFileSelect(file);
      }
    };

    reader.readAsDataURL(file);
  }

  blurEventListner(e) {
    this.validator
      .setComponent(this.currentComponent)
      .setRules(this.rules)
      .blurEventListner(e);
  }
  /**
   * Handle form submit
   *
   * @param object
   * @return void
   */
  handleSubmit(e) {
    e.preventDefault();
    if (
      this.validator
        .setComponent(this.currentComponent)
        .setRules(this.rules)
        .validateReactForm(e.target) &&
      this.afterSubmit
    ) {
      this.afterSubmit(this.currentComponent.state.fields);
    }
  }

  /**
   * check selected file is a image
   *
   * @param object file
   * @return boolean
   */
  isImage(file) {
    return (
      Utility.isObject(file) &&
      typeof file.hasOwnProperty("type") &&
      [
        "image/png",
        "image/gif",
        "image/bmp",
        "image/jpg",
        "image/jpeg"
      ].indexOf(file.type) > -1
    );
  }
  /**
   * Declare the handle Address Priority
   */
  handlePriority(
    e,
    selected,
    value,
    defaultValue,
    callbackType,
    dispatch,
    callbackTypeKeys
  ) {
    let fields = JSON.parse(JSON.stringify(this.currentComponent.state.fields));
    let selectedDom = ReactDOM.findDOMNode(selected);
    let name = selectedDom.getAttribute("data-name")
      ? selectedDom.getAttribute("data-name")
      : selectedDom.getAttribute("name");
    fields = _.set(fields, name, value);
    if (this.currentComponent.state || this.currentComponent.form.props.state) {
      const currentState =
        this.currentComponent.state || this.currentComponent.form.props.state;
      const keys = Object.keys(currentState).filter(
        key => key.substring(0, 15) === "addressPriority"
      ).length;
      const priority = parseInt(selectedDom.getAttribute("data-priority"));
      if (value !== defaultValue || !value) {
        for (let i = priority + 1; i < keys; i++) {
          let dom = ReactDOM.findDOMNode(currentState[`addressPriority${i}`]);
          if (dom) {
            let name = dom.getAttribute("data-name")
              ? dom.getAttribute("data-name")
              : dom.getAttribute("name");
            fields = _.set(fields, name, value instanceof Array ? [] : "");
          }
        }
      }
    }
    this.currentComponent.setState({ fields: fields });
    this.handleAddressCallback(dispatch, callbackType, value, callbackTypeKeys);
  }
  /**
   * Declare the handle Select Change
   */
  getSelectedDom(selected) {
    return ReactDOM.findDOMNode(selected);
  }
  /**
   * Declare the handle Select Change
   */
  handleSelectChange(selected, value) {
    let fields = JSON.parse(JSON.stringify(this.currentComponent.state.fields));
    let selectedDom = ReactDOM.findDOMNode(selected);
    let name = selectedDom.getAttribute("data-name")
      ? selectedDom.getAttribute("data-name")
      : selectedDom.getAttribute("name");
    fields = _.set(fields, name, value);
    this.currentComponent.setState({ fields: fields });
  }
  /**
   * Declare the handle getCurrentComponent
   */
  getCurrentComponent() {
    return this.currentComponent;
  }
  /**
   * Declare the handle Address Callback
   */
  handleAddressCallback(dispatch, type, value, callbackTypeKeys) {
    let types = [];
    if (type instanceof Array) {
      types = type;
    } else {
      types.push(type);
    }
    if (value instanceof Array) {
      value = JSON.stringify(value)
        .replace("[", "")
        .replace("]", "")
        .replace(/\"/gi, "");
    }
    for (let select of types) {
      let keys = {};
      if (callbackTypeKeys) {
        keys = _.set(keys, callbackTypeKeys[select], value);
      }
      
    }
  }
  /**
   * Declare the handle reset
   */
  validation(fieldName) {
    if (
      this.currentComponent.state.inputErrors[fieldName] &&
      this.currentComponent.state.inputErrors[fieldName].has
    ) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Download csv
   *
   */
  downloadCsv(url, fileName) {
    fileName = fileName + ".xls";
    fetch(RequestFactory.getBaseApiUrl() + "/" + url, {
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
        }
      });
  }
  /**
   * Declare the handle reset
   */
  reset(state) {
    if (state && (!state.inputErrors || state.inputErrors)) {
      state = _.set(state, "inputErrors", {});
    }
    this.currentComponent.setState(state);
  }
  /**
   * Handle field changes from Plugin
   *
   * @param name
   * @param value
   * @return void
   */
  handleFieldsChangeByJson(json) {
    if (this.currentComponent) {
      let fields = JSON.parse(
        JSON.stringify(this.currentComponent.state.fields)
      );
      for (let result of json) {
        fields = _.set(fields, result.name, result.value);
      }
      this.currentComponent.setState({ fields: fields });
    }
  }
  /**
   * Declare the handle Customer Change
   */
  handleCustomerChange(selected, customerSelect, value, UtilityField) {
    let fields = JSON.parse(JSON.stringify(this.currentComponent.state.fields));
    const selectedDom = ReactDOM.findDOMNode(selected);
    const name = selectedDom.getAttribute("data-name")
      ? selectedDom.getAttribute("data-name")
      : selectedDom.getAttribute("name");
    fields = _.set(fields, name, value);
    if (customerSelect) {
      const customer = _.find(customerSelect.response.data, {
        customerId: value
      });
      if (customer) {
        fields = _.set(fields, UtilityField, customer.customerUtilityId);
      } else {
        fields = _.set(fields, UtilityField, "");
      }
    }
    let inputErrors = JSON.parse(
      JSON.stringify(this.currentComponent.state.inputErrors)
    );
    if (inputErrors[UtilityField]) {
      inputErrors = _.set(inputErrors, UtilityField, {});
    }
    this.currentComponent.setState({ fields: fields });
  }

  /**
   * Declare the handle Template Change
   */
  handleTemplateChange(selected, templateSelect, value, UtilityField) {
    let fields = JSON.parse(JSON.stringify(this.currentComponent.state.fields));
    const selectedDom = ReactDOM.findDOMNode(selected);
    const name = selectedDom.getAttribute("data-name")
      ? selectedDom.getAttribute("data-name")
      : selectedDom.getAttribute("name");
    fields = _.set(fields, name, value);
    if (templateSelect) {
      const template = _.find(templateSelect.response.data, {
        templateName: value
      });
      if (template) {
        fields = _.set(fields, UtilityField, template.templateUtilityId);
      } else {
        fields = _.set(fields, UtilityField, "");
      }
    }
    let inputErrors = JSON.parse(
      JSON.stringify(this.currentComponent.state.inputErrors)
    );
    if (inputErrors[UtilityField]) {
      inputErrors = _.set(inputErrors, UtilityField, {});
    }
    this.currentComponent.setState({ fields: fields });
  }
  /**
   * Handle the update the state fields directly
   *
   * @param object fields
   */
  updateStateFields(fields) {
    if (_.isObject(fields)) {
      this.currentComponent.setState({ fields: fields });
    }
  }
  /**
   * Declare the validation rules for all the fileds in the application
   */
  static getFieldsValidationRules() {
    return {
      name: "required|max:200",
      email: "required|email",
      emailOptional: "email",
      password: "required|min:6|secure_password|max:20",
      confirmPassword: "required|min:6|secure_password|same:password",
      mobilenumber: "required|numeric|min:10|max:10",
      phonenumber: "required|landline|min:8|max:12",
      // 'pincode': 'required|numeric|min:6|max:6',
      dropdown: "required",
      username: "required|min:5|max:30",
      description: "required|max:50",
      addressLine1: "required",
      addressLine2: "required",
      city: "required",
      state: "required",
      country: "required",
      // pinCode: "required",
      image: { fileSize: 2 * (1024 * 1024) },
      location: "required",
      propertyType: "required",
      roleName: "required|min:4",
      countryCode: "required|max:4"
    };
  }
}

export default Form;
