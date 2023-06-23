import {tenantList} from "./tenantlist.js"
/**
 * Returns fully formatted object.
 * @param {object} obj - data layer object.
 * @return {function name(params) { }}} - Returns the formatted object using all format functions
 */

const formatAirlines = (obj) => {
  if (
    obj.hasOwnProperty("module") &&
    obj.module != "" &&
    obj.hasOwnProperty("eventAction") &&
    obj.eventAction != ""
  ) {
    return (
      addParameters(obj),
      convertValues(obj),
      formatJourney(obj),
      formatFareClass(obj),
      formatCase(obj),
      formatTenantType(obj),
      formatDate(obj),
      formatUrl(obj),
      pushFormattedEventData(obj)
    );
  }
  return "Module name or eventAction missing.";
};

const formatHotels = (obj) => {
  if (
    obj.hasOwnProperty("module") &&
    obj.module != "" &&
    obj.hasOwnProperty("eventAction") &&
    obj.eventAction != ""
  ) {
    return (
      convertValues(obj),
      formatCase(obj),
      formatTenantType(obj),
      formatDate(obj),
      formatUrl(obj),
      pushFormattedEventData(obj)
    );
  }
  return "Module name or eventAction missing.";
}

const formatEvents = (obj) => {
  if (
    obj.hasOwnProperty("module") &&
    obj.module != "" &&
    obj.hasOwnProperty("eventAction") &&
    obj.eventAction != ""
  ) {
    return (
      convertValues(obj),
      formatJourney(obj),
      formatFareClass(obj),
      formatCase(obj),
      formatTenantType(obj),
      formatDate(obj),
      formatUrl(obj),
      pushFormattedEventData(obj)
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
 * @deprecated - providers are now separated by spaces only
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
 * Events, eventAction - underscore
 * Module, actionLabel - kebab-case
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
    "provider",
    //Hotel values
    "tenantCode",
    "actionLabel",
    "regionName",
    "countryCode",
    "cityName",
    "propertyName",
    //Event values
    "eventName",
    "eventLocation",
    "eventSession",
    "eventExperienceCategory",
    "eventExperience"
  ];

  let listOfEvents = [
    "change-budget",
    "change-departure-date",
    "change-destination",
    "change-fare-class",
    "change-journey-type",
    "change-location",
    "change-miles",
    "change-month",
    "change-origin",
    "change-rating",
    "change-return-date",
    "change-status",
    "change-trip-length",
    "click-out",
    "collapse-form",
    "collapse-histogram",
    "expand-flight",
    "expand-form",
    "expand-map",
    "filter-airlines",
    "flight",
    "fsi",
    "more-deals",
    "open-booking-popup",
    "read-article",
    "reset-filter",
    "search-initiation",
    "search",
    "select-accessibility",
    "select-date",
    "select-end-date",
    "select-experience",
    "select-interest",
    "select-location",
    "select-map-destination",
    "select-month",
    "select-night",
    "select-offer",
    "select-property",
    "select-redemption",
    "select-room-guest",
    "select-start-date",
    "select-stay-length",
    "select-stop",
    "select-tab",
    "selected-travel-interest",
    "sort",
    "toggle-farelist",
    "zoom",
    "viewable-impression",
    "select-article",
    "select-resident-status",
    "no-fares-available",
    "insert-first-name",
    "insert-last-name",
    "select-origin",
    "insert-email",
    "insert-phone-number",
    "subscribe"
  ];

  const titleCase = [
    "regionName",
    "cityName",
    "propertyName",
    "eventName",
    "eventLocation",
    "eventSession",
    "eventExperienceCategory",
    "eventExperience",
    "provider"
  ];

  const toSnakeCase = (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s.-]+/g, "_").toLowerCase();
  const toKebabCase = (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s._]+/g, "-").toLowerCase();
  const toTitleCase = (str) => str.replace(/\w\S*/g, match => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase());

  keyArr.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      if (key === "event") {
        const found = listOfEvents.includes(toKebabCase(obj[key]));
        if (!found) {
          obj[key] = "Event value does not exist";
          console.log("Error: Please check event value");
        }else{
          obj[key] = toSnakeCase(obj[key]);
        }
      } else if (key === "module" || key === "actionLabel") {
        obj[key] = toKebabCase(obj[key]);
      } else if (key === "eventAction") {
        obj.eventAction = obj.hasOwnProperty("event") && obj.event !== "" ? obj.event : obj.eventAction;
      } else if (titleCase.includes(key)) {
        if (key === "eventExperience" && obj[key].match(/(multiple|,)/gi)) {
          obj[key] = "MULTIPLE";
        } else {
          obj[key] = obj[key].toLowerCase().includes("n/a") ? "" : toTitleCase(obj[key]);
        }
      } else {
        obj[key] = obj[key].toUpperCase();
      }
    }

    if (obj.page !== undefined && obj.page[0]?.hasOwnProperty(key) && (key === "languageIsoCode" || key === "siteEdition" || key === "countryIsoCode")) {
      let siteEdition = toKebabCase(obj.page[0].siteEdition).split("-");
      obj.page[0].countryIsoCode = obj.page[0]?.countryIsoCode?.toUpperCase() ?? "";
      obj.page[0].languageIsoCode = obj.page[0]?.languageIsoCode?.toLowerCase() ?? "";
      obj.page[0].siteEdition = siteEdition[1] !== undefined
        ? siteEdition[0] + "-" + siteEdition[1].toUpperCase()
        : (obj.page[0].siteEdition === "" && obj.page[0].languageIsoCode && obj.page[0].countryIsoCode !== "")
        ? obj.page[0].languageIsoCode + "-" + obj.page[0].countryIsoCode
        : siteEdition[0] ?? "";
    }

    if (obj.lodging !== undefined && obj.lodging[0]?.hasOwnProperty(key)) {
      if (key === "cityCode") {
        obj.lodging[0].cityCode = obj.lodging[0]?.cityCode?.toUpperCase() ?? "";
      }
      if (key === "name") {
        obj.lodging[0].name = obj.lodging[0]?.name?.charAt(0).toUpperCase() + obj.lodging[0]?.name?.substr(1).toLowerCase() ?? "";
      }
    }
  });
  return obj;
}
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
      } else if(obj[key] !== '') {
        obj[key] = new Date(obj[key]).toISOString().substr(0, 10);
      }
      else{
        obj[key] = ''
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
 * Checks whether the document/page is in an iFrame
 * @return {boolean} - Returns truthy or falsy value
 */
const checkIframe = () =>{
  try{
    if(window.self !== window.top || window.location !== window.parent.location){
      return true
    }
    else{
      return false
    }
  }catch(e){
    return true
  }
}

/**
 * Formats url spacing.
 * @param {object} obj - data layer object.
 * @return {object} - Returns url spaced between : and /.
 */
const formatUrl = (obj) => {
  if (obj.hasOwnProperty("url")) {
    if(checkIframe()){
      obj.url = (window.parentURL !== '') ? window.parentURL : document.referrer || window.parent.location.href
    }
    else if(obj["url"] !== ''){
      obj.url
    }
    else{
      obj.url = document.location.href
    }
    obj.url = obj.url.split(":").join(": ");
  }
  return obj;
};

/**
 * Recursive Function.
 * Replaces null values to empty string.
 * Converts numeric string values to their number value.
 * Converts true/false string values to their boolean values
 * @param {object} obj - data layer object.
 * @return {object} - Returns formatted object.
 */
const convertValues = (obj) => {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] === "object") {
        convertValues(obj[property]);
        if (obj[property] == null) {
          obj[property] = "";
        }
      } else if (
        typeof obj[property] === "string" &&
        !isNaN(obj[property]) &&
        !isNaN(parseFloat(obj[property]))
      ) {
          obj[property] = +obj[property];
      }
      else{
        if(typeof obj[property] === "string" && (obj[property] === "false" || obj[property] === "true" )){
          obj[property] = obj[property].toLowerCase() === 'true' ? true : false
        }
      }
      if(typeof obj[property] === 'number'){
        obj[property] = Math.round((obj[property]) * 100)/100
      }
    }
  }
  return obj;
};

