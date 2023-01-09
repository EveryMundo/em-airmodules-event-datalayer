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
      formatTenantType(obj),
      convertValues(obj),
      formatJourney(obj),
      formatFareClass(obj),
      formatCase(obj),
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
      formatTenantType(obj),
      formatCase(obj),
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
      formatTenantType(obj),
      convertValues(obj),
      formatJourney(obj),
      formatFareClass(obj),
      formatCase(obj),
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
    "select-article"
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

  keyArr.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      if (key === "event" || key === "module" || key === "actionLabel") {
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
      }
      else if (titleCase.includes(key)) {
        //To titlecase. Check if key is eventExperience and contains multiple values -> else replace to titlecase.
        obj[key] = (key=== "eventExperience" && (obj[key].match(/(multiple|,)/gi))) 
        ? "MULTIPLE" :  obj[key].toLowerCase().includes("n/a") ? ''
        : obj[key].replace(/\w\S*/g, match => {
            return  match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
          }
        );
      } else {
        obj[key] = obj[key].toUpperCase()
      }}

  

     if (obj.page !== undefined) {
      if (
        obj.page[0].hasOwnProperty(key) &&
        (key === "languageIsoCode" ||
          key === "siteEdition" ||
          key === "countryIsoCode")
      ) {

        let siteEdition = obj.page[0].siteEdition
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .replace(/[\s_]+/g, "-")
          .split("-");

        obj.page[0].countryIsoCode =
          obj.page[0].countryIsoCode?.toUpperCase() ?? "";
        obj.page[0].languageIsoCode =
          obj.page[0].languageIsoCode?.toLowerCase() ?? "";
        obj.page[0].siteEdition = siteEdition[1] !== undefined ? siteEdition[0] + '-' + siteEdition[1].toUpperCase() : siteEdition[0] ?? "";

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
    if(obj["url"] !== ''){
      obj.url
    }
    else if(checkIframe()){
      obj.url = (window.parentURL !== '') ? window.parentURL : document.referrer || window.parent.location.href
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
 * Fetches tenant type from tenant-code-to-type mapper API
 * @param  {object} obj - formatted object
 * @return {object} - returns object containing tenant type
 */
const formatTenantType = async (obj) => {
  const tenantCode = obj['tenantCode']
  const tenantTypeData = await fetch(`https://tenant-code-to-type-mapper.everymundo.workers.dev/?code=${tenantCode}`, {headers: {
    'Access-Control-Allow-Origin': '*'
  }})
  const tenantType = await tenantTypeData.text()
  obj.tenantType = tenantType;
  
  return obj
}
/**
 * Pushes formatted object to datalayer
 * @param  {object} obj - formatted object
 */
const pushFormattedEventData = (obj) => {
  let localDataLayer = [];
  let ulink = window.ulink = []
  if(window && window.utag){
    utag.link(obj)
    window.ulink.push(obj)
    // ulink.push(obj)
  }
  //Use timeout in case utag has not loaded(?)
  // else if(window && !window.utag){
  //   setTimeout(()=> {
  //     if(window && window.utag){
  //       utag.link(obj)
  //     }
  //   }, 2000)
  // }
  if (window && window.dataLayer) {
    if(window.dataLayer.length > 0) {
      window.dataLayer.push(...localDataLayer)
    }
    window.dataLayer.push(obj);
  }
else{
    localDataLayer.push(obj)
  }
};

const formatter = { formatAirlines, formatHotels, formatEvents };
export default formatter