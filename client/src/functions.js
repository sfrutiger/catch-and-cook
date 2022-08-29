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

export const roundHour = (nearestDate, time) => {
  let timeArray = time.split(":").map(Number);
  if (timeArray[1] >= 30 && timeArray[0] === 23) {
    timeArray[0] = 0;
    roundDate(nearestDate);
  } else if (timeArray[1] >= +30 && timeArray[0] !== 23) {
    timeArray[0] = timeArray[0] + 1;
  }
  return timeArray[0];
};

export const retrieveWeather = async (
  nearestHour,
  coordinates,
  nearestDate
) => {
  const response = await axios.get(
    // there is a bug with this API that won't return current conditions for exactly 00:00:00, so by default the minutes are set to :01.
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${coordinates[1]}%2C%20${coordinates[0]}/${nearestDate}T${nearestHour}:01:00?key=${weatherAPIKey}&include=current`
  );
  return response.data;
};

//get general location from geographic coordinates
export const reverseGeocode = (coordinates) => {
  const response = axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[1]},${coordinates[0]}&key=${googleMapsAPIKey}&result_type=locality`
  );
  return response;
};
