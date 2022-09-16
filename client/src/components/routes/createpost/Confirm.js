const Confirm = ({
  handleSubmit,
  previousStep,
  species,
  date,
  time,
  location,
  coordinates,
  conditions,
  method,
  recipes,
  picturePreviewURL,
}) => {
  //to prevent multiple submissions of post
  const disableButton = (e) => {
    e.currentTarget.disabled = true;
  };

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

  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <img src={picturePreviewURL} alt="Catch" />
      <p>{species}</p>
      <p>{date}</p>
      <p>{time}</p>
      {location[0] ? <p>{location[0].formatted_address}</p> : ""}
      <p>
        {latitude}, {longitude}
      </p>
      {conditions.currentConditions ? (
        <>
          <p>{conditions.currentConditions.conditions}</p>
          <p>Temperature: {conditions.currentConditions.temp} °F</p>
          <p>Wind: {conditions.currentConditions.windspeed} mph</p>
          <p>Pressure: {conditions.currentConditions.pressure} millibars</p>
        </>
      ) : (
        ""
      )}
      <p>{method}</p>
      <p>{recipes}</p>
      <div className="flex flex-row">
        <button
          onClick={() => previousStep()}
          className="w-full h-[3rem] my-2 buttons mb-2 mr-1"
        >
          Back
        </button>
        <button
          disabled={false}
          onClick={(e) => {
            handleSubmit(e);
            disableButton(e);
          }}
          className="w-full h-[3rem] my-2 buttons mb-2 ml-1"
        >
          Post
        </button>
      </div>
      <p className="text-sm absolute bottom-20">
        *Posts containing explicit, offensive, or inappropriate content will be
        removed.
      </p>
    </div>
  );
};

export default Confirm;
