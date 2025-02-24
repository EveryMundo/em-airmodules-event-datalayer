
<p align="center">
  <a href="" rel="noopener">
 <img src="https://www.everymundo.com/wp-content/uploads/2021/11/EveryMundo-2022-black-2.jpg" alt="EM Logo"></a>
</p>

<h3 align="center">Tracking Package</h3>

<div align="center"></div>

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

**Step 1: Download the npm Package**

Install **@everymundo/airmodules-event-datalayer** by using npm. Open your terminal and run:

```bash
npm install @everymundo/airmodules-event-datalayer
```

**Step 2: Import the Formatter Function into the Project**

In your project file where you plan to implement event tracking, import the formatter function. Add the following line at the top of your file:

```js
import { formatter } from "@everymundo/airmodules-event-datalayer"
```

**Step 3: Construct the Event Object Based on Vertical**

Create an event object that captures the relevant information for the specific event you want to track. Ensure that the object follows the required structure and contains essential details related to the event. Refer to the details below for more information.

**Note:** For fields that contain additional details, such as passenger, guest, or lodging information, the appropriate format is a single object, not an array of objects. If an array is provided, the package will automatically convert it into an object within the data layer.

<details>
<summary>Example</summary>

```js
const eventObject = {
  event: 'viewable_impression',
  module: 'em-booking-mask',
  actionLabel: '',
  originAirportIataCode: 'CMB',
  destinationAirportIataCode: 'SIN',
  currencyCode: 'LKR',
  totalPrice: 5.21,
  totalPriceUSD: '',
  departureDate: '2021-03-13',
  returnDate: '2021-06-14',
  deeplinkSiteEdition: '',
  miles: '',
  timestamp: '2021-02-16T00:00:00.000Z',
  url: 'https://www.srilankan.com/en-lk/',
  passenger: {
    count: 1,
    adultCount: 1,
    youngAdultCount: '',
    childCount: '',
    infantInLapCount: '',
    infantInSeatCount: '',
    overseasFilipinoWorker:  ''
  },
  lodging: {
    cityCode: 'SIN',
    name: 'Intercontinental',
    startDate: '2021-03-13',
    endDate: '2021-03-20',
    roomCount: 2,
    tripLength: 7,
    starRating: 5
  },
  carRentals: {
    provider: 'Hertz',
    brand: 'BMW',
    model: '530i'
  },
  moduleId: '',
  tagName: ''
}
```
</details>
</br>

**Step 4: Call the Function Based on Vertical**

After constructing the event tracking object, use the appropriate function based on the tenant type (vertical) to format and process the event. Pass the event object as the parameter to ensure accurate tracking.

```js
// For Vertical Airlines and Vactions/Packages
formatter.formatAirlines(eventObject);

// For Vertical Hospitality
formatter.formatHotels(eventObject);

// For Vertical Events
formatter.formatEvents(eventObject);
```

These functions are designed to handle specific verticals and ensure proper formatting of the event object. Here's a brief explanation of the process:

-  **Handling Missing Fields:** If the event object is missing values for certain keys, the respective keys will be assigned empty values during the formatting process.

-   **Handling Null Values:** Null values in the event object will be converted to an empty string during the formatting process.

-   **Handling Multiple Values:** If 'eventExperience' contains multiple values (e.g., "The Lounge," "Player Pod"), the function will format them to "MULTIPLE."

-   **Pushing to the dataLayer:** After formatting, the resulting data will be pushed to the dataLayer, making it ready for further processing and analysis by analytics tools.

-   **Handling Nested Fields:** Nested fields should not be sent in the form of "Array of Objects" `[{}]` (e.g., ❌ `page[0].typeName` -> ✅ `page.typeName`). Fields that do not adhere to the standard dataLayer structure will be discarded.

Ensure you choose the correct function based on your application's vertical to maintain consistency in data formatting and tracking. Customize the event object and parameters as needed for your specific tracking requirements.

## 📓 Constructing the Event Object<a name="-constructing-the-event-object"></a>

