import React, { useEffect, useState } from "react";

const GetGeoLocation = ({ latitude, longitude }) => {
  const [latitude2, setLatitude2] = useState("");
  const [longitude2, setLongitude2] = useState("");
  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: latitude, lng: longitude },
      });
      const geocoder = new window.google.maps.Geocoder();
      const infowindow = new window.google.maps.InfoWindow();

      const marker = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        draggable: true, // Make the marker draggable
      });

      // Update input value with marker position when dragged
      marker.addListener("dragend", () => {
        const position = marker.getPosition();
        setLatitude2(position.lat());
        setLongitude2(position.lng());
        document.getElementById(
          "latlng"
        ).value = `${position.lat()},${position.lng()}`;
      });

      document.getElementById("submit").addEventListener("click", () => {
        geocodeLatLng(geocoder, map, infowindow);
      });
    };

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

    window.initMap = initMap;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCR4YVEYed8oq1-QWV5hGhV1kbAAwzqb9Y&callback=initMap&v=weekly`;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return (
    <>
      <div id="floating-panel">
        <input id="latlng" type="text" value={`${latitude},${longitude}`} />
        <input id="submit" type="button" value="Reverse Geocode" />
      </div>
      <div id="map" style={{ height: "100%" }}></div>
      <h1>{latitude2}</h1>
      <h1 style={{ marginBottom: 10 }}>{longitude2}</h1>
    </>
  );
};

export default GetGeoLocation;
