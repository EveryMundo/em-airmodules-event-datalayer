

<p align="center">
  <a href="" rel="noopener">
 <img src="https://www.everymundo.com/wp-content/uploads/2021/11/EveryMundo-2022-black-2.jpg" alt="EM Logo"></a>
</p>

<h3 align="center">Tracking Package</h3>

<div align="center">


</div>


## 📝 Table of Contents

- [About](#about)
- [Notes](#notes)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Airlines](#airlines)
- [Hotels](#hotels)
- [Events](#events)
- [Built Using](#built_using)

## 🧐 About <a name = "about"></a>

The tracking package is used for formatting datalayer object values. This npm package transforms the event tracking object  as defined in the [emDataStandards](https://github.com/EveryMundo/emDataStandards/blob/master/dataLayer/airmodules.datalayer.js) using a formatting function. This function pushes the formatted result to the [dataLayer](https://support.google.com/tagmanager/answer/6164391?hl=en). 

## 📓  Notes <a name = "notes"></a>
### Required parameters:
* The following parameters are required for all events, viewable impressions, interaction events, fsi, and search initiation:
* The viewable-impression events will only collect the required parameters.

| List of required parameters |
| -------------- |
| event |
| tenantCode      	|
| tenantType      	|
| provider        	|
| eventAction     	|
| module          	|
| moduleId        	|
| tagName*         	|
| url             	|
| timestamp       	|
| siteEdition     	|
| countryIsoCode  	|
| languageIsoCode 	|

*_The variable is required if there is a name or tag associated with the module other than the module name. E.g. A module that only display miles and has been named "Miles"_

* The interaction events, such as select-departure-date, will only populate the relevant parameters to the event itself and what has already been filtered in the module. The fsi and search-initiation events must include every parameter available in the interaction.

### actionLabel parameter:
* The actionLabel parameter is a dynamic value that will be populated based on the user interaction and what was selected.

| actionLabel        	| sample value       	|
|-----------------------	|------------	|
|select-budget | 1000
| select-interest       	| snorkeling 	|
| select-destination    	| MIA        	|
| select-departure-date 	| 2023-04-01 	|

* Note that for select-destination and select-departure-date the values will also have to be included in the relevant event object parameters.

## 🏁 Getting Started <a name = "getting_started"></a>

Use [npm](https://www.npmjs.com/) to install the Tracking Package.

```bash
npm install @everymundo/airmodules-event-datalayer
```

### Usage
Import the function `formatter` into the project.
```js
import { formatter } from "@everymundo/airmodules-event-datalayer"
```

##  ✈️ Airlines <a name = "airlines"></a>

<details>
<summary>Expand here</summary>

-   The  [_event object_](#eventObjectAirline)  should be sent with all parameters listed in the object. The object should contain as many values as possible.
-   null values will be replaced with empty ' ' strings. It is ideal to pass values in the format below. Other acceptable input values can be seen in the  [table](#airlineValuesTable).
-   The  _event_  and  _eventAction_  parameter of the  [_event object_](#eventObjectAirline)  should have values that belong to the list of Event Actions. Please ensure that the passed value belongs to the [list of event actions](#eventActionsAirlines)
-  The package uses a function called `formatAirlines` to indicate that the event object should use airline specific fields.

#### <a name="eventObjectAirline"></a>Empty Event Object for Airlines
```js
const eventObject = {
  event: '',
  module: '',
  eventAction: '',
  actionLabel: '',
  airlineIataCode: '',
  provider: '',
  journeyType: '',
  originAirportIataCode: '',
  destinationAirportIataCode: '',
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
  passenger: [
    {
      count: 1,
      adultCount: 1,
      youngAdultCount: '',
      childCount: '',
      infantInLapCount: '',
      infantInSeatCount: ''
    }
  ],
  page: [
    {
      siteEdition: '',
      countryIsoCode: '',
      languageIsoCode: ''
    }
  ],
  lodging: [
    {
      cityCode: '',
      name: '',
      startDate: '',
      endDate: '',
      roomCount: 0,
      tripLength: 0,
      starRating: 0 
    }
  ],
  moduleId: '',
  tagName: '',
  pageTypeName: ''
}
```

#### Event Object with sample values:
<details>
<summary>Expand here</summary>

```js
const eventObject = {
  event: 'viewable_impression',
  module: 'em-booking-popup',
  eventAction: 'viewable_impression',
  actionLabel: '',
  airlineIataCode: 'UL',
  provider: 'SriLankanAirlines',
  journeyType: 'ONE_WAY',
  originAirportIataCode: 'CMB',
  destinationAirportIataCode: 'SIN',
  route: 'CMB>SIN',
  currencyCode: 'LKR',
  totalPrice: 5.21,
  totalPriceUSD: '',
  fareClass: 'ECONOMY',
  departureDate: '2021-03-13',
  returnDate: '2021-06-14',
  daysUntilFlight: 25,
  tripLength: 93,
  isFlexibleDates: '',
  discountCode: '',
  deeplinkSiteEdition: '',
  miles: '',
  timestamp: '2021-02-16T00:00:00.000Z',
  url: 'https: //www.srilankan.com/en-lk/',
  passenger: [
    {
      count: 1,
      adultCount: 1,
      youngAdultCount: '',
      childCount: '',
      infantInLapCount: '',
      infantInSeatCount: ''
    }
  ],
  page: [
    {
      siteEdition: 'en-LK',
      countryIsoCode: 'LK',
      languageIsoCode: 'en'
    }
  ],
  lodging: [
    {
      cityCode: 'SIN',
      name: 'Intercontinental',
      startDate: '2021-03-13',
      endDate: '2021-03-20',
      roomCount: 2,
      tripLength: 7,
      starRating: 5
    }
  ],
  moduleId: '',
  tagName: '',
  pageTypeName: 'CUSTOM_PAGE'
}

```
</details>

### Function Call
Use the following function(s) based on the tenant type (<i>vertical</i>) and pass in the event object as the parameter.
```js
{
  formatter.formatAirlines(eventObject);
}
```

-   This function checks whether the incoming object includes the required module and eventAction fields. If the object does not contain these fields, formatAirlines will add and initialize these with an empty string.
    
-   In the case that countryIsoCode, LanguageIsoCode, siteEdition or name are missing from their parent field, an empty value will be assigned to the respective key
    
-   Pushes to the [dataLayer](https://support.google.com/tagmanager/answer/6164391?hl=en)

### Tables

<h4 align="center"> Description of event object fields </h4>

|          emDataStandards field          |            Example           |                                            Definition                                           |
|:---------------------------------------:|:----------------------------:|:-----------------------------------------------------------------------------------------------:|
|                  event                  |           T_123456           |                                   Name of the event performed                                   |
|                  module                 |        em-booking-mask       |                                        Name of the module                                       |
|               eventAction               |      open_booking_popup      |                    Name of the event action used in Google Analytics Reports                    |
|               actionLabel               |           book-now           |                    Reporting dimension for additional information for events                    |
|             airlineIataCode             |              AA              |                                 IATA identifier for the airline                                 |
|                 provider                |       American Airlines      |                                       Name of the airline                                       |
|               journeyType               |            ONE_WAY           |                           Trip type (ROUND_TRIP, ONE_WAY, MULTI_CITY)                           |
|          originAirportIataCode          |              SFO             |                         IATA identifier for the departure/origin airport                        |
|        destinationAirportIataCode       |              JFK             |                       IATA identifier for the arrival/destination airport                       |
|                  route                  |            SFO>JFK           |                           Route of the trip from origin to destination                          |
|               currencyCode              |              USD             |                     The currency (in 3-letter ISO 4217 format) of the price.                    |
|                totalPrice               |            399.37            |        The total price for the  flight ticket, including applicable taxes, shipping, etc        |
|              totalPriceUsd              |            530.62            |     The total price for the flight ticket in USD, including applicable taxes, shipping, etc.    |
|                fareClass                |            ECONOMY           |                   Fare class type (ECONOMY, BUSINESS, PREMIUM_ECONOMY, FIRST)                   |
|              departureDate              |          2022-04-01          |                                        Date of departure                                        |
|                returnDate               |          2022-04-07          |                                          Date of return                                         |
|             daysUntilFlight             |              25              |                    Amount of days from the current date to the departureDate                    |
|                tripLength               |               5              |                                      Length of stay / trip                                      |
|             isFlexibleDates             |             true             |                   True/false value is flexible dates are selected for flights                   |
|              discountCode*              |            AFFBFAN           |                                     Discount promotion code                                     |
|           deeplinkSiteEdition           |             en-HK            |       Site edition combination of ISO codes for language and country provided in the URL.       |
|                  miles                  |             25790            |                                    Flight distaince in miles                                    |
|                timestamp                |   2021-02-16T17:41:43.200Z   |                                   timestamp of the event sent                                   |
|                   url                   | https://aa.com/en-us/flights |  Full url in lowercase (without query parameters to avoid collecting personal data by mistake)  |
| adultCount, youngAdultCount, childCount |               1              |                           Amount of adult/young adult/child passengers                          |
|             infantInLapCount            |               1              |                                Amount of infant passengers in lap                               |
|            infantInSeatCount            |               1              |                               Amount of infant passengers in seat                               |
|                  count                  |               3              |                           Amount of passengers for a specific category                          |
|               siteEdition               |             en-HK            | Site edition combination of ISO codes for language and country. The country reflects the market |
|              countryIsoCode             |              HK              |                       The country code (in 2 letter codes from ISO 3166-1)                      |
|             languageIsoCode             |              en              |                                   The language ISO 629-1 code                                   |
|                 cityCode                |              SIN             |           The city code for the selected property (in 2 letter codes from ISO 3166-1)           |
|                   name                  |       Intercontinental       |                                  Name of the selected property.                                 |
|                startDate                |          2021-03-13          |                                         Date of check-in                                        |
|                 endDate                 |          2021-03-20          |                                        Date of check-out                                        |
|                roomCount                |               2              |                                     Amount of rooms selected                                    |
|                tripLength               |               7              |                                       Length of stay/trip                                       |
|                starRating               |               5              |                               An official rating for the property                               |
|                 moduleId                |          XADPLIK7890         |                                  Unique ID used for the module                                  |
|                 tagName                 |                              |                Name given to Standard Fare Modules (SFM) / Front Components (FC)                |
|                 pageTypeName                 |   CUSTOM_PAGE, HOME_PAGE,..                           |                Name of the type of page template                 |
---

<a name="eventActionsAirlines"></a><h4 align="center"> List of Event Actions </h4>

| Event Action              |
|--------------------------|
| viewable_impression       |
| fsi                       |
| open_booking_popup        |
| select_origin             |
| select_destination        |
| select_departure_date     |
| select_return_date        |
| select_journey_type       |
| select_miles              |
| expand_form               |
| collapse_form             |
| sort                      |
| more_deals                |
| select_tab                |
| filter_airlines           |
| select_budget             |
| select_fare_class         |
| collapse_histogram        |
| select_month              |
| expand_flight             |
| reset_filter              |
| toggle_farelist           |
| select_map_destination    |
| selected_travel_interest  |
| select_interest           |
| click_out                 |
| read_article              |
| select_location           |
| search                    |
| select_status             |
| select_stop               |
| select_article            |
| select_resident_status    |
| no_fares_available        |
| insert_first_name         |
| insert_last_name          |
| select_origin             |
| insert_email              |
| insert_phone_number       |
| subscribe                 |
| enter-promo-code          |
---

<a name="airlineValuesTable"><h4 align="center"> Sample Values </h4>

|                                                    Field                                                   	|                                                       Accepted Values                                                       	|                            Formatted Result                           	|
|:----------------------------------------------------------------------------------------------------------:	|:---------------------------------------------------------------------------------------------------------------------------:	|:---------------------------------------------------------------------:	|
| journey                                                                                                    	| oneway, one-way, ow, one way, one_way                                                                                       	| ONE_WAY                                                               	|
|                                                                                                            	| roundtrip, round-trip, round_trip, rt, round trip                                                                           	| ROUND_TRIP                                                            	|
| fareClass                                                                                                  	| ec, economy, e                                                                                                              	| ECONOMY                                                               	|
|                                                                                                            	| business, bc, b, businessclass                                                                                              	| BUSINESS                                                              	|
|                                                                                                            	| first, fc, f, firstclass                                                                                                    	| FIRST                                                                 	|
| provider                                                                                                   	| String separated by spaces i.e 'sri lankan airlines'                                                                        	| SriLankanAirlines                                                     	|
| departureDate, returnDate, startDate, endDate                                                              	| Dates separated by spaces, slashes, or dashes i.e 2021/11/04, 2021 11 04, 2021-11-04 or '04 November 2021 5:13 EST'         	| 2021-11-04                                                            	|
| timestamp                                                                                                  	| Dates separated by spaces, slashes, or dashes i.e 2021/11/04, 2021 11 04, 2021-11-04 or '04 November 2021 5:13 EST'         	| 2021-11-04T10:13:00.000Z                                              	|
| url                                                                                                        	| URL string i.e 'https://www.srilankan.com/en-lk/'                                                                           	| https: //www.srilankan.com/en-lk/                                     	|
| fields with numeric values or null i.e totalPrice, totalPriceUSD, tripLength etc.                          	| integers, numeric strings, null i.e {"totalPrice": "25"}                                                                    	| {"totalPrice": 25} Note: Null values are converted to empty string '' 	|
| events                                                                                             	| String separated by spaces, dashes or camelCased. i.e 'viewable impression'                                                    	| 'viewable_impression'                                                    	|
| module                                                                                             	| String separated by spaces, dashes or camelCased. i.e 'em booking popup'                                                    	| 'em-booking-popup'                                                    	|
| eventAction                                                                                                	| String separated by spaces, dashes, or camelCased. i.e 'viewable impression'. Formatted automatically from given event value 	| 'viewable_impression'                                                 	|
| lodging (for vacation packages)                                                                            	| String i.e 'intercontinental'                                                                                               	| 'Intercontinental'                                                    	|
| siteEdition                                                                                                	| String separated by spaces, dashes, slashes or camelCased. i.e 'en-lk'                                                      	| 'en-LK'                                                               	|
| countryIsoCode                                                                                             	| String i.e 'lk'                                                                                                             	| 'LK'                                                                  	|
| languageIsoCode                                                                                            	| String i.e 'en'                                                                                                             	| 'en'                                                                  	|
| fields that contain string values i.e currencyCode, originAirportIataCode, destinationAirportIataCode etc. 	| String i.e 'mia'                                                                                                            	| 'MIA'                                                                 	|
|                 pageTypeName                 |   String i.e 'custom page'                           |                'CUSTOM_PAGE'              |
</details>

----

## 🏨 Hotels <a name = "hotels"></a>

<details>
<summary>Expand here</summary>

-   The [_event object_](#eventObjectHotel) should be sent with all parameters listed in the object. The object should contain as many values as possible.
-   null values will be replaced with empty ' ' strings. It is ideal to pass values in the format below. Other acceptable input values can be seen in the [table](#hotelValuesTable).
- The  _event_  and  _eventAction_  parameter of the  [_event object_](#eventObjectHotel)  should have values that belong to the list of Event Actions. Please ensure that the passed value belongs to the [list of event actions](#eventActionsHotels)
- The package uses a function called `formatHotels` to indicate that the event object should use hotel specific fields.

#### <a name="eventObjectHotel"></a>Empty Event Object for Hotels
```js
 const eventObject = {
  event: '',
  module: '',
  eventAction: '',
  actionLabel: '',
  tenantCode: '',
  tenantType: '',
  provider: '',
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
  guest: [
    {
      count: 0,
      adult: 0
    }
  ],
  room: [ 
    { 
      count: 0, 
      type: '' 
    } 
  ],
  page: [
    {
      siteEdition: '',
      countryIsoCode: '',
      languageIsoCode: ''
    }
  ],
  pageTypeName: ''
}

```

#### Event Object with sample values
<details>
<summary>Expand Here</summary>

```js
const eventObject = {
  event: 'viewable_impression',
  module: 'em-booking-popup-abstract',
  eventAction: 'viewable_impression',
  actionLabel: '',
  tenantCode: 'UL',
  tenantType: '',
  provider: 'Hyat',
  regionName: 'North America',
  countryCode: 'US',
  cityName: 'Miami',
  propertyCode: 105565,
  propertyName: 'N/a',
  currencyCode: 'USD',
  totalPrice: 900.55,
  totalPriceUSD: 900.55,
  startDate: '2022-04-01',
  endDate: '2022-04-07',
  daysUntilBooking: 25,
  tripLength: 4,
  roomAccesibility: true,
  timestamp: '2021-02-16T17:41:43.200Z',
  url: 'https:  //www.hyatt.com/en/miami',
  guest: [
    {
      count: 1,
      adult: 1
    }
  ],
  room: [ 
    { 
      count: 1, 
      type: '' 
    } 
  ],
  page: [
    {
      siteEdition: 'en-LK',
      countryIsoCode: 'LK',
      languageIsoCode: 'en'
    }
  ],
  pageTypeName: 'CUSTOM_PAGE'
}

```
</details>

---

### Function Call
Use the following function(s) based on the tenant type (<i>vertical</i>) and pass in the event object as the parameter.
```
{
  formatter.formatHotels(eventObject);
}
```

-   Checks whether the incoming object includes "module" and "eventAction". If the object does not contain these fields, formatHotels will add and initialize these with an empty string.
    
-   In the case that countryIsoCode, LanguageIsoCode, siteEdition or name are missing from their parent field, an empty value will be assigned to the respective key
    
-   Null values will be converted to empty string
    
-   Pushes to the [dataLayer](https://support.google.com/tagmanager/answer/6164391?hl=en)
- --

### Tables
<h4 align="center"> Page Type Codes </h4>
 
| Page Type Code 	| Page Type Name | Definition  	|
|--------------------	| ------------- |-------------	|
| HP                 	|HOME_PAGE | Homepage    	|
| CP                 	|CUSTOM_PAGE | Custom Page 	|
| CO                 	|COUNTRY | Country     	|
| CI                 		|CITY | City        	|
| PR                 	|PROPERTY | Property    	|


<h4 align="center"> Description of event object fields </h4>

|  emDataStandards field 	|              Example             	|                                               Definition                                               	|
|:----------------------:	|:--------------------------------:	|:------------------------------------------------------------------------------------------------------:	|
| emcid                  	| T-123456                         	| Unique identifier                                                                                      	|
| tenantCode             	| HDI                              	| Tenant Code                                                                                            	|
| tenantType             	| hotel                            	| Tenant Type (Hotel, Airline, Event)                                                                    	|
| provider               	| HolidayInn                       	| Tenant Name                                                                                            	|
| module                 	| open-booking-popup-abstract      	| Name of the event                                                                                      	|
| actionLabel            	| open-booking-popup               	| Name of the event action                                                                               	|
| regionName             	| North America                    	| Name of the region for the selected property (North America, South America, East Asia...)              	|
| countryCode            	| US                               	| The country code for the selected property (in 2 letter codes from ISO 3166-1)                         	|
| cityName               	| Miami                            	| Name of the city for the selected property (Miami, Orlando, Tampa...)                                  	|
| propertyCode           	| HYATT9015479                     	| Code of the selected property (Hotel code, event code...)                                              	|
| propertyName           	| HolidayInn-Miami                 	| Name of the selected property. e.g Name of the Hotel (Holiday Inn - Miami, Hyatt Regency Hong Kong...) 	|
| currencyCode           	| USD                              	| The currency (in 3-letter ISO 4217 format) of the price.                                               	|
| totalPrice             	| 399.37                           	| The total price for the reservation or ticket, including applicable taxes, shipping, etc               	|
| totalPriceUsd          	| 530.62                           	| The total price for the reservation or ticket in USD, including applicable taxes, shipping, etc.       	|
| startDate              	| 2022-04-01                       	| Date of check in                                                                                       	|
| endDate                	| 2022-04-07                       	| Date of check out                                                                                      	|
| daysUntilBooking       	| 25                               	| Amount of days from the current date to the startDate (Check-in date)                                  	|
| tripLength             	| 5                                	| Length of stay / trip                                                                                  	|
| roomAccesibility       	| false                            	| Room accessibility requirement                                                                         	|
| timestamp              	| 2021-02-16T17:41:43.200Z         	| timestamp of the event sent                                                                            	|
| url                    	| https://www.holidayinn.com/miami 	| Full url in lowercase (without query parameters to avoid collecting personal data by mistake)          	|
| adult                  	| 1                                	| Amount of adult guests                                                                                 	|
| child                  	| 1                                	| Amount of child guests                                                                                 	|
| count (in guest array) 	| 3                                	| Amount of guests for a specific category                                                               	|
| count (in room array)  	|                                  	| Amount of rooms selected                                                                               	|
| type                   	| Suite                            	| Room type                                                                                              	|
| pageTypeCode           	| CI                               	| Page Type Code: HP, CICO, FCI, TCI, CICI, COCI, COCO, FCO, TCO, EXT, CP, 404, SM, BS, FS, FA           	|
| siteEdition            	| en-HK                            	| Site edition combination of ISO codes for language and country. The country reflects the market        	|
| countryIsoCode         	| HK                               	| The country code (in 2 letter codes from ISO 3166-1)                                                   	|
| languageIsoCode        	| en                               	| The language ISO 629-1 code                                                                            	|
| tagName               	|                                  	| Name given to Standard Fare Modules (SFM) / Front Components (FC)                                                                                	|
| discountCode          	| AFFBFAN                          	| Discount promotion code                                                                                	|
|                 pageTypeName                 |   CUSTOM_PAGE                           |                Name of the type of page template              |

---

<a name="eventActionsHotels"></a><h4 align="center"> List of Event Actions </h4>

| Event Action              |
|--------------------------|
| viewable_impression       |
| search_initiation         |
| open_booking_popup        |
| more_deals                |
| select_origin             |
| select_trip_length        |
| sort                      |
| select_rating             |
| select_destination        |
| select_budget             |
| reset_filter              |
| select_night              |
| search_initiation         |
| select_property           |
| select_start_date         |
| select_end_date           |
| select_room_guest         |
| select_accessibility      |
| select_redemption         |
| select_stay_length        |
| select_offer              |
| no_fares_available        |
| insert_first_name         |
| insert_last_name          |
| select_origin             |
| insert_email              |
| insert_phone_number       |
| subscribe                 |
| enter-promo-code          |

---
<a name="hotelValuesTable"></a><h4 align="center"> Sample Values </h4>

|                                       Field                                       	|                                                       Accepted Values                                                       	|                                         Formatted Result                                         	|
|:---------------------------------------------------------------------------------:	|:---------------------------------------------------------------------------------------------------------------------------:	|:------------------------------------------------------------------------------------------------:	|
| regionName                                                                        	| northAmerica, north america, NORTH AMERICA, NorthAmerica                                                                    	| North America                                                                                    	|
| cityName                                                                          	| Lower case or upper case strings i.e ‘miami’                                                                                	| Miami                                                                                            	|
| provider                                                                          	| String separated by spaces i.e 'Hyatt Aspac'                                                                                	| HyattAspac                                                                                       	|
| departureDate, returnDate, startDate, endDate                                     	| Dates separated by spaces, slashes, or dashes i.e 2021/11/04, 2021 11 04, 2021-11-04 or '04 November 2021 5:13 EST'         	| 2022-08-04                                                                                       	|
| timestamp                                                                         	| Dates separated by spaces, slashes, or dashes i.e 2021/11/04, 2021 11 04, 2021-11-04 or '04 November 2021 5:13 EST'         	| 2022-08-04T10:13:00.000Z                                                                         	|
| url                                                                               	| URL string i.e 'https://www.hyatt.com/en/miami'                                                                             	| https:  //www.hyatt.com/en/miami                                                                 	|
| fields with numeric values or null i.e totalPrice, totalPriceUSD, tripLength etc. 	| integers, numeric strings, null i.e {"totalPrice": "25"}                                                                    	| {"totalPrice": 25} Note: Null values are converted to empty string ''                            	|
| events                                                                                             	| String separated by spaces, dashes or camelCased. i.e 'viewable impression'                                                    	| 'viewable_impression'                                                    	|
| module                                                                    	| String separated by spaces, dashes or camelCased. i.e 'em booking popup'                                                    	| 'em-booking-popup'                                                                               	|
| eventAction                                                                       	| String separated by spaces, dashes or camelCased. i.e 'viewable impression'. Formatted automatically from given event value 	| 'viewable_impression'                                                                            	|
| siteEdition                                                                       	| String separated by spaces, dashes, slashes or camelCased. i.e 'en-lk'                                                      	| 'en-LK'                                                                                          	|
| countryIsoCode                                                                    	| String i.e 'lk'                                                                                                             	| 'LK'                                                                                             	|
| languageIsoCode                                                                   	| String i.e 'en'                                                                                                             	| 'en'                                                                                             	|
| fields that contain string values i.e currencyCode, countryCode, tenantCode etc.  	| String i.e 'mia'                                                                                                            	| 'MIA'                                                                                            	|
| totalPriceUsd                                                                     	| 530.62                                                                                                                      	| The total price for the reservation or ticket in USD, including applicable taxes, shipping, etc. 	|
| startDate                                                                         	| 2022-04-01                                                                                                                  	| Date of check in                                                                                 	|
| endDate                                                                           	| 2022-04-07                                                                                                                  	| Date of check out                                                                                	|
| daysUntilBooking                                                                  	| 25                                                                                                                          	| Amount of days from the current date to the startDate (Check-in date)                            	|
| tripLength                                                                        	| 5                                                                                                                           	| Length of stay / trip                                                                            	|
| roomAccesibility                                                                  	| false                                                                                                                       	| Room accessibility requirement                                                                   	|
| timestamp                                                                         	| 2021-02-16T17:41:43.200Z                                                                                                    	| timestamp of the event sent                                                                      	|
| url                                                                               	| https://www.holidayinn.com/miami                                                                                            	| Full url in lowercase (without query parameters to avoid collecting personal data by mistake)    	|
| adult                                                                             	| 1                                                                                                                           	| Amount of adult guests                                                                           	|
| child                                                                             	| 1                                                                                                                           	| Amount of child guests                                                                           	|
| count (in guest array)                                                            	| 3                                                                                                                           	| Amount of guests for a specific category                                                         	|
| count (in room array)                                                             	|                                                                                                                             	| Amount of rooms selected                                                                         	|
| type                                                                              	| Suite                                                                                                                       	| Room type                                                                                        	|
| pageTypeCode                                                                      	| CI                                                                                                                          	| Page Type Code: HP, CICO, FCI, TCI, CICI, COCI, COCO, FCO, TCO, EXT, CP, 404, SM, BS, FS, FA     	|
| siteEdition                                                                       	| en-HK                                                                                                                       	| Site edition combination of ISO codes for language and country. The country reflects the market  	|
| countryIsoCode                                                                    	| HK                                                                                                                          	| The country code (in 2 letter codes from ISO 3166-1)                                             	|
| languageIsoCode                                                                   	| en                                                                                                                          	| The language ISO 629-1 code                                                                      	|
| tagName*                                                                          	|                                                                                                                             	| Name given to Standard Fare Modules (SFM) / Front Components (FC)                                                                           	|
| discountCode                                                                     	| AFFBFAN                                                                                                                     	| Discount promotion code                                                                          	|
|                 pageTypeName                 |  string i.e 'custom page'                           |                CUSTOM_PAGE            |
*_The variable is required if there is a name or tag associated with the module other than the module name. E.g. A module that only display miles and has been named "Miles"_
</details>

---


## 🎡 Events <a name = "events"></a>
<details>
<summary>Expand here</summary>

-   The [_event object_](#eventObjectEvents) should be sent with all parameters listed in the object. The object should contain as many values as possible.
-   null values will be replaced with empty ' ' strings. It is ideal to pass values in the format below. Other acceptable input values can be seen in the [table](#eventValuesTable).
- The  _event_  and  _eventAction_  parameter of the  [_event object_](#eventObjectEvents)  should have values that belong to the list of Event Actions. Please ensure that the passed value belongs to the [list of event actions](#eventActionsEvents)
- The package uses a function called `formatEvents` to indicate that the event object should use hotel specific fields.

 #### <a name="eventObjectEvents"></a> Empty Event Object for Events (Tenant Type)
```js

  const eventObject = {
    'event': '',
    'module': '',
    'eventAction': '',
    'actionLabel': null,
    'tenantCode': '',
    'provider': '',
    'eventName': '',
    'eventLocation': '',
    'eventSession': '',
    'eventExperienceCategory': '',
    'eventExperience': '',
    'eventNameFilter': '',
    'eventLocationFilter': '',
    'eventSessionFilter': '',
    'eventExperienceCategoryFilter': '',
    'eventExperienceFilter': '',
    'currencyCode': '',
    'totalPrice': null,
    'totalPriceUSD': null,
    'fareClass': '',
    'startDate': '',
    'endDate': '',
    'timestamp': '',
    'url': '',
    'passenger': [{
        'count': 1,
        'adultCount': 1,
        'youngAdultCount': null,
        'childCount': null
    }],
    'page': [{
        'siteEdition': '',
        'countryIsoCode': '',
        'languageIsoCode': ''
    }],
    'pageTypeName': ''
}

```

#### Event Object with sample values:
<details>
<summary>Expand here</summary>

```js

  const eventObject = {
    'event': 'search_initiation',
    'module': 'em-booking-popup-abstract',
    'eventAction': 'search_initiation',
    'actionLabel': null,
    'tenantCode': 'ETA',
    'provider': 'Tennis Australia',
    'eventName': 'Semifinal',
    'eventLocation': 'Laver Arena',
    'eventSession': 'Night',
    'eventExperienceCategory': 'Ticket Only',
    'eventExperience': 'The Lounge',
    'eventNameFilter': 'Semifinal',
    'eventLocationFilter': 'Laver Arena',
    'eventSessionFilter': 'Night',
    'eventExperienceCategoryFilter': 'Ticket Only',
    'eventExperienceFilter': 'MULTIPLE',
    'currencyCode': 'LKR',
    'totalPrice': null,
    'totalPriceUSD': null,
    'startDate': '2021-03-13',
    'endDate': '2021-03-14',
    'timestamp': '2021-02-16T17:41:43.200Z',
    'url': 'https: //www.srilankan.com/en-lk/',
    'passenger': [{
        'count': 1,
        'adultCount': 1,
        'youngAdultCount': null,
        'childCount': null
    }],
    'page': [{
        'siteEdition': 'en-LK',
        'countryIsoCode': 'LK',
        'languageIsoCode': 'en'
    }],
    'pageTypeName': 'CUSTOM_PAGE'
}
```
</details>

---
### Function Call
Use the following function(s) based on the tenant type (<i>vertical</i>) and pass in the event object as the parameter.
``` 
{
  formatter.formatEvents(eventObject);
}
```

-   Checks whether the incoming object includes "module" and "eventAction". If the object does not contain these fields, formatEvents will add and initialize these with an empty string.
    
-   In the case that countryIsoCode, LanguageIsoCode, siteEdition or name are missing from their parent field, an empty value will be assigned to the respective key
    
-   Null values will be converted to empty string
    
-   If eventExperience contains multiple values (e.g The Lounge, Player Pod), the values will be formatted to `MULTIPLE`.
    
-   Pushes to the [dataLayer](https://support.google.com/tagmanager/answer/6164391?hl=en)
----

### Tables
<h4 align="center"> Description of event object fields </h4>

| emDataStandards field                   	| Example                           	| Definition                                                                                            	|
|-----------------------------------------	|-----------------------------------	|-------------------------------------------------------------------------------------------------------	|
| tenantCode                              	| HDI                               	| Tenant Code                                                                                           	|
| tenantType                              	| hotel                             	| Tenant Type (Hotel, Airline, Event)                                                                   	|
| provider                                	| Tennis Australia                  	| Tenant Name                                                                                           	|
| event                                   	| search_initiation                 	| Name of the event                                                                                     	|
| module                                  	| open-booking-popup-abstract       	| Name of the interacted module                                                                         	|
| eventAction                             	| search_initiation                 	| Name of the event action used in Google Analytics Reports. It is the same value as the “event” field. 	|
| actionLabel                             	| Book Now                          	| Name of the event action                                                                              	|
| eventName                               	| Semifinal                         	| Name of the Event                                                                                     	|
| eventLocation                           	| Laver Arena                       	| Location for the selected Event                                                                       	|
| eventSession                            	| Night                             	| Time of the Event session                                                                             	|
| eventExperienceCategory                 	| Ticket Only                       	| Name of the selected experience category                                                              	|
| eventNameFilter                         	| Semifinal                         	| Name of the filtered Event                                                                            	|
| eventLocationFilter                     	| Laver Arena                       	| Name of the filtered Event location                                                                   	|
| eventSessionFilter                      	| Night                             	| Name of the filtered session                                                                          	|
| eventExperienceCategoryFilter           	| Ticket Only                       	| Name of the filtered experience category                                                              	|
| eventExperienceFilter                   	| MULTIPLE                          	| Types of Event experiences selected                                                                   	|
| currencyCode                            	| USD                               	| The currency (in 3-letter ISO 4217 format) of the price.                                              	|
| totalPrice                              	| 399.37                            	| The total price for the reservation or ticket, including applicable taxes, shipping, etc              	|
| totalPriceUsd                           	| 530.62                            	| The total price for the reservation or ticket in USD, including applicable taxes, shipping, etc.      	|
| startDate                               	| 2022-04-01                        	| Date of check in                                                                                      	|
| endDate                                 	| 2022-04-07                        	| Date of check out                                                                                     	|
| timestamp                               	| 2021-02-16T17:41:43.200Z          	| timestamp of the event sent                                                                           	|
| url                                     	| https: //www.srilankan.com/en-lk/ 	| Full url in lowercase (without query parameters to avoid collecting personal data by mistake)         	|
| adultCount, youngAdultCount, childCount 	| 1                                 	| Amount of adult/young adult/child passengers                                                          	|
| count                                   	| 3                                 	| Amount of guests for a specific category                                                              	|
| siteEdition                             	| en-HK                             	| Site edition combination of ISO codes for language and country. The country reflects the market       	|
| countryIsoCode                          	| HK                                	| The country code (in 2 letter codes from ISO 3166-1)                                                  	|
| languageIsoCode                         	| en                                	| The language ISO 629-1 code                                                                           	|
| tagName*                                	|                                   	| Name given by Standard Fare Modules or Front Components.                                              	|
| discountCode                           	| AFFBFAN                           	| Discount promotion code                                                                               	|
|                 pageTypeName                 |   CUSTOM_PAGE                           |                Name of the type of page template              |
*_The variable is required if there is a name or tag associated with the module other than the module name. E.g. A module that only display miles and has been named "Miles"_

---

<a name="eventActionsEvents"></a><h4 align="center"> List of Event Actions </h4>

| Event Action         |
|---------------------|
| viewable_impression  |
| search_initiation    |
| open_booking_popup   |
| select_date          |
| select_session       |
| select_category      |
| select_experience    |
| select_location      |
| select_budget        |
| sort                 |
| reset_filter         |
| no_fares_available   |
| insert_first_name    |
| insert_last_name     |
| select_origin        |
| insert_email         |
| insert_phone_number  |
| subscribe            |
| enter-promo-code     |


---

<a name="eventValuesTable"></a><h4 align="center"> Sample Values </h4>
- for Events, formatEvents will format additional values in eventExperience (e.g The Lounge, Player Pod) to  `MULTIPLE`.

| Field                                                                                                                                                                     	| Accepted Values                                                                                                             	| Formatted Result                                                                                 	|
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-----------------------------------------------------------------------------------------------------------------------------	|--------------------------------------------------------------------------------------------------	|
| eventLocation, eventLocationFilter, eventExperience, eventExperienceCategory, eventExperienceCategoryFilter, eventName, eventNameFilter, eventSession, eventSessionFilter 	| lowercase values, uppercase values, spaced values.  i.e ‘laver arena’, ‘LAVER ARENA’, ‘laver Arena', 'LAVER arena’          	| Laver Arena                                                                                      	|
| eventExperienceFilter                                                                                                                                                     	| case-insensitive strings, or values separated by commas.  i.e ‘multiple’, ‘The Lounge, player pod’                          	| MULTIPLE                                                                                         	|
| provider                                                                                                                                                                  	| String separated by spaces i.e 'Tennis Australia'                                                                           	| Tennis Australia                                                                                 	|
| departureDate, returnDate, startDate, endDate                                                                                                                             	| Dates separated by spaces, slashes, or dashes i.e 2021/11/04, 2021 11 04, 2021-11-04 or '04 November 2021 5:13 EST'         	| 2022-08-04                                                                                       	|
| timestamp                                                                                                                                                                 	| Dates separated by spaces, slashes, or dashes i.e 2021/11/04, 2021 11 04, 2021-11-04 or '04 November 2021 5:13 EST'         	| 2022-08-04T10:13:00.000Z                                                                         	|
| url                                                                                                                                                                       	| URL string i.e 'https://www.hyatt.com/en/miami'                                                                             	| https:  //www.hyatt.com/en/miami                                                                 	|
| fields with numeric values or null i.e totalPrice, totalPriceUSD, tripLength etc.                                                                                         	| integers, numeric strings, null i.e {"totalPrice": "25"}                                                                    	| {"totalPrice": 25} Note: Null values are converted to empty string ''                            	|
| events                                                                                             	| String separated by spaces, dashes or camelCased. i.e 'viewable impression'                                                    	| 'viewable_impression'                                                    	|
| module                                                                                                                                                            	| String separated by spaces, dashes or camelCased. i.e 'em booking popup'                                                    	| 'em-booking-popup'                                                                               	|
| eventAction                                                                                                                                                               	| String separated by spaces, dashes or camelCased. i.e 'viewable impression'. Formatted automatically from given event value 	| 'viewable_impression'                                                                            	|
| siteEdition                                                                                                                                                               	| String separated by spaces, dashes, slashes or camelCased. i.e 'en-lk'                                                      	| 'en-LK'                                                                                          	|
| countryIsoCode                                                                                                                                                            	| String i.e 'lk'                                                                                                             	| 'LK'                                                                                             	|
| languageIsoCode                                                                                                                                                           	| String i.e 'en'                                                                                                             	| 'en'                                                                                             	|
| fields that contain string values i.e currencyCode, countryCode, tenantCode etc.                                                                                          	| String i.e 'mia'                                                                                                            	| 'MIA'                                                                                            	|
| eventSessionFilter                                                                                                                                                        	| Night                                                                                                                       	| Name of the filtered session                                                                     	|
| eventExperienceCategoryFilter                                                                                                                                             	| Ticket Only                                                                                                                 	| Name of the filtered experience category                                                         	|
| eventExperienceFilter                                                                                                                                                     	| MULTIPLE                                                                                                                    	| Types of Event experiences selected                                                              	|
| currencyCode                                                                                                                                                              	| USD                                                                                                                         	| The currency (in 3-letter ISO 4217 format) of the price.                                         	|
| totalPrice                                                                                                                                                                	| 399.37                                                                                                                      	| The total price for the reservation or ticket, including applicable taxes, shipping, etc         	|
| totalPriceUsd                                                                                                                                                             	| 530.62                                                                                                                      	| The total price for the reservation or ticket in USD, including applicable taxes, shipping, etc. 	|
| startDate                                                                                                                                                                 	| 2022-04-01                                                                                                                  	| Date of check in                                                                                 	|
| endDate                                                                                                                                                                   	| 2022-04-07                                                                                                                  	| Date of check out                                                                                	|
| timestamp                                                                                                                                                                 	| 2021-02-16T17:41:43.200Z                                                                                                    	| timestamp of the event sent                                                                      	|
| url                                                                                                                                                                       	| https: //www.srilankan.com/en-lk/                                                                                           	| Full url in lowercase (without query parameters to avoid collecting personal data by mistake)    	|
| adultCount, youngAdultCount, childCount                                                                                                                                   	| 1                                                                                                                           	| Amount of adult/young adult/child passengers                                                     	|
| count                                                                                                                                                                     	| 3                                                                                                                           	| Amount of guests for a specific category                                                         	|
| siteEdition                                                                                                                                                               	| en-HK                                                                                                                       	| Site edition combination of ISO codes for language and country. The country reflects the market  	|
| countryIsoCode                                                                                                                                                            	| HK                                                                                                                          	| The country code (in 2 letter codes from ISO 3166-1)                                             	|
| languageIsoCode                                                                                                                                                           	| en                                                                                                                          	| The language ISO 629-1 code                                                                      	|
| tagName*                                                                                                                                                                  	|                                                                                                                             	| Name given by Standard Fare Modules or Front Components.                                         	|
| discountCode                                                                                                                                                             	| AFFBFAN                                                                                                                     	| Discount promotion code                                                                          	|
|                 pageTypeName                 |   String i.e 'custom page'                           |                CUSTOM_PAGE              |

*_The variable is required if there is a name or tag associated with the module other than the module name. E.g. A module that only display miles and has been named "Miles"_
</details>

---



## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
