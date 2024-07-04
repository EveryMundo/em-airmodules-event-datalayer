import { baseAirlineObject, baseEventObject, baseHospitalityObject } from "./schema.js";
import { version } from './version.js';
import { hangarConfig } from './config.js';
import { tenantList } from "./tenantlist.js";
import { tealiumList } from "./whitelist.js";

/**
 * Returns fully formatted object.
 * @param {object} obj - data layer object.
 * @return {function name(params) { }}} - Returns the formatted object using all format functions
 */

const globalObj = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;

globalObj.tp_v = version;
globalObj.tp_debug = false;

const logger = {
  log: (...args) => {
    if (globalObj && globalObj.tp_debug === true) {
      console.debug('tp_debug is currently active');
      console.log(...args);
    } else {
      // do nothing
    }
  }
};

const ensureFields = (obj, baseObj) => {
  for (const key in baseObj) {
    if (baseObj.hasOwnProperty(key)) {
      if (!obj.hasOwnProperty(key)) {
        obj[key] = Array.isArray(baseObj[key]) ? [] : baseObj[key];
      }

      if (Array.isArray(baseObj[key]) && Array.isArray(obj[key])) {
        baseObj[key].forEach((baseElem, i) => {
          obj[key][i] = ensureFields(obj[key][i] || {}, baseElem);
        });
      } else if (typeof baseObj[key] === 'object' && baseObj[key] !== null) {
        obj[key] = ensureFields(obj[key] || {}, baseObj[key]);
      }
    }
  }
  return obj;
};

const formatAirlines = (obj) => {
  logger.log("Incoming obj: ", JSON.parse(JSON.stringify(obj)));
  obj = ensureFields(obj, baseAirlineObject);
  if (obj.module && obj.eventAction) {
    convertValues(obj);
    formatDetails(obj, 'airline');
    formatCase(obj);
    formatJourney(obj);
    formatFareClass(obj);
    formatTenantType(obj);
    formatDate(obj, true);
    formatUrl(obj);
    addCalculatedParameters(obj);
    pushFormattedEventData(obj);
    return obj;
  }
  return "Module name or eventAction missing.";
};

const formatHotels = (obj) => {
  logger.log("Incoming obj: ", JSON.parse(JSON.stringify(obj)));
  obj = ensureFields(obj, baseHospitalityObject);
  if (obj.module && obj.eventAction) {
    convertValues(obj);
    formatDetails(obj, 'hotel');
    formatCase(obj);
    formatTenantType(obj);
    formatDate(obj);
    formatUrl(obj);
    addCustomParameters(obj);
    pushFormattedEventData(obj);
    return obj;
  }
  return "Module name or eventAction missing.";
};

const formatEvents = (obj) => {
  logger.log("Incoming obj: ", JSON.parse(JSON.stringify(obj)));
  obj = ensureFields(obj, baseEventObject);
  if (obj.module && obj.eventAction) {
    convertValues(obj);
    formatJourney(obj);
    formatFareClass(obj);
    formatDetails(obj, 'event');
    formatCase(obj);
    formatTenantType(obj);
    formatDate(obj);
    formatUrl(obj);
    pushFormattedEventData(obj);
    return obj;
  }
  return "Module name or eventAction missing.";
};
/**
 * Saves to localStorage
 * @param {object} key - Key of item
 * @param {object} value - Value of item
 */
const saveToLocalStorage = (key, value) => {
  const standardizedVal = typeof value === 'object' || Array.isArray(value)
  ? JSON.stringify(value)
  : value;
  localStorage.setItem(key, standardizedVal);
}

/**
 * Fetches the list of country codes for each airport code from the hangar API
 * @param {string} iataCode - Iata code of airline
 * @return {object} - Returns an object with the list of airport codes and their corresponding country codes
 */
const fetchAirportCountries = async iataCode => {
  try {
    // Assuming current  is correctly defined in your scope
    const url = `${hangarConfig.apiUrl}${iataCode.toLowerCase()}${hangarConfig.apiPath}`;
    const apiKey = hangarConfig.apiKey;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'EM-API-KEY': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        outputFields: ["countryIsoCode", "iataCode"],
        setting: { "airportSource": "TRFX" },
        language: "en"
      })
    });

    if (!response.ok) {
      // Handle HTTP errors
      console.error(`Error fetching airport countries: ${response.statusText}`);
      return {}; // Return an empty object or array as needed
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle network errors or JSON parsing errors
    console.error(`Error in fetchAirportCountries: ${error.message}`);
    return {}; // Return an empty object or array as needed
  }
};


