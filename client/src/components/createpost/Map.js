import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ setCoordinates }) => {
  const [latitude, setLatitude] = useState(41.5);
  const [longitude, setLongitude] = useState(-71.3); //I need to change this to default to user location

  const mapCenter = {
    lat: latitude,
    lng: longitude,
  };

  const addCatchLocation = (e) => {
    setLatitude(e.latLng.lat());
    setLongitude(e.latLng.lng());
    setCoordinates([e.latLng.lng(), e.latLng.lat()]);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_FIREBASE_API_KEY}>
      <GoogleMap
        id="map"
        onClick={(e) => {
          addCatchLocation(e);
        }}
        mapContainerStyle={{
          height: "400px",
          width: "100%",
        }}
        zoom={9}
        center={mapCenter}
        mapTypeId={"satellite"}
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
