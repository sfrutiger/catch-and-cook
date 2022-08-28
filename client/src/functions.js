import axios from "axios";

const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;
const googleMapsAPIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const roundDate = (nearestDate) => {
  nearestDate = Date.parse(nearestDate);
  nearestDate = nearestDate + 86400000;
  nearestDate = new Date(nearestDate);
  nearestDate = nearestDate.toISOString("en-US", { timeZone: "GMT" });
  nearestDate = nearestDate.split("T");
  nearestDate = nearestDate[0];
  return nearestDate;
};

export const roundHour = (nearestHour, time) => {
  console.log(nearestHour);
  nearestHour = time.split(":").map(Number);
  if (nearestHour[1] >= 30 && nearestHour[0] === 23) {
    nearestHour[0] = 0;
    roundDate();
  } else if (nearestHour[1] >= +30 && nearestHour[0] !== 23) {
    nearestHour[0] = nearestHour[0] + 1;
  }
  return nearestHour;
};

export const retrieveWeather = async (
  setConditions,
  coordinates,
  nearestDate,
  nearestHour
) => {
  const response = await axios.get(
    // there is a bug with this API that won't return current conditions for exactly 00:00:00, so by default the minutes are set to :01.
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${coordinates[1]}%2C%20${coordinates[0]}/${nearestDate}T${nearestHour[0]}:01:00?key=${weatherAPIKey}&include=current`
  );
  setConditions(response);
};

export const reverseGeocode = (coordinates) => {
  const response = axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[1]},${coordinates[0]}&key=${googleMapsAPIKey}&result_type=locality`
  );
  return response;
};
