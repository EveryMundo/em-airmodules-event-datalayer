<p align="center">
  <a href="" rel="noopener">
 <img src="https://www.everymundo.com/wp-content/uploads/2018/08/Everymundo_Logo_NO-BACKGROUND-1-e1533159346674.png" alt="EM Logo"></a>
</p>

<h3 align="center">airmodules-event-datalayer</h3>

<div align="center">


</div>

---

<p align="center"> airmodules-event-datalayer is a package used for formatting datalayer object values. 
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)

## 🧐 About <a name = "about"></a>

npm package which exports a formatting function based on the airModules dataLayer to be used by FC.

## 🏁 Getting Started <a name = "getting_started"></a>

Use [npm](https://www.npmjs.com/) to install airmodules-event-datalayer.

```bash
npm install @everymundo/airmodules-event-datalayer
```

### Usage

```js
import { formatter } from "@everymundo/airmodules-event-datalayer";
```

---

#### Sample usage can be found in sample.js

<details>
<summary>Create an object</summary>

```js

  const airModulesDataLayer = {
  event: "viewable impression",
  module: "emBookingPopupAbstract",
  eventAction: "viewable - impression",
  actionLabel: null,
  airlineIataCode: "ul",
  provider: "sri lankan airlines",
  journeyType: "ow",
  originAirportIataCode: "CMB",
  destinationAirportIataCode: "SIN",
  route: "cmb>sin",
  currencyCode: "LKR",
  totalPrice: "5.21",
  totalPriceUSD: null,
  fareClass: "ec",
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
</details>

Function call:

```js
{
  formatter.formatAll(airModulesDataLayer);
}
```
#### formatAll function:
-Checks whether the incoming object includes "module" and "eventAction"
-Returns all formatting functions, including: addParameters(), formatCase(), etc.

#### addParameters function:
-Adds moduleId/tagName if they are not in the given object.

#### formatJourney function:
-Formats journey field.
  -  oneway, one-way, ow, one way, one_way -> ONE_WAY
  -  roundtrip, round-trip, round_trip, rt, round trip -> ROUND_TRIP

#### formatFareClass function:
-Formats fareClass to ECONOMY, BUSINESS or FIRST.
  - ec, economy, e -> ECONOMY
  - business, bc, b, businessclass -> BUSINESS
  - first, fc, f, firstclass -> FIRST

#### formatProvider function:
-Formats provider. <b>Provider name can only be formatted if it is separated by spaces. </b>
  - "sri lankan airlines" -> SriLankanAirlines

#### formatCase function:
-Formats casing for different key values.
  - events, module -> kebab-case
  - eventAction -> spaced - kebab - case. (formatted from "event")
  - lodging name - Titlecased
  - ... - Capital
-In the case that countryIsoCode, LanguageIsoCode, siteEdition or name are missing from their parent field, an empty value will be assigned to the respective key.
  - i.e: 
  ```json
  {
    "countryIsoCode": ""
  }
  ```

#### formatDate function:
-Formats dates to ISO format.
  - Input Example:
```JSON
{
   "departureDate": "03/13/2021"
}

```
  - Output:
```JSON
{
   "departureDate": "2021-03-13"
}
```
#### formatUrl function:
-Formats URL spacing.
  - Returns the url spaced between : and /.
  - Input Example:
```JSON
{
"url": "https://www.srilankan.com/en-lk/"
}
```
  - Output:
```JSON
{
"url": "https: //www.srilankan.com/en-lk/"
}
```  
#### convertValues function:
-Replaces null values to empty string and converts numeric <b> string </b> values to their respective number values.
  - Input Example:
```JSON
{
"totalPrice": "25",
"totalPriceUSD": null,
}
```  
  - Output:
```JSON
{
"totalPrice": 25,
"totalPriceUSD": "",
}
```  

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
