import React, { useEffect, useState } from "react";
// import { Skeleton } from "@mui/material";

import { Box, Button, Skeleton } from "@mui/material";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import MyMap from "./MyMap";
import GetGeoLocation from "./GetGeoLocation";

const GeoLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const google = window.google;

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleSuccess = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const handleError = (error) => {
    setError(error.message);
  };
  const [showMap, setShowMap] = useState(false);
  const ifameData = document.getElementById("iframeId");
  const lat = latitude;
  const lon = longitude;
  //   ifameData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;

  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });
  if (!isLoaded) {
    return <Skeleton variant="rectangular" width={210} height={60} />;
  }
  const center = {
    lat: latitude,
    lng: longitude,
  };

  //   function placeMarker(location) {
  //     var marker = new google.maps.Marker({
  //       position: location,
  //       //   map: map,
  //     });
  //     var infowindow = new google.maps.InfoWindow({
  //       content:
  //         "Latitude: " + location.lat() + "<br>Longitude: " + location.lng(),
  //     });
  //     infowindow.open(marker);
  //   }
  return (
    <>
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <p>
            <button onClick={getLocation}>Get Location</button>
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        )}
        {/* <Map
        googleMapURL={`https://www.google.com/maps/@?api=1&map_action=map&latitude=${latitude}|longitude=${longitude}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      /> */}
        <Button href="./map.html">Show Map</Button>
        {/* <div>
          <iframe
            id="iframeId"
            height="500px"
            width="100%"
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`}
          ></iframe>
        </div> */}
      </div>
      {/* <Box width="100%" height={800}>
        <GoogleMap
          center={{ lat: latitude, lng: longitude }}
          zoom={18}
          mapContainerStyle={{ width: "100%", height: 800 }}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
        <h3>{latitude}</h3>
        <h3>{longitude}</h3>
      </Box> */}
      {/* <Box width="100%" height={500}>
        <MyMap />
      </Box> */}
      {longitude && (
        <Box width="100%" height={500}>
          <GetGeoLocation latitude={latitude} longitude={longitude} />
        </Box>
      )}
    </>
  );
};

export default GeoLocation;
