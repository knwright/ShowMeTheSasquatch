d3.csv("bfro_reports_geocoded.csv").then(function(bf_data) {
    console.log(bf_data);

    buildPlot(bf_data);
});

// Build line plot with traces
function buildPlot(bf_data) {

        // Grab values from the response object to build the plots
        var parseDate = d3.timeParse("%Y");
        var year = bf_data.map(x => parseDate(x.date));
        var sighting = bf_data.map(x => parseDate(x.date));
        
        // Build initial scatter trace
        var trace1 = {
            type: "scatter",
            mode: "lines",
            x: year,
            y: sighting,
            line: {
                color: "#277ead"
            }
        };

        var data = [trace1];
        var layout = {
            title: `Sasquatch Sightings by Year`,
            xaxis: {
                range: [1850,2020],
                type: "year",
            },
            yaxis: {
                range: [0,100],
                type: "linear"
            }
        };

        Plotly.newPlot("plot", data, layout);

    }