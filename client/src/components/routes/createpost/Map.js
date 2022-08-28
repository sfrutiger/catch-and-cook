import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ setCoordinates, defaultLat, defaultLong, mapHeight }) => {
  const [latitude, setLatitude] = useState(defaultLat);
  const [longitude, setLongitude] = useState(defaultLong); //I need to change this to default to user location

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
          height: mapHeight,
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
