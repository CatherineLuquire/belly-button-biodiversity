
// create function to build plots on id variable
function buildPlot(id) {
    //fetch the json data, console.log it, and assign variables to different arrays
    d3.json("./samples.json").then(jsondata => {
        console.log(jsondata)
        // filter sample json data by id selected from dropdown menu
        var selected_id = jsondata.samples.filter(entry => entry.id === id);
        // filter metadata json data by id selected from dropdown menu
        var meta_id = jsondata.metadata.filter(entry => entry.id == id);
        // set variable for array of otu ids
        var otu_ids = selected_id[0].otu_ids;
        // get top 10 otus and reverse the order for the horizontal bar chart
        var otu_ids_reversed = otu_ids.slice(0, 10).reverse();
        // return array of otu ids for labeling chart
        var charting_ids = otu_ids_reversed.map(id => "OTU- " + id);
        // return array of all sample values 
        var values = selected_id[0].sample_values;
        // get top 10 values and reverse the order for the horizontal bar chart
        var bar_values = values.slice(0, 10).reverse();
        // get otu labels to assign to hovertext
        var hovertext = selected_id[0].otu_labels;
        // get top 10 otu labels and reverse the order for the horizontal bar chart
        var bar_hovertext = hovertext.slice(0, 10).reverse();
        // set washing frequency to variable for gauge chart
        var wpw = meta_id[0].wfreq;
        // define trace & layout for horizontal bar chart 
        var trace = {
            x: bar_values,
            y: charting_ids,
            type: "bar",
            orientation: "h",
            text: bar_hovertext,
        };
        var data = [trace];
        var layout = {
            title: "Top 10 OTUs",
            xaxis: {
                title: "Value"},
        };
    // plot bar chart
    Plotly.newPlot("bar", data, layout);
        // define trace and layout for bubble chart
        var trace1 = {
            x: otu_ids,
            y: values,
            text: hovertext,
            mode: 'markers',
            marker: {
                colorscale: "Rainbow",
                color: otu_ids,
                size: values, 
        }};

        var data1 = [trace1]

        var layout1 = {
            title: "Bubble Chart",
            xaxis: {
                title: "OTU ID"
            },
            yaxis: {
                title: "Value"
            },
            height: 750,
            width: 1050
        };
    // plot bubble chart
    Plotly.newPlot("bubble", data1, layout1);
        // define data and layout for gauge
        var data2 = [
            {
                domain: { x: [0,1], y: [0,1]},
                value: wpw,
                title: "Belly Button Washes per Week",
                type: "indicator",
                mode: "gauge+number+delta",
                delta: {reference: 7, increasing: {color: "#73C6B6"}},
                gauge: {
                    axis: {range: [0, 9]},
                    bar: {color: "#73C6B6"},
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                        {range: [0-4], color: "red"},
                        {range: [2-4], color: "yellow"},
                        {range: [4-6], color: "green"},
                        {range: [6-9], color: "blue"}
                    ],
                    threshold: {
                        line: {color: "black", width: 4},
                        thickness: 0.75,
                        value: 7
                    }
                } 
            }
        ];
        var layout2 = {
            // title: "Belly Button Washing Gauge",
            // heigh: 100,
            // width: 400,
            // margin: {t: 0, b: 0}
        };
    // plot gauge chart
    Plotly.newPlot("gauge", data2, layout2);
});
}
// create function to fill demographic info on id variable 
function getMetadata(id) {
    //fetch the json data
    d3.json("./samples.json").then(jsondata => {
        // create variable for all metadata
        var metadata = jsondata.metadata;
        // filter metadata by id selected from dropdown menu and assign to variable
        var result = metadata.filter(md => md.id.toString()=== id)[0];
        // assign variable to dropdown menu selection
        demoResult = d3.select("#sample-metadata");
        // clear any previous html results
        demoResult.html("");
        // fill demographic info with new DemoResult 
        Object.entries(result).forEach(([key, value]) => {
            demoResult.append("h5").text(`${key} : ${value}`)
        })})};
    
// create function to call plot and metadata functions upon selection from dropdown menu
function optionChanged(id) {
    buildPlot(id);
    getMetadata(id);
}
// create init function
function init() {
    // create variable for dropdown menu
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then(jsondata => {
        console.log(jsondata)
        // populate dropdown menu
        jsondata.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value", name);
        });
        // create variable for first sample to populate charts and metadata on initial rendering
        var firstSample = jsondata.names[0];
        console.log(firstSample);
        buildPlot(firstSample);
        getMetadata(firstSample);
    });
}
// call init function
init();

