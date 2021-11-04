/**
 * Returns fully formatted object.
 * @param {object} obj - data layer object.
 * @return {function name(params) { }}} - Returns the formatted object using all format functions
 */

const formatAll = (obj) => {
  if (
    obj.hasOwnProperty("module") &&
    obj.module != "" &&
    obj.hasOwnProperty("eventAction") &&
    obj.eventAction != ""
  ) {
    return (
      addParameters(obj),
      formatJourney(obj),
      formatFareClass(obj),
      formatProvider(obj),
      formatCase(obj),
      formatDate(obj),
      formatUrl(obj),
      convertValues(obj),
      pushFormattedAirModulesData(obj)
    );
  }
  return "Module name or eventAction missing.";
};

/**
 * Adds moduleId and tagName parameters if they are not in the given object.
 * @param {object} obj - data layer object.
 * @return {object} - Returns the formatted object with the parameters as needed.
 */

const addParameters = (obj) => {
  if (!obj.hasOwnProperty("moduleId")) {
    obj.moduleId = "";
  }
  if (!obj.hasOwnProperty("tagName")) {
    obj.tagName = "";
  }
  return obj;
};

/**
 * Formats journey type to ONE_WAY or ROUND_TRIP.
 * @param {object} obj - data layer object.
 * @return {object} - Returns formatted journey type.
 */

const formatJourney = (obj) => {
  if (obj.hasOwnProperty("journeyType")) {
    if (obj.journeyType.match(/(oneway|one-way|one_way|ow|one way)/gi)) {
      obj.journeyType = "ONE_WAY";
    } else if (
      obj.journeyType.match(/(roundtrip|round-trip|round_trip|rt|round trip)/gi)
    ) {
      obj.journeyType = "ROUND_TRIP";
    } else {
      return (obj.journeyType = "");
    }
  }
  return obj;
};

/**
 * Formats fareClass to ECONOMY, BUSINESS, or FIRST.
 * @param {object} obj - data layer object.
 * @return {object} - Returns formatted fare class.
 */

const formatFareClass = (obj) => {
  if (obj.hasOwnProperty("fareClass")) {
    if (obj.fareClass.match(/(economy|ec|^e$)/gi)) {
      obj.fareClass = "ECONOMY";
    } else if (obj.fareClass.match(/(business|bc|^b$|businessclass)/gi)) {
      obj.fareClass = "BUSINESS";
    } else if (obj.fareClass.match(/(first|fc|^f$|firstclass)/gi)) {
      obj.fareClass = "FIRST";
    } else {
      obj.fareClass = "";
    }
  }
  return obj;
};

/**
 * Formats provider. Can only format the provider name if it is separated by spaces.
 * @param {object} obj - data layer object.
 * @return {object} - Returns formatted provider name.
 */

const formatProvider = (obj) => {
  if (obj.hasOwnProperty("provider")) {
    let airlineName = obj.provider;
    let finalAirlineName = "";

    if (airlineName.match(/[a-zA-Z0-9]+/g)) {
      const airlineArray = airlineName ? airlineName.split(" ") : [];
      if (airlineArray && airlineArray.length > 0) {
        airlineArray.forEach((key) => {
          finalAirlineName +=
            key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
        });
        return (obj.provider = finalAirlineName);
      } else {
        return "";
      }
    }
  }
};

/**
 * Formats casing for different key values.
 * Events, Module, eventAction - kebab-case
 * lodging name - Titlecased
 * Rest - Capital
 * @param {object} obj - data layer object.
 * @return {object} - Returns case-converted object.
 */
