// Others
export const CRITICAL = "critical";
export const ATTACH = "attach";
export const DETACH = "detach";
export const REPLACE = "replace";
export const LOGOUT = "LOGOUT";
// Default state
export const DEFAULT_STATE = { isFetching: true, isError: false, response: {} };
export const DEFAULT_STATE_FF_EF = {
  isFetching: false,
  isError: false,
  response: {}
};
export const DEFAULT_STATE_FF_ET = {
  isFetching: false,
  isError: true,
  response: {}
};
// Filters
export const DASHBOAR_FILTER_DAY = "DAY";
export const DASHBOAR_FILTER_WEEK = "WEEK";
export const DASHBOAR_FILTER_MONTH = "MONTH";
export const DASHBOAR_FILTER_YEAR = "YEAR";

// File Upload Report
export const DEVICE_UPLOAD_REPORT = "DEVICE_UPLOAD_REPORT";

// API action common constants
export const PENDING = "PENDING";
export const FULFILLED = "FULFILLED";
export const REJECTED = "REJECTED";
//Settings
export const SETTING = "SETTING";
// Auth
export const LOGIN = "LOGIN";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";
// General
export const DELETE = "DELETE";
export const STATUS_UPDATE = "STATUS_UPDATE";
// Others
export const GRID = "GRID";
export const IMAGE_UPLOAD = "IMAGE_UPLOAD";
export const FILE_UPLOAD = "FILE_UPLOAD";
// Customer
export const CUSTOMERS = "CUSTOMERS";
export const CUSTOMER_DELETE = "CUSTOMER_DELETE";
export const CUSTOMER_STATUS_UPDATE = "CUSTOMER_STATUS_UPDATE";
export const CUSTOMER = "CUSTOMER";
export const CUSTOMERSELECT = "CUSTOMERSELECT";
export const ALL_CUSTOMERS = "ALL_CUSTOMERS";
export const CUSTOMER_UTILITY_TYPE = "CUSTOMER_UTILITY_TYPE";

// TEMPLATES
export const TEMPLATES = "TEMPLATES";
export const TEMPLATE_DELETE = "TEMPLATE_DELETE";
export const TEMPLATE_STATUS_UPDATE = "TEMPLATE_STATUS_UPDATE";
export const TEMPLATE = "TEMPLATE";
export const TEMPLATESELECT = "TEMPLATESELECT";
export const ALL_TEMPLATES = "ALL_TEMPLATES";
export const TEMPLATE_UTILITY_TYPE = "TEMPLATE_UTILITY_TYPE";

// User
export const USERS = "USERS";
export const USER_DELETE = "USER_DELETE";
export const USER_STATUS_UPDATE = "USER_STATUS_UPDATE";
export const USER = "USER";
export const USER_FIELD_ENGINEERS = "USER_FIELD_ENGINEERS";
export const ALL_USERS = "ALL_USERS";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const USER_PROFILE = "USER_PROFILE";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
// MASTER DATA
export const CITY = "CITY";
export const CITY_FILTER = "CITY_FILTER";
export const COUNTRY = "COUNTRY";
export const STATE = "STATE";
export const UTILITY = "UTILITY";
export const ALL_UTILITIES = "ALL_UTILITIES";
export const PINCODE = "PINCODE";
export const ROLE_TYPE = "ROLE_TYPE";
export const LOCATION_TYPE = "LOCATION_TYPE";
export const LOCATION_TYPE_PROFILE = "LOCATION_TYPE_PROFILE";
export const CITY_PROFILE = "CITY_PROFILE";
export const PINCODE_PROFILE = "PINCODE_PROFILE";
export const COUNTRY_PROFILE = "COUNTRY_PROFILE";
//ADDRESS MASTER DATA
export const ADDRESS_MASTER_DATA_FROM = "ADDRESS_MASTER_DATA";
export const ADDRESS_MASTER_DATA_LIST = "ADDRESS_MASTER_DATA_LIST";
export const ADDRESS_MASTER_DATA_DELETE = "ADDRESS_MASTER_DATA_DELETE";
export const ADDRESS_MASTER_DATA_STATUS_UPDATE =
  "ADDRESS_MASTER_DATA_STATUS_UPDATE";
