import { DateTime } from "luxon";

const airModulesDataLayer = {
  event: "viewable-impression",
  module: "em-booking-popup-abstract",
  eventAction: "viewable - impression",
  actionLabel: null,
  airlineIataCode: "",
  provider: "SriLankanAirlines",
  journeyType: "ROUND_TRIP",
  originAirportIataCode: "CMB",
  destinationAirportIataCode: "SIN",
  route: "CMB>SIN",
  currencyCode: "LKR",
  totalPrice: null,
  totalPriceUSD: null,
  fareClass: "ECONOMY",
  departureDate: "03/13/2021",
  returnDate: "2021-06-14",
  daysUntilFlight: 25,
  tripLength: 93,
  isFlexibleDates: null,
  discountCode: null,
  deeplinkSiteEdition: null,
  miles: null,
  timestamp: "2021-02-16T17:41:43.200Z",
  url: "https: //www.srilankan.com/en-lk/",
  passenger: [
    {
      count: 1,
      adultCount: 1,
      youngAdultCount: null,
      childCount: null,
      infantInLapCount: null,
      infantInSeatCount: null,
    },
  ],
  page: [
    {
      siteEdition: "en-LK",
      countryIsoCode: "LK",
      languageIsoCode: "en",
    },
  ],
  lodging: [
    {
      cityCode: "sin",
      name: "Intercontinental",
      startDate: "2021-03-13",
      endDate: "2021-03-20",
      roomCount: 2,
      tripLength: 7,
      starRating: 5,
    },
  ],
};

// let mappedData = Object.keys(airModulesDataLayer).map((key) => ({
//   key,
//   value: airModulesDataLayer[key],
// }));

// const flattenObject = (obj, prefix = '') =>
// Object.keys(obj).reduce((acc, k) => {
//   const pre = prefix.length ? `${prefix}.` : '';
//   if (
//     typeof obj[k] === 'object' &&
//     obj[k] !== null &&
//     Object.keys(obj[k]).length > 0
//   )
//     Object.assign(acc, flattenObject(obj[k], pre + k));
//   else acc[pre + k] = obj[k];
//   return acc;
// }, {});

// function flattenObject(obj) {
//   var toReturn = {};

//   for (var i in obj) {
//       if (!obj.hasOwnProperty(i)) continue;

//       if ((typeof obj[i]) == 'object' && obj[i] !== null) {
//           var flatObject = flattenObject(obj[i]);
//           for (var x in flatObject) {
//               if (!flatObject.hasOwnProperty(x)) continue;

//               toReturn[i + '.' + x] = flatObject[x];
//           }
//       } else {
//           toReturn[i] = obj[i];
//       }
//   }
//   return toReturn;
// }

const formatter = {
  
  formatJourney(obj) {
    var journey = obj.journeyType;
    if (journey.match(/(oneway|one-way|one_way|ow|one way)/gi)) {
      return "ONE_WAY";
    } else if (
      journey.match(/(roundtrip|round-trip|round_trip|rt|round trip)/gi)
    ) {
      return "ROUND_TRIP";
    } else {
      return "N/A";
    }
    return journey;
  },

  //can only format to capital letters if airline name is separated by spaces
  formatProvider(obj) {
    let airlineName = obj.provider;
    let finalAirlineName = "";
    airlineName = "sri lankan airlines";

    if (airlineName.match(/[a-zA-Z0-9]+/g)) {
      const airlineArray = airlineName ? airlineName.split(" ") : [];
      if (airlineArray && airlineArray.length > 0) {
        airlineArray.forEach((key) => {
          finalAirlineName +=
            key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
        });
        return finalAirlineName;
      } else {
        return "N/A";
      }
    }
  },

  formatCaps(obj) {
    //add countryIsoCode, cityCode
    let keyArr = [
      "airlineIataCode",
      "originAirportIataCode",
      "destinationAirportIataCode",
      "currencyCode",
      "route",
    ];
    keyArr.forEach((key) => {
      if(obj[key].length === 0){
        return 'N/A';
      }
      obj[key] = obj[key].toUpperCase();
    });

    // return keyArr.length ? keyArr.length : 'N/A';
  },

  formatDate(obj) {

    let dateArr = ["departureDate", "returnDate", "timestamp"];
    dateArr.forEach((key) => {
      if (key == "departureDate" || key == "returnDate") {
        obj[key] = new Date(obj[key])
          .toISOString()
          .substr(0, 10);
      } else {
        obj[key] = new Date(
          obj[key]
        ).toISOString();
      }
    });
    return obj;
  },
};

console.log(formatter.formatDate(airModulesDataLayer));
// console.log(flattenObject(airModulesDataLayer));
export default formatter;
