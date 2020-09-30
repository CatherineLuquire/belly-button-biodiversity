

function buildPlot(id) {
    d3.json("./samples.json").then(jsondata => {
        console.log(jsondata)
        var otu_ids = jsondata.samples[0].otu_ids;
        console.log("otu_ids")
        console.log(otu_ids)
        var otu_ids_reversed = otu_ids.slice(0, 10).reverse();
        var charting_ids = otu_ids_reversed.map(id => "OTU- " + id);
        console.log("chart_ids")
        console.log(charting_ids)
        console.log("labels")
        console.log(otu_ids)
        var values = jsondata.samples[0].sample_values;
        var bar_values = values.slice(0, 10).reverse();
        console.log("bar values")
        console.log(bar_values)
        var hovertext = jsondata.samples[0].otu_labels;
        var bar_hovertext = hovertext.slice(0, 10).reverse();

        console.log("hovertext")
        console.log(bar_hovertext)

        var trace = {
            x: bar_values,
            y: charting_ids,
            type: "bar",
            orientation: "h",
            text: bar_hovertext,
        };

        var data = [trace];
        var layout = {
            title: "top 10 OTU",
        };

        

    Plotly.newPlot("bar", data, layout);


        var trace1 = {
            x: otu_ids,
            y: values,
            text: hovertext,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: values, 
        }};

        var data1 = [trace1]

        var layout1 = {
            title: "Bubble Chart",
            height: 600,
            width: 1000
        };
    Plotly.newPlot("bubble", data1, layout1)
});
}

function getMetadata(id) {
    d3.json("./samples.json").then(jsondata => {
        var metadata = jsondata.metadata;
        console.log(metadata)
        var result = metadata.filter(md => md.id.toString()=== id)[0];
        console.log(result)
        demoResult = d3.select("#sample-metadata");
        demoResult.html("");
        Object.values(result).forEach((key, value) => {
            demoResult.append("h3").text(key[0], value[0])
        })})};
    

function optionChanged(id) {
    buildPlot(id);
    getMetadata(id);

}

function init() {
    var dropdown = d3.select("#selDataset");
    console.log(dropdown)

    d3.json("samples.json").then(jsondata => {
        console.log(jsondata)
        jsondata.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        });
        //define first sample to call plots on initial rendering
        var firstSample = jsondata.names[0];
        console.log(firstSample);
        buildPlot(firstSample);
        getMetadata(firstSample);
    });
}

init();