//STATE
export const STATE_LIST = "STATE_LIST";
export const STATE_FORM = "STATE_FORM";
export const STATE_DELETE = "STATE_DELETE";
export const STATE_STATUS_UPDATE = "STATE_STATUS_UPDATE";
export const ALL_STATES = "ALL_STATES";
export const STATE_PROFILE = "STATE_PROFILE";
//CITY
export const CITY_LIST = "CITY_LIST";
export const CITY_FORM = "CITY_FORM";
export const CITY_DELETE = "CITY_DELETE";
export const CITY_STATUS_UPDATE = "CITY_STATUS_UPDATE";
export const ALL_CITIES = "ALL_CITIES";
//PINCODE
export const PINCODE_LIST = "PINCODE_LIST";
export const PINCODE_FORM = "PINCODE_FORM";
export const PINCODE_DELETE = "PINCODE_DELETE";
export const PINCODE_STATUS_UPDATE = "PINCODE_STATUS_UPDATE";
export const ALL_PINCODES = "ALL_PINCODES";
//BATTERY_HEALTH
export const BATTERY_HEALTH_LIST = "BATTERY_HEALTH_LIST";
export const BATTERY_HEALTH_FROM = "BATTERY_HEALTH_FROM";
export const BATTERY_HEALTH_DELETE = "BATTERY_HEALTH_DELETE";
export const BATTERY_HEALTH_STATUS_UPDATE = "BATTERY_HEALTH_STATUS_UPDATE";
// Site
export const SITE = "SITE";
export const SITES = "SITES";
export const SITE_DELETE = "SITE_DELETE";
export const SITE_STATUS_UPDATE = "SITE_STATUS_UPDATE";
export const SITESELECT = "SITESELECT";
export const SITESELECT_PROFILE = "SITESELECT_PROFILE";
// Property
export const PROPERTY = "PROPERTY";
export const PROPERTY_DELETE = "PROPERTY_DELETE";
export const PROPERTIES = "PROPERTIES";
export const PROPERTY_STATUS_UPDATE = "PROPERTY_STATUS_UPDATE";
export const PROPERTY_BILLING_ADDRESS = "PROPERTY_BILLING_ADDRESS";
// Property Type
export const PROPERTY_TYPE_MASTERFORM = "PROPERTY_TYPE_MASTERFORM";
export const PROPERTY_TYPE = "PROPERTY_TYPE";
export const PROPERTY_TYPE_LIST = "PROPERTY_TYPE_LIST";
export const PROPERTY_TYPES = "PROPERTY_TYPES";
export const PROPERTY_TYPE_ADD = "PROPERTY_TYPE_ADD";
export const PROPERTY_TYPE_UPDATE = "PROPERTY_TYPE_UPDATE";
export const PROPERTY_TYPE_STATUS_UPDATE = "PROPERTY_TYPE_STATUS_UPDATE";
export const PROPERTY_TYPE_DELETE = "PROPERTY_TYPE_DELETE";
// Property Sub Type
export const PROPERTY_SUB_TYPE = "PROPERTY_SUB_TYPE";
export const PROPERTY_SUB_TYPE_LIST = "PROPERTY_SUB_TYPE_LIST";
export const PROPERTY_SUB_TYPES = "PROPERTY_SUB_TYPES";
export const PROPERTY_SUB_TYPE_ADD = "PROPERTY_SUB_TYPE_ADD";
export const PROPERTY_SUB_TYPE_UPDATE = "PROPERTY_SUB_TYPE_UPDATE";
export const PROPERTY_SUB_TYPE_STATUS_UPDATE =
  "PROPERTY_SUB_TYPE_STATUS_UPDATE";
