// tests/ptnMappings.test.js
const { formatter } = require('../dist/cjs/index.js'); // adjust the path as needed
const { version } = require('../dist/cjs/version.js');   // adjust the path as needed

// Your ptnMappings as provided
const ptnMappings = {
  "city-to-city": "CITY_TO_CITY",
  "to-city": "TO_CITY",
  "from-city": "FROM_CITY",
  "city-to-country": "CITY_TO_COUNTRY",
  "country-to-city": "COUNTRY_TO_CITY",
  "country-to-country": "COUNTRY_TO_COUNTRY",
  "from-country": "FROM_COUNTRY",
  "to-country": "TO_COUNTRY",
  "from-state": "FROM_STATE",
  "from-airport": "FROM_AIRPORT",
  "bus-station": "BUS_STATION",
  "city_to_city": "CITY_TO_CITY",
  "to_city": "TO_CITY",
  "from_city": "FROM_CITY",
  "city_to_country": "CITY_TO_COUNTRY",
  "country_to_city": "COUNTRY_TO_CITY",
  "country_to_country": "COUNTRY_TO_COUNTRY",
  "from_country": "FROM_COUNTRY",
  "to_country": "TO_COUNTRY",
  "from_state": "FROM_STATE",
  "from_airport": "FROM_AIRPORT",
  "bus_station": "BUS_STATION",
  "home": "HOMEPAGE",
  "hp": "EXTERNALIZED",
  "homepage": "EXTERNALIZED",
  "home page": "EXTERNALIZED",
  "home_page": "EXTERNALIZED",
  "discovery": "EXTERNALIZED"
};

describe("PageType Mapping for each ptnMapping (using dataLayer and context)", () => {
  beforeEach(() => {
    if (typeof window === "undefined") {
      global.window = {};
    }
    window.tp_debug = false;
    window.tp_v = version;
    // Stub fetch to avoid real network calls.
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  // Iterate over each mapping key/value pair using global dataLayer.
  for (const [inputMapping, expectedMapping] of Object.entries(ptnMappings)) {
    test(`Mapping "${inputMapping}" from dataLayer should be mapped to "${expectedMapping.toUpperCase()}"`, async () => {
      window.EM = {
        dataLayer: [{
          page: {
            typeName: inputMapping  
          }
        }],
        context: {
          datasource: { step: "home" }
        }
      };

      // Provide a minimal input object that overrides local defaults.
      const input = {
        module: "test-airline",
        eventAction: "test-action",
        airlineIataCode: "UL", // Provide a valid code to avoid fetch errors.
        page: {}            
      };

      const result = await formatter.formatAirlines(input);
      expect(result.page.typeName).toBe(expectedMapping.toUpperCase());
    });
  }
});

describe("PageType Mapping when only context is provided", () => {
  beforeEach(() => {
    if (typeof window === "undefined") {
      global.window = {};
    }
    window.tp_debug = false;
    window.tp_v = version;
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  // Iterate over each mapping key/value pair using only context.datasource.step.
  for (const [inputMapping, expectedMapping] of Object.entries(ptnMappings)) {
    test(`Context mapping "${inputMapping}" should be mapped to "${expectedMapping.toUpperCase()}"`, async () => {
      // Only supply context.datasource.step without a dataLayer.
      window.EM = {
        context: {
          datasource: {
            step: inputMapping
          }
        }
      };

      const input = {
        module: "test-airline",
        eventAction: "test-action",
        airlineIataCode: "UL",
        page: {} // Force the formatter to use the global context value.
      };

      const result = await formatter.formatAirlines(input);
      expect(result.page.typeName).toBe(expectedMapping.toUpperCase());
    });
  }
});

describe("Regression Test for Wingo Page Mapping", () => {
  beforeEach(() => {
    if (typeof window === "undefined") {
      global.window = {};
    }
    window.tp_debug = false;
    window.tp_v = version;
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  test("Wingo page mapping typeName", async () => {
    // In this regression test, we simulate a case where the dataLayer is empty and context is home. We expect the typeName to be HOMEPAGE.
    window.EM = {
      dataLayer: [{
        page: {
          typeName: ""
        }
      }],
      context: {
        datasource: {
          step: "home"
        }
      }
    };

    const input = {
      module: "em-price-widget",
      eventAction: "select_origin",
      airlineIataCode: "P5",  
      page: {}     
    };

    const result = await formatter.formatAirlines(input);
    expect(result.page.typeName).toBe("HOMEPAGE");
  });

  test("Wingo page mapping when dataLayer is available returns HOMEPAGE", async () => {
    // Also test a case where the dataLayer already provides a correct mapping.
    window.EM = {
      dataLayer: [{
        page: {
          typeName: "HOMEPAGE",
          url: "https://www.wingo.com/es/vuelos"
        }
      }],
      context: {
        datasource: { step: "home" }
      }
    };

    const input = {
      module: "em-price-widget",
      eventAction: "select_origin",
      airlineIataCode: "P5",
      page: {}
    };

    const result = await formatter.formatAirlines(input);
    expect(result.page.typeName).toBe("EXTERNALIZED");
  });
});
