const airModulesDataLayer = {

    'event': 'viewable-impression',
    'module': 'em-booking-popup-abstract',
    'eventAction': 'viewable - impression',
    'actionLabel': null,
    'airlineIataCode': 'UL',
    'provider': 'SriLankanAirlines',
    'journeyType': 'ROUND_TRIP',
    'originAirportIataCode': 'CMB',
    'destinationAirportIataCode': 'SIN',
    'route': 'CMB>SIN',
    'currencyCode': 'LKR',
    'totalPrice': null,
    'totalPriceUSD': null,
    'fareClass': 'ECONOMY',
    'departureDate': '2021-03-13',
    'returnDate': '2021-06-14',
    'daysUntilFlight': 25,
    'tripLength': 93,
    'isFlexibleDates': null,
    'discountCode': null,
    'deeplinkSiteEdition': null,
    'miles': null,
    'timestamp': '2021-02-16T17:41:43.200Z',
    'url': 'https: //www.srilankan.com/en-lk/',
    'passenger': [{
        'count': 1,
        'adultCount': 1,
        'youngAdultCount': null,
        'childCount': null,
        'infantInLapCount': null,
        'infantInSeatCount': null
    }],
    'page': [{
        'siteEdition': 'en-LK',
        'countryIsoCode': 'LK',
        'languageIsoCode': 'en'
    }],
    'lodging': [{
        'cityCode': 'SIN',
        'name': 'Intercontinental',
        'startDate': '2021-03-13',
        'endDate': '2021-03-20',
        'roomCount': 2,
        'tripLength': 7,
        'starRating': 5
    }]
};

let mappedData =  Object.keys(airModulesDataLayer).map(key => ({key, value: airModulesDataLayer[key]}));

const formatJourney = () => {
 
  var journey = airModulesDataLayer.journeyType;
  if (journey.match(/(oneway|one-way|one_way|ow|one way)/gi)) {
    return 'ONE_WAY';
  } else if (
    journey.match(/(roundtrip|round-trip|round_trip|rt|round trip)/gi)
  ) {
    return 'ROUND_TRIP';
  } else {
    return 'N/A';
  }
  return journey;
};

//FIXME
const formatProvider = () =>{
    let airlineName = airModulesDataLayer.provider;
    let finalAirlineName = '';
    if (airlineName.match(/[a-z]+/gi)) {
        const airlineArray = airlineName ? airlineName.split(' ') : [];
        if (airlineArray && airlineArray.length > 0) {
            airlineArray.forEach(key => {
                finalAirlineName = airlineName.charAt(0).toUpperCase() + airlineName.substr(1).toLowerCase()
            });
        }
        return finalAirlineName;
    } else return 'N/A';
}   




console.log(formatProvider());