/**
 * Loads the list of country codes for each airport code
 * @param {string} iataCode - Iata code of airline
 * @return {Map} - Returns a map of airport codes and their corresponding country codes
 */

const loadAirportCountries = async iataCode => {
  let airportCountryCodesList = JSON.parse(localStorage.getItem("airportCountryCodes")) || [];

  const hasIataCode = airportCountryCodesList.some(([code]) => code === iataCode);

  if (!hasIataCode) {
    try {
      const airportCountries = await fetchAirportCountries(iataCode);
      if (Array.isArray(airportCountries) && airportCountries.length > 0) {
        const newEntries = airportCountries
          .filter(airport => airport.iataCode && airport.country && airport.country.isoCode)
          .map(airport => [airport.iataCode, airport.country.isoCode]);

        airportCountryCodesList = [...airportCountryCodesList, ...newEntries]
          .sort((a, b) => a[0].localeCompare(b[0]));

        saveToLocalStorage('airportCountryCodes', airportCountryCodesList);
      } else {
        console.warn('No airport countries found or data in unexpected format.');
      }
    } catch (error) {
      console.error(`Error loading airport countries for ${iataCode}: ${error}`);
    }
  }
  return new Map(airportCountryCodesList);
};

/**
 * Adds custom parameters that need to be calculated to the event object
 * @param {object} obj - data layer object.
 * @return {object} - Returns the formatted object with the parameters as needed.
 */

