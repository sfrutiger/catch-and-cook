const LocationAndConditions = ({
  nextStep,
  previousStep,
  setDate,
  setLocation,
  setConditions,
  date,
  location,
  conditions,
}) => {
  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <form>
        <div className="flex flex-col py-2">
          <label className="py-2">Date</label>
          <input
            onChange={(e) => setDate(e.target.value)}
            className="border py-1"
            type="date"
            value={date}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2">Location</label>
          <textarea
            onChange={(e) => setLocation(e.target.value)}
            className="border py-1"
            type="text"
            value={location}
          />
        </div>
        <div className="form-items">
          <label className="py-2">Conditions</label>
          <input
            onChange={(e) => setConditions(e.target.value)}
            className="border p-1"
            type="text"
            value={conditions}
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
          onClick={() => nextStep()}
          className="w-full h-[3rem] my-2 bg-white text-slate-500 rounded mb-2 ml-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LocationAndConditions;
