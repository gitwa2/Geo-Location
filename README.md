# Hero Geo Location CLI

Hero Geo Location CLI is a simple command-line tool to get geographical coordinates (latitude and longitude) from an address, get an address from coordinates, or search for locations using the Nominatim OpenStreetMap API.

## Installation

To install the package globally, run:

```sh
npm install -g my-geo-location-cli
```

To use the package in your JavaScript project, run:

```sh
npm install my-geo-location-cli
```

## Usage

### CLI

To get the geographical coordinates of an address, use the following command:

```sh
geo "country,city,street,zipcode"
```

To get the address from geographical coordinates, use the following command:

```sh
geo <lat> <lon>
```

To search for locations using a query, use the following command:

```sh
geo search "query"
```

### JavaScript Module

To get the geographical coordinates of an address in your JavaScript code, use the following code:

```javascript
const {
  getGeoLocation,
  getReverseGeoLocation,
  searchLocation,
} = require("my-geo-location-cli");

// Forward geocoding
getGeoLocation("country,city,street,zipcode")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// Reverse geocoding
getReverseGeoLocation(lat, lon)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// Search locations
searchLocation("query")
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Examples

### CLI Example

#### Forward Geocoding

```sh
geo "USA, New York, 5th Avenue, 10001"
```

Output:

```json
{
  "latitude": "40.7127281",
  "longitude": "-74.0060152",
  "address": "5th Avenue, New York, NY 10001, USA",
  "type": "road",
  "name": "5th Avenue, New York, NY 10001, USA",
  "country": "United States",
  "city": "New York",
  "country_code": "us",
  "boundingbox": ["40.7127281", "40.7127281", "-74.0060152", "-74.0060152"]
}
```

#### Reverse Geocoding

```sh
geo -34.44076 -58.70521
```

Output:

```json
{
  "latitude": "-34.44076",
  "longitude": "-58.70521",
  "address": "Some address in Buenos Aires, Argentina",
  "type": "place",
  "name": "Some address in Buenos Aires, Argentina",
  "country": "Argentina",
  "city": "Buenos Aires",
  "country_code": "ar",
  "boundingbox": ["-34.44076", "-34.44076", "-58.70521", "-58.70521"]
}
```

#### Search Location

```sh
geo search "rewe Bahnhofstraße berlin"
```

Output:

```json
[
  {
    "latitude": "52.4586902",
    "longitude": "13.5772772",
    "address": "REWE, 33-38, Bahnhofstraße, Dammvorstadt, Köpenick, Treptow-Köpenick, Berlin, 12555, Deutschland",
    "type": "supermarket",
    "name": "REWE, 33-38, Bahnhofstraße, Dammvorstadt, Köpenick, Treptow-Köpenick, Berlin, 12555, Deutschland",
    "country": "Deutschland",
    "city": "Berlin",
    "country_code": "de",
    "boundingbox": ["52.4585902", "52.4587902", "13.5771772", "13.5773772"]
  },
  {
    "latitude": "52.4577394",
    "longitude": "13.5789184",
    "address": "REWE City, 23-25, Bahnhofstraße, Dammvorstadt, Köpenick, Treptow-Köpenick, Berlin, 12555, Deutschland",
    "type": "supermarket",
    "name": "REWE City, 23-25, Bahnhofstraße, Dammvorstadt, Köpenick, Treptow-Köpenick, Berlin, 12555, Deutschland",
    "country": "Deutschland",
    "city": "Berlin",
    "country_code": "de",
    "boundingbox": ["52.4576394", "52.4578394", "13.5788184", "13.5790184"]
  }
]
```

### JavaScript Example

```javascript
const {
  getGeoLocation,
  getReverseGeoLocation,
  searchLocation,
} = require("my-geo-location-cli");

// Forward geocoding
getGeoLocation("Germany, Berlin, Unter den Linden, 10117")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// Reverse geocoding
getReverseGeoLocation(-34.44076, -58.70521)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// Search locations
searchLocation("Unter den Linden 1 Berlin")
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Author

Milad Davoodabadi

## License

ISC