const addCalculatedParameters = async obj => {
  obj.originCountryCode = "";
  obj.destinationCountryCode = "";
  obj.flightType = "";
  const airportCountries = await loadAirportCountries(obj.airlineIataCode || obj.tenantCode);
  if (obj.originAirportIataCode) {
    obj.originCountryCode = airportCountries.get(obj.originAirportIataCode);
  }
  if (obj.destinationAirportIataCode) {
    obj.destinationCountryCode = airportCountries.get(obj.destinationAirportIataCode);
  }
  obj.originCountryCode && obj.destinationCountryCode
  ? obj.originCountryCode === obj.destinationCountryCode
  ? obj.flightType = "DOMESTIC"
  : obj.flightType = "INTERNATIONAL"
  : obj.flightType = "";
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
  if (obj.hasOwnProperty('fareClass')) {
    const fareClassPatterns = [
      { pattern: /(premium\s*economy|pr)/gi, class: 'PREMIUM_ECONOMY' },
      { pattern: /(economy|ec|^e$)/gi, class: 'ECONOMY' },
      { pattern: /(business|bc|^b$|businessclass)/gi, class: 'BUSINESS' },
      { pattern: /(first|fc|^f$|firstclass)/gi, class: 'FIRST' }
    ];

    obj.fareClass = fareClassPatterns.reduce((acc, curr) => {
      return curr.pattern.test(obj.fareClass) ? curr.class : acc;
    }, '');

  }
  return obj;
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
    "event", "module", "eventAction", "airlineIataCode", "originAirportIataCode",
    "destinationAirportIataCode", "currencyCode", "route", "countryIsoCode",
    "cityCode", "languageIsoCode", "siteEdition", "name", "provider", "brand",
    "model", "pageTypeCode", "typeName", "tenantCode", "actionLabel",
    "regionName", "countryCode", "cityName", "propertyName", "eventName",
    "eventLocation", "eventSession", "eventExperienceCategory", "eventExperience",
  ];

  const titleCase = [
    "regionName", "cityName", "propertyName", "eventName", "eventLocation",
    "eventSession", "eventExperienceCategory", "eventExperience", "provider"
  ];

  const toSnakeCase = (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s.-]+/g, "_").toLowerCase();
  const toKebabCase = (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s._]+/g, "-").toLowerCase();
  const toTitleCase = (str) => str.replace(/\w\S*/g, match => match.charAt(0)?.toUpperCase() + match.slice(1).toLowerCase());

  keyArr.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      switch (key) {
        case "event":
        case "eventAction":
          const eventValue = toSnakeCase(obj[key]);
          obj[key] = eventValue === 'select-stop' ? 'select_stops' : eventValue;
          if (!obj.event) obj.event = obj.eventAction;
          if (!obj.eventAction) obj.eventAction = obj.event;
          break;
        case "module":
        case "actionLabel":
          obj[key] = typeof obj[key] === "number" ? obj[key].toString() : toKebabCase(obj[key]);
          break;
        case "pageTypeCode":
        case "typeName":
          obj[key] = toSnakeCase(obj[key])?.toUpperCase();
          break;
        default:
          obj[key] = titleCase.includes(key) ? (key === "eventExperience" && obj[key].match(/(multiple|,)/gi) ? "MULTIPLE" : obj[key].toLowerCase().includes("n/a") ? "" : toTitleCase(obj[key])) : obj[key]?.toUpperCase();
      }
    }
 
  
    if (obj.page !== undefined && obj.page[0]?.hasOwnProperty(key) && (key === "languageIsoCode" || key === "siteEdition" || key === "countryIsoCode")) {
      const siteEdition = toKebabCase(obj.page[0].siteEdition).split("-");
      obj.page[0].countryIsoCode = (obj.page[0]?.countryIsoCode || "")?.toUpperCase();
      obj.page[0].languageIsoCode = (obj.page[0]?.languageIsoCode || "")?.toLowerCase();
      obj.page[0].siteEdition = siteEdition[1] !== undefined
        ? `${siteEdition[0]}-${siteEdition[1]?.toUpperCase()}`
        : (obj.page[0].siteEdition === "" && obj.page[0].languageIsoCode && obj.page[0].countryIsoCode !== "")
        ? `${obj.page[0].languageIsoCode}-${obj.page[0].countryIsoCode}`
        : (siteEdition[0] || "");
    }
  
    if (obj.lodging !== undefined && obj.lodging[0]?.hasOwnProperty(key)) {
      if (key === "cityCode") {
        obj.lodging[0].cityCode = (obj.lodging[0]?.cityCode || "")?.toUpperCase();
      }
      if (key === "name") {
        obj.lodging[0].name = (obj.lodging[0]?.name || "").charAt(0)?.toUpperCase() + (obj.lodging[0]?.name || "").substr(1).toLowerCase();
      }
    }
  
    if (obj.carRentals !== undefined && obj.carRentals[0]?.hasOwnProperty(key)) {
      switch (key) {
        case "provider":
          obj.carRentals[0].provider = toTitleCase(obj.carRentals[0].provider || "");
          break;
        case "brand":
          obj.carRentals[0].brand = (obj.carRentals[0].brand || "")?.toUpperCase();
          break;
        case "model":
          obj.carRentals[0].model = (obj.carRentals[0].model || "")?.toLowerCase();
          break;
      }
    }
  });

  return obj;
};

/**
 * Formats date to ISO format.
 * @param {object} obj - data layer object.
 * @return {object} - Returns formatted dates.
 */

