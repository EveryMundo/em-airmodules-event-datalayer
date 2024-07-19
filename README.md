<p align="center">
  <a href="" rel="noopener">
 <img src="https://www.everymundo.com/wp-content/uploads/2021/11/EveryMundo-2022-black-2.jpg" alt="EM Logo"></a>
</p>

<h3 align="center">Tracking Package</h3>

<div align="center">


</div>


## 📝 Table of Contents

- [Overview](#overview)
- [Getting started with the Tracking Package](#-getting-started-with-the-tracking-package-)
- [Constructing the Event Object](#-constructing-the-event-object)
- [Types of events](#types-of-events)
- [Event Object Parameters](#event-object-parameters)
- [How to populate the actionLabel parameter](#how-to-populate-the-actionlabel-parameter)
- [Examples](#examples)
- [Testing the Tracking Implementation](#-testing-the-tracking-implementation-)
- [FAQ](#-faq)

<a name="overview"></a>

## 🧐 Overview

The Tracking Package enables you to measure views and engagement across your applications. This documentation provides implementation instructions and reference materials geared towards a developer audience.

To track a new application, developers construct an event object for each event they wish to track and utilize this [npm package](https://www.npmjs.com/package/@everymundo/airmodules-event-datalayer) to send the event. Once sent, the tracking package formats each event object according to the specifications outlined in the [emDataStandards](https://github.com/EveryMundo/emDataStandards/blob/master/dataLayer/airmodules.datalayer.js) and pushes it to a [dataLayer object](https://support.google.com/tagmanager/answer/6164391?hl=en). Subsequently, both customers and EveryMundo have the ability to leverage a tag manager to access the data layer values and transmit events to an Analytics account.

## 🏁 Getting started with the Tracking Package <a name="-getting-started-with-the-tracking-package-"></a>

Follow these simple steps to quickly integrate the Tracking Package into your project for seamless event tracking.

<b>Step 1: Download the npm Package</b>

Install <b>@everymundo/airmodules-event-datalayer</b> by using npm. Open your terminal and run:

```bash
npm install @everymundo/airmodules-event-datalayer
```

<b>Step 2: Import the Formatter Function into the Project</b>

In your project file where you plan to implement event tracking, import the formatter function. Add the following line at the top of your file:
```js
import { formatter } from "@everymundo/airmodules-event-datalayer"
```

<b>Step 3: Construct the Event Object Based on Vertical</b>

Create an event object that captures the relevant information for the specific event you want to track. Ensure that the object follows the required structure and contains essential details related to the event. Refer to the details below for more information.

<details>
<summary>Example</summary>

```js
const eventObject = {
  event: 'viewable_impression',
  module: 'em-booking-popup',
  actionLabel: '',
  airlineIataCode: 'UL',
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
  passenger: 
    {
      count: 1,
      adultCount: 1,
      youngAdultCount: '',
      childCount: '',
      infantInLapCount: '',
      infantInSeatCount: ''
    }
  ,
  page: 
    {
      siteEdition: 'en-LK',
      countryIsoCode: 'LK',
      languageIsoCode: 'en',
      typeName: 'CUSTOM_PAGE'
    }
  ,
  lodging: 
    {
      cityCode: 'SIN',
      name: 'Intercontinental',
      startDate: '2021-03-13',
      endDate: '2021-03-20',
      roomCount: 2,
      tripLength: 7,
      starRating: 5
    }
  ,
  moduleId: '',
  tagName: ''
}
```
</details>
</br>

<b>Step 4: Call the Function Based on Vertical</b>

After constructing the event tracking object, use the appropriate function based on the tenant type (vertical) to format and process the event. Pass the event object as the parameter to ensure accurate tracking.

```bash
// For Vertical Airlines
formatter.formatAirlines(eventObject);

// For Vertical Hospitality
formatter.formatHotels(eventObject);

// For Vertical Events
formatter.formatEvents(eventObject);
```

These functions are designed to handle specific verticals and ensure proper formatting of the event object. Here's a brief explanation of the process:

-  <b>Handling Missing Fields:</b> If the event object is missing values for certain keys, the respective keys will be assigned empty values during the formatting process.

-   <b>Handling Null Values:</b> Null values in the event object will be converted to an empty string during the formatting process.

-   <b>Handling Multiple Values:</b> If 'eventExperience' contains multiple values (e.g., "The Lounge," "Player Pod"), the function will format them to "MULTIPLE."

-   <b>Pushing to the dataLayer:</b> After formatting, the resulting data will be pushed to the dataLayer, making it ready for further processing and analysis by analytics tools.

-   <b>Handling Nested Fields:</b> Nested fields should not be sent in the form of "Array of Objects" `[{}]` (e.g ❌ `page[0].typeName` -> ✅ `page.typeName`). Fields that do not adhere to the standard dataLayer structure will be discarded.

Ensure you choose the correct function based on your application's vertical to maintain consistency in data formatting and tracking. Customize the event object and parameters as needed for your specific tracking requirements.

## 📓 Constructing the Event Object<a name="-constructing-the-event-object"></a>

Events let you measure user interactions on your app; for example, you can measure when someone, clicks on a button or interacts with a filter. The data from events is used to create reports.

<b>Step 1: Select the Empty Event Object by Vertical</b>

Identify the appropriate empty event object template based on the vertical or category of the event you intend to track. Different verticals may require specific information to be captured.

<details>
<summary>Airlines</summary>

```js
const eventObject = {
  event: '',
  module: '',
  actionLabel: '',
  originAirportIataCode: '',
  destinationAirportIataCode: '',
  currencyCode: '',
  totalPrice: 0,
  totalPriceUSD: '',
  departureDate: '',
  returnDate: '',
  deeplinkSiteEdition: '',
  miles: '',
  passenger: 
    {
      count: 1,
      adultCount: 1,
      youngAdultCount: '',
      childCount: '',
      infantInLapCount: '',
      infantInSeatCount: ''
    }
  ,
  lodging: 
    {
      cityCode: '',
      name: '',
      startDate: '',
      endDate: '',
      roomCount: 0,
      tripLength: 0,
      starRating: 0 
    }
  ,
  carRentals: 
    {
      provider: '',
      brand: '',
      model: ''
    }
  ,
  moduleId: '',
  tagName: ''
}
```
</details>

<details>
<summary>Hospitality</summary>

```js
const eventObject = {
  event: '',
  module: '',
  actionLabel: '',
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
  roomAccesibility: true,
  guest: 
    {
      count: 0,
      adult: 0
    }
  ,
  room:
    { 
      count: 0, 
      type: '' 
    } 
  ,
}

```
</details>

<details>
<summary>Events</summary>

```js
const eventObject = {
  event: '',
  module: '',
  actionLabel: '',
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
  roomAccesibility: true,
  guest: 
    {
      count: 0,
      adult: 0
    }
  ,
  room: 
    { 
      count: 0, 
      type: '' 
    } 
  ,
}

```
</details>

<B>Step 2: Decide Which Events to Track in the 'event' Field</b>

Determine the key event you want to track and assign them to the 'event' field. This field defines the type of user interaction and the specific action taken. For example:

```js
const eventObject = {
  event: 'viewable_impression',
  module: 'em-booking-popup',
  ...
};
```

Adjust the value of 'event' to accurately reflect the nature of your tracked events. Refer to [Types of Events](#types-of-events) below for more information. 


<b>Step 3: Set Up Event Parameters</b>

The event object includes several parameters to provide detailed context to a specific event for better analysis. For instance:

```js
const eventObject = {
  event: 'viewable_impression',
  module: 'em-booking-popup',
  actionLabel: '',
  airlineIataCode: 'UL',
  journeyType: 'ONE_WAY',
  originAirportIataCode: 'CMB',
  destinationAirportIataCode: 'SIN',
  route: 'CMB>SIN',
  currencyCode: 'LKR',
  totalPrice: 5.21,
  ...
};
```

Refer to [Event Object Parameters](#event-object-parameters) below for a detailed explanation of each parameter, and which ones are required.


### Types of events<a name="types-of-events"></a>
> [!NOTE] 
> Automatically collected events are events that are collected by default. These events include:
> * <b> Pageviews:</b> A pageview is recorded when a user loads a new page
> * <b> Viewable impressions: </b> A viewable impression is recorded when a module is displayed on the user's screen.
>
> Recommended events are events that you implement, but that have predefined names and parameters. These events unlock existing and future reporting possibilities.
> The following is a list of recommended events that you can track using the tracking package:

<details>
<summary>For Airlines</summary>

| Event                   | Description                                                                                           |
|-------------------------|-------------------------------------------------------------------------------------------------------|
| viewable_impression     | An element is seen on the user's browser                                                              |
| fsi                     | Flight search initiation                                                                              |
| open_booking_popup      | Popup clicked                                                                                         |
| select_origin           | Origin (From) field updated                                                                           |
| select_destination      | Destination (To) field updated                                                                        |
| select_departure_date   | Departure date field updated                                                                          |
| select_return_date      | Return date field updated                                                                             |
| select_journey_type     | Journey type field updated                                                                            |
| select_miles            | User changes the miles limit                                                                          |
| expand_form             | User expands the form in the booking popup                                                            |
| collapse_form           | User collapses form in the booking popup                                                              |
| sort                    | The sort toggle is used on the FC                                                                     |
| more_deals              | The user clicks to see more deals than the ones displayed in the FC                                   |
| select_tab              | User selects tab in pricing modules                                                                   |
| filter_airlines         | User filter for selected airlines (STAR)                                                              |
| select_budget           | A budget was selected                                                                                 |
| select_fare_class       | User changes fare class in the module. This includes branded classes such as "Basic Economy", "Main Cabin", "Economy Light", etc. |
| collapse_histogram      | User collapses the histogram                                                                          |
| select_month            | User selects the month in the histogram or calendar                                                   |
| expand_flight           | User expands flight information in the flight schedule module                                         |
| reset_filter            | Clear button clicked                                                                                  |
| toggle_farelist         | User interacts with the toggle of the farelist modules                                                |
| select_map_destination  | Map destination clicked                                                                               |
| selected_travel_interest| A travel interest was selected                                                                        |
| select_interest         | User selects travel interest (Tracking Package)                                                       |
| click_out               | User clicks on one link of the content module                                                         |
| read_article            | User clicks on an article of the content module                                                       |
| select_location         | User performs a search in the bus directory module                                                    |
| search                  | A search was initiated                                                                                |
| select_status           | Status is updated in the route status tracker module                                                  |
| select_stops            | User filters for the number of stops in the map module                                                |
| select_article          | An article was selected                                                                               |
| select_resident_status  | Resident status was selected                                                                          |
| no_fares_available      | The FC does not have fares to display                                                                 |
| insert_first_name       | First name field updated                                                                              |
| insert_last_name        | Last name field updated                                                                               |
| insert_email            | Email field updated                                                                                   |
| insert_phone_number     | Phone number field updated                                                                            |
| subscribe               | Subscription option selected                                                                          |
| enter_promo_code        | Promo code field updated                                                                              |

</details>

<details>
<summary>For Hotels</summary>

| Event                 | Description                                           |
|-----------------------|-------------------------------------------------------|
| viewable_impression   | An element is seen on the user's browser              |
| search_initiation     | Search initiation                                     |
| open_booking_popup    | Popup clicked                                         |
| more_deals            | The user clicks to see more deals than the ones displayed in the FC |
| select_origin         | Origin (From) field updated                           |
| select_trip_length    | User selects stay length of the trip                  |
| sort                  | The sort toggle is used on the FC                     |
| select_rating         | Hotel rating filter is used                           |
| select_destination    | Destination (To) field updated                        |
| select_budget         | A budget was selected                                 |
| reset_filter          | Clear button clicked                                  |
| select_night          | Number of nights filter is updated                    |
| select_property       | Hotel property updated                                |
| select_start_date     | Hotel check-in date updated                           |
| select_end_date       | Hotel check-out date updated                          |
| select_room_guest     | Hotel guests field updated                            |
| select_accessibility  | User marks the accessibility check box in the module  |
| select_redemption     | User selects redemption as payment method             |
| select_stay_length    | User selects stay length of the trip                  |
| select_offer          | Special offer is selected in the low fares calendar   |
| no_fares_available    | The FC does not have fares to display                 |
| insert_first_name     | First name field updated                              |
| insert_last_name      | Last name field updated                               |
| insert_email          | Email field updated                                   |
| insert_phone_number   | Phone number field updated                            |
| subscribe             | Subscription option selected                          |
| enter_promo_code      | Promo code field updated                              |

</details>

<details>
<summary>For Events</summary>

| Event                 | Description                                           |
|-----------------------|-------------------------------------------------------|
| viewable_impression   | An element is seen on the user's browser              |
| search_initiation     | Search initiation                                     |
| open_booking_popup    | Popup clicked                                         |
| select_date           | Event date updated                                    |
| select_session        | Event sessions field updated                          |
| select_category       | Event category selected                               |
| select_experience     | Event experience field updated                        |
| select_location       | Event location field updated                          |
| select_budget         | A budget was selected                                 |
| sort                  | Sorting option selected                               |
| reset_filter          | Clear button clicked                                  |
| no_fares_available    | The FC does not have fares to display                 |
| insert_first_name     | First name field updated                              |
| insert_last_name      | Last name field updated                               |
| select_origin         | Origin (From) field updated                           |
| insert_email          | Email field updated                                   |
| insert_phone_number   | Phone number field updated                            |
| subscribe             | Subscription option selected                          |
| enter_promo_code      | Promo code field updated                              |

</details>


</br>

Custom events are events that you define. Make sure to only create custom events when no other events work for your use case. Custom events do not show up in most standard reports and require a custom request for meaningful analysis. (we give guidelines in case nothing on our list is appropriate)

To track a custom event, simply add in the event object an event name and/or module name that is not on the recommended list. 

The event object must contain the following properties:
* <b> event: </b> The name of the event.
* <b> module: </b> The name of the module.

For example, the following event object would track a custom event called "product_detail_clicked" for a new module:

```js
const eventObject = {
  event: 'product_detail_clicked',
  module: '',
  ...
  }
  ```

> [!NOTE]
> <b>Guidelines for tracking custom events</b>
>
> When tracking custom events, it is important to follow the following guidelines:
> * Use descriptive event names. This will help you to easily identify and analyze your event data.
> * Avoid tracking too many custom events. This can make your event data difficult to analyze.
> * Only track custom events that are important to your business. This will help you to focus on the most important events and to get the most out of your tracking data.



### Event Object Parameters<a name="event-object-parameters"></a>  

This section provides a detailed explanation of the parameters used in the event object, along with their examples, definitions, and whether they are required.

* The parameters marked as required need to be included in all events.

* The viewable-impression events will only collect the required parameters.

* The interaction events, such as select-departure-date, will only populate the relevant parameters to the event itself and what has already been filtered in the module.

* Parameters that are not being used can be removed from the event object.

<details>
<summary> Common Parameters Across All Verticals </summary>

| Parameter                                | Example                   | Definition                                                                                                                                                                                                             | Required  |
|------------------------------------------|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| event                                    | T_123456                  | Name of the event performed                                                                                                                                                                                            | Yes       |
| module                                   | em-booking-popup          | Name of the module                                                                                                                                                                                                     | Yes       |
| actionLabel                              | ...                       | Populated based on what was selected in the user interaction. See details below.                                                                                                                                       | Optional  |
| tenantCode                               | HDI                       | Tenant Code                                                                                                                                                                                                            | Yes       |
| tenantType                               | hotel                     | Tenant Type (Hotel, Airline, Event)                                                                                                                                                                                    | Yes       |
| currencyCode                             | USD                       | The currency (in 3-letter ISO 4217 format) of the price                                                                                                                                                                | Yes       |
| totalPrice                               | 399.37                    | The total price for the reservation or ticket, including applicable taxes, shipping, etc                                                                                                                               | Yes       |
| totalPriceUsd                            | 530.62                    | The total price for the reservation or ticket in USD, including applicable taxes, shipping, etc.                                                                                                                       | Yes       |
| startDate                                | 2022-04-01                | Date of check-in                                                                                                                                                                                                       | Yes       |
| endDate                                  | 2022-04-07                | Date of check-out                                                                                                                                                                                                      | Yes       |
| timestamp                                | 2021-02-16T17:41:43.200Z  | Timestamp of the event sent                                                                                                                                                                                            | Yes       |
| url                                      | https://www.example.com   | Full URL in lowercase (without query parameters to avoid collecting personal data by mistake)                                                                                                                          | Yes       |
| adultCount, youngAdultCount, childCount  | 1                         | Amount of adult/young adult/child passengers                                                                                                                                                                           | Yes       |
| count                                    | 3                         | Amount of guests for a specific category                                                                                                                                                                               | Yes       |
| siteEdition                              | en-HK                     | Site edition combination of ISO codes for language and country. The country reflects the market                                                                                                                        | Yes       |
| countryIsoCode                           | HK                        | Country code (in 2 letter codes from ISO 3166-1)                                                                                                                                                                       | Yes       |
| languageIsoCode                          | en                        | Language ISO 629-1 code                                                                                                                                                                                                | Yes       |
| tagName*                                 |                           | Name given by Standard Fare Modules or Front Components. *Required if there is a name or tag associated with the module other than the module name. E.g. A module that only displays miles and has been named "Miles"  | No        |
| discountCode                             | AFFBFAN                   | Discount promotion code                                                                                                                                                                                                | Optional  |
| typeName                             | CUSTOM_PAGE               | Name of the type of page template                                                                                                                                                                                      | No        |

</details>

<details>
<summary>Airlines Vertical Parameters</summary>

| Parameter                               | Example                  | Definition                                                                                      | Required                                                                                                                                                   |
|-----------------------------------------|--------------------------|-------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| airlineIataCode                         | AA                       | IATA identifier for the airline                                                                 | Yes                                                                                                                                                        |
| journeyType                             | ONE_WAY                  | Trip type (ROUND_TRIP, ONE_WAY, MULTI_CITY)                                                     | Yes                                                                                                                                                        |
| originAirportIataCode                   | SFO                      | IATA identifier for the departure/origin airport                                                | Yes                                                                                                                                                        |
| destinationAirportIataCode              | JFK                      | IATA identifier for the arrival/destination airport                                             | Yes                                                                                                                                                        |
| route                                   | SFO>JFK                  | Route of the trip from origin to destination                                                    | Yes                                                                                                                                                        |
| currencyCode                            | USD                      | The currency (in 3-letter ISO 4217 format) of the price                                         | Yes                                                                                                                                                        |
| totalPrice                              | 399.37                   | The total price for the flight ticket, including applicable taxes, shipping, etc                | Yes                                                                                                                                                        |
| totalPriceUsd                           | 530.62                   | The total price for the flight ticket in USD, including applicable taxes, shipping, etc.        | Yes                                                                                                                                                        |
| fareClass                               | ECONOMY                  | Fare class type (ECONOMY, BUSINESS, PREMIUM_ECONOMY, FIRST)                                     | Yes                                                                                                                                                        |
| departureDate                           | 2022-04-01               | Date of departure                                                                               | Yes                                                                                                                                                        |
| returnDate                              | 2022-04-07               | Date of return                                                                                  | Yes                                                                                                                                                        |
| daysUntilFlight                         | 25                       | Amount of days from the current date to the departure date                                      | Yes                                                                                                                                                        |
| tripLength                              | 5                        | Length of stay / trip                                                                           | Yes                                                                                                                                                        |
| isFlexibleDates                         | true                     | True/false value if flexible dates are selected for flights                                     | Yes                                                                                                                                                        |
| discountCode*                           | AFFBFAN                  | Discount promotion code                                                                         | Optional                                                                                                                                                   |
| deeplinkSiteEdition                     | en-HK                    | Site edition combination of ISO codes for language and country provided in the URL              | Yes                                                                                                                                                        |
| miles                                   | 25790                    | Flight distance in miles                                                                        | Yes                                                                                                                                                        |
| timestamp                               | 2021-02-16T17:41:43.200Z | Timestamp of the event sent                                                                     | Yes                                                                                                                                                        |
| url                                     |                          | Full URL in lowercase (without query parameters to avoid collecting personal data by mistake)   | Yes                                                                                                                                                        |
| adultCount, youngAdultCount, childCount | 1                        | Amount of adult/young adult/child passengers                                                    | Yes                                                                                                                                                        |
| infantInLapCount                        | 1                        | Amount of infant passengers in lap                                                              | Yes                                                                                                                                                        |
| infantInSeatCount                       | 1                        | Amount of infant passengers in seat                                                             | Yes                                                                                                                                                        |
| count                                   | 3                        | Amount of passengers for a specific category                                                    | Yes                                                                                                                                                        |
| siteEdition                             | en-HK                    | Site edition combination of ISO codes for language and country. The country reflects the market | Yes                                                                                                                                                        |
| countryIsoCode                          | HK                       | The country code (in 2-letter codes from ISO 3166-1)                                            | Yes                                                                                                                                                        |
| languageIsoCode                         | en                       | The language ISO 629-1 code                                                                     | Yes                                                                                                                                                        |
| cityCode                                | SIN                      | The city code for the selected property (in 2-letter codes from ISO 3166-1)                     | Yes                                                                                                                                                        |
| name                                    | Intercontinental         | Name of the selected property.                                                                  | Yes                                                                                                                                                        |
| startDate                               | 2021-03-13               | Date of check-in                                                                                | Yes                                                                                                                                                        |
| endDate                                 | 2021-03-20               | Date of check-out                                                                               | Yes                                                                                                                                                        |
| roomCount                               | 2                        | Amount of rooms selected                                                                        | Yes                                                                                                                                                        |
| tripLength                              | 7                        | Length of stay/trip                                                                             | Yes                                                                                                                                                        |
| starRating                              | 5                        | An official rating for the property                                                             | Yes                                                                                                                                                        |
| moduleId                                | XADPLIK7890              | Unique ID used for the module. Only required for DPA                                            | Yes - for DPA modules only                                                                                                                                 |
| tagName                                 |                          | Name given to Standard Fare Modules (SFM) / Front Components (FC)                               | Yes - if there is a name or tag associated with the module other than the module name. E.g., A module that only displays miles and has been named "Miles". |
| provider                                | Hertz                    | Name of the car rental company                                                                  | Optional - Required only if there is car rental information available                                                                                      |
| brand                                   | BMW                      | Make of the rental car                                                                          | Optional - Required only if there is car rental information available                                                                                      |
| model                                   | 530i                     | Model of the rental car                                                                         | Optional - Required only if there is car rental information available                                                                                      |


</details>

<details>
<summary>Hospitality Vertical Parameters</summary>

| Parameter              | Example                          | Definition                                                                                             | Required |
|------------------------|----------------------------------|--------------------------------------------------------------------------------------------------------|----------|
| emcid                  | T-123456                         | Unique identifier                                                                                      | Yes      |
| tenantCode             | HDI                              | Tenant Code                                                                                            | Yes      |
| tenantType             | hotel                            | Tenant Type (Hotel, Airline, Event)                                                                    | Yes      |
| module                 | open-booking-popup-abstract      | Name of the event                                                                                      | Yes      |
| actionLabel            | open-booking-popup               | Name of the event action                                                                               | Yes      |
| regionName             | North America                    | Name of the region for the selected property (North America, South America, East Asia...)              | Yes      |
| countryCode            | US                               | The country code for the selected property (in 2 letter codes from ISO 3166-1)                         | Yes      |
| cityName               | Miami                            | Name of the city for the selected property (Miami, Orlando, Tampa...)                                  | Yes      |
| propertyCode           | HYATT9015479                     | Code of the selected property (Hotel code, event code...)                                              | Yes      |
| propertyName           | HolidayInn-Miami                 | Name of the selected property. e.g Name of the Hotel (Holiday Inn - Miami, Hyatt Regency Hong Kong...) | Yes      |
| currencyCode           | USD                              | The currency (in 3-letter ISO 4217 format) of the price.                                               | Yes      |
| totalPrice             | 399.37                           | The total price for the reservation or ticket, including applicable taxes, shipping, etc               | Yes      |
| totalPriceUsd          | 530.62                           | The total price for the reservation or ticket in USD, including applicable taxes, shipping, etc.       | Yes      |
| startDate              | 2022-04-01                       | Date of check in                                                                                       | Yes      |
| endDate                | 2022-04-07                       | Date of check out                                                                                      | Yes      |
| daysUntilBooking       | 25                               | Amount of days from the current date to the startDate (Check-in date)                                  | Yes      |
| tripLength             | 5                                | Length of stay / trip                                                                                  | Yes      |
| roomAccesibility       | false                            | Room accessibility requirement                                                                         | Yes      |
| timestamp              | 2021-02-16T17:41:43.200Z         | timestamp of the event sent                                                                            | Yes      |
| url                    | https://www.holidayinn.com/miami | Full url in lowercase (without query parameters to avoid collecting personal data by mistake)          | Yes      |
| adult                  | 1                                | Amount of adult guests                                                                                 | Yes      |
| child                  | 1                                | Amount of child guests                                                                                 | Yes      |
| count (in guest array) | 3                                | Amount of guests for a specific category                                                               | Yes      |
| count (in room array)  |                                  | Amount of rooms selected                                                                               | Yes      |
| type                   | Suite                            | Room type                                                                                              | Yes      |
| pageTypeCode           | CI                               | Page Type Code: HP, CICO, FCI, TCI, CICI, COCI, COCO, FCO, TCO, EXT, CP, 404, SM, BS, FS, FA           | Yes      |
| siteEdition            | en-HK                            | Site edition combination of ISO codes for language and country. The country reflects the market        | Yes      |
| countryIsoCode         | HK                               | The country code (in 2 letter codes from ISO 3166-1)                                                   | Yes      |
| languageIsoCode        | en                               | The language ISO 629-1 code                                                                            | Yes      |
| tagName                |                                  | Name given to Standard Fare Modules (SFM) / Front Components (FC)                                      | Yes - if there is a name or tag associated with the module other than the module name. E.g., A module that only displays miles and has been named "Miles".      |
| discountCode           | AFFBFAN                          | Discount promotion code                                                                                | Yes      |
| typeName           | CUSTOM_PAGE                      | Name of the type of page template                                                                      | Yes      |

</details>

<details>
<summary>Events Vertical Parameters</summary>

| Parameter                               | Example                           | Definition                                                                                            | Required                                                                                                                                                   |
|-----------------------------------------|-----------------------------------|-------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| tenantCode                              | HDI                               | Tenant Code                                                                                           | Yes                                                                                                                                                        |
| tenantType                              | hotel                             | Tenant Type (Hotel, Airline, Event)                                                                   | Yes                                                                                                                                                        |                                                                                                                                        |
| event                                   | search_initiation                 | Name of the event                                                                                     | Yes                                                                                                                                                        |
| module                                  | open-booking-popup-abstract       | Name of the interacted module                                                                         | Yes                                                                                                                                                        |
| actionLabel                             | Book Now                          | Name of the event action                                                                              | Yes                                                                                                                                                        |
| eventName                               | Semifinal                         | Name of the Event                                                                                     | Yes                                                                                                                                                        |
| eventLocation                           | Laver Arena                       | Location for the selected Event                                                                       | Yes                                                                                                                                                        |
| eventSession                            | Night                             | Time of the Event session                                                                             | Yes                                                                                                                                                        |
| eventExperienceCategory                 | Ticket Only                       | Name of the selected experience category                                                              | Yes                                                                                                                                                        |
| eventNameFilter                         | Semifinal                         | Name of the filtered Event                                                                            | Yes                                                                                                                                                        |
| eventLocationFilter                     | Laver Arena                       | Name of the filtered Event location                                                                   | Yes                                                                                                                                                        |
| eventSessionFilter                      | Night                             | Name of the filtered session                                                                          | Yes                                                                                                                                                        |
| eventExperienceCategoryFilter           | Ticket Only                       | Name of the filtered experience category                                                              | Yes                                                                                                                                                        |
| eventExperienceFilter                   | MULTIPLE                          | Types of Event experiences selected                                                                   | Yes                                                                                                                                                        |
| currencyCode                            | USD                               | The currency (in 3-letter ISO 4217 format) of the price.                                              | Yes                                                                                                                                                        |
| totalPrice                              | 399.37                            | The total price for the reservation or ticket, including applicable taxes, shipping, etc              | Yes                                                                                                                                                        |
| totalPriceUsd                           | 530.62                            | The total price for the reservation or ticket in USD, including applicable taxes, shipping, etc.      | Yes                                                                                                                                                        |
| startDate                               | 2022-04-01                        | Date of check in                                                                                      | Yes                                                                                                                                                        |
| endDate                                 | 2022-04-07                        | Date of check out                                                                                     | Yes                                                                                                                                                        |
| timestamp                               | 2021-02-16T17:41:43.200Z          | timestamp of the event sent                                                                           | Yes                                                                                                                                                        |
| url                                     | https: //www.srilankan.com/en-lk/ | Full url in lowercase (without query parameters to avoid collecting personal data by mistake)         | Yes                                                                                                                                                        |
| adultCount, youngAdultCount, childCount | 1                                 | Amount of adult/young adult/child passengers                                                          | Yes                                                                                                                                                        |
| count                                   | 3                                 | Amount of guests for a specific category                                                              | Yes                                                                                                                                                        |
| siteEdition                             | en-HK                             | Site edition combination of ISO codes for language and country. The country reflects the market       | Yes                                                                                                                                                        |
| countryIsoCode                          | HK                                | The country code (in 2 letter codes from ISO 3166-1)                                                  | Yes                                                                                                                                                        |
| languageIsoCode                         | en                                | The language ISO 629-1 code                                                                           | Yes                                                                                                                                                        |
| tagName*                                |                                   | Name given by Standard Fare Modules or Front Components.                                              | Yes - if there is a name or tag associated with the module other than the module name. E.g., A module that only displays miles and has been named "Miles". |
| discountCode                            | AFFBFAN                           | Discount promotion code                                                                               | Yes                                                                                                                                                        |
| typeName                            | CUSTOM_PAGE                       | Name of the type of page template                                                                     | Yes                                                                                                                                                        |

</details>

### How to populate the actionLabel parameter<a name="how-to-populate-the-actionlabel-parameter"></a>

The 'actionLabel' serves as a descriptive label, tracking what was specifically selected based on the event. For instance, when the event is 'select-interest,' the 'actionLabel' might capture values like 'snorkeling.'

| Event                 | Action Label |
|-----------------------|--------------|
| select-budget         | 1000         |
| select-interest       | snorkeling   |
| select-destination    | MIA          |
| select-departure-date | 2023-04-01   |

* Note that for select-destination and select-departure-date the values will also have to be included in the relevant event object parameters.


### Examples<a name="examples"></a>

<details>
<summary>Airlines</summary>

```js
const eventObject = {
  event: 'viewable_impression',
  module: 'em-booking-popup',
  actionLabel: '',
  airlineIataCode: 'UL',
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
  passenger: 
    {
      count: 1,
      adultCount: 1,
      youngAdultCount: '',
      childCount: '',
      infantInLapCount: '',
      infantInSeatCount: ''
    }
  ,
  page: 
    {
      siteEdition: 'en-LK',
      countryIsoCode: 'LK',
      languageIsoCode: 'en',
      typeName: 'CUSTOM_PAGE'
    }
  ,
  lodging: 
    {
      cityCode: 'SIN',
      name: 'Intercontinental',
      startDate: '2021-03-13',
      endDate: '2021-03-20',
      roomCount: 2,
      tripLength: 7,
      starRating: 5
    }
  ,
  carRentals: 
    {
        provider: Hertz,
        brand: BMW,
    model: 530i
    }
  ,
  moduleId: '',
  tagName: '',
}

```
</details>

<details>
<summary>Hospitality</summary>

```js
const eventObject = {
  event: 'viewable_impression',
  module: 'em-booking-popup-abstract',
  actionLabel: '',
  tenantCode: 'UL',
  tenantType: '',
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
  guest: 
    {
      count: 1,
      adult: 1
    }
  ,
  room: 
    { 
      count: 1, 
      type: '' 
    } 
  ,
  page: 
    {
      siteEdition: 'en-LK',
      countryIsoCode: 'LK',
      languageIsoCode: 'en',
      typeName: 'CUSTOM_PAGE'
    }
}

```
</details>

<details>
<summary>Events</summary>

```js

  const eventObject = {
    'event': 'search_initiation',
    'module': 'em-booking-popup-abstract',
    'actionLabel': null,
    'tenantCode': 'ETA',
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
    'passenger': {
        'count': 1,
        'adultCount': 1,
        'youngAdultCount': null,
        'childCount': null
    },
    'page': {
        'siteEdition': 'en-LK',
        'countryIsoCode': 'LK',
        'languageIsoCode': 'en',
        'typeName': 'CUSTOM_PAGE'
    },
}
```
</details>

## 🔨 Testing the Tracking Implementation <a name ="-testing-the-tracking-implementation-"></a> 

> [!NOTE]
> <b> Tracking Implementation Options: </b>
>
> Understand that legacy modules may employ the Tracking Library (TL), Tracking Package (TP), or both in their implementation. The focus should be on having an "airmodule" data layer for each user interaction, ensuring events are collected in Google Analytics 4 (GA4).

To ensure the proper integration with the Tracking Package, follow these steps to effectively test the event object:

1. <b> Check the Event Object </b>

Inspect the event object by typing `tp_debug=true` in the browser console. This will allow you to view the event object and identify any issues. This feature is available for implementations of the tracking package version 1.4.3 and above. You can check the Tracking Package version by typing tp_v in the console.

Additional note on verifying search_initiation events:

In addition to the steps above, before performing the search, run this in the console to avoid redirection to the search results page:

`window.onbeforeunload = function (e) { e = e || window.event; return ''; }`

That will prompt a popup to appear asking if you want to change pages. Just click "Cancel" and you should be able to see the details.

2. <b> Inspect the Data Layer</b>

Interact with the modules as users would and observe the corresponding data layer events in the console. To inspect the formatted result, open your browser's console and type "dataLayer." This action will reveal the structured data layer, allowing you to review and confirm that the necessary events are captured in the "airmodule" data layer format.

3. <b> Validate GA4 Integration </b>

Verify the successful collection and transmission of events to Google Analytics 4 (GA4) by entering collect in the Network tab. Confirm that the required data is being sent to GA4.

## ❓ FAQ<a name="-faq"></a> 

<details>
<summary> What is the difference between the event tracking object and the dataLayer object? Why do developers not implement the dataLayer object directly? </summary>
<br>
The event object and the dataLayer object serve distinct roles in the tracking process to standardize information across applications and prevent data loss.
<br></br>

<b> Event Object: </b> 
</br>
The event object is essentially the raw, unformatted input that developers implement for each specific event they want to track in an application. It serves as the initial stage of data collection, capturing essential information about user interactions or system events. Developers use the event object to provide detailed context and data related to specific actions within the application.

<b> dataLayer Object: </b>
</br>
On the other hand, the dataLayer object is the formatted output that results from compiling and processing the raw event objects. This formatting adheres to predefined standards, such as the emDataStandards. The dataLayer object consolidates information from various tracking objects into a standardized format, ensuring consistency across all applications.

<b> Why Not Implement the dataLayer Object Directly? </b>
</br>
Developers do not implement the dataLayer object directly because the separation of the event tracking and dataLayer stages offers several advantages. It allows for flexibility in tracking diverse events without imposing a rigid structure on developers during the initial data collection phase. The raw, unformatted nature of the event object accommodates the unique requirements of different events and interactions.

By processing the tracking objects into the dataLayer format, we can standardize the information before it is transmitted to analytics tools such as Google Analytics 4 (GA4). This ensures a uniform and organized dataset, facilitating more accurate analysis and reporting. The dataLayer object, therefore, acts as a streamlined and consistent data feed for analytics platforms.

In summary, the distinction between the event object and the dataLayer object is crucial for maintaining flexibility during data collection and standardizing the information for effective analysis, all while preventing data inconsistencies and losses across applications.
</details>


<details>
<summary> What is the difference between the Tracking Library and Tracking Package? </summary>
</br>
The tracking library is the traditional way of tracking events. It is loaded via an entrypoint script that is placed on the target page. It relies on PubSub events that it subscribes to in order to receive events, format them, and then send them to DataCore and push to the dataLayer for GA4. In order to run, the tracking library relies on several external resources which may slow down page performance.

The tracking package is the newest way of tracking events. It is an npm package that is included in every module that we want to track. The modules call a function from within the package and the package will in turn format the event and push it to the dataLayer for GA4. It is significantly smaller and faster which improves performance over the tracking library.
</details>