const formatCase = (obj) => {
  
  let keyArr = [
    "event",
    "module",
    "eventAction",
    "airlineIataCode",
    "originAirportIataCode",
    "destinationAirportIataCode",
    "currencyCode",
    "route",
    "countryIsoCode",
    "cityCode",
    "languageIsoCode",
    "siteEdition",
    "name",
  ];

  let listOfEvents = [
    "viewable-impression", 
    "fsi", 
    "change-origin", 
    "change-destination", 
    "change-departure-date", 
    "change-return-date", 
    "change-journey-type", 
    "change-miles", 
    "expand-form", 
    "collapse-form", 
    "sort", 
    "more-deals", 
    "open-booking-popup", 
    "select-tab", 
    "filter-airlines", 
    "change-budget", 
    "change-fare-class", 
    "collapse-histogram", 
    "select-month", 
    "expand-flight", 
    "reset-filter", 
    "toggle-farelist", 
    "expand-map", 
    "select-map-destination", 
    "selected-travel-interest", 
    "zoom", 
    "select-interest", 
    "click-out", 
    "read-article", 
    "change-month", 
    "select-location", 
    "change-location" , 
    "search", 
    "change-status",
  "flight",
"search-initiation",
"select-location",
"select-date",
"select-experience",
"change-budget",
"reset-filter",
"sort"]


  keyArr.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      if (key === "event" || key === "module") {
        obj[key] = obj[key]
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .replace(/[\s_]+/g, "-")
          .toLowerCase();
          
          const found = listOfEvents.includes(obj["event"])
          
          if(!found && key === "event"){
            obj["event"] = "Event value does not exist"
            console.log("Error: Please check event value")
          }
      } else if (key === "eventAction") {
        obj.eventAction =
          obj.hasOwnProperty("event") && obj.event != ""
            ? obj.event : obj.eventAction;
      } else {
        obj[key] = obj[key].toUpperCase();
      }}
     if (obj.page !== undefined) {
      if (
        obj.page[0].hasOwnProperty(key) &&
        (key === "languageIsoCode" ||
          key === "siteEdition" ||
          key === "countryIsoCode")
      ) {
        obj.page[0].countryIsoCode =
          obj.page[0].countryIsoCode?.toUpperCase() ?? "";
        obj.page[0].languageIsoCode =
          obj.page[0].languageIsoCode?.toLowerCase() ?? "";
        obj.page[0].siteEdition =
          obj.page[0].languageIsoCode?.toLowerCase() +
            "-" +
            obj.page[0].countryIsoCode?.toUpperCase() ?? "";
      }
    }if (obj.lodging !== undefined) {

      if (obj.lodging[0].hasOwnProperty(key) && key == "cityCode") {
        obj.lodging[0].cityCode = obj.lodging[0].cityCode?.toUpperCase() ?? "";
      }
      if (obj.lodging[0].hasOwnProperty(key) && key === "name") {
        obj.lodging[0].name =
          obj.lodging[0].name?.charAt(0).toUpperCase() +
            obj.lodging[0].name?.substr(1).toLowerCase() ?? "";
      }
  }});
  return obj;
};

/**
 * Formats date to ISO format.
 * @param {object} obj - data layer object.
 * @return {object} - Returns formatted dates.
 */

const formatDate = (obj) => {
  let dateArr = [
    "departureDate",
    "returnDate",
    "timestamp",
    "startDate",
    "endDate",
  ];
  dateArr.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      if (key === "timestamp") {
        obj[key] = new Date(obj[key]).toISOString();
      } else {
        obj[key] = new Date(obj[key]).toISOString().substr(0, 10);
      }
    }
    if (obj.lodging !== undefined) {
      if (
        obj.lodging[0].hasOwnProperty(key) &&
        (key === "startDate" || key === "endDate")
      ) {
        obj.lodging[0][key] = new Date(obj.lodging[0][key])
          .toISOString()
          .substr(0, 10);
      }
    }
  });
  return obj;
};

/**
 * Formats url spacing.
 * @param {object} obj - data layer object.
 * @return {object} - Returns url spaced between : and /.
 */
const formatUrl = (obj) => {
  if (obj.hasOwnProperty("url")) {
    obj.url = obj.url.split(":").join(": ");
  }
  return obj;
};

/**
 * Recursive Function.
 * Replaces null values to empty string.
 * Converts numeric string values to their number value.
 * @param {object} obj - data layer object.
 * @return {object} - Returns formatted object.
 */
const convertValues = (obj) => {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] === "object") {
        convertValues(obj[property]);
        if (obj[property] == null) {
          obj[property] = "";
        }
      } else {
        if (
          typeof obj[property] === "string" &&
          !isNaN(obj[property]) &&
          !isNaN(parseFloat(obj[property]))
        ) {
          obj[property] = +obj[property];
        }
      }
    }
  }
  return obj;
};

/**
 * Pushes formatted object to datalayer
 * @param  {object} obj - formatted object
 */
const pushFormattedAirModulesData = (obj) => {
  if (window && window.dataLayer) {
    window.dataLayer.push(obj);
  }
};

const formatter = { formatAll };
module.exports = formatter;