const formatDate = (obj, isAirline = false) => {
  const dateFields = ["departureDate", "returnDate", "timestamp", "startDate", "endDate"];

  const isValidDate = (date) => date instanceof Date && !isNaN(date);

  const formatISODate = (date) => {
    const newDate = new Date(date);
    return isValidDate(newDate) ? newDate.toISOString().substr(0, 10) : '';
  };

  const formatISODateTime = (date) => {
    const newDate = new Date(date);
    return isValidDate(newDate) ? newDate.toISOString() : '';
  };

  dateFields.forEach(field => {
    if (obj.hasOwnProperty(field)) {
      obj[field] = field === 'timestamp' ? formatISODateTime(obj[field]) : formatISODate(obj[field]);
    }
  });

  // Airline-specific calculations
  if (isAirline) {
    if ((!obj.hasOwnProperty("daysUntilFlight") || obj.daysUntilFlight === undefined || obj.daysUntilFlight === '') &&
        isValidDate(new Date(obj.departureDate)) && isValidDate(new Date(obj.timestamp))) {
      const departure = new Date(obj.departureDate);
      const currentTimestamp = new Date(obj.timestamp);
      obj.daysUntilFlight = Math.round((departure - currentTimestamp) / (1000 * 60 * 60 * 24));
    }
  }

  if ((!obj.hasOwnProperty("tripLength") || obj.tripLength === undefined || obj.tripLength === '') &&
  isValidDate(new Date(obj.departureDate)) && isValidDate(new Date(obj.returnDate))) {
const departure = new Date(obj.departureDate);
const returnDate = new Date(obj.returnDate);
obj.tripLength = Math.round((returnDate - departure) / (1000 * 60 * 60 * 24));
}


  // Format lodging dates if applicable
  if (obj.lodging && obj.lodging.length > 0) {
    const lodgingObj = obj.lodging[0];
    lodgingObj.startDate = lodgingObj.hasOwnProperty("startDate") ? formatISODate(lodgingObj.startDate) : '';
    lodgingObj.endDate = lodgingObj.hasOwnProperty("endDate") ? formatISODate(lodgingObj.endDate) : '';
  }

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
  // Use URL from dataLayer or context if available
  const urlFromDataLayer = window?.EM?.dataLayer?.[0]?.page?.url;
  const urlFromContext = window?.EM?.context?.datasource?.url;

  if (!obj.hasOwnProperty("url") || obj["url"] === '') {
    obj.url = urlFromDataLayer || urlFromContext || '';
  }

  // Check if the URL needs to be retrieved from an iframe
  if (obj.hasOwnProperty("url")) {
    if (checkIframe()) {
      obj.url = window.parentURL !== '' ? window.parentURL : document.referrer || window.parent.location.href;
    } else if (obj["url"] === '') {
      obj.url = document.location.href;
    }

    if (obj.url) {
      obj.url = obj.url.split(":").join(": ");
    } else {
      obj.url = ''; //Fallback
    }
  }

  return obj;
};

/**
 * Adds custom parameters to the data layer object.
 * @param {object} obj - data layer object.
 * @return {object} - Returns url spaced between : and /.
 */
const addCustomParameters = (obj) => {
  // Add daysUntilBooking parameter
  if (!obj.hasOwnProperty("daysUntilBooking") && obj.hasOwnProperty("startDate") && obj.startDate !== "") {
    const startDate = new Date(obj.startDate);
    const today = new Date();
    const timeDiff = startDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    obj['daysUntilBooking'] = daysDiff;
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
  const formatNumber = (num) => {
    const parsedNum = parseFloat(num);
    return isNaN(parsedNum) ? num : parseFloat(parsedNum.toFixed(2));
  }
  
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      const value = obj[property];
      if (value === null || value === undefined) {
        obj[property] = "";
      } else if (typeof value === "object") {
        convertValues(value);
      } else if (typeof value === "string") {
        if (!isNaN(value) && !isNaN(parseFloat(value))) {
          obj[property] = +value;
        } else if (value.toLowerCase() === "false" || value.toLowerCase() === "true") {
          obj[property] = value.toLowerCase() === "true";
        }
      } else if (typeof value === "number") {
        obj[property] = formatNumber(value);
      }
    }
  }

  if (obj.hasOwnProperty('totalPrice')) {
    obj.totalPrice = formatNumber(obj.totalPrice)
  }
  if (obj.hasOwnProperty('totalPriceUSD')) {
    obj.totalPriceUSD = formatNumber(obj.totalPriceUSD)
  }

  return obj;
};

