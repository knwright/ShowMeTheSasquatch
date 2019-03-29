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
        var county = bf_data.map(x => x.county);
        var state = bf_data.map(x => x.state);
        var title = bf_data.map(x => x.title);
        

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

        // Candlestick Trace
        var trace2 = {
            type: "candlestick",
            x: year,
            y: sighting,
            County: county,
            State: state,
            Description: title
        };

        var data = [trace1, trace2];

        var layout = {
            title: `Sasquatch Sightings by Year`,
            xaxis: {
                range: [1850,2020],
                type: "year",
            },
            yaxis: {
                range: [0,200],
                type: "linear"
            }
        };

        Plotly.newPlot("plot", data, layout);

    }