export const PROPERTY_SUB_TYPE_DELETE = "PROPERTY_SUB_TYPE_DELETE";
// Occupant
export const OCCUPANT = "OCCUPANT";
export const OCCUPANT_DELETE = "OCCUPANT_DELETE";
export const OCCUPANTS = "OCCUPANTS";
export const OCCUPANT_STATUS_UPDATE = "OCCUPANT_STATUS_UPDATE";
// Device
export const DEVICE = "DEVICE";
export const DEVICE_ADD = "DEVICE_ADD";
export const DEVICE_UPDATE = "DEVICE_UPDATE";
export const DEVICE_SELECT = "DEVICE_SELECT";
export const DEVICES = "DEVICES";
export const DEVICE_DELETE = "DEVICE_DELETE";
export const DEVICE_STATUS_UPDATE = "DEVICE_STATUS_UPDATE";
export const DEVICE_STATUS_LIST = "DEVICE_STATUS_LIST";
export const DEVICES_INVENTORY = "DEVICES_INVENTORY";
export const DEVICE_ASSIGN = "DEVICE_ASSIGN";
export const DEVICE_STATUS_HISTORY = "DEVICE_STATUS_HISTORY";
export const ATTACH_DEVICE_TO_PROP = "ATTACH_DEVICE_TO_PROP";
export const DETACH_DEVICE_FROM_PROP = "DETACH_DEVICE_FROM_PROP";
export const DEVICE_OFFLINE_CONFIG = "DEVICE_OFFLINE_CONFIG";
export const DEVICE_OFFLINE_CONFIG_ADD = "DEVICE_OFFLINE_CONFIG_ADD";
export const DEVICE_DOWNLINK = "DEVICE_DOWNLINK";

// Role
export const ROLES = "ROLES";
export const ROLE = "ROLE";
export const PERMISSIONS = "PERMISSIONS";
export const PERMISSION = "PERMISSION";
// Email
export const EMAILS = "EMAILS";
export const EMAIL = "EMAIL";
export const EMAIL_DELETE = "EMAIL_DELETE";
export const EMAIL_STATUS_UPDATE = "EMAIL_STATUS_UPDATE";

//Templates
export const BULKTEMPLATES = "BULKTEMPLATES";
export const BULKTEMPLATE = "BULKTEMPLATE";

// SMS
export const SMSS = "SMSS";
export const SMS = "SMS";
export const SMS_DELETE = "SMS_DELETE";
export const SMS_STATUS_UPDATE = "SMS_STATUS_UPDATE";
// CONSUMER
export const CONSUMER_LIST = "CONSUMER_LIST";
// REPORT
export const REPORT_CONSUMER_CONSUMPTION = "REPORT_CONSUMER_CONSUMPTION";
export const REPORT_DRSLEVEL_CONSUMPTION = "REPORT_DRSLEVEL_CONSUMPTION";
export const REPORT_DRS_CONSUMER = "REPORT_DRS_CONSUMER";
export const REPORT_METERHEALTH = "REPORT_METERHEALTH";
export const REPORT_TAMPERINGALERT = "REPORT_TAMPERINGALERT";
// DRSFILE
export const DRSFILES = "DRSFILES";
export const DRSFILE = "DRSFILE";
export const DRSSELECT = "DRSSELECT";
export const DRSFILE_ADD = "DRSFILE_ADD";
export const DRSFILE_UPDATE = "DRSFILE_UPDATE";
export const DRSFILE_DELETE = "DRSFILE_DELETE";
export const DRSFILE_STATUS_UPDATE = "DRSFILE_STATUS_UPDATE";
export const DRSFILE_TOTAL = "DRSFILE_TOTAL";
//CONSUMPTION

export const CONSUMPTIONS = "CONSUMPTIONS";
export const CONSUMPTION = "CONSUMPTION";
export const CONSUMPTION_DELETE = "CONSUMPTION_DELETE";
export const CONSUMPTION_STATUS_UPDATE = "CONSUMPTION_STATUS_UPDATE";
export const CONSUMPTIONS_VIEW = "CONSUMPTIONS_VIEW";
export const CONSUMPTIONS_VIEW_BY_DEVICE = "CONSUMPTIONS_VIEW_BY_DEVICE";
export const MANUAL_ADJUSTMENT_HISTORY = "MANUAL_ADJUSTMENT_HISTORY";
//
export const AREAS = "AREAS";
export const AREA = "AREA";
export const AREA_DELETE = "AREA_DELETE";
export const AREA_STATUS_UPDATE = "AREA_STATUS_UPDATE";
export const AREASELECT = "AREASELECT";

