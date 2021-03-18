// Current Weather: Get current weather data.
// http://api.weatherstack.com/current?access_key=e29a0fe05006951d5ec2fd2bb25aec94&query=40.1234,-7.1233

// Mapbox token: pk.eyJ1IjoidG9tYXM5OWJhdGlzdGEiLCJhIjoiY2ttNDNxcnNrMDB3bzJwcTg1NXY4MmQyeiJ9.UJaP2Byl_sP7i3iJyHYF1Q
// /geocoding/v5/{endpoint}/{search_text}.json

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2];

if (location) {
  geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return console.log(error);
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log(location);
      console.log(forecastData);
    });
  });
} else {
  console.log("no location passed on arguments");
}
