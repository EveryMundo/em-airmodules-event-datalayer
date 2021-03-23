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
  totalPrice: "5",
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

const formatAll = (obj) => {
  return (
    addParameters(obj),
    formatJourney(obj),
    formatFareClass(obj),
    formatProvider(obj),
    formatCase(obj),
    formatDate(obj),
    formatUrl(obj),
    replaceNullValues(obj),
    formatNumbers(obj)
  );
};

const addParameters = (obj) => {
  if (!obj.hasOwnProperty("moduleId")) {
    obj.moduleId = "";
  }
  if (!obj.hasOwnProperty("tagName")) {
    obj.tagName = "";
  }
  return obj;
};

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

//can only format to capital letters if airline name is separated by spaces
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

const formatCase = (obj) => {
  let keyArr = [
    "event", //kebab case
    "module", //kebab case
    "eventAction", //spaced kebab case
    "airlineIataCode",
    "originAirportIataCode",
    "destinationAirportIataCode",
    "currencyCode",
    "route",
    "countryIsoCode",
    "cityCode",
    "languageIsoCode",
    "siteEdition",
    "name", //lodging name gets titlecased.
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

const formatUrl = (obj) => {
  let newUrl = obj.url.split(":").join(": ");
  obj.url = newUrl;

  return obj;
};

//recursively replace Null values
const replaceNullValues = (obj) => {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] == "object") {
        replaceNullValues(obj[property]);
        if (obj[property] == null) {
          obj[property] = "";
        }
      } else {
        // console.log(property + "   " + obj[property]);
      }
    }
  }
  return obj;
};

// const formatNumbers = (obj) => {
//   let numArr = [
//     "totalPrice",
//     "totalPriceUSD",
//     "daysUntilFlight",
//     "miles",
//     "count",
//     "adultCount",
//     "youngAdultCount",
//     "childCount",
//     "infantInLapCount",
//     "infantInSeatCount",
//     "roomCount",
//     "starRating",
//   ];

//   let error = "Value is not a number.";
//   numArr.forEach((key) => {
//     if (
//       !isNaN(obj[key])
//       // typeof obj.passenger[0][key] === "string" && !isNaN(obj.passenger[0][key]) ||
//       // typeof obj.lodging[0][key] === "string" && !isNaN(obj.lodging[0][key])
//     ) {
//       obj[key]= parseInt(obj[key]);
//       // const parsedPassenger = parseInt(obj.passenger[0][key]);
//       // const parsedLodging = parseInt(obj.lodging[0][key]);

//         // parsedPassenger, parsedLodging;
// console.log(obj,obj[key])
//       } else {
//         throw error;
//     }
//     return obj;
//   });
// };

const formatter = {
  formatAll,
  addParameters,
  formatJourney,
  formatFareClass,
  formatProvider,
  formatCase,
  formatDate,
  formatUrl,
  replaceNullValues,
  formatNumbers,
};
console.log("OUTPUT", formatter.formatAll(airModulesDataLayer));

// console.log(formatNumbers(airModulesDataLayer));
// console.log(replaceNullValues(airModulesDataLayer));

export default formatter;
