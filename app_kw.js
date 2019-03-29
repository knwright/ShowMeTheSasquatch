// Build line plot with traces
function buildPlot(sightings) {
    d3.csv("bfro_reports_geocoded.csv").then(function(bf_data) {
        console.log(bf_data);
        // Grab values from the response json object to build the plots
        var year = bf_data.year;
        var time_cond = bf_data.time_and_conditions;
        var county = bf_data.county;
        var state = bf_data.state;
        var season = bf_data.season;
        var loc_details = bf_data.location_details;

        // Build initial scatter trace
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: sighting_class,
            x: year,
            y: 5032,
            line: {
                color: "#277ead"
            }
        };

        // Candlestick Trace
        var trace2 = {
            type: "candlestick",
            x: year,
            Time_Cond: time_cond,
            County: county,
            State: state,
            Season: season,
            Location_Details: loc_details
        };

        var data = [trace1, trace2];

        var layout = {
            title: `Sasquatch Sightings by Year`,
            xaxis: {
                range: [1860,2020],
                type: "year",
            },
            yaxis: {
                autorange: true,
                type: "linear"
            }
        };

        Plotly.newPlot("plot", data, layout);

    });
}