const baseAirlineObject = {
  event: '',
  module: '',
  eventAction: '',
  actionLabel: '',
  airlineIataCode: '',
  journeyType: '',
  originAirportIataCode: '',
  originCountryCode: '',
  destinationCountryCode: '',
  destinationAirportIataCode: '',
  flightType: '',
  route: '',
  currencyCode: '',
  totalPrice: 0,
  totalPriceUSD: '',
  fareClass: '',
  departureDate: '',
  returnDate: '',
  daysUntilFlight: 0,
  tripLength: 0,
  isFlexibleDates: '',
  discountCode: '',
  deeplinkSiteEdition: '',
  miles: '',
  timestamp: '',
  url: '',
  passenger: {
    count: 1,
    adultCount: 1,
    youngAdultCount: '',
    childCount: '',
    infantInLapCount: '',
    infantInSeatCount: '',
    overseasFilipinoWorker: 0
  },
  page: {
    siteEdition: '',
    countryIsoCode: '',
    languageIsoCode: '',
    typeName: ''
  },
  lodging: {
    cityCode: '',
    name: '',
    startDate: '',
    endDate: '',
    roomCount: 0,
    tripLength: 0,
    starRating: 0 
  },
  carRentals: {
    provider: '',
    brand: '',
    model: ''
  },
  moduleId: '',
  tagName: '' 
}

const baseHospitalityObject = {
  event: '',
  module: '',
  eventAction: '',
  actionLabel: '',
  tenantCode: '',
  tenantType: '',
  regionName: '',
  countryCode: '',
  cityName: '',
  propertyCode: 0,
  propertyName: '',
  currencyCode: '',
  totalPrice: 0,
  totalPriceUSD: 0,
  startDate: '',
  endDate: '',
  daysUntilBooking: 0,
  tripLength: 0,
  roomAccesibility: true,
  timestamp: '',
  url: '',
  guest: {
    count: 0,
    adult: 0
  },
  room: { 
    count: 0, 
    type: '' 
  },
  page: {
    siteEdition: '',
    countryIsoCode: '',
    languageIsoCode: '',
    typeName: ''
  }
}

const baseEventObject = {
  event: '',
  module: '',
  eventAction: '',
  actionLabel: '',
  tenantCode: '',
  tenantType: '',
  regionName: '',
  countryCode: '',
  cityName: '',
  propertyCode: 0,
  propertyName: '',
  currencyCode: '',
  totalPrice: 0,
  totalPriceUSD: 0,
  startDate: '',
  endDate: '',
  daysUntilBooking: 0,
  tripLength: 0,
  roomAccesibility: true,
  timestamp: '',
  url: '',
  guest: {
    count: 0,
    adult: 0
  },
  room: { 
    count: 0, 
    type: '' 
  },
  page: {
    siteEdition: '',
    countryIsoCode: '',
    languageIsoCode: '',
    typeName: ''
  }
}

export { baseAirlineObject, baseEventObject, baseHospitalityObject }
