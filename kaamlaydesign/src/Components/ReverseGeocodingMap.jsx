import React, { useEffect } from "react";

const ReverseGeocodingMap = ({ latitude, longitude }) => {
  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      });
      const geocoder = new window.google.maps.Geocoder();
      const infowindow = new window.google.maps.InfoWindow({
        // closeBox: false,
        // disableAutoPan: true,
      });

      geocodeLatLng(geocoder, map, infowindow);
    };

    const geocodeLatLng = (geocoder, map, infowindow) => {
      const latlng = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      };

      geocoder
        .geocode({ location: latlng })
        .then((response) => {
          if (response.results[0]) {
            map.setZoom(18);

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

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCR4YVEYed8oq1-QWV5hGhV1kbAAwzqb9Y&callback=initMap&v=weekly`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [latitude, longitude]);

  return (
    <div>
      <div id="floating-panel">
        {/* <input id="latlng" type="text" value={`${latitude},${longitude}`} /> */}
        {/* <input id="submit" type="button" value="Reverse Geocode" /> */}
      </div>
      <div id="map" style={{ width: "100%", height: 400 }}></div>
    </div>
  );
};

export default ReverseGeocodingMap;
