d3.csv("bfro_reports_geocoded.csv").then(function(bf_data) {
    // console.log(bf_data);

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
        // console.log(myyeararray);

        // Create empty array to hold total sightings for each year
        var yeartotals = {};

        // Populate year totals with total sightings per year
        myyeararray.forEach(function(x) { yeartotals[x] = (yeartotals[x] || 0)+1; });
        // console.log(yeartotals);
        
        var years = Object.keys(yeartotals);
        // console.log(years);
        var sightings = Object.values(yeartotals);
        // console.log(sightings);
        
        // Build initial scatter trace
        var trace1 = {
            type: "scatter",
            mode: "markers",
            x: years,
            y: sightings,
            // text: text,
            marker: {
                size: sightings,
                color: years,
                colorscale: 'Picnic',
                sizeref: 0.15,
                sizemode: 'area'
            } 
        };

        var data = [trace1];
        
        var layout = {
            title: `Sasquatch Sightings by Year`,
            hovermode: 'closest',
            showlegend: false,
            xaxis: {
                range: [1850, 2020],
                type: "year",
            },
            yaxis: {
                range: [0, 300],
                type: "linear"
            },
            annotations: [
                {
                    x: 1951,
                    y: 15,
                    xref: 'x',
                    yref: 'y',
                    text: "First Footprint<br>Photo<br>1951<br>",
                    showarrow: true,
                    font: {
                        size: 10
                    },
                    align: 'left',
                    arrowhead: 3,
                    ax: -30,
                    ay: -40
                },
                {
                    x: 1958,
                    y: 90,
                    xref: 'x',
                    yref: 'y',
                    text: "Bigfoot 'Hunter'<br>culture emerges<br>1958<br>",
                    showarrow: true,
                    font: {
                        size: 10
                    },
                    align: "center",
                    arrowhead: 3,
                    ax: -30,
                    ay: -40
                },
                {
                    x: 1967,
                    y: 50,
                    xref: 'x',
                    yref: 'y',
                    text: "The 'Patterson<br>Film'<br>1967<br>",
                    showarrow: true,
                    font: {
                        size: 10
                    },
                    align: "center",
                    arrowhead: 3,
                    ax: -30,
                    ay: -40
                },
                {
                    x: 1980,
                    y: 100,
                    xref: 'x',
                    yref: 'y',
                    text: "The World Wide<br>Web Created<br>1980<br>",
                    showarrow: true,
                    font: {
                        size: 10
                    },
                    align: "center",
                    arrowhead: 3,
                    ax: -30,
                    ay: -40
                },
                {
                    x: 1994,
                    y: 150,
                    xref: 'x',
                    yref: 'y',
                    text: "Widespread Internet<br>Use Starts<br>Increasing<br>1994<br>",
                    showarrow: true,
                    font: {
                        size: 10
                    },
                    align: "center",
                    arrowhead: 3,
                    ax: -30,
                    ay: -40
                },
                {
                    x: 2009,
                    y: 275,
                    xref: 'x',
                    yref: 'y',
                    text: "Global Internet Use<br>at 1.853 Billion<br>2009",
                    showarrow: true,
                    font: {
                        size: 10
                    },
                    align: "center",
                    arrowhead: 3,
                    ax: -30,
                    ay: -40
                }
            ]
        };

        Plotly.newPlot("bubblePlot", data, layout, {responsive: true});

    }