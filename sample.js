import formatter from "./src/index.js";

const eventObject = {
  event: "change budget",
  module: "Em farelist featured destination",
  eventAction: "budget",
  actionLabel: "test",
  airlineIataCode: "TX",
  provider: "AirlineTRFX",
  journeyType: "round trip",
  originAirportIataCode: "MIA",
  destinationAirportIataCode: "FLL",
  route: "mia>FLL",
  currencyCode: "USD",
  totalPrice: "40",
  totalPriceUSD: 40,
  fareClass: "ec",
  departureDate: "03-13-2021",
  returnDate: "2021/06/14",
  daysUntilFlight: 21,
  tripLength: "7",
  isFlexibleDates: null,
  discountCode: null,
  deeplinkSiteEdition: null,
  miles: "500",
  timestamp: "04 November 2021 5:13 EST",
  url: "https://www.testurl.com/",
  passenger: [
    {
      count: 2,
      adultCount: 2,
      youngAdultCount: "1",
      childCount:"0",
      infantInLapCount: null,
      infantInSeatCount: null,
    },
  ],
  page: [
    {
      siteEdition: "enUs",
      countryIsoCode: "lk",
      languageIsoCode: "EN",
    },
  ],
  lodging: [
    {
      cityCode: "FLL",
      name: "Test lodging",
      startDate: "2021/03/13",
      endDate: "2021-03-20",
      roomCount: 2,
      tripLength: "7",
      starRating: "5",
    },
  ],
};

const hotelEventObject = {
  event: "viewable-impression",
  module: "em-booking-popup-abstract",
  eventAction: "viewable-impression",
  actionLabel: null,
  tenantCode: "UL",
  provider: "hyat",
  regionName: "north america",
  countryCode: "US",
  cityName: "miami",
  propertyCode: "hyatt9015479",
  propertyName: "hyatt miami",
  currencyCode: "USD",
  totalPrice: 900.5,
  totalPriceUSD: "900.50",
  startDate: "2022-04-01",
  startDate: "2022-04-07",
  daysUntilBooking: 25,
  tripLength: 4,
  roomAvailability: "true",
  timestamp: "2021-02-16T17:41:43.200Z",
  url: "https: //www.hyatt.com/en/miami",
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
  rooms: [
    {
      guests: {
        ADULT: {
          total: "1",
        },
      },
    },
    {
      guests: {
        ADULT: {
          total: "3",
        },
        CHILD: {
          total: "2",
          ages: ["0", "1"],
        },
      },
    },
  ],
};

console.log("OUTPUT FOR HOTEL OBJECT", formatter.formatHotels(hotelEventObject));
formatter.formatHotels(hotelEventObject);