Events let you measure user interactions on your app; for example, you can measure when someone, clicks on a button or interacts with a filter. The data from events is used to create reports.

**Step 1: Select the Empty Event Object by Vertical**

Identify the appropriate empty event object template based on the vertical or category of the event you intend to track. Different verticals may require specific information to be captured.

<details>
<summary>Airlines, Vacation, Packages</summary>

```js
const eventObject = {
  event: '',
  module: '',
  actionLabel: '',
  originAirportIataCode: '',
  originCountryCode: '',
  destinationAirportIataCode: '',
  destinationCountryCode: '',
  currencyCode: '',
  totalPrice: 0,
  totalPriceUSD: '',
  departureDate: '',
  returnDate: '',
  deeplinkSiteEdition: '',
  miles: '',
  passenger: {
    count: 1,
    adultCount: 1,
    youngAdultCount: '',
    childCount: '',
    infantInLapCount: '',
    infantInSeatCount: '',
    overseasFilipinoWorker:  ''
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
```
</details>

<details>
<summary>Hospitality</summary>

```js
const eventObject = {
  event: '',
  module: '',
  actionLabel: '',
  currencyCode: '',
  totalPrice: 0,
  totalPriceUSD: 0,
  startDate: '',
  endDate: '',
  roomAccesibility: true,
  guest: {
    count: 0,
    adultCount: 0
  },
  room: {
    count: 0,
    type: ''
  },
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
  currencyCode: '',
  totalPrice: 0,
  totalPriceUSD: 0,
  startDate: '',
  endDate: '',
  roomAccesibility: true,
  guest: {
    count: 0,
    adultCount: 0
  },
  room: {
    count: 0,
    type: ''
  },
}
```
</details>

**Step 2: Decide Which Events to Track in the 'event' Field**

Determine the key event you want to track and assign them to the 'event' field. This field defines the type of user interaction and the specific action taken. For example:

```js
const eventObject = {
  event: 'viewable_impression',
  module: 'em-booking-mask',
  ...
};
```

