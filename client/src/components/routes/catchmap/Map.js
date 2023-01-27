import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ setCoordinates, defaultLat, defaultLong, mapHeight }) => {
  const [latitude, setLatitude] = useState(defaultLat);
  const [longitude, setLongitude] = useState(defaultLong); //I need to change this to default to user location

  const mapCenter = {
    lat: 45,
    lng: 45,
  };

  //create array of catch locations with ID from DB
  const catchLocations = [
    {
      ID: 1,
      lat: 45,
      lng: 45,
    },
    {
      _id: 2,
      lat: 46,
      lng: 46,
    },
    {
      _id: 3,
      lat: 46,
      lng: 45,
    },
  ];

  //find maximum zoom to fit all markers

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_CLIENT_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        id="map"
        mapContainerStyle={{
          height: mapHeight,
          width: "80%",
        }}
        zoom={7}
        center={mapCenter}
        mapTypeId={"satellite"}
      >
        {catchLocations ? (
          <>
            {catchLocations.map((event) => (
              <Marker
                key={event._id}
                position={{
                  lat: event.lat,
                  lng: event.lng,
                }}
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

{
  /* 
  <div>
  {catchLocations.map((catch) => (
    <Marker
      key={catch._id}
      position={{
                lat: catch.lat,
                lng: catch.lng,
              }}
    />
  ))}
</div>; */
}
