function loadGoogleMapsScript() {
  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCR4YVEYed8oq1-QWV5hGhV1kbAAwzqb9Y&callback=initMap";
  script.async = true;
  document.body.appendChild(script);
}
