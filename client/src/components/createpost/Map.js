import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ setLocation }) => {
  const [latitude, setLatitude] = useState(41.5);
  const [longitude, setLongitude] = useState(-71.3);

  const mapCenter = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_FIREBASE_API_KEY}>
      <GoogleMap
        id="map"
        onClick={(e) => {
          setLatitude(e.latLng.lat());
          setLongitude(e.latLng.lng());
          setLocation([longitude, latitude]);
        }}
        mapContainerStyle={{
          height: "400px",
          width: "100%",
        }}
        zoom={9}
        center={mapCenter}
      >
        {latitude ? (
          <Marker position={{ lat: latitude, lng: longitude }} />
        ) : (
          <></>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
