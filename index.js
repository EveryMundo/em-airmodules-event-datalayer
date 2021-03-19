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
  addParameters(obj)
 }

 const addParameters =(obj) =>{
  if(!(obj.hasOwnProperty("moduleId"))){
    obj.moduleId = "";
  }
  if(!(obj.hasOwnProperty("tagName"))){
    obj.tagName = "";
  }
  return obj;
}

const formatter = { formatAll, addParameters };







  // formatJourney(obj) {
  //   var journey = obj.journeyType;
  //   if (journey.match(/(oneway|one-way|one_way|ow|one way)/gi)) {
  //     return "ONE_WAY";
  //   } else if (
  //     journey.match(/(roundtrip|round-trip|round_trip|rt|round trip)/gi)
  //   ) {
  //     return "ROUND_TRIP";
  //   } else {
  //     return "";
  //   }
  //   return journey;
  // },

  // formatFareClass(obj) {
  //   var fareClass = obj.fareClass;
  //   if (fareClass.match(/(economy|ec|e)/gi)) {
  //     return "ECONOMY";
  //   } else if (fareClass.match(/(business|bc|b|businessclass)/gi)) {
  //     return "BUSINESS";
  //   } else if (fareClass.match(/(first|fc|f|firstclass)/gi)) {
  //     return "FIRST";
  //   } else {
  //     return "";
  //   }
  //   return fareClass;
  // },

  // //can only format to capital letters if airline name is separated by spaces
  // formatProvider(obj) {
  //   let airlineName = obj.provider;
  //   let finalAirlineName = "";
  //   airlineName = "sri lankan airlines";

  //   if (airlineName.match(/[a-zA-Z0-9]+/g)) {
  //     const airlineArray = airlineName ? airlineName.split(" ") : [];
  //     if (airlineArray && airlineArray.length > 0) {
  //       airlineArray.forEach((key) => {
  //         finalAirlineName +=
  //           key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
  //       });
  //       return finalAirlineName;
  //     } else {
  //       return "";
  //     }
  //   }
  // },


  // formatCase(obj) {
  //   let keyArr = [
  //     "airlineIataCode",
  //     "originAirportIataCode",
  //     "destinationAirportIataCode",
  //     "currencyCode",
  //     "route",
  //     "countryIsoCode",
  //     "cityCode",
  //     "languageIsoCode",
  //     "siteEdition",
  //     "name", //lodging name gets titlecased.
  //   ];

  //   keyArr.forEach((key) => {
  //     if (key == "countryIsoCode" || key == "cityCode" || key== "languageIsoCode" || key== "siteEdition") {
  //       //Lodging casing
  //       obj.lodging[0].cityCode = obj.lodging[0].cityCode.toUpperCase();

  //       //Page casing
  //       obj.page[0].countryIsoCode = obj.page[0].countryIsoCode.toUpperCase();
  //       obj.page[0].languageIsoCode = obj.page[0].languageIsoCode.toLowerCase();
  //       obj.page[0].siteEdition = obj.page[0].languageIsoCode.toLowerCase() + "-" + obj.page[0].countryIsoCode.toUpperCase();

  //     } else if (key == "name") {
  //       obj.lodging[0].name =
  //         obj.lodging[0].name.charAt(0).toUpperCase() +
  //         obj.lodging[0].name.substr(1).toLowerCase();
  //      } else {
  //       obj[key] = obj[key].toUpperCase();
  //     }
  //   });
  //   return obj;
  // },

  // formatDate(obj) {
  //   let dateArr = [
  //     "departureDate",
  //     "returnDate",
  //     "timestamp",
  //     "startDate",
  //     "endDate",
  //   ];
  //   dateArr.forEach((key) => {
  //     if (key == "timestamp") {
  //       obj[key] = new Date(obj[key]).toISOString();
  //     } else if (key == "startDate" || key == "endDate") {
  //       obj.lodging[0][key] = new Date(obj.lodging[0][key])
  //         .toISOString()
  //         .substr(0, 10);
  //     } else {
  //       obj[key] = new Date(obj[key]).toISOString().substr(0, 10);
  //     }
  //   });
  //   return obj;
  // },

  // formatUrl(obj) {
  //   var newUrl = obj.url.split(":").join(": ");

  //   return newUrl;
  // },

 
// };

console.log(formatter.formatAll(airModulesDataLayer));
// console.log(formatter.addParameters(airModulesDataLayer));


export default formatter;
