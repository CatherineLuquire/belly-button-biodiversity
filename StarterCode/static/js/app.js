

function getData(id) {
    d3.json("samples.json").then(jsondata => {
        console.log(jsondata)
        var ids = jsondata.samples[0].otu_ids.slice(0,10).reverse();
        chart_ids = ids.map(id => "OTU- " + id);
        console.log(chart_ids)
        console.log("labels")
        var otu_id = (`OTU-ID$ `)
        console.log(ids)
        var values = jsondata.samples[0].sample_values.slice(0, 10).reverse();
        console.log("values")
        console.log(values)
        var hovertext = jsondata.samples[0].otu_labels.slice(0, 10).reverse();
        console.log("hovertext")
        console.log(hovertext)

        var trace = {
            x: values,
            y: chart_ids,
            type: "bar",
            orientation: "h",
        };

        var data = [trace];
        var layout = {
            title: "top 10 OTU",
        };

    Plotly.newPlot("bar", data, layout);
});
}

function eventChange(id) {
    getData(id);
}

function init() {
    var dropdown = d3.select("#selDataset");
    console.log(dropdown)

    d3.json("samples.json").then(jsondata => {
        console.log(jsondata)
        jsondata.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        });
        getData(jsondata.names[0]);
    });
}


init();

