var fulldata;

// Retrieve CSV data
d3.csv("bfro_reports_geocoded.csv", function(datacsv) {
  fulldata = datacsv;
  daychart();
 });

var initialdates = [];
var mymontharray = [];

function daychart() {
  for (i =0; i < fulldata.length; i++) {
    var activedate = fulldata[i].date;
    initialdates.push(activedate);
    var parts = initialdates[i].split('-');
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
    var mydatestring = mydate.toDateString();
    var mydatearray = mydatestring.split(' ');
    var mymonth = mydatearray[1];
    mymontharray.push(mymonth);
  }
// Create empty array to hold total sightings for each day of week
var monthtotals = {};

// Populate array with total sightings for each day of the week
mymontharray.forEach(function(x) { monthtotals[x] = (monthtotals[x] || 0)+1; });

// Create the Trace
var trace1 = {
  x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  y: [monthtotals.Jan, monthtotals.Feb, monthtotals.Mar, monthtotals.Apr, monthtotals.May, monthtotals.Jun, monthtotals.Jul, monthtotals.Aug, monthtotals.Sep, monthtotals.Oct, monthtotals.Nov, monthtotals.Dec],
  type: "bar"
};

// Create the data array for the plot
var data = [trace1];

// Define the plot layout
var layout = {
  title: "Sightings by Month",
  xaxis: { title: "Month" },
  yaxis: { title: "Number of sightings" }
};

// Plot the chart to a div tag with id "bar-plot"
Plotly.newPlot("bar-plot-month", data, layout);
}