//LOCATION
export const LOCATIONS = "LOCATIONS";
export const LOCATION = "LOCATION";
export const LOCATION_DELETE = "LOCATION_DELETE";
export const LOCATION_STATUS_UPDATE = "LOCATION_STATUS_UPDATE";
// ZONE
export const ZONE_TYPE = "ZONE_TYPE";
export const ZONE_TYPE_PROFILE = "ZONE_TYPE_PROFILE";
export const ZONE = "ZONE";
export const ZONE_ADD = "ZONE_ADD";
export const ZONE_UPDATE = "ZONE_UPDATE";
export const ZONES = "ZONES";
export const ZONE_DELETE = "ZONE_DELETE";
export const ZONE_STATUS_UPDATE = "ZONE_STATUS_UPDATE";
// LOG
export const LOG = "LOG";
export const LOGS = "LOGS";
export const LOG_DELETE = "LOG_DELETE";
// HIERARCHY
export const HIERARCHY_ADD = "HIERARCHY_ADD";
export const HIERARCHY = "HIERARCHY";
export const HIERARCHIES = "HIERARCHIES";
export const HIERARCHY_DYNAMIC_FIELDS = "HIERARCHY_DYNAMIC_FIELDS";
export const HIERARCHY_NAME_LIST = "HIERARCHY_NAME_LIST";
export const HIERARCHY_SUB_NAME_LIST = "HIERARCHY_SUB_NAME_LIST";
export const HIERARCHY_PROPERTY_LIST = "HIERARCHY_PROPERTY_LIST";
// TAMPERS
export const TAMPER = "TAMPER";
export const TAMPER_ADD = "TAMPER_ADD";
export const TAMPER_UPDATE = "TAMPER_UPDATE";
export const TAMPERS = "TAMPERS";
export const TAMPER_DELETE = "TAMPER_DELETE";
export const TAMPER_STATUS_UPDATE = "TAMPER_STATUS_UPDATE";
export const UPLOAD_EXCELS = "UPLOAD_EXCELS";
export const UPLOAD_EXCEL = "UPLOAD_EXCEL";

// DASHBOARD
export const DASHBOARD_DEVICE_MAP = "DASHBOARD_DEVICE_MAP";
export const DASHBOARD_DEVICE_TOTAL = "DASHBOARD_DEVICE_TOTAL";
export const DASHBOARD_CONSUMPTION_TOTAL = "DASHBOARD_CONSUMPTION_TOTAL";
export const DASHBOARD_ALERTS = "DASHBOARD_ALERTS";
export const DASHBOARD_BATTERY_STATUS = "DASHBOARD_BATTERY_STATUS";
export const DASHBOARD_PEAK_FLOW = "DASHBOARD_PEAK_FLOW";
export const DASHBOARD_PLANNED_VS_ACTUAL = "DASHBOARD_PLANNED_VS_ACTUAL";

export const DASHBOARD_DEVICE_LIST = "DASHBOARD_DEVICE_LIST";
export const DASHBOARD_CONSUMER_LIST = "DASHBOARD_CONSUMER_LIST";
export const DASHBOARD_ACTUAL_CONSUMP_LIST = "DASHBOARD_ACTUAL_CONSUMP_LIST";
export const DASHBOARD_DAILY_CONSUMP_LIST = "DASHBOARD_DAILY_CONSUMP_LIST";
export const DASHBOARD_PLANNED_CONSUMP_LIST = "DASHBOARD_PLANNED_CONSUMP_LIST";
export const DASHBOARD_ALERTS_LIST = "DASHBOARD_ALERTS_LIST";
export const DASHBOARD_USAGE_LIST = "DASHBOARD_USAGE_LIST";
export const DASHBOARD_BATTERY_LIST = "DASHBOARD_BATTERY_LIST";
// ALERTS
export const ALERT_CONFIG = "ALERT_CONFIG";
export const ALERTS = "ALERTS";
export const ALERT_CONFIG_ADD = "ALERT_CONFIG_ADD";

//BULKUPLOAD
export const BULKUPLOAD = "BULK UPLOAD";
export const COLLECTION_TYPE = "COLLECTION_TYPE";
export const COLLECTION_FIELD = "COLLECTION_FIELD";
export const EXPORT_TYPE = "EXPORT_TYPE";

//USAGE
export const USAGE_LIST = "USAGE_LIST";
export const USAGE_FROM = "USAGE_FROM";
export const USAGE_DELETE = "USAGE_DELETE";
export const USAGE_UPDATE = "USAGE_UPDATE";
export const DASHBOARD_USAGE = "DASHBOARD_USAGE";

export const BATTERY = "BATTERY";

export const DASHBOARD_TREE = "DASHBOARD_TREE";
export const DASHBOARD_TREE_FILTERS = "DASHBOARD_TREE_FILTERS";