Adjust the value of 'event' to accurately reflect the nature of your tracked events. Refer to [Types of Events](#types-of-events) below for more information. 

**Step 3: Set Up Event Parameters**

The event object includes several parameters to provide detailed context to a specific event for better analysis. For instance:

```js
const eventObject = {
  event: 'viewable_impression',
  module: 'em-booking-mask',
  actionLabel: '',
  originAirportIataCode: 'CMB',
  destinationAirportIataCode: 'SIN',
  currencyCode: 'LKR',
  totalPrice: 5.21,
  ...
};
```

Refer to [Event Object Parameters](#event-object-parameters) below for a detailed explanation of each parameter, and which ones are required.

### Types of events<a name="types-of-events"></a>

> **Note: Automatically Collected and Recommended Events**
>
> **Automatically collected events** are events that are collected by default. These events include:
> 
> - **Pageviews:** A pageview is recorded when a user loads a new page.
> - **Viewable impressions:** A viewable impression is recorded when a module is displayed on the user's screen.
>
> **Recommended events** are events that you implement, but that have predefined names and parameters. These events unlock existing and future reporting possibilities. The following is a list of recommended events that you can track using the tracking package:


<details>
<summary>For Airlines and Vactions/Packages</summary>

| Event                   | Description                                                                                           |
|-------------------------|-------------------------------------------------------------------------------------------------------|
| viewable_impression     | An element is seen on the user's browser                                                              |
| select_origin           | Origin (From) field updated                                                                           |
| select_destination      | Destination (To) field updated                                                                        |
| select_departure_date   | Departure date field updated                                                                          |
| select_return_date      | Return date field updated                                                                             |
| select_date_range       | Range between departure and return dates updated                                                      |
| select_journey_type     | Journey type field updated                                                                            |
| select_miles            | User changes the miles limit                                                                          |
| select_fare_class       | User changes fare class in the module. This includes branded classes such as "Basic Economy", "Main Cabin", "Economy Light", etc. |
| select_currency | Currency field updated                                                                    |
| selected_travel_interest| A travel interest was selected                                                                        |
| select_interest         | User selects travel interest (Tracking Package)                                                       |
| select_stops         |   Number of stops selected                       |
| click_out               | User clicks on one link of the content module                                                         |
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
| select_date_range     | Range between check-in and check-out dates updated    |
| select_night          | Number of nights filter is updated                    |
| select_property       | Hotel property updated                                |
| select_start_date     | Hotel check-in date updated                           |
| select_end_date       | Hotel check-out date updated                          |
| select_room_guest     | Hotel guests field updated                            |
| select_accessibility  | User marks the accessibility check box in the module  |
| select_redemption     | User selects redemption as payment method             |
| select_stay_length    | User selects stay length of the trip                  |
| select_offer          | Special offer is selected in the low fares calendar   |
| select_stops         |   Number of stops selected                       |
| select_currency       | Currency field updated                                |       
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
| select_date_range     | Date range updated                                    |
| select_session        | Event sessions field updated                          |
| select_category       | Event category selected                               |
| select_experience     | Event experience field updated                        |
| select_location       | Event location field updated                          |
| select_budget         | A budget was selected                                 |
| select_currency       | Currency field updated                                |
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
| select_stops         |   Number of stops selected                       |

</details>

Custom events are events that you define. Make sure to only create custom events when no other events work for your use case. Custom events do not show up in most standard reports and require a custom request for meaningful analysis. (we give guidelines in case nothing on our list is appropriate)

To track a custom event, simply add in the event object an event name and/or module name that is not on the recommended list.

The event object must contain the following properties:
* **event:** The name of the event.
* **module:** The name of the module.

For example, the following event object would track a custom event called "product_detail_clicked" for a new module:

```js
const eventObject = {
  event: 'product_detail_clicked',
  module: '',
  ...
}
```

> **Note: Guidelines for Tracking Custom Events**
>
> When tracking custom events, it is important to follow these guidelines:
> 
> - **Use descriptive event names.** This will help you to easily identify and analyze your event data.
> - **Avoid tracking too many custom events.** This can make your event data difficult to analyze.
> - **Only track custom events that are important to your business.** This will help you to focus on the most important events and to get the most out of your tracking data.


### Event Object Parameters<a name="event-object-parameters"></a>

This section provides a detailed explanation of the parameters used in the event object, along with their examples, definitions, and whether they are required.

* The parameters marked as required need to be included in all events.

* The viewable-impression events will only collect the required parameters when it has the asterisk after “Yes“.

* The interaction events, such as select-departure-date, will only populate the relevant parameters to the event itself and what has already been filtered in the module.

* Parameters that are not being used can be removed from the event object.



<details>
<summary> Common Parameters Across All Verticals </summary>

| Parameter                                | Example                   | Definition                                                                                                                                                                                                             | Required  |
|------------------------------------------|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| event                                    | viewable-impression       | Name of the event performed                                                                                                                                                                                            | Yes *     |
| module                                   | em-booking-mask          | Name of the module                                                                                                                                                                                                     | Yes *     |
| actionLabel                              | ...                       | Populated based on what was selected in the user interaction. See details below.                                                                                                                                       | Optional  |
| currencyCode                             | USD                       | The currency (in 3-letter ISO 4217 format) of the price                                                                                                                                                                | Yes       |
| totalPrice                               | 399.37                    | The total price for the reservation or ticket, including applicable taxes, shipping, etc                                                                                                                               | Yes       |
| totalPriceUsd                            | 530.62                    | The total price for the reservation or ticket in USD, including applicable taxes, shipping, etc.                                                                                                                       | Yes       |
| startDate                                | 2022-04-01                | Date of check-in                                                                                                                                                                                                       | Yes       |
| endDate                                  | 2022-04-07                | Date of check-out                                                                                                                                                                                                      | Yes       |
| timestamp                                | 2021-02-16T17:41:43.200Z  | Timestamp of the event sent                                                                                                                                                                                            | Yes       |
| url                                      | https://www.example.com   | Full URL in lowercase (without query parameters to avoid collecting personal data by mistake)                                                                                                                          | Yes       |
| adultCount, youngAdultCount, childCount  | 1                         | Amount of adult/young adult/child passengers                                                                                                                                                                           | Yes       |
| count                                    | 3                         | Amount of guests for a specific category                                                                                                                                                                               | Yes       |
| discountCode                             | AFFBFAN                   | Discount promotion code                                                                                                                                                                                                | Optional  |
| typeName                                 | CUSTOM_PAGE               | Name of the type of page template                                                                                                                                                                                      | No        |
| tagName                                  |      Pricing Widget - Custom Page Test      | Name given by Standard Fare Modules or Front Components. *Required if there is a name or tag associated with the module other than the module name. E.g. A module that only displays miles and has been named "Miles"                                                                                                                                                   | Optional * |

</details>





<details>
<summary>Airlines, Packages, Vacation Vertical Parameters</summary>

| Parameter                               | Example                                                           | Definition                                                                                                                                                                                                            | Required                                                              |
|-----------------------------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| originAirportIataCode                   | SFO                                                               | IATA identifier for the departure/origin airport                                                                                                                                                                      | Yes                                                                   |
| destinationAirportIataCode              | JFK                                                               | IATA identifier for the arrival/destination airport                                                                                                                                                                   | Yes                                                                   |
| originAirportIataCode                   | US                                                                | IATA identifier for the country of departure/origin airport                                                                                                                                                           | Yes                                                                   |
| destinationAirportIataCode              | ES                                                                | IATA identifier for the country of arrival/destination airport                                                                                                                                                        | Yes                                                                   |
| currencyCode                            | USD                                                               | The currency (in 3-letter ISO 4217 format) of the price                                                                                                                                                               | Yes                                                                   |
| configuration                           | {redemptionType: 'POINTS', fareClass: 'ECONOMY', brandedFare: ''} | Sent as an object. This is the configuration of the Dynamic Price airModule                                                                                                                                           | Optional - For DPA modules only                                       |
| totalPrice                              | 399.37                                                            | The total price for the flight ticket, including applicable taxes, shipping, etc.                                                                                                                                     | Yes                                                                   |
| totalPriceUsd                           | 530.62                                                            | The total price for the flight ticket in USD, including applicable taxes, shipping, etc.                                                                                                                              | Yes                                                                   |
| departureDate                           | 2022-04-01                                                        | Date of departure                                                                                                                                                                                                     | Yes                                                                   |
| returnDate                              | 2022-04-07                                                        | Date of return                                                                                                                                                                                                        | Yes                                                                   |
| discountCode*                           | AFFBFAN                                                           | Discount promotion code                                                                                                                                                                                               | Optional                                                              |
| deeplinkSiteEdition                     | en-HK                                                             | Site edition combination of ISO codes for language and country provided in the URL                                                                                                                                    | Yes                                                                   |
| miles                                   | 25790                                                             | Flight distance in miles                                                                                                                                                                                              | Yes                                                                   |
| timestamp                               | 2021-02-16T17:41:43.200Z                                          | Timestamp of the event sent                                                                                                                                                                                           | Yes                                                                   |
| url                                     | https://example.com                                               | Full URL in lowercase (without query parameters to avoid collecting personal data by mistake)                                                                                                                         | Yes                                                                   |
| adultCount, youngAdultCount, childCount | 1                                                                 | Amount of adult/young adult/child passengers                                                                                                                                                                          | Yes                                                                   |
| count                                   | 3                                                                 | Amount of passengers for a specific category                                                                                                                                                                          | Yes                                                                   |
| cityCode                                | SIN                                                               | The city code for the selected property (in 2-letter codes from ISO 3166-1)                                                                                                                                           | Yes                                                                   |
| name                                    | Intercontinental                                                  | Name of the selected property.                                                                                                                                                                                        | Yes                                                                   |
| startDate                               | 2021-03-13                                                        | Date of check-in                                                                                                                                                                                                      | Yes                                                                   |
| endDate                                 | 2021-03-20                                                        | Date of check-out                                                                                                                                                                                                     | Yes                                                                   |
| roomCount                               | 2                                                                 | Amount of rooms selected                                                                                                                                                                                              | Yes                                                                   |
| tripLength                              | 7                                                                 | Length of stay/trip                                                                                                                                                                                                   | Yes                                                                   |
| starRating                              | 5                                                                 | An official rating for the property                                                                                                                                                                                   | Yes                                                                   |
| provider                                | Hertz                                                             | Name of the car rental company                                                                                                                                                                                        | Optional - Required only if there is car rental information available |
| brand                                   | BMW                                                               | Make of the rental car                                                                                                                                                                                                | Optional - Required only if there is car rental information available |
| model                                   | 530i                                                              | Model of the rental car                                                                                                                                                                                               | Optional - Required only if there is car rental information available |
| overseasFilipinoWorker                  | 1                                                                 | Numeric value indicating if the passenger is an Overseas Filipino Worker (OFW)                                                                                                                                        | Optional                                                              |
| moduleId                                | X12345                                                            | Unique ID used for the module. Only required for DPA                                                                                                                                                                  | Yes * - for DPA modules only                                          |
| tagName                                 | Pricing Widget - Custom Page Test                                 | Name given by Standard Fare Modules or Front Components. *Required if there is a name or tag associated with the module other than the module name. E.g. A module that only displays miles and has been named "Miles" | Optional *                                                            |

</details>



<details>
<summary>Hospitality Vertical Parameters</summary>

| Parameter              | Example                          | Definition                                                                                             | Required |
|------------------------|----------------------------------|--------------------------------------------------------------------------------------------------------|----------|
| module                 | open-booking-popup-abstract      | Name of the event                                                                                      | Yes      |
| actionLabel            | open-booking-popup               | Name of the event action                                                                               | Yes      |
| currencyCode           | USD                              | The currency (in 3-letter ISO 4217 format) of the price.                                               | Yes      |
| totalPrice             | 399.37                           | The total price for the reservation or ticket, including applicable taxes, shipping, etc               | Yes      |
| totalPriceUsd          | 530.62                           | The total price for the reservation or ticket in USD, including applicable taxes, shipping, etc.       | Yes      |
| startDate              | 2022-04-01                       | Date of check in                                                                                       | Yes      |
| endDate                | 2022-04-07                       | Date of check out                                                                                      | Yes      |
| timestamp              | 2021-02-16T17:41:43.200Z         | timestamp of the event sent                                                                            | Yes      |
| url                    | https://www.holidayinn.com/miami | Full url in lowercase (without query parameters to avoid collecting personal data by mistake)          | Yes      |
| adult                  | 1                                | Amount of adult guests                                                                                 | Yes      |
| child                  | 1                                | Amount of child guests                                                                                 | Yes      |
| count (in guest array) | 3                                | Amount of guests for a specific category                                                               | Yes      |
| count (in room array)  |                                  | Amount of rooms selected                                                                               | Yes      |
| type                   | Suite                            | Room type                                                                                              | Yes      |
| discountCode           | AFFBFAN                          | Discount promotion code                                                                                | Yes      |
| typeName               | CUSTOM_PAGE                      | Name of the type of page template                                                                      | Yes      |

</details>

<details>
<summary>Events Vertical Parameters</summary>

| Parameter                               | Example                           | Definition                                                                                            | Required                                                                                                                                                   |
|-----------------------------------------|-----------------------------------|-------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| module                                  | open-booking-popup-abstract       | Name of the interacted module                                                                         | Yes                                                                                                                                                        |
| actionLabel                             | Book Now                          | Name of the event action                                                                              | Yes                                                                                                                                                        |
| currencyCode                            | USD                               | The currency (in 3-letter ISO 4217 format) of the price.                                              | Yes                                                                                                                                                        |
| totalPrice                              | 399.37                            | The total price for the reservation or ticket, including applicable taxes, shipping, etc              | Yes                                                                                                                                                        |
| totalPriceUsd                           | 530.62                            | The total price for the reservation or ticket in USD, including applicable taxes, shipping, etc.      | Yes                                                                                                                                                        |
| startDate                               | 2022-04-01                        | Date of check in                                                                                      | Yes                                                                                                                                                        |
| endDate                                 | 2022-04-07                        | Date of check out                                                                                     | Yes                                                                                                                                                        |
| timestamp                               | 2021-02-16T17:41:43.200Z          | timestamp of the event sent                                                                           | Yes                                                                                                                                                        |
| url                                     | https: //www.srilankan.com/en-lk/ | Full url in lowercase (without query parameters to avoid collecting personal data by mistake)         | Yes                                                                                                                                                        |
| adultCount, youngAdultCount, childCount | 1                                 | Amount of adult/young adult/child passengers                                                          | Yes                                                                                                                                                        |
| count                                   | 3                                 | Amount of guests for a specific category                                                              | Yes                                                                                                                                                        |
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
<summary>Airlines, Vacation, Packages </summary>

```js
const eventObject = {
  event: 'viewable_impression',
  module: 'em-booking-mask',
  actionLabel: '',
  originAirportIataCode: 'MAD',
  originCountryCode: 'ES'
  destinationAirportIataCode: 'MIA',
  destinationCountryCode: 'US'
  currencyCode: 'LKR',
  totalPrice: 5.21,
  totalPriceUSD: '',
  departureDate: '2021-03-13',
  returnDate: '2021-06-14',
  deeplinkSiteEdition: '',
  miles: '',
  timestamp: '2021-02-16T00:00:00.000Z',
  url: 'https://www.srilankan.com/en-lk/',
  passenger: {
    count: 1,
    adultCount: 1,
    youngAdultCount: '',
    childCount: '',
    infantInLapCount: '',
    infantInSeatCount: ''
  },
  lodging: {
    cityCode: 'SIN',
    name: 'Intercontinental',
    startDate: '2021-03-13',
    endDate: '2021-03-20',
    roomCount: 2,
    tripLength: 7,
    starRating: 5
  },
  carRentals: {
    provider: 'Hertz',
    brand: 'BMW',
    model: '530i'
  },
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
  module: 'em-booking-mask-abstract',
  actionLabel: '',
  currencyCode: 'USD',
  totalPrice: 900.55,
  totalPriceUSD: 900.55,
  startDate: '2022-04-01',
  endDate: '2022-04-07',
  roomAccesibility: true,
  timestamp: '2021-02-16T17:41:43.200Z',
  url: 'https://www.hyatt.com/en/miami',
  guest: {
    count: 1,
    adult: 1
  },
  room: {
    count: 1,
    type: ''
  }
}
```
</details>

<details>
<summary>Events</summary>

```js
const eventObject = {
  event: 'search_initiation',
  module: 'em-booking-mask-abstract',
  actionLabel: null,
  currencyCode: 'LKR',
  totalPrice: null,
  totalPriceUSD: null,
  startDate:

 '2021-03-13',
  endDate: '2021-03-14',
  timestamp: '2021-02-16T17:41:43.200Z',
  url: 'https://www.srilankan.com/en-lk/',
  passenger: {
    count: 1,
    adultCount: 1,
    youngAdultCount: null,
    childCount: null
  }
}
```
</details>

## 🔨 Testing the Tracking Implementation <a name ="-testing-the-tracking-implementation-"></a> 

> **Note: Tracking Implementation Options**
>
> Understand that legacy modules may employ the Tracking Library (TL), Tracking Package (TP), or both in their implementation. The focus should be on having an "airmodule" data layer for each user interaction, ensuring events are collected in Google Analytics 4 (GA4).

<details>
<summary> How to check the current version of the Tracking Package </summary>
<br>
To check the current version of the Tracking Package in use, follow these steps:

1. **Using the `tp_v` function in the browser console**:
   - Open the browser's developer tools (typically by pressing `F12` or `Ctrl+Shift+I`).
   - Navigate to the "Console" tab.
   - Type `tp_v` and press `Enter`.
   - The console will display the current tracking package version used by VG, airmodules, and standard airmodules on the page.

**Notes for `tp_v`:**
- The `tp_v` function shows the current Tracking Package version dynamically based on the component loaded on the page during scroll.
- Since VG, air modules, and standard modules might use different Tracking Package versions, the version displayed may vary.
- This behavior is subject to improvement in future versions.

</details>

<details>
<summary> How to test the event object being sent </summary>
<br>
To test if the event object is being sent correctly, you can use the following methods:

1. **Using the `tp_debug` function**:
   - The `tp_debug` function is available from Tracking Package version 1.3.1 and later.
   - Open the browser's developer tools and go to the "Console" tab.
   - Type `tp_debug=true` and press `Enter`.
   - This will activate debugging mode, logging the event object to the console with each interaction. 
   - This feature helps determine whether an airModule is being tracked via the Tracking Package or the older Tracking Library, ensuring the event object is correctly formatted and sent.

   **Note**: 
   - If you notice PubSub events being sent for a particular module, this indicates that the module is using the Tracking Library instead of the Tracking Package. 
   - To check for PubSub events, enter the following command in the console:
     ```
     EM.utils.PubSub.subscribe('em', function(msg, data){console.log("MSG",msg,"\n Data: ", data)});
     ```
   - This command will log any PubSub events, displaying both the message and data, allowing you to confirm whether the Tracking Library is being used.

2. **Inspecting the Data Layer**:
   - Interact with the modules as users would and observe the corresponding data layer events in the console.
   - To inspect the formatted result, open your browser's console and type `dataLayer`.
   - This will reveal the structured data layer, allowing you to review and confirm that the necessary events are captured in the "airmodule" data layer format.

3. **Validating GA4 Integration**:
   - Verify the successful collection and transmission of events to Google Analytics 4 (GA4).
   - Open the "Network" tab in the developer tools and enter `collect` in the filter.
   - This will display the network requests sent to GA4, allowing you to confirm that the required data is being sent correctly.

</details>

<details>
<summary> How to verify `fsi` (search_initiation) events </summary>
<br>
To verify `search_initiation` events, follow these additional steps:

1. **Prevent Page Redirection**:
   - Before initiating a search, open the browser’s developer tools and go to the "Console" tab.
   - Type the following command and press `Enter`:
     ```
     window.onbeforeunload = function (e) { e = e || window.event; return ''; }
     ```
   - This command will prompt a popup when a page change is attempted, asking if you want to leave the page. Click "Cancel" to stay on the page.

2. **Test the Event**:
   - Perform the search action and observe the event object details in the console, without being redirected to the search results page.
   - This method allows you to capture and inspect the `fsi` event object for correctness.

</details>

## ❓ FAQ<a name="-faq"></a> 

<details>
<summary> What is the difference between the event tracking object and the dataLayer object? Why do developers not implement the dataLayer object directly? </summary>
<br>
The event object and the dataLayer object serve distinct roles in the tracking process to standardize information across applications and prevent data loss.
<br></br>

**Event Object:** 
</br>
The event object is essentially the raw, unformatted input that developers implement for each specific event they want to track in an application. It serves as the initial stage of data collection, capturing essential information about user interactions or system events. Developers use the event object to provide detailed context and data related to specific actions within the application.

**dataLayer Object:**
</br>
On the other hand, the dataLayer object is the formatted output that results from compiling and processing the raw event objects. This formatting adheres to predefined standards, such as the emDataStandards. The dataLayer object consolidates information from various tracking objects into a standardized format, ensuring consistency across all applications.

**Why Not Implement the dataLayer Object Directly?**
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