import moment from "moment";
import _ from "lodash";

/**
 * Class to format the all types of data such string, date, object
 */
class Formatter {
  /**
   * Get the date & time as single vlaue from the given timestamp
   *
   * @param timestamp - timestamp to get time
   * @param format - display format
   */
  static getDateTime(timestamp, format) {
    return (
      Formatter.getDate(timestamp, format) +
      " " +
      Formatter.getTime(timestamp, format)
    );
  }

  /**
   * Get the date from the given timestamp
   *
   * @param timestamp - timestamp to get time
   * @param format - display format
   */
  static getDate(timestamp, format) {
    if (format === "MMM-YYYY" && timestamp !== null) {
      timestamp = timestamp.split("-");
      timestamp.splice(1, 0, "01");
      timestamp = timestamp.join("-");
    }
    format = _.isUndefined(format) ? "DD-MMM-YYYY" : format;

    return timestamp ? moment(timestamp).format(format) : "-";
  }

  /**
   * Get the time from the given timestamp
   *
   * @param timestamp - timestamp to get time
   * @param format - display format
   */
  static getTime(timestamp, format) {
    format = _.isUndefined(format) ? "HH:MM:SS" : format;
    return timestamp ? moment(timestamp).format(format) : "-";
  }

  /**
   * Get the time from the given timestamp
   *
   * @param timestamp - timestamp to get time
   * @param format - display format
   */
  static getTimeUTC(timestamp, format) {
    format = _.isUndefined(format) ? "hh:mm:ss" : format;
    return moment(timestamp).isValid()
      ? moment.utc(timestamp).format(format)
      : "-";
  }

  /**
   * Get the time from the given timestamp
   *
   * @param timestamp - timestamp to get time
   * @param format - display format
   */
  static getDateUTC(timestamp, format) {
    format = _.isUndefined(format) ? "DD-MMM-YYYY" : format;
    return moment(timestamp).isValid()
      ? moment.utc(timestamp).format(format)
      : "-";
  }

  /**
   * Return the default dash if given value is empty
   *
   * @param string
   */
  static getDefaultFor(value) {
    return value || value === 0 || value === "0" ? value : "-";
  }

  /**
   * Return the default dash if given value is empty
   *
   * @param string
   */
  static getDefaultForInt(value) {
    return value || value === 0 || value === "0"
      ? parseFloat(value).toFixed(2)
      : "0";
  }

  /**
   * Return the basename of URL
   *
   * @param string
   * @return string
   */
  static urlBasename(url) {
    return !_.isEmpty(url) ? url.substring(url.lastIndexOf("/") + 1) : "";
  }

  /**
   * parse the URL query params and return in object format
   *
   * @param string - query params
   * @return object
   */
  static parseQueryParams(query) {
    if (!_.isEmpty(query)) {
      //You get a '?key=asdfghjkl1234567890&val=123&val2&val3=other'
      const queryArray = query.split("?")[1].split("&");
      let queryParams = {};
      for (let i = 0; i < queryArray.length; i++) {
        const [key, val] = queryArray[i].split("=");
        queryParams[key] = val ? val : true;
      }
      return queryParams;
    }
    return {};
  }

  static buildParams(queryParams) {
    for (var iter in queryParams) {
      if (queryParams[iter] === "") {
        delete queryParams[iter];
      }
    }
    return queryParams;
  }
}

export default Formatter;
