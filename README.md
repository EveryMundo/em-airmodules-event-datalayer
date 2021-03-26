<p align="center">
  <a href="" rel="noopener">
 <img src="https://www.everymundo.com/wp-content/uploads/2018/08/Everymundo_Logo_NO-BACKGROUND-1-e1533159346674.png" alt="EM Logo"></a>
</p>

<h3 align="center">airmodules-event-datalayer</h3>

<div align="center">


</div>

---

<p align="center"> airmodules-event-datalayer is a package used for formatting datalayer object values. This package uses <b>optional chaining</b>, which may require appropriate configuration.
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
npm install airmodules-event-datalayer
```

### Usage

```js
import { formatter } from "airmodules-event-datalayer";
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

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
