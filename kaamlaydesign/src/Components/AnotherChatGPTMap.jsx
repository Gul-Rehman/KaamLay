import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import GoogleMapReact from "google-map-react";

const MapWithMarker = ({ apiKey }) => {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }, []);

  const handleMarkerDragend = (e) => {
    const lat = e.lat;
    const lng = e.lng;
    setCoords({ lat, lng });
    updateAddress(lat, lng);
  };

  const updateAddress = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        setAddress(results[0].formatted_address);
      } else {
        setAddress("");
      }
    });
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={coords}
        defaultZoom={14}
        draggable={true}
        onDragend={handleMarkerDragend}
        style={{ height: "100%", width: "100%" }}
      >
        {coords.lat && coords.lng && (
          <Marker lat={coords.lat} lng={coords.lng} text="My Marker" />
        )}
      </GoogleMapReact>
      <TextField
        label="Address"
        value={address}
        onChange={handleAddressChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary">
        Save Location
      </Button>
    </div>
  );
};

const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "10px 15px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

export default MapWithMarker;
