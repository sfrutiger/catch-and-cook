const SpeciesAndMethods = ({
  nextStep,
  previousStep,
  setSpecies,
  setMethod,
  species,
  method,
}) => {
  return (
    <div className="max-w-[700px] mx-auto my-8 p-4">
      <form>
        <div className="flex flex-col py-2">
          <label className="py-2">Species</label>
          <input
            onChange={(e) => setSpecies(e.target.value)}
            className="border py-1 placeholder-slate-500"
            type="text"
            placeholder="unknown"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2">Method</label>
          <input
            onChange={(e) => setMethod(e.target.value)}
            className="border py-1 placeholder-slate-500"
            type="text"
            placeholder="not specified"
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
      <p className="text-sm absolute bottom-20">
        *Posts containing explicit, offensive, or inappropriate content will be
        removed.
      </p>
    </div>
  );
};

export default SpeciesAndMethods;
