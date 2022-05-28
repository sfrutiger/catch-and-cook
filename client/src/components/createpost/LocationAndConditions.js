import axios from "axios";
import Map from "./Map";

const LocationAndConditions = ({
  nextStep,
  previousStep,
  setDate,
  setTime,
  setLocation,
  setConditions,
  date,
  location,
  time,
  conditions,
}) => {
  const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;

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
    } else if (nearestHour[1] > +30 && nearestHour[0] !== 23) {
      nearestHour[0] = nearestHour[0] + 1;
    }
    return nearestHour;
  };

  roundHour();

  const retrieveWeather = async () => {
    const response = await axios.get(
      // there is a bug with this API that won't return current conditions for exactly 00:00:00, so by default the minutes are set to :01.
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location[1]}%2C%20${location[0]}/${nearestDate}T${nearestHour[0]}:01:00?key=${weatherAPIKey}&include=current`
    );
    setConditions(response);
  };

  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <Map setLocation={setLocation}></Map>
      {location ? (
        <div>
          {location[1]}, {location[0]}
        </div>
      ) : (
        <></>
      )}
      <h1 className=" py-2">
        Input the location, date, and time of your catch. Tide and weather
        conditions will be retrieved if date is within the past week.
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
            setConditions([""]); // this is so it resets if you come back and change inputs after weather has been retrieved
            retrieveWeather();
            nextStep();
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
