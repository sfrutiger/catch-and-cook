const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const axios = require("axios");

// @desc Get weather data
// @route GET /api/data/weather
// @access Private
router.get("/weather", auth, async (req, res) => {
  try {
    const weatherAPIKey = process.env.WEATHER_API_KEY;
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const nearestHour = req.query.nearestHour;
    const nearestDate = req.query.nearestDate;
    const response = await axios.get(
      // there is a bug with this API that won't return current conditions for exactly 00:00:00, so by default the minutes are set to :01.
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude}%2C%20${longitude}/${nearestDate}T${nearestHour}:01:00?key=${weatherAPIKey}&include=current`
    );
    res.json({ response: response.data });
  } catch (error) {
    res.json({ success: false });
  }
});

// @desc Get weather data
// @route GET /api/data/weather
// @access Private
router.get("/reversegeocode", auth, async (req, res) => {
  try {
    const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsAPIKey}&result_type=locality`
    );
    res.json({ response: response.data });
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;