/**
 * Returns tenant type based on tenant code. Checks whether tenant code belongs in tenant list. 
 * @param  {object} obj - formatted object
 * @return {object} - returns object containing tenant type
 */
const formatTenantType = (obj) => {
  const tenantCode = obj.hasOwnProperty('tenantCode') ? obj['tenantCode'] : obj.hasOwnProperty('airlineIataCode') ? obj['airlineIataCode'] : '' 
  const tenantCodeSubstr = tenantCode.substring(0, tenantCode.length - 1) //Take substring for customers with multiple tenants

  //Check if tenant belongs in list
  if(Object.keys(tenantList).includes(tenantCode)){
    return obj.tenantType = tenantList[tenantCode]
  }
  //If the tenant code does not belong to list
  else if(!Object.keys(tenantList).includes(tenantCode)){
     //Check if substring of tenant code belongs in list
     if(Object.keys(tenantList).includes(tenantCodeSubstr)){
      return obj.tenantType = tenantList[tenantCodeSubstr]
    }
    else{
    switch(tenantCode[0].toUpperCase()){
      case "A":
        obj.tenantType = "airline"
        break;
      case "X":
        obj.tenantType = "airline alliance"
        break;
      case "L":
        obj.tenantType = "airport"
        break;
      case "P":
        obj.tenantType = "package"
        break;
      case "H":
        obj.tenantType = "hotel"
        break;
      case "E":
        obj.tenantType = "event"
        break; 
      case "B":
        obj.tenantType = "bus"
        break;
      case "D":
        obj.tenantType = "tourism board & dmo"
        break;
      case "T":
        obj.tenantType = "train"
       break;
      default:
        obj.tenantType = ''
      console.log('tenantCode does not adhere to the naming convention.')
    }
    return obj 
  }}
  };
/**
 * Pushes formatted object to datalayer
 * @param  {object} obj - formatted object
 */
const pushFormattedEventData = (obj) => {
  if (!window) {
    console.error('window is not defined');
  } else {
    if (window.utag) {
      window.utag.link(obj);
    }
    if (window.dataLayer) {
      console.log('TP dataLayer initialized')
      if(window.localDataLayer && window.localDataLayer.length > 0) {
        window.dataLayer.push(...window.localDataLayer);
        window.localDataLayer = [];
      }
      window.dataLayer.push(obj);
    } else {
      window.localDataLayer = [];
      window.localDataLayer.push(obj);
    }
  }
};

const formatter = { formatAirlines, formatHotels, formatEvents };
export default formatter