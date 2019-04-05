// Initialize an object containing icons for each layer group
var icons = {
  "Class A": L.ExtraMarkers.icon({
    icon: "ion-android-walk",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle"
  }),
  "Class B": L.ExtraMarkers.icon({
    icon: "ion-ios-paw",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  "Class C": L.ExtraMarkers.icon({
    icon: "ion-quote",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  })
};

// Retrieve CSV data
d3.json("http://localhost:5000/BigFoot/data", function(data) {
  console.log(data);
  createMap(data);
});

function createMap(data) {

  // Define variables for our base layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  var bigfootHeatArray = [];

  var min_year = 2019;
  var min_year_index = 10000;
  for (var i = 0; i < data.length; i++) {
    // Loop through the data array, create a new marker,
    // and push it to the markers group.
    if (data[i].latitude != "")  // location data exists
    {
      // Add a new marker to the cluster group and bind a pop-up
      popupString = "<h1>" + data[i].date + "</h1><br>"
        + "(" + data[i].latitude + ", " + data[i].longitude + ")"
        + "<br>" + data[i].county + ", " + data[i].state
        + "<hr>" + data[i].classification + ": (" + i + ") "
        + "<hr>" + data[i].summary;
      markers.addLayer(L.marker([data[i].latitude, data[i].longitude], {
        icon: icons[data[i].classification]
      })
        .bindPopup(
          popupString.substring(0, 2348)  // truncate to prevent popup from flashing on and off
      ));
      if (data[i].classification == "Class C")
      {
        console.log("Class C: (" + i + ") " + data[i].latitude + "," + data[i].longitude + " " +  data[i].state);
      }
      // push the location to the heat array
      bigfootHeatArray.push([parseFloat(data[i].latitude), parseFloat(data[i].longitude)]);
    }
    // find first year of data
    if (data[i].date != "")
    {
        var year = data[i].date.substring(0,4);
        year = parseInt(year);
        // console.log(year);
        if (year < min_year)
        {
          min_year = year;
          min_year_index = i;
        }
    }
  }
  console.log("min_year = " + min_year);
  console.log("min_year_index = " + min_year_index);

  var bigfootHeat = L.heatLayer(bigfootHeatArray, {
    radius: 25,       // radius of each "point" of the heatmap, 25 by default
    blur: 15,         // amount of blur, 15 by default
    minOpacity: 0.5,  // the minimum opacity the heat will start at
    maxZoom: 18,      // zoom level where the points reach maximum intensity
    max: 1.0          // maximum point intensity, 1.0 by default
  });

  var sightingLayer = L.layerGroup(markers);
  var heatLayer = L.layerGroup(bigfootHeat);

  // Create a baseMaps object
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create an overlay object
  var overlayMaps = {
    "Clusters": markers,
    "Heat Map": bigfootHeat
  };

  // Create our map, giving it the streetmap and sighting layers to display on load
  var myMap = L.map("map", {
    center: [
      45, -93
    ],
    zoom: 4,
    layers: [streetmap, markers, bigfootHeat]
  });

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Create a legend to display information about our map
  var info = L.control({
    position: "bottomright"
  });

  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(myMap);

  // legend text
  document.querySelector(".legend").innerHTML = [
    "<p>Sightings</p>",
    "<p class='class_a'>Class A</p>",
    "<p class='class_b'>Class B</p>",
    "<p class='class_c'>Class C</p>"
  ].join("");
}

