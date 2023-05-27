import React, { useState, useEffect } from "react";

const ChatGPTMap = () => {
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [marker, setMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCR4YVEYed8oq1-QWV5hGhV1kbAAwzqb9Y&callback=initMap`;
      script.async = true;
      document.body.appendChild(script);
    };

    window.initMap = () => {
      const newMap = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 6,
        }
      );
      const newInfoWindow = new window.google.maps.InfoWindow({
        pixelOffset: new window.google.maps.Size(
          0,
          -marker?.getIcon()?.size?.height || 0
        ),
      });
      setMap(newMap);
      setInfoWindow(newInfoWindow);
    };

    loadGoogleMapsScript();
  }, []);

  const handleLocationButtonClick = () => {
    if (navigator.geolocation && map && infoWindow) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          //   infoWindow.setPosition(pos);
          //   infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          setUserLocation(pos);

          // Reverse Geocoding to get address
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: pos }, (results, status) => {
            if (status === "OK" && results[0]) {
              setUserAddress(results[0].formatted_address);
            } else {
              setUserAddress("Address not found");
            }
          });

          // Reset marker position
          if (marker) {
            marker.setPosition(pos);
          } else {
            const newMarker = new window.google.maps.Marker({
              position: pos,
              map: map,
              draggable: true,
              animation: window.google.maps.Animation.DROP,
            });

            // Listen for dragend event on marker
            newMarker.addListener("dragend", () => {
              const newPos = newMarker.getPosition();

              // Update userLocation with new coordinates
              setUserLocation({
                lat: newPos.lat(),
                lng: newPos.lng(),
              });

              // Reverse Geocoding to get address
              geocoder.geocode({ location: newPos }, (results, status) => {
                if (status === "OK" && results[0]) {
                  setUserAddress(results[0].formatted_address);
                } else {
                  setUserAddress("Address not found");
                }
              });
            });

            setMarker(newMarker);
          }
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map && map.getCenter());
    }
  };

  const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  };

  return (
    <div>
      <button onClick={handleLocationButtonClick} disabled={!map}>
        Get Location
      </button>
      {userLocation && (
        <div>
          <h3>Coordinates:</h3>
          <p>Latitude: {userLocation.lat}</p>
          <p>Longitude: {userLocation.lng}</p>
        </div>
      )}
      {userAddress && (
        <div>
          <h3>Address:</h3>
          <p>{userAddress}</p>
        </div>
      )}
      <div id="map" style={{ height: "400px", marginTop: "20px" }}></div>
    </div>
  );
};

export default ChatGPTMap;
