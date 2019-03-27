var dayofweek = ["Mon", "Tues", "Mon", "Sun", "Sat",
  "Fri", "Thurs", "Tues", "Sun", "Sat",
  "Wed", "Wed", "Fri", "Sat", "Tues",
  "Fri", "Mon", "Fri", "Sun"];
var daytotals = {};

// Retrieve CSV data
d3.csv("bfro_reports_geocoded.csv", function(datacsv) {
  // console.log(datacsv);
});

var fakedates = ['2014-04-03', '2015-11-23', '2009-04-22'];
// var alldata = datacsv;
// console.log(alldata);

// console.log(datacsv[1]);

// Convert date format to day of week
var parts = fakedates[1].split('-');
var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
var mydatestring = mydate.toDateString();
var mydatearray = mydatestring.split(' ');
var myday = mydatearray[0];
console.log(myday);

// Total sightings for each day of the week
dayofweek.forEach(function(x) { daytotals[x] = (daytotals[x] || 0)+1; });

// Create the Trace
var trace1 = {
  x: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
  y: [daytotals.Mon, daytotals.Tues, daytotals.Wed, daytotals.Thurs, daytotals.Fri, daytotals.Sat, daytotals.Sun],
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
