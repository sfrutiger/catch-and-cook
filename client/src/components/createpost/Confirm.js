const Confirm = ({
  handleSubmit,
  previousStep,
  species,
  date,
  location,
  conditions,
  method,
  recipes,
  picturePreviewURL,
}) => {
  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      {/* <p>{post.author.email}</p> */}
      <img src={picturePreviewURL} alt="Catch" />
      <p>{species}</p>
      <p>{date}</p>
      <p>
        {location[1]}, {location[0]}
      </p>
      {conditions.data.currentConditions ? (
        <>
          <p>{conditions.data.currentConditions.conditions}</p>
          <p>Temperature: {conditions.data.currentConditions.temp} °F</p>
          <p>Wind: {conditions.data.currentConditions.windspeed} mph</p>
          <p>
            Pressure: {conditions.data.currentConditions.pressure} millibars
          </p>
        </>
      ) : (
        ""
      )}
      <p>{method}</p>
      <p>{recipes}</p>
      <div className="flex flex-row">
        <button
          onClick={() => previousStep()}
          className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2 mr-1"
        >
          Back
        </button>
        <button
          onClick={(e) => handleSubmit(e)}
          className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2 ml-1"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Confirm;
