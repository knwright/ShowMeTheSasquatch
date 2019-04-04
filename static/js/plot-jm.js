// Define data variable
// var fulldata;

// Retrieve CSV data
d3.csv("../../data/bfro_reports_geocoded.csv").then(function(fulldata) {
  buildPlot(fulldata)
});

// Create empty arrays
var initialdates = [];
var mymontharray = [];
var mydayarray = [];

// Parse desired months/days
function buildPlot(fulldata) {

    for (i =0; i < fulldata.length; i++) {
      var activedate = fulldata[i].date;
      initialdates.push(activedate);
      var parts = initialdates[i].split('-');
      var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
      var mydatestring = mydate.toDateString();
      var mydatearray = mydatestring.split(' ');
      var mymonth = mydatearray[1];
      mymontharray.push(mymonth);
      var myday = mydatearray[0];
      mydayarray.push(myday);
    }
    // Create empty arrays to hold total sightings for each month/day of the week
    var monthtotals = {};
    var daytotals = {};

    // Populate arrays with total sightings for each month/day of the week
    mymontharray.forEach(function(x) { monthtotals[x] = (monthtotals[x] || 0)+1; });
    mydayarray.forEach(function(x) { daytotals[x] = (daytotals[x] || 0)+1; });

    // Set x and y arrays
    var barx = [["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]];
    var bary = [[monthtotals.Jan, monthtotals.Feb, monthtotals.Mar, monthtotals.Apr, monthtotals.May, monthtotals.Jun, monthtotals.Jul, monthtotals.Aug, monthtotals.Sep, monthtotals.Oct, monthtotals.Nov, monthtotals.Dec],[daytotals.Mon, daytotals.Tue, daytotals.Wed, daytotals.Thu, daytotals.Fri, daytotals.Sat, daytotals.Sun]];


    function makeTrace(i) {
      return {
        x: barx[i],
        y: bary[i],
        type: 'bar',
        visible: i === 0,
      };
    }

    var updatemenus = [{
      y: 1,
      yanchor: 'top',
      buttons: [{
      method: 'restyle',
      args: ['visible', [true, false]],
      label: 'Sightings by month'
    }, {
      method: 'restyle',
      args: ['visible', [false, true]],
      label: 'Sightings by day of week'
      }]
    }]

    var data = [0, 1].map(makeTrace)


    var layout = {
      updatemenus: updatemenus,
      title: "Sightings by unit of time",
      yaxis: { title: "Number of sightings" }
    } 

    Plotly.plot('barplot', data, layout);
    
}