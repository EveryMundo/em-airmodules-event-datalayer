import { baseAirlineObject, baseEventObject, baseHospitalityObject } from "./schema.js";
import { version } from './version.js';
import { hangarEnv } from './config.js';
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

const formatAirlines = async (obj) => {
  logger.log("Incoming obj: ", JSON.parse(JSON.stringify(obj)));
  obj = ensureFields(obj, baseAirlineObject);
  if (obj.module && obj.eventAction) {
    await addCalculatedParameters(obj);
    convertValues(obj);
    formatDetails(obj, 'airline');
    formatCase(obj);
    formatJourney(obj);
    formatFareClass(obj);
    formatDate(obj, true);
    formatUrl(obj);
    pushFormattedEventData(obj, baseAirlineObject);
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
    formatDate(obj);
    formatUrl(obj);
    pushFormattedEventData(obj, baseHospitalityObject);
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
    formatDate(obj);
    formatUrl(obj);
    pushFormattedEventData(obj, baseEventObject);
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
  * Returns environment based on url's domain or from EM.dataLayer. Default to PROD if no environment
  * @returns {string} The environment based on url's domain or EM.dataLayer.
  */
const getEnvironment = () => {
  const environment = window.EM?.dataLayer?.[0]?.extraInfo?.environment ?? window?.location?.hostname;

  const environments = {
    development: ["dev", "prepro", "DEVELOPMENT", "PREPRODUCTION"],
    production: ["production", "PRODUCTION", "prod"]
  };

  for (const [key, keywords] of Object.entries(environments)) {
    if (keywords.some(keyword => environment.includes(keyword) || environment === keyword)) {
      return hangarEnv[key];
    }
  }

  return hangarEnv.production || ""
};

/**
 * Fetches the list of country codes for each airport code from the hangar API
 * @param {string} iataCode - Iata code of airline
 * @return {object} - Returns an object with the list of airport codes and their corresponding country codes
 */
const fetchAirportCountries = async (iataCode) => {
  const hangarConfig = getEnvironment();
  if (!hangarConfig) {
    console.warn('Hangar configuration is not defined.');
    return [];
  }

  try {
    const url = `${hangarConfig.apiUrl}${iataCode.toLowerCase()}${hangarConfig.apiPath}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'EM-API-KEY': hangarConfig.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        outputFields: ["countryIsoCode", "iataCode"],
        setting: { "airportSource": "TRFX" },
        language: "en"
      })
    });

    if (!response.ok) {
      console.error(`Error fetching airport countries: ${response.statusText}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in fetchAirportCountries: ${error.message}`);
    return [];
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
  obj.originCountryCode = obj.originCountryCode || "";
  obj.destinationCountryCode = obj.destinationCountryCode || "";
  obj.flightType = "";

  if (!obj.originCountryCode || !obj.destinationCountryCode) {
    const airportCountries = await loadAirportCountries(obj.airlineIataCode || obj.tenantCode);

    if (!obj.originCountryCode && obj.originAirportIataCode) {
      obj.originCountryCode = airportCountries.get(obj.originAirportIataCode) ?? '';
    }

    if (!obj.destinationCountryCode && obj.destinationAirportIataCode) {
      obj.destinationCountryCode = airportCountries.get(obj.destinationAirportIataCode) ?? '';
    }
  }

  if (obj.originCountryCode && obj.destinationCountryCode) {
    obj.flightType = obj.originCountryCode === obj.destinationCountryCode ? "DOMESTIC" : "INTERNATIONAL";
  } else {
    obj.flightType = "";
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
    "model", "tenantCode", "actionLabel",
    "regionName", "countryCode", "cityName", "propertyName", "eventName",
    "eventLocation", "eventSession", "eventExperienceCategory", "eventExperience",
  ];

  const titleCase = [
    "regionName", "cityName", "propertyName", "eventName", "eventLocation",
    "eventSession", "eventExperienceCategory", "eventExperience", "provider"
  ];

  const toSnakeCase = (str) => str?.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s.-]+/g, "_").toLowerCase();
  const toKebabCase = (str) => str?.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s._]+/g, "-").toLowerCase();
  const toTitleCase = (str) => str?.replace(/\w\S*/g, match => match.charAt(0)?.toUpperCase() + match.slice(1).toLowerCase());

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
        case "typeName":
          obj[key] = toSnakeCase(obj[key])?.toUpperCase();
          break;
        default:
          obj[key] = titleCase.includes(key) ? (key === "eventExperience" && obj[key].match(/(multiple|,)/gi) ? "MULTIPLE" : obj[key]?.toLowerCase().includes("n/a") ? "" : toTitleCase(obj[key])) : obj[key]?.toUpperCase();
      }
    }
 
  
    if (obj.page !== undefined && obj.page?.hasOwnProperty(key) && (key === "languageIsoCode" || key === "siteEdition" || key === "countryIsoCode")) {
      const siteEdition = toKebabCase(obj.page.siteEdition).split("-");
      obj.page.countryIsoCode = (obj.page?.countryIsoCode || "")?.toUpperCase();
      obj.page.languageIsoCode = (obj.page?.languageIsoCode || "")?.toLowerCase();
      obj.page.siteEdition = siteEdition[1] !== undefined
        ? `${siteEdition[0]}-${siteEdition[1]?.toUpperCase()}`
        : (obj.page.siteEdition === "" && obj.page.languageIsoCode && obj.page.countryIsoCode !== "")
        ? `${obj.page.languageIsoCode}-${obj.page.countryIsoCode}`
        : (siteEdition[0] || "");
    }
    
    if (obj.lodging !== undefined && obj.lodging.hasOwnProperty(key)) {
      if (key === "cityCode") {
        obj.lodging.cityCode = (obj.lodging?.cityCode || "")?.toUpperCase();
      }
      if (key === "name") {
        obj.lodging.name = (obj.lodging?.name || "").charAt(0)?.toUpperCase() + (obj.lodging?.name || "").substr(1).toLowerCase();
      }
    }
    
    if (obj.carRentals !== undefined && obj.carRentals.hasOwnProperty(key)) {
      switch (key) {
        case "provider":
          obj.carRentals.provider = toTitleCase(obj.carRentals.provider || "");
          break;
        case "brand":
          obj.carRentals.brand = (obj.carRentals.brand || "")?.toUpperCase();
          break;
        case "model":
          obj.carRentals.model = (obj.carRentals.model || "")?.toLowerCase();
          break;
      }
    }})}   
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
    const lodgingObj = obj.lodging;
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

    if (tenantType === 'hotel' && !obj.daysUntilBooking && obj.startDate?.trim()) {
      const startDate = new Date(obj.startDate);
      const today = new Date();
      const timeDiff = startDate - today;
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      obj.daysUntilBooking = daysDiff;
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
    const validTypeNames = new Set([
      "HOMEPAGE", "CITY_TO_CITY", "FROM_CITY", "TO_CITY",
      "CITY_TO_COUNTRY", "COUNTRY_TO_CITY", "COUNTRY_TO_COUNTRY",
      "FROM_COUNTRY", "TO_COUNTRY", "EXTERNALIZED", "CUSTOM_PAGE",
      "404_PAGE", "SITEMAP", "BUS_STATION", "FROM_STATE", "FROM_AIRPORT"
    ]);
    
    // List of potential sources for typeName in order of preference
    const potentialTypeNames = [
      obj.page?.typeName,
      dataLayer?.page?.typeName,
      context?.datasource?.step,
      context?.datasource?.step?.page?.[0]?.typeName
    ];
    
    // Iterate over potential sources to find a valid typeName
    obj.page.typeName = potentialTypeNames.find(source => {
      const typeName = source?.toUpperCase(); // Convert to uppercase for comparison
      return typeName && validTypeNames.has(typeName);
    }) || '';
    

      obj.page.siteEdition = obj.page.siteEdition ||
                                context?.geo?.language?.site_edition?.toUpperCase() ||
                                dataLayer?.page?.siteEdition?.toUpperCase() ||
                                '';
      obj.page.countryIsoCode = obj.page.countryIsoCode ||
                                   context?.geo?.language?.siteEditionMarket ||
                                   dataLayer?.page?.countryIsoCode ||
                                   '';
      obj.page.languageIsoCode = obj.page.languageIsoCode ||
                                    context?.geo?.language?.siteEditionLanguage ||
                                    dataLayer?.page?.languageIsoCode ||
                                    '';

    return obj;
  } catch (error) {
    console.error('Error in formatDetails:', error.message);
    return obj; // Return the original object in case of error
  }
};

const filterObjectBySchema = (obj, schema) => {
  const filteredObj = {};
  for (const key in schema) {
    if (obj.hasOwnProperty(key)) {
      if (typeof schema[key] === 'object' && !Array.isArray(schema[key])) {
        filteredObj[key] = filterObjectBySchema(obj[key], schema[key]);
      } else {
        filteredObj[key] = obj[key];
      }
    }
  }
  return filteredObj;
};

const pushFormattedEventData = (obj, schema) => {
  if (!window) {
    error('window is not defined');
  } else {
    const tenantCode = obj.airlineIataCode || obj.tenantCode;
    const whiteList = tealiumList?.[tenantCode] ?? false;
    const filteredObj = {tp_v: version, ...filterObjectBySchema(obj, schema)};
    logger.log("Formatted event obj: ", JSON.parse(JSON.stringify(filteredObj)));
    if (window.utag && whiteList) {
      window.utag.link(...filteredObj);
    } else {
      logger.log("utag.link not enabled");
    }
    if (window.dataLayer) {
      if (window.localDataLayer && window.localDataLayer.length > 0) {
        window.dataLayer.push(...window.localDataLayer);
        window.localDataLayer = [];
      }
      window.dataLayer.push(filteredObj);
    } else {
      window.localDataLayer = [];
      window.localDataLayer.push(filteredObj);
    }
  }
};

const formatter = { formatAirlines, formatHotels, formatEvents };

export { formatter }
export default formatter