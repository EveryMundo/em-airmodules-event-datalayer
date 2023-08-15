import formatter from "../src/index.js"

const eventObject = {
    event: "change-departure-date",
    module: "em-farelist-mosaic-carousel",
    eventAction: "test",
    actionLabel: null,
    airlineIataCode: "A3",
    provider: "Aegean Airlines",
    journeyType: "oneway",
    originAirportIataCode: "ATH",
    destinationAirportIataCode: "FLL",
    route: "ATH>FLL",
    currencyCode: "USD",
    totalPrice: "56",
    totalPriceUSD: "56",
    fareClass: "fc",
    departureDate: "03-13-2021",
    returnDate: "2021/06/14",
    daysUntilFlight: "25",
    tripLength: "15",
    isFlexibleDates: null,
    discountCode: null,
    deeplinkSiteEdition: null,
    miles: null,
    timestamp: "2021-02-16",
    url: "https://www.testurl.com/",
    passenger: [
      {
        count: 2,
        adultCount: 2,
        youngAdultCount: null,
        childCount: null,
        infantInLapCount: null,
        infantInSeatCount: null,
      },
    ],
    page: [
      {
        siteEdition: "en-US",
        countryIsoCode: "us",
        languageIsoCode: "en",
      },
    ],
    lodging: [
      {
        cityCode: "FLL",
        name: "fll",
        startDate: "2021/03/13",
        endDate: "2021-03-20",
        roomCount: "2",
        tripLength: "7",
        starRating: "5",
      },
    ],
    pageTypeCode: '',
    pageTypeName: ''
  };

  console.log("OUTPUT FOR AIRLINE OBJECT", formatter.formatAirlines(eventObject));
formatter.formatAirlines(eventObject);