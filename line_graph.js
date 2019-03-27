
// Retrieve CSV data
d3.csv("data/bfro_reports_geocoded.csv", function(data) {
    console.log(data);
  });

def bigfoot_by_year(sightings):
    # Create a dict mapping the 
    # classification -> [(year, count), (year, count) ... ]
    sightings_by_year = {
        classification: 
            sorted(
                list(
                    # Group by year -> count.
                    countby(sighting_year, class_sightings).items()
                ),
                # Sort by year.
                key=first
            )
        for classification, class_sightings 
        in groupby('classification', sightings).items()
    }
    
    # Build the plot with a dictionary.
    return {
        "data": [
            {
                "type": "scatter",
                "mode": "lines+markers",
                "name": classification,
                "x": listpluck(0, class_sightings_by_year),
                "y": listpluck(1, class_sightings_by_year)
            }
            for classification, class_sightings_by_year 
            in sightings_by_year.items()
        ],
        "layout": {
            "title": "Sightings by Year",
            "showlegend": False
        }
    }