const formatDetails = (obj, tenantType = '') => {
  try {
    const context = window?.EM?.context;
    const dataLayer = window?.EM?.dataLayer?.[0];

    const providerName = context?.airline?.name || dataLayer?.airline?.name || '';
    const code = context?.airline?.code || dataLayer?.airline?.iataCode || '';
    const journeyType = context?.dynamicContext?.productCategory;
    const fareClass = context?.dynamicContext?.productType;
    const isFlexibleDates = context?.dynamicContext?.isFlexibleDates;
    const discountCode = context?.dynamicContext?.discountCode;
    const isRedemption = context?.dynamicContext?.isRedemption;

    // Format airline name
    let finalAirlineName = obj.provider ? obj.provider : providerName;
    finalAirlineName = finalAirlineName.match(/[a-zA-Z0-9]+/g) ? finalAirlineName.split(" ").map(key => key.charAt(0)?.toUpperCase() + key.slice(1)?.toLowerCase()).join("") : '';
    obj.provider = finalAirlineName || obj.provider;

    // Handle tenant code based on the type
    if ((tenantType !== 'airline' && !obj.tenantCode) || obj.tenantCode === '') {
      obj.tenantCode = code?.toUpperCase();
    }
    if ((tenantType === 'airline' && !obj.airlineIataCode) || obj.airlineIataCode === '') {
      obj.airlineIataCode = code?.toUpperCase();
    }

    // Handle additional properties
    obj.journeyType = obj.journeyType || journeyType || '';
    obj.fareClass = obj.fareClass || fareClass || '';
    obj.isFlexibleDates = obj.isFlexibleDates !== undefined ? obj.isFlexibleDates : isFlexibleDates || false;
    obj.discountCode = obj.discountCode || discountCode || '';

    // Check for miles
    if (tenantType === 'airline' && isRedemption !== undefined && (obj.miles === undefined)) {
      obj.miles = isRedemption;
    }

    // Handle typeName
    if (obj.page && obj.page[0]) {
      if (!obj.page[0].hasOwnProperty("typeName")) {
        obj.page[0].typeName = '';
      }

      obj.page[0].typeName =
        obj.page[0].typeName?.toUpperCase() ||
        dataLayer?.page?.typeName?.toUpperCase() ||
        context?.datasource?.step?.toUpperCase() ||
        context?.datasource?.step?.page?.[0]?.typeName?.toUpperCase() ||
        '';

      obj.page[0].siteEdition = obj.page[0].siteEdition ||
                                context?.geo?.language?.site_edition?.toUpperCase() ||
                                dataLayer?.page?.siteEdition?.toUpperCase() ||
                                '';
      obj.page[0].countryIsoCode = obj.page[0].countryIsoCode ||
                                   context?.geo?.language?.siteEditionMarket ||
                                   dataLayer?.page?.countryIsoCode ||
                                   '';
      obj.page[0].languageIsoCode = obj.page[0].languageIsoCode ||
                                    context?.geo?.language?.siteEditionLanguage ||
                                    dataLayer?.page?.languageIsoCode ||
                                    '';
    }

    return obj;
  } catch (error) {
    console.error('Error in formatDetails:', error.message);
    return obj; // Return the original object in case of error
  }
};



/**
 * Returns tenant type based on tenant code. Checks whether tenant code belongs in tenant list. 
 * @param  {object} obj - formatted object
 * @return {object} - returns object containing tenant type
 */
const formatTenantType = (obj) => {
  const tenantCode = obj.tenantCode || obj.airlineIataCode || '';
  if (typeof tenantCode === "string" && tenantCode.trim().length > 0) {
    const tenantCodeSubstr = tenantCode.substring(0, tenantCode.length - 1);

    // Check if tenant belongs in the list
    if (tenantList[tenantCode]) {
      obj.tenantType = tenantList[tenantCode];
    } else if (tenantList[tenantCodeSubstr]) {
      obj.tenantType = tenantList[tenantCodeSubstr];
    } else {
      // Assign tenant type based on naming convention
      switch (tenantCode[0]?.toUpperCase()) {
        case "A":
          obj.tenantType = "airline";
          break;
        case "X":
          obj.tenantType = "airline alliance";
          break;
        case "L":
          obj.tenantType = "airport";
          break;
        case "P":
          obj.tenantType = "package";
          break;
        case "H":
          obj.tenantType = "hotel";
          break;
        case "E":
          obj.tenantType = "event";
          break;
        case "B":
          obj.tenantType = "bus";
          break;
        case "D":
          obj.tenantType = "tourism board & dmo";
          break;
        case "T":
          obj.tenantType = "train";
          break;
        default:
          obj.tenantType = "";
          logger.log("tenantCode does not adhere to the naming convention.");
      }
    }
  } else {
    obj.tenantType = "";
    logger.log("Invalid tenantCode: Not a non-empty string.");
  }
  return obj;
};

/**
 * Pushes formatted object to datalayer
 * @param  {object} obj - formatted object
 */
const pushFormattedEventData = (obj) => {
  if (!window) {
    error('window is not defined');
  } else {
    const tenantCode = obj.airlineIataCode || obj.tenantCode
    const whiteList = tealiumList?.[tenantCode] ?? false
    logger.log("Formatted event obj: ", JSON.parse(JSON.stringify(obj)))
    if (window.utag && whiteList) {
      window.utag.link(obj);
    }
    else{
      logger.log("utag.link not enabled")
    }
    if (window.dataLayer) {
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

export { formatter }
export default formatter