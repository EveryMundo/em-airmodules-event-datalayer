import formatter from "../src/index.js"

const eventObject = {
    event: 'search-initiation',
    module: 'em-booking-popup-abstract',
    eventAction: 'search-initiation',
    actionLabel: null,
    tenantCode: 'ETA',
    provider: 'tennis australia',
    eventName: 'Semifinal',
    eventLocation: 'Laver Arena',
    eventSession: 'Night',
    eventExperienceCategory: 'Ticket Only',
    eventExperience: 'The Lounge, Player Pod',
    currencyCode: 'LKR',
    totalPrice: null,
    totalPriceUSD: null,
    fareClass: 'ECONOMY',
    startDate: '2021-03-13',
    endDate: '2021-03-14',
    timestamp: '2021-02-16T17:41:43.200Z',
    url: 'https: //www.srilankan.com/en-lk/',
    passenger: [{
        count: 1,
        adultCount: 1,
        youngAdultCount: null,
        childCount: null
    }],
    page: [{
        siteEdition: 'en-LK',
        countryIsoCode: 'LK',
        languageIsoCode: 'en'
    }],
    pageTypeCode: '',
    pageTypeName: ''
};

console.log("OUTPUT FOR EVENT OBJECT", formatter.formatEvents(eventObject));
formatter.formatEvents(eventObject);