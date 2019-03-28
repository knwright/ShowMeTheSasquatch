// Retrieve CSV data
d3.csv("data/bfro_reports_geocoded.csv", function(data) {
  console.log(data);
  createMap(data);
});

function createMap(data) {

  // Define map
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  for (var i = 0; i < data.length; i++) {
    // Loop through the data array, create a new marker,
    // and push it to the markers group.
    if (data[i].latitude != "")  // location data exists
    {
      // Add a new marker to the cluster group and bind a pop-up
      popupString = "<h1>" + data[i].date + "</h1><br>"
        + "(" + data[i].latitude + ", " + data[i].longitude + ")"
        + "<br>" + data[i].county + ", " + data[i].state
        + "<br>" + data[i].location_details
        + "<hr>" + data[i].classification + ": (" + i + ") " + data[i].title
        + "<hr>" + data[i].summary
        + "<hr>" + data[i].observed;
      markers.addLayer(L.marker([data[i].latitude, data[i].longitude])
        .bindPopup(
          popupString.substring(0, 2568)  // truncate to prevent popup from flashing on and off
      ));
    }
  }

  // Create our map, giving it the streetmap and sighting layers to display on load
  var myMap = L.map("map", {
    center: [
      45, -93
    ],
    zoom: 4,
    layers: [streetmap]
  });

  myMap.addLayer(markers);
}

