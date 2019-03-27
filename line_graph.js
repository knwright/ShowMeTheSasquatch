
// Retrieve CSV data
d3.csv("bfro_reports_geocoded.csv", function(data) {
    console.log(data);
  });

// Build line plot with traces
var trace1 = {
    x: data.map(row => row.date.year),
    y: data.map(row => row.),
    mode = 'lines+markers'
};
var trace2 = {
    x: data.map(row => row.date.year),
    y: data.map(row => row.),
    mode = 'lines+markers'
};
var trace3 = {
    x: data.map(row => row.date.year),
    y: data.map(row => row.),
    mode = 'lines+markers'
};
var graph_data = [trace1];

var layout = {
    title: "Sasquatch Sightings by Year",
    xaxis: { title: "Year" },
    yaxis: { title: "Number of Sightings"}
}
Plotly.newPlot("plot", data, layout);