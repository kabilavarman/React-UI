export const dashboard = {
  /**
   * Gets the programmatic name of the entire locale, with the language,
   *	country and variant separated by underbars. The Language is always lower case,
   *	and country is always upper case. If the language is missing,
   *	the string will begin with an underscore character.
   *	If both the language and country fields are missing,
   *	this function will return the empty string,
   *	even if the variant field is filled in (you cannot have a locale with just a variant--
   *	the variant must accompany a valid language or country code). Examples: "en"
   *
   */
  en: {
    dashboard: "Dashboard",
    total_installed_device: "Total No. of Installed Device",
    total_active_device: "Total No. of Active Device",
    total_inactive_device: "Total No. of InActive Device",
    active_device: "Active device",
    inactive_device: "Inactive device",
    tampering: "Tampering",
    total_consumers: "Total No. Of Consumers",
    monthly_planned_consumption: "Monthly Planned Consumption",
    monthly_actual_consumption: "Monthly Actual Consumption",
    daily_actual_consumption: "Daily Actual Consumption",
    tamper: "Tamper",
    battery: "Battery",
    faulty_device: "Faulty Device",
    missing_payload: "Missing Payload",
    offline_device: "Offline Device",
    alerts: "Alerts",
    meter_health: "Meter Health",
    battery_status: "Battery Status",
    critical: "Critical",
    low: "Low",
    healthy: "Healthy",
    planned_vs_actual: "Planned vs Actual",
    consumption: "Consumption",
    peak_flow: "Peak Flow",
    consumption_flow: "Consumption Flow",
    offline_device: "Offline Device",
    total_offline_device: "Total No. of Offline Device",
    total_consumers_tooltip:
      "Total # of onboarded devices in on-field which are installed, activated successfully  assigned to the consumers",
    activedevice_tooltip:
      "Total # of devices which are installed, activated & onboarded in application & started receiving the data successfully",
    actual_consumption_tooltip:
      "Total # of consumption which is consumed to current system date & time from its start date of the month",
    inactivedevice_tooltip:
      "Total # of devices which are installed, activated & onboarded in application & stopped receiving the data",
    planned_consumption_tooltip:
      "Total # of consumption which is consumed to current system date & time from its start date of the month",
    offlinedevice_tooltip:
      "Total # of devices which are installed, activated & onboarded in application & stopped receiving the data",
    daily_consumption_tooltip:
      "Total # of consumption which is consumed on yesterday ",
    no_usage: "No Usage",
    low_usage: "Low Usage",
    excess_usage: "Excess Usage",
    avg_usage: "Average Usage",
    tamperBattery: "Tamper & Battery",
    usage: "Consumption Classification"
  }
};
