#!/usr/bin/env node

const axios = require("axios");
const config = require("./config.js");

async function getGeoLocation(query) {
  const url = `${config.BASE_URL}/search?q=${encodeURIComponent(
    query
  )}&format=${config.FORMAT}&addressdetails=1`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.length > 0) {
      const location = data[0];
      return {
        latitude: location.lat,
        longitude: location.lon,
        address: location.display_name,
        type: location.type,
        name: location.display_name,
        country: location.address.country,
        city:
          location.address.city ||
          location.address.town ||
          location.address.village,
        country_code: location.address.country_code,
        boundingbox: location.boundingbox,
      };
    } else {
      return { error: "Location not found" };
    }
  } catch (error) {
    return { error: "Error fetching data", details: error.message };
  }
}

async function getReverseGeoLocation(lat, lon) {
  const url = `${config.BASE_URL}/reverse?format=${config.FORMAT}&lat=${lat}&lon=${lon}`;

  try {
    const response = await axios.get(url);
    const location = response.data;

    if (location && location.display_name) {
      return {
        latitude: location.lat,
        longitude: location.lon,
        address: location.display_name,
        type: location.type,
        name: location.display_name,
        country: location.address.country,
        city:
          location.address.city ||
          location.address.town ||
          location.address.village,
        country_code: location.address.country_code,
        boundingbox: location.boundingbox,
      };
    } else {
      return { error: "Address not found" };
    }
  } catch (error) {
    return { error: "Error fetching data", details: error.message };
  }
}

async function searchLocation(query) {
  const url = `${config.BASE_URL}/search?q=${encodeURIComponent(
    query
  )}&format=${config.FORMAT}&addressdetails=1&limit=5&polygon_svg=1`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.length > 0) {
      return data.map((location) => ({
        latitude: location.lat,
        longitude: location.lon,
        address: location.display_name,
        type: location.type,
        name: location.display_name,
        country: location.address.country,
        city:
          location.address.city ||
          location.address.town ||
          location.address.village,
        country_code: location.address.country_code,
        boundingbox: location.boundingbox,
      }));
    } else {
      return { error: "No locations found" };
    }
  } catch (error) {
    return { error: "Error fetching data", details: error.message };
  }
}

// Export the functions for use as a module
module.exports = { getGeoLocation, getReverseGeoLocation, searchLocation };

// If the script is run directly, execute the CLI functionality
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 1) {
    const query = args[0];
    // Forward geocoding
    getGeoLocation(query).then((result) => {
      console.log(JSON.stringify(result, null, 2));
    });
  } else if (args.length === 2 && !isNaN(args[0]) && !isNaN(args[1])) {
    // Reverse geocoding
    const [lat, lon] = args;
    getReverseGeoLocation(lat, lon).then((result) => {
      console.log(JSON.stringify(result, null, 2));
    });
  } else if (args.length >= 2 && args[0] === "search") {
    const query = args.slice(1).join(" ");
    searchLocation(query).then((result) => {
      console.log(JSON.stringify(result, null, 2));
    });
  } else {
    console.error(
      JSON.stringify(
        {
          error:
            "Usage: geo <country,city,street,zipcode> OR geo <lat> <lon> OR geo search <query>",
        },
        null,
        2
      )
    );
    process.exit(1);
  }
}
