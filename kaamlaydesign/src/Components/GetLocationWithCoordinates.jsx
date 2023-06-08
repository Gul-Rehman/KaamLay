import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState, useEffect } from "react";

const GetLocationWithCoordinates = () => {
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [marker, setMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 40.731, lng: -73.997 },
      });
      //   const geocoder = new window.google.maps.Geocoder();
      //   const infowindow = new window.google.maps.InfoWindow();

      //   const handleLocationButtonClick = () => {
      //     geocodeLatLng(geocoder, map, infowindow);
      //   };
      //   document.getElementById("submit").addEventListener("click", () => {
      //     geocodeLatLng(geocoder, map, infowindow);
      //   });
    };

    // const geocodeLatLng = (geocoder, map, infowindow) => {
    //   const input = document.getElementById("latlng").value;
    //   const latlngStr = input.split(",", 2);
    //   const latlng = {
    //     lat: parseFloat(latlngStr[0]),
    //     lng: parseFloat(latlngStr[1]),
    //   };

    //   geocoder
    //     .geocode({ location: latlng })
    //     .then((response) => {
    //       if (response.results[0]) {
    //         map.setZoom(11);

    //         const marker = new window.google.maps.Marker({
    //           position: latlng,
    //           map: map,
    //         });

    //         infowindow.setContent(response.results[0].formatted_address);
    //         infowindow.open(map, marker);
    //       } else {
    //         window.alert("No results found");
    //       }
    //     })
    //     .catch((e) => window.alert("Geocoder failed due to: " + e));
    // };

    if (window.google && window.google.maps) {
      // Google Maps API script already loaded
      initMap();
    } else {
      // Load Google Maps API script dynamically
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCR4YVEYed8oq1-QWV5hGhV1kbAAwzqb9Y&callback=initMap&v=weekly`;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const geocoder = new window.google.maps.Geocoder();
  const infowindow = new window.google.maps.InfoWindow();
  const geocodeLatLng = (geocoder, map, infowindow) => {
    const input = document.getElementById("latlng").value;
    const latlngStr = input.split(",", 2);
    const latlng = {
      lat: parseFloat(latlngStr[0]),
      lng: parseFloat(latlngStr[1]),
    };

    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          map.setZoom(11);

          const marker = new window.google.maps.Marker({
            position: latlng,
            map: map,
          });

          infowindow.setContent(response.results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  };
  const handleLocationButtonClick = () => {
    geocodeLatLng(geocoder, map, infowindow);
  };
  return (
    <div>
      <Stack sx={{ alignItems: "center" }}>
        <Button
          variant="contained"
          onClick={handleLocationButtonClick}
          disabled={!map}
          sx={{}}
        >
          Get Location
        </Button>
      </Stack>
      {/* {userLocation && (
      // <div>
      //   <h3>Coordinates:</h3>
      //   <p>Latitude: {userLocation.lat}</p>
      //   <p>Longitude: {userLocation.lng}</p>
      // </div>
    )} */}
      {userAddress && (
        <div>
          <h3>Address:</h3>
          <p>{userAddress}</p>
        </div>
      )}
      <div
        id="map"
        style={{ width: "100%", height: "400px", marginTop: "" }}
      ></div>
    </div>
  );
};

export default GetLocationWithCoordinates;
