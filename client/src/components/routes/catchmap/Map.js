import { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { UserAuth } from "../../../context/AuthContext";
import { getAuth } from "firebase/auth";

const Map = ({ mapHeight }) => {
  //need to make sure it has auth or redirect on refresh
  const { user } = UserAuth();
  const userID = user.uid || "";
  const auth = getAuth();
  const [catchMapPosts, setCatchMapPosts] = useState([]);

  const getMyPosts = () => {
    if (auth.currentUser.uid) {
      auth.currentUser.getIdToken(true).then(async function (idToken) {
        try {
          const response = await axios.get(
            `/api/posts/coordinates?&userid=${userID}`,
            {
              headers: {
                authtoken: idToken,
              },
            }
          );
          setCatchMapPosts(response.data);
          console.log(catchMapPosts);
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      console.log("Access denied. Auth required to view catch map.");
    }
  };

  const mapCenter = {
    lat: 41.402,
    lng: -71.571,
  };

  //find maximum zoom to fit all markers

  const [map, setMap] = useState(null);
  const onLoad = useCallback((map) => setMap(map), []);

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      catchMapPosts.map((post) => {
        bounds.extend({
          lat: post.coordinates[1],
          lng: post.coordinates[0],
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, catchMapPosts]);

  useEffect(() => {
    getMyPosts();
  }, []);

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
        zoom={11}
        center={mapCenter}
        onLoad={onLoad}
        mapTypeId={"satellite"}
      >
        {catchMapPosts ? (
          <>
            {catchMapPosts.map((post) => (
              <Marker
                key={post._id}
                position={{
                  lat: post.coordinates[1],
                  lng: post.coordinates[0],
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
