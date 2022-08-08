<p align="center">
  <a href="" rel="noopener">
 <img src="https://www.everymundo.com/wp-content/uploads/2018/08/Everymundo_Logo_NO-BACKGROUND-1-e1533159346674.png" alt="EM Logo"></a>
</p>

<h3 align="center">Tracking Package</h3>

<div align="center">


</div>

---

<p align="center"> The tracking package is used for formatting datalayer object values. 
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Notes](#notes)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)

## 🧐 About <a name = "about"></a>

npm package which exports a formatting function that transforms the event tracking object into a dataLayer format as defined in the [emDataStandards](https://github.com/EveryMundo/emDataStandards/blob/master/dataLayer/airmodules.datalayer.js). This function then pushes to the [dataLayer](https://support.google.com/tagmanager/answer/6164391?hl=en). 

## 📓  Notes <a name = "notes"></a>
* The [_event object_](#eventObject) should follow the [emDataStandards](https://github.com/EveryMundo/emDataStandards)
* The [_event object_](#eventObject) should be sent with all parameters listed in the object. The minimum parameters that <b>require</b> values are listed in the table below. All other parameters may contain empty `''` values. 
 
##### Table for parameters that require values (Hotels)
| emDataStandards field 	| Event Label Parameter 	| Example                          	|
|-----------------------	|-----------------------	|----------------------------------	|
| emcid                 	| emcid                 	| T-123456                         	|
| tenantCode            	| tc                    	| HDI                              	|
| tenantType            	| tt                    	| hotel                            	|
| provider              	| p                     	| HolidayInn                       	|
| module                	| module                	| open-booking-popup-abstract      	|
| actionLabel           	| l                     	| open-booking-popup               	|
| regionName            	| rn                    	| North America                    	|
| countryCode           	|                       	| US                               	|
| cityName              	| cn                    	| Miami                            	|
| propertyCode          	| pc                    	| HYATT9015479                     	|
| propertyName          	| pn                    	| HolidayInn-Miami                 	|
| currencyCode          	| c                     	| USD                              	|
| totalPrice            	| tp                    	| 399.37                           	|
| totalPriceUsd         	| tpu                   	| 530.62                           	|
| startDate             	|                       	| 2022-04-01                       	|
| endDate               	|                       	| 2022-04-07                       	|
| daysUntilBooking      	|                       	| 25                               	|
| tripLength            	| tl                    	| 5                                	|
| roomAccesibility      	| ra                    	| false                            	|
| timestamp             	|                       	| 2021-02-16T17:41:43.200Z         	|
| url                   	| url                   	| https://www.holidayinn.com/miami 	|
| passengerCount        	| pc                    	| 1                                	|
| adultCount            	| ad                    	| 1                                	|
| youngAdultCount       	|                       	| 2                                	|
| childCount            	| cc                    	| 2                                	|
| infantInLapCount      	|                       	| 1                                	|
| infantInSeatCount     	|                       	| 1                                	|
| pageTypeCode          	| ptc                   	| CI                               	|
| siteEdition           	| se                    	| en-HK                            	|
| countryIsoCode        	|                       	| HK                               	|
| languageIsoCode       	|                       	| en                               	|
| tagName*              	|                       	|                                  	|
| discountCode*         	|                       	|                                  	|


*currently unavailable in the dataLayer
##### Table for parameters that require values (Airlines)

| emDataStandards Field 	| Event Label Parameter 	| Example                                                 |
|-----------------------	|-----------------------	|-------------------------------------------------------	|
| provider              	| p                     	| AmericanAirlines                                      	|
| url                   	| url                   	| https://aa.com/en-us/flights                           	|
| deviceCategory        	| dct                   	| DESKTOP                                                	|
| siteEdition           	| se                    	| en-US                                                 	|
| pageTypeCode          	| ptc                   	| HP                                                 	    |
| airlineIataCode       	| aic                   	| AA                                                    	|
| emcid            	      | emcid                 	| T-HgP91dNuv   


*   The _event_ and _eventAction_ parameter of the [_event object_](#eventObject) should have values that belong to the list. Please ensure that the passed value belongs to this list: 
<table> <tr> <td> Customer Type </td> <td> Event Actions </td>
</tr>
<tr>
<td>
Events
</td>
<td>

<details> 
<summary> Click to expand list  </summary>

 - viewable-impression
 - search-initiation
 - select-location
 - select-date
 - select-experience
 - change-budget
 - reset-filter
 - sort

</details>

</td>
</tr>
<tr>
<td> Flights </td>
<td>

<details> 
<summary> Click to expand list  </summary>

 - viewable-impression
 - fsi
 - change-origin
 - change-destination
 - change-departure-date
 - change-return-date
 - change-journey-type
 - change-miles
 - expand-form
 - collapse-form
 - sort
 - more-deals
 - open-booking-popup
 - select-tab
 - filter-airlines
 - change-budget
 - change-fare-class
 - collapse-histogram
 - select-month
 - expand-flight
 - reset-filter
 - toggle-farelist
 - expand-map
 - select-map-destination
 - selected-travel-interest
 - zoom
 - select-interest
 - click-out
 - read-article
 - change-month
 - select-location
 - change-location
 - search
 - change-status
 - select-stop
 - select-article
 </details>

</td>
</tr>
</tr>

<tr>
<td> Hotels </td>
<td>

<details> 
<summary> Click to expand list  </summary>

 - viewable-impression
 - open-booking-popup
 - more-deals
 - change-origin
 - change-trip-length
 - sort
 - change-rating
 - change-destination
 - change-departure-date
 - change-return-date
 - change-budget
 - reset-filter
 - select-night
 - search-initiation
 - select-property
 - select-start-date
 - select-end-date
 - select-room-guest
 - select-accesibility
 - select-redemption
 - select-stay-length
 - select-offer
  
 </details>

</td>
</tr>
</tr>
</table>

## 🏁 Getting Started <a name = "getting_started"></a>

Use [npm](https://www.npmjs.com/) to install the Tracking Package.

```bash
npm install @everymundo/airmodules-event-datalayer
```

### Usage

```js
import { formatter } from "@everymundo/airmodules-event-datalayer";
```

### Function call

#### For Airlines:

```js
{
  formatter.formatAirlines(eventObject);
}
```

#### For Hotels:

```js
{
  formatter.formatHotels(eventObject);
}
```

---
<i>This section describes the formatter function in detail. Samples can be found below.  </i>

#### Sample usage can be found in [sample.js](https://github.com/EveryMundo/em-airmodules-event-datalayer/blob/main/sample.js) on Github

#### For Event customers, view tracking parameters here:
<details>
<summary> Click to expand table  </summary>

| Event Label Field | Event Label Parameter | emDataStandards Field  |
|------------------|--------------|-----------------------|
| label (Optional) | l            | actionLabel           |
| provider         | p            | provider              |
| url              | url          | url                   |
| deviceCategory   | dct          | GA4 Default Value     |
| siteEdition      | se           | page.siteEdition      |
| pageTypeCode     | ptc          | EM.dataLayer.typeCode |
| tenantCode       | tnc          | tenantCode            |
| eventName        | en           | eventName             |
| eventLocation    | el           | eventLocation         |
| eventDate        | ed           | eventDate             |
| experience       | ex           | experience            |
| ticketCount      | tc           | ticketCount           |
| totalPrice       | tp           | totalPrice            |
| currencyCode     | c            | currencyCode          |
| taxAmount        | ta           | taxAmount             |
| totalPriceUSD    | tpu          | totalPriceUSD         |
| emcid      | emcid        | emcid (Cookie)        |

</details>

</br>

<b> Create an object: </b><a name = "eventObject"></a>
</br>
<i> Note: null values will be replaced with empty ' ' strings. It is ideal to pass values in the format below. Other acceptable input values can be seen in the [table](#table).</i>

<b>Event Object for Hotels:</b>
```js

  const eventObject = {
  event: 'viewable-impression',
  module: 'em-booking-popup-abstract',
  eventAction: 'viewable-impression',
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
      adultCount: 1,
      youngAdultCount: '',
      childCount: '',
      infantInLapCount: '',
      infantInSeatCount: ''
    }
  ],
  room: [ 
    { 
      total: 1, 
      type: '' 
    } 
  ],
  page: [
    {
      siteEdition: 'en-LK',
      countryIsoCode: 'LK',
      languageIsoCode: 'en'
    }
  ]
}

```

<b>Event Object for Airlines & Vacation packages: </b>
```js

  const eventObject = {
  event: 'viewable-impression',
  module: 'em-booking-popup',
  eventAction: 'viewable-impression',
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
  tagName: ''
}

```



#### formatAirlines function: 
- Checks whether the incoming object includes "module" and "eventAction". If the object does not contain these fields, formatAirlines will add and initialize these with an empty string.
- In the case that countryIsoCode, LanguageIsoCode, siteEdition or name are missing from their parent field, an empty value will be assigned to the respective key
- [Pushes to the dataLayer](#dataLayer)

#### formatHotels function: 
- Checks whether the incoming object includes "module" and "eventAction". If the object does not contain these fields, formatHotels will add and initialize these with an empty string.
- In the case that countryIsoCode, LanguageIsoCode, siteEdition or name are missing from their parent field, an empty value will be assigned to the respective key
- Null values will be converted to empty string
- [Pushes to the dataLayer](#dataLayer)
<a name = "table"></a>

| Field                                                                                                      	| Accepted Values                                                                                                             	| Formatted Result                                                                        	|
|------------------------------------------------------------------------------------------------------------	|-----------------------------------------------------------------------------------------------------------------------------	|-----------------------------------------------------------------------------------------	|
| journey                                                                                                    	| oneway, one-way, ow, one way, one_way                                                                                       	| ONE_WAY                                                                                 	|
|                                                                                                            	| roundtrip, round-trip, round_trip, rt, round trip                                                                           	| ROUND_TRIP                                                                              	|
| fareClass                                                                                                  	| ec, economy, e                                                                                                              	| ECONOMY                                                                                 	|
|                                                                                                            	| business, bc, b, businessclass                                                                                              	| BUSINESS                                                                                	|
|                                                                                                            	| first, fc, f, firstclass                                                                                                    	| FIRST                                                                                   	|
| provider                                                                                                   	| String separated by <b>spaces</b> i.e 'sri lankan airlines'                                                                 	| SriLankanAirlines                                                                       	|
| departureDate, returnDate, startDate, endDate                                                              	| Dates separated by spaces, slashes, or dashes i.e 2021/11/04, 2021 11 04, 2021-11-04 or  '04 November 2021 5:13 EST'        	| 2021-11-04                                                                              	|
| timestamp                                                                                                  	| Dates separated by spaces, slashes, or dashes i.e 2021/11/04, 2021 11 04, 2021-11-04 or '04 November 2021 5:13 EST'         	| 2021-11-04T10:13:00.000Z                                                                	|
| url                                                                                                        	| URL string i.e 'https://www.srilankan.com/en-lk/'                                                                           	| https: //www.srilankan.com/en-lk/                                                       	|
| fields with numeric values or null i.e totalPrice, totalPriceUSD, tripLength etc.                          	| integers, numeric strings, null i.e ``` {"totalPrice": "25"} ```                                                            	| ``` {"totalPrice": 25} ``` <b>Note: </b> Null values are converted to empty string `''` 	|
| events, module                                                                                             	| String separated by spaces, dashes or camelCased. i.e 'em booking popup'                                                    	| 'em-booking-popup'                                                                      	|
| eventAction                                                                                                	| String separated by spaces, dashes or camelCased. i.e 'viewable impression'. Formatted automatically from given event value 	| 'viewable-impression'                                                                   	|
| lodging      (for vacation packages)                                                                                              	| String i.e 'intercontinental'                                                                                               	| 'Intercontinental'                                                                      	|
| siteEdition                                                                                                	| String separated by spaces, dashes, slashes or camelCased. i.e 'en-lk'                                                      	| 'en-LK'                                                                                 	|
| countryIsoCode                                                                                             	| String i.e 'lk'                                                                                                             	| 'LK'                                                                                    	|
| languageIsoCode                                                                                            	| String i.e 'en'                                                                                                             	| 'en'                                                                                    	|
| fields that contain string values i.e currencyCode, originAirportIataCode, destinationAirportIataCode etc. 	| String i.e 'mia'                                                                                                            	| 'MIA'                                                                                   	|


</br>

### Pushing to the dataLayer <a name = "dataLayer"></a>
This package uses the following function to push to the dataLayer.
```js
const pushFormattedEventData = (obj) => {
  let localDataLayer = [];
  if (window && window.dataLayer) {
    if(window.dataLayer.length > 0) {
      window.dataLayer.push(...localDataLayer)
    }
    window.dataLayer.push(obj);
  }
  else{
    localDataLayer.push(obj)
  }
};
```
The function takes in the formatted object and checks whether the dataLayer exists. If it does, it will push the formatted data to the dataLayer. If not, the formatted data will be pushed into `localDataLayer` to prevent data loss.

---

### Event Object Examples
<i>Examples of unformatted objects and their formatted results can be found here. </i>

<details>
<summary>viewable-impression</summary>

<table>
<tr>
<td> Before </td> <td> After </td>
</tr>
<td>

```js

eventObject
 {
  event: "viewable-impression",
  module: "em-booking-popup-abstract",
  eventAction: "viewable impression",
  actionLabel: null,
  tenantCode: "UL",
  tenantType: "",
  provider: "hyat",
  regionName: "north america",
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
      siteEdition: "en-LK",
      countryIsoCode: "LK",
      languageIsoCode: "en",
    },
  ],
};


```

</td>
<td>

```js

eventObject
{
  event: 'viewable-impression',
  module: 'em-booking-popup-abstract',
  eventAction: 'viewable-impression',
  actionLabel: '',
  tenantCode: 'UL',
  tenantType: 'hotel',
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
      adultCount: 1,
      youngAdultCount: '',
      childCount: '',
      infantInLapCount: '',
      infantInSeatCount: ''
    }
  ],
  room: [ { total: 1, type: '' } ],
  page: [
    {
      siteEdition: 'en-LK',
      countryIsoCode: 'LK',
      languageIsoCode: 'en'
    }
  ]
}

```

</td>
</tr>
<tr>

</tr>
</table>
</details>


<details>
<summary>fsi</summary>

<table>
<tr>
<td> Before </td> <td> After </td>
</tr>
<td>

```js

eventObject
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

```

</td>
<td>

```js

eventObject
{
  event: 'fsi',
  module: 'em-booking-mask',
  eventAction: 'fsi',
  actionLabel: 'search flights',
  airlineIataCode: 'AA',
  provider: 'AmericanAirlines',
  journeyType: 'ROUND_TRIP',
  originAirportIataCode: 'CMB',
  destinationAirportIataCode: 'SIN',
  route: 'CMB>SIN',
  currencyCode: 'LKR',
  totalPrice: 5.21,
  totalPriceUSD: '',
  fareClass: 'BUSINESS',
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
  tagName: ''
}

```

</td>
</tr>
<tr>

</tr>
</table>
</details>

<details>
<summary>change-destination</summary>

<table>
<tr>
<td> Before </td> <td> After </td>
</tr>
<td>

```js

eventObject
{
  event: "change destination",
  module: "em farelist horizontal tile filterable",
  eventAction: "change - destination",
  actionLabel: null,
  airlineIataCode: "ua",
  provider: "united airlines",
  journeyType: "roundtrip",
  originAirportIataCode: "MIA",
  destinationAirportIataCode: "LAX",
  route: "mia>lax",
  currencyCode: "USD",
  totalPrice: "200.68",
  totalPriceUSD: 200.68,
  fareClass: "ec",
  departureDate: "03/13/2021",
  returnDate: "2021-06-14",
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
      cityCode: "lax",
      name: "lax",
      startDate: "2021/03/13",
      endDate: "2021-03-20",
      roomCount: 2,
      tripLength: 7,
      starRating: "5",
    },
  ],
};

```

</td>
<td>

```js

eventObject
{
  event: 'change-destination',
  module: 'em-farelist-horizontal-tile-filterable',
  eventAction: 'change-destination',
  actionLabel: '',
  airlineIataCode: 'UA',
  provider: 'UnitedAirlines',
  journeyType: 'ROUND_TRIP',
  originAirportIataCode: 'MIA',
  destinationAirportIataCode: 'LAX',
  route: 'MIA>LAX',
  currencyCode: 'USD',
  totalPrice: 200.68,
  totalPriceUSD: 200.68,
  fareClass: 'ECONOMY',
  departureDate: '2021-03-13',
  returnDate: '2021-06-14',
  daysUntilFlight: 25,
  tripLength: 15,
  isFlexibleDates: '',
  discountCode: '',
  deeplinkSiteEdition: '',
  miles: '',
  timestamp: '2021-02-16T00:00:00.000Z',
  url: 'https: //www.testurl.com/',
  passenger: [
    {
      count: 2,
      adultCount: 2,
      youngAdultCount: '',
      childCount: '',
      infantInLapCount: '',
      infantInSeatCount: ''
    }
  ],
  page: [
    {
      siteEdition: 'en-US',
      countryIsoCode: 'US',
      languageIsoCode: 'en'
    }
  ],
  lodging: [
    {
      cityCode: 'LAX',
      name: 'Lax',
      startDate: '2021-03-13',
      endDate: '2021-03-20',
      roomCount: 2,
      tripLength: 7,
      starRating: 5
    }
  ],
  moduleId: '',
  tagName: ''
}

```

</td>
</tr>
<tr>

</tr>
</table>
</details>

<details>
<summary>change-departure-date</summary>

<table>
<tr>
<td> Before </td> <td> After </td>
</tr>
<td>

```js

eventObject
{
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
};

```

</td>
<td>

```js

eventObject
{
  event: 'change-departure-date',
  module: 'em-farelist-mosaic-carousel',
  eventAction: 'change-departure-date',
  actionLabel: '',
  airlineIataCode: 'A3',
  provider: 'AegeanAirlines',
  journeyType: 'ONE_WAY',
  originAirportIataCode: 'ATH',
  destinationAirportIataCode: 'FLL',
  route: 'ATH>FLL',
  currencyCode: 'USD',
  totalPrice: 56,
  totalPriceUSD: 56,
  fareClass: 'FIRST',
  departureDate: '2021-03-13',
  returnDate: '2021-06-14',
  daysUntilFlight: 25,
  tripLength: 15,
  isFlexibleDates: '',
  discountCode: '',
  deeplinkSiteEdition: '',
  miles: '',
  timestamp: '2021-02-16T00:00:00.000Z',
  url: 'https: //www.testurl.com/',
  passenger: [
    {
      count: 2,
      adultCount: 2,
      youngAdultCount: '',
      childCount: '',
      infantInLapCount: '',
      infantInSeatCount: ''
    }
  ],
  page: [
    {
      siteEdition: 'en-US',
      countryIsoCode: 'US',
      languageIsoCode: 'en'
    }
  ],
  lodging: [
    {
      cityCode: 'FLL',
      name: 'Fll',
      startDate: '2021-03-13',
      endDate: '2021-03-20',
      roomCount: 2,
      tripLength: 7,
      starRating: 5
    }
  ],
  moduleId: '',
  tagName: ''
}

```

</td>
</tr>
<tr>

</tr>
</table>
</details>

<details>
<summary>change-budget</summary>

<table>
<tr>
<td> Before </td> <td> After </td>
</tr>
<td>

```js

eventObject
{
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
  timestamp: "2021/02/16",
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
      roomCount: 2,
      tripLength: "7",
      starRating: "5",
    },
  ],
};
```

</td>
<td>

```js

eventObject
{
  event: 'change-budget',
  module: 'em-farelist-featured-destination',
  eventAction: 'change-budget',
  actionLabel: 'test',
  airlineIataCode: 'TX',
  provider: 'Airlinetrfx',
  journeyType: 'ROUND_TRIP',
  originAirportIataCode: 'MIA',
  destinationAirportIataCode: 'FLL',
  route: 'MIA>FLL',
  currencyCode: 'USD',
  totalPrice: 40,
  totalPriceUSD: 40,
  fareClass: 'ECONOMY',
  departureDate: '2021-03-13',
  returnDate: '2021-06-14',
  daysUntilFlight: 21,
  tripLength: 7,
  isFlexibleDates: '',
  discountCode: '',
  deeplinkSiteEdition: '',
  miles: 500,
  timestamp: '2021-02-16T05:00:00.000Z',
  url: 'https: //www.testurl.com/',
  passenger: [
    {
      count: 2,
      adultCount: 2,
      youngAdultCount: 1,
      childCount: 0,
      infantInLapCount: '',
      infantInSeatCount: ''
    }
  ],
  page: [
    {
      siteEdition: 'en-US',
      countryIsoCode: 'US',
      languageIsoCode: 'en'
    }
  ],
  lodging: [
    {
      cityCode: 'FLL',
      name: 'Fll',
      startDate: '2021-03-13',
      endDate: '2021-03-20',
      roomCount: 2,
      tripLength: 7,
      starRating: 5
    }
  ],
  moduleId: '',
  tagName: ''
}
```

</td>
</tr>
<tr>

</tr>
</table>
</details>

---


## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
