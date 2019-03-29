var fulldata;

// Retrieve CSV data
d3.csv("bfro_reports_geocoded.csv", function(datacsv) {
  fulldata = datacsv;
  daychart();
 });

var fakedates = ['2014-04-03', '2015-11-23', '2009-04-22'];

var initialdates = [];
var mydayarray = [];

function daychart() {
  for (i =0; i < fulldata.length; i++) {
    var activedate = fulldata[i].date;
    initialdates.push(activedate);
    var parts = initialdates[i].split('-');
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
    var mydatestring = mydate.toDateString();
    var mydatearray = mydatestring.split(' ');
    var myday = mydatearray[0];
    mydayarray.push(myday);
  }

// Create empty array to hold total sightings for each day of week
var daytotals = {};

// Populate array with total sightings for each day of the week
mydayarray.forEach(function(x) { daytotals[x] = (daytotals[x] || 0)+1; });

// Create the Trace
var trace1 = {
  x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  y: [daytotals.Mon, daytotals.Tue, daytotals.Wed, daytotals.Thu, daytotals.Fri, daytotals.Sat, daytotals.Sun],
  type: "bar"
};

// Create the data array for the plot
var data = [trace1];

// Define the plot layout
var layout = {
  title: "Sightings by Day of Week",
  xaxis: { title: "Day of Week" },
  yaxis: { title: "Number of sightings" }
};

// Plot the chart to a div tag with id "bar-plot"
Plotly.newPlot("bar-plot", data, layout);
}