import formatter from "../src/index.js"

const eventObject = 
{
  event: "fsi",
  module: "emBookingMask",
  eventAction: "fsi",
  actionLabel: 'search flights',
  airlineIataCode: "aa",
  provider: "american airlines",
  journeyType: "rt",
  originAirportIataCode: "CMB",
  destinationAirportIataCode: "SIN",
  route: "cmb>sin",
  currencyCode: "LKR",
  totalPrice: "5.21",
  totalPriceUSD: null,
  fareClass: "b",
  departureDate: "03/13/2021",
  returnDate: "2021-06-14",
  daysUntilFlight: "25", //25
  tripLength: 93,
  isFlexibleDates: null,
  discountCode: null,
  deeplinkSiteEdition: null,
  miles: null,
  timestamp: "2021-02-16",
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

  console.log("OUTPUT FOR AIRLINE OBJECT", formatter.formatAirlines(eventObject));
formatter.formatAirlines(eventObject);