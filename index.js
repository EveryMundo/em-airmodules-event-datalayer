const airModulesDataLayer = {
  event: "viewable impression",
  module: "emBookingPopupAbstract",
  eventAction: "viewableimpression",
  actionLabel: null,
  airlineIataCode: "ul",
  provider: "sri lankan airlines",
  journeyType: "ow",
  originAirportIataCode: "CMB",
  destinationAirportIataCode: "SIN",
  route: "CMB>SIN",
  currencyCode: "LKR",
  totalPrice: "5.21",
  totalPriceUSD: null,
  fareClass: "ec",
  departureDate: "03/13/2021",
  returnDate: "2021-06-14",
  daysUntilFlight: "25", //25
  tripLength: 93,
  isFlexibleDates: null,
  discountCode: null,
  deeplinkSiteEdition: null,
  miles: null,
  timestamp: "2021-02-16T17:41:43.200Z",
  url: "https://www.srilankan.com/en-lk/",
  passenger: [
    {
      count: 1,
      adultCount: "1",
      youngAdultCount: null,
      childCount: null,
      infantInLapCount: null,
      infantInSeatCount: null,
    },
  ],
  page: [
    {
      siteEdition: "en-LK",
      countryIsoCode: "lk",
      languageIsoCode: "en",
    },
  ],
  lodging: [
    {
      cityCode: "sin",
      name: "intercontinental",
      startDate: "2021/03/13",
      endDate: "2021-03-20",
      roomCount: 2,
      tripLength: 7,
      starRating: 5,
    },
  ],
};


/**
 * Validates object to check if it contains the required parameters.
 * @param {object} obj - data layer object.
 * @return {object} - Returns the object.
 */

const validateObj = (obj) =>{
  // var errors = Object.keys(schema).filter(function (key) {
  //   return !schema[key](obj[key]);
  // }).map(function (key) {
  //   return new Error(key + " is invalid.");
  // });

  // if (errors.length > 0) {
  //   errors.forEach(function (error) {
  //     console.log(error.message);
  //   });
  // } else {
  //   console.log("info is valid");
  // }
}


/**
 * Returns fully formatted object.
 * @param {object} obj - data layer object.
 * @return {function name(params) { }}} - Returns the formatted object using all format functions
 */

const formatAll = (obj) => {
  return (
    addParameters(obj),
    formatJourney(obj),
    formatFareClass(obj),
    formatProvider(obj),
    formatCase(obj),
    formatDate(obj),
    formatUrl(obj),
    convertValues(obj)
  );
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
  if (obj.journeyType.match(/(oneway|one-way|one_way|ow|one way)/gi)) {
    obj.journeyType = "ONE_WAY";
  } else if (
    obj.journeyType.match(/(roundtrip|round-trip|round_trip|rt|round trip)/gi)
  ) {
    obj.journeyType = "ROUND_TRIP";
  } else {
    return (obj.journeyType = "");
  }
  return obj;
};

/**
 * Formats fareClass to ECONOMY, BUSINESS, or FIRST. 
 * @param {object} obj - data layer object.
 * @return {object} - Returns formatted fare class.
 */

const formatFareClass = (obj) => {
  if (obj.fareClass.match(/(economy|ec|e)/gi)) {
    obj.fareClass = "ECONOMY";
  } else if (obj.fareClass.match(/(business|bc|b|businessclass)/gi)) {
    obj.fareClass = "BUSINESS";
  } else if (obj.fareClass.match(/(first|fc|f|firstclass)/gi)) {
    obj.fareClass = "FIRST";
  } else {
    obj.fareClass = "";
  }
  return obj;
};

/**
 * Formats provider. Can only format the provider name if it is separated by spaces.
 * @param {object} obj - data layer object.
 * @return {object} - Returns formatted provider name.
 */

const formatProvider = (obj) => {
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
};

/**
 * Formats casing for different key values.
 * Events, Module - kebab-case
 * eventAction - spaced - kebab - case
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

  keyArr.forEach((key) => {
    if (key == "event" || key == "module") {
      obj[key] = obj[key]
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
    } else if (key == "eventAction") {
      obj.eventAction = obj.event.split("-").join(" - ");
    } else if (
      key == "countryIsoCode" ||
      key == "cityCode" ||
      key == "languageIsoCode" ||
      key == "siteEdition"
    ) {
      //Lodging casing
      obj.lodging[0].cityCode = obj.lodging[0].cityCode.toUpperCase();

      //Page casing
      obj.page[0].countryIsoCode = obj.page[0].countryIsoCode.toUpperCase();
      obj.page[0].languageIsoCode = obj.page[0].languageIsoCode.toLowerCase();
      obj.page[0].siteEdition =
        obj.page[0].languageIsoCode.toLowerCase() +
        "-" +
        obj.page[0].countryIsoCode.toUpperCase();
    } else if (key == "name") {
      obj.lodging[0].name =
        obj.lodging[0].name.charAt(0).toUpperCase() +
        obj.lodging[0].name.substr(1).toLowerCase();
    } else {
      obj[key] = obj[key].toUpperCase();
    }
  });
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
    if (key == "timestamp") {
      obj[key] = new Date(obj[key]).toISOString();
    } else if (key == "startDate" || key == "endDate") {
      obj.lodging[0][key] = new Date(obj.lodging[0][key])
        .toISOString()
        .substr(0, 10);
    } else {
      obj[key] = new Date(obj[key]).toISOString().substr(0, 10);
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
  obj.url = obj.url.split(":").join(": ");
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
          // !Number.isNaN(+obj[property])
          !isNaN(obj[property]) &&
          !isNaN(parseFloat(obj[property]))
        ) {
          obj[property] = +obj[property];
        }
      }
      // console.log(property + "   " + obj[property]);
    }
  }
  return obj;
};



const formatter = {
  formatAll,
  addParameters,
  formatJourney,
  formatFareClass,
  formatProvider,
  formatCase,
  formatDate,
  formatUrl,
  convertValues,
};
console.log("OUTPUT", formatter.formatAll(airModulesDataLayer));

// console.log(validateObj(airModulesDataLayer));


export default formatter;
