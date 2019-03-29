d3.csv("bfro_reports_geocoded.csv").then(function(bf_data) {
    console.log(bf_data);

    buildPlot(bf_data);
});

var initialdates = [];
var myyeararray = [];

// Build line plot with traces
function buildPlot(bf_data) {

        for (i =0; i < bf_data.length; i++) {
            var activedate = bf_data[i].date;
            initialdates.push(activedate);
            var parts = initialdates[i].split('-');
            var mydate = new Date(parts[0], parts[1]-1, parts[2]);
            var mydatestring = mydate.toDateString();
            var mydatearray = mydatestring.split(' ');
            var myyear = mydatearray[3];
            myyeararray.push(myyear);
        }
        console.log(myyeararray);

        // Create empty array to hold total sightings for each year
        var yeartotals = {};

        // Populate year totals with total sightings per year
        myyeararray.forEach(function(x) { yeartotals[x] = (yeartotals[x] || 0)+1; });
        console.log(yeartotals);
        
        var years = Object.keys(yeartotals);
        console.log(years);
        var sightings = Object.values(yeartotals);
        console.log(sightings);
        var text = years.map((years) => `${years}`)
        
        // Build initial scatter trace
        var trace1 = {
            type: "scatter",
            mode: "markers",
            x: years,
            y: sightings,
            line: {
                color: "#f442b9"
            },
            text: text,
            marker: {
                size: sightings,
                sizeref: 0.2,
                sizemode: 'area'
            } 
        };

        var data = [trace1];
        
        var layout = {
            title: `Sasquatch Sightings by Year`,
            xaxis: {
                range: [1850, 2020],
                type: "year",
            },
            yaxis: {
                range: [0, 300],
                type: "linear"
            }
        };

        Plotly.newPlot("plot", data, layout);

    }