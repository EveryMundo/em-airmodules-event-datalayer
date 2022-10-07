import formatter from "../src/index.js"

const hotelEventObject = {
  event: "viewable-impression",
  module: "em-booking-popup-abstract",
  eventAction: "viewable impression",
  actionLabel: null,
  tenantCode: "UL",
  tenantType: "",
  provider: "hyat",
  regionName: "North america",
  eventExperience: "The lounge , player pod",
  countryCode: "US",
  cityName: "miami",
  propertyCode: "105565",
  propertyName: "N/a",
  currencyCode: "USD",
  totalPrice: 900.545645,
  totalPriceUSD: "900.545645",
  startDate: "2022-04-01",
  endDate: "2022-04-07",
  daysUntilBooking: 25,
  tripLength: 4,
  roomAccesibility: "true",
  timestamp: "2021-02-16T17:41:43.200Z",
  url: "https: //www.hyatt.com/en/miami",
  guest: [
    {
      count: 1,
      adultCount: 1,
      youngAdultCount: null,
      childCount: null,
      infantInLapCount: null,
      infantInSeatCount: null,
    },
  ],
  room: [
    { 
      total: 1, 
      type: ""
     },
    ],
  page: [
    {
      siteEdition: "enHk",
      countryIsoCode: "LK",
      languageIsoCode: "en",
    },
  ],
};

console.log("OUTPUT FOR HOTEL OBJECT", formatter.formatHotels(hotelEventObject));
formatter.formatHotels(hotelEventObject);
