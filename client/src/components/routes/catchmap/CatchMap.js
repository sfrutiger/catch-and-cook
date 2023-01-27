import Map from "./Map";

const CatchMap = () => {
  return (
    <div className="w-full flex justify-center">
      <Map defaultLat={41.5} defaultLong={-71.5} mapHeight={"60vh"}></Map>
    </div>
  );
};

export default CatchMap;
