import axios from "axios";
import Map from "./Map";
import Switch from "../../Switch";
import { getAuth } from "firebase/auth";

const LocationAndConditions = ({
  nextStep,
  previousStep,
  setDate,
  setTime,
  setLocation,
  setConditions,
  setCoordinates,
  setShareCoordinates,
  date,
  location,
  coordinates,
  time,
  conditions,
  shareCoordinates,
}) => {
  const googleMapsAPIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const auth = getAuth();

  let nearestHour;
  let nearestDate = date;

  const roundDate = () => {
    nearestDate = Date.parse(nearestDate);
    nearestDate = nearestDate + 86400000;
    nearestDate = new Date(nearestDate);
    nearestDate = nearestDate.toISOString("en-US", { timeZone: "GMT" });
    nearestDate = nearestDate.split("T");
    nearestDate = nearestDate[0];
    return nearestDate;
  };

  const roundHour = () => {
    nearestHour = time.split(":").map(Number);
    if (nearestHour[1] >= 30 && nearestHour[0] === 23) {
      nearestHour[0] = 0;
      roundDate();
    } else if (nearestHour[1] >= +30 && nearestHour[0] !== 23) {
      nearestHour[0] = nearestHour[0] + 1;
    }
    return nearestHour;
  };

  roundHour();

  let latitude = coordinates[1];
  latitude = Math.round(latitude * 1000) / 1000;
  if (latitude > 0) {
    latitude = latitude + "° N";
  } else if (latitude < 0) {
    latitude = Math.abs(latitude) + "° S";
  } else {
    latitude = latitude + "°";
  }

  let longitude = coordinates[0];
  longitude = Math.round(longitude * 1000) / 1000;
  if (longitude > 0) {
    longitude = longitude + "° E";
  } else if (longitude < 0) {
    longitude = Math.abs(longitude) + "° W";
  } else {
    longitude = longitude + "°";
  }

  const reverseGeocode = (coordinates) => {
    try {
      auth.currentUser.getIdToken(true).then(function (idToken) {
        axios
          .get(
            `/api/data/reversegeocode?latitude=${coordinates[1]}&longitude=${coordinates[0]}`,
            {
              headers: {
                authtoken: idToken,
              },
            }
          )
          .then(function (response) {
            setLocation(response.data.response.results);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveWeather = (nearestHour, nearestDate, coordinates) => {
    try {
      auth.currentUser.getIdToken(true).then(function (idToken) {
        axios
          .get(
            `/api/data/weather?nearestHour=${nearestHour[0]}&nearestDate=${nearestDate}&latitude=${coordinates[1]}&longitude=${coordinates[0]}`,
            {
              headers: {
                authtoken: idToken,
              },
            }
          )
          .then(function (response) {
            setConditions(response.data.response);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (coordinates.length && date && time) {
      setConditions([""]); // this is so it resets if you come back and change inputs after weather has been retrieved
      retrieveWeather(nearestHour, nearestDate, coordinates);
      reverseGeocode(coordinates);
      nextStep();
    } else {
      console.log("select catch location, date, and time of catch");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <Map
        setCoordinates={setCoordinates}
        defaultLat={41.5}
        defaultLong={-71.5}
        mapHeight={"400px"}
      ></Map>
      <div className="flex flex-row justify-between py-2">
        <Switch
          name="location-secret"
          variable={"Share coordinates"}
          value={shareCoordinates}
          setValue={setShareCoordinates}
        />
        {coordinates ? (
          <div className={`${shareCoordinates ? "" : "opacity-50"}`}>
            {latitude}, {longitude}
          </div>
        ) : (
          <></>
        )}
      </div>
      <h1 className=" py-2">
        Input the location, date, and time of your catch. Weather conditions at
        the time of catch with be retrieved automatically.
      </h1>
      <form>
        <div className="flex flex-col py-2">
          <input
            onChange={(e) => setDate(e.target.value)}
            className="border py-1"
            type="date"
            value={date}
          />
        </div>
        <div className="flex flex-col py-2">
          <input
            onChange={(e) => setTime(e.target.value)}
            className="border py-1"
            type="time"
            value={time}
          />
        </div>
      </form>
      <div className="flex flex-row">
        <button
          onClick={() => previousStep()}
          className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2 mr-1"
        >
          Back
        </button>
        <button
          onClick={() => {
            handleClick();
          }}
          className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2 ml-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LocationAndConditions;
