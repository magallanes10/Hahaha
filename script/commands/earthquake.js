const axios = require('axios');

module.exports.config = {
  name: "earthquake",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell Magallanes",
  description: "Shows recent earthquakes",
  usePrefix: false,
  commandCategory: "utility",
  usages: "[search query]",
  usePrefix: true,
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  try {
    let searchTerm = args.join(" ").toLowerCase(); // Join arguments to get the search query if provided

    // Fetch the earthquake data
    let response = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
    let { features } = response.data;

    // If a search term was provided, filter results to include only earthquakes that match the search term
    if(searchTerm) {
      features = features.filter(feature =>
        feature.properties.place.toLowerCase().includes(searchTerm)
      );
    }

    // Map the features to a string format for display
    let earthquakesData = features.map(feature => {
      let { mag, place, time, url } = feature.properties;
      let date = new Date(time);
      return `Magnitude: ${mag.toFixed(1)}\nPlace: ${place}\nTime: ${date.toUTCString()}\nDetails: ${url}`;
    }).join('\n\n');

    if (earthquakesData.length === 0) {
      api.sendMessage("No earthquakes found matching your query.", event.threadID, event.messageID);
    } else {
      api.sendMessage(earthquakesData, event.threadID, event.messageID);
    }
  } catch (error) {
    console.log(error);
    api.sendMessage("An error occurred while fetching earthquake data.", event.threadID, event.messageID);
  }
};