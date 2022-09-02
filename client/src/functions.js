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

//get general location from geographic coordinates
export const reverseGeocode = (coordinates) => {
  const response = axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[1]},${coordinates[0]}&key=${googleMapsAPIKey}&result_type=locality`
  );
  return response;
};
