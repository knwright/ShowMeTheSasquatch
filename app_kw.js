// Build line plot with traces
function buildPlot(sightings) {
    d3.json("bfro_reports.json").then(function(bf_data) {
        console.log(bf_data);
        // Grab values from the response json object to build the plots
        var year = bf_data.dataset.year;
        var time_cond = bf_data.dataset.time_and_conditions;
        var county = bf_data.dataset.county;
        var state = bf_data.dataset.state;
        var season = bf_data.dataset.season;
        var loc_details = bf.data.dataset.location_details;

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
                range: [//year],
                type: "date",
            },
            yaxis: {
                autorange: true,
                type: "linear"
            }
        };

        Plotly.newPlot("plot", data, layout);

    });
}