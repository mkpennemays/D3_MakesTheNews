// 

function plotTheData(){

    d3.csv("./assets/data/data.csv").then(function(data) {
        //margins
        var margin = {
            top: 30,
            right: 30,
            bottom: 40,
            left: 50
          };

        // SVG dimensions
        var svgHeight = 600;
        var svgWidth = 1000;

        // chart area minus margins
        var chartHeight = svgHeight - margin.top - margin.bottom;
        var chartWidth = svgWidth - margin.left - margin.right;
        console.log(chartWidth);

        // create svg container   
        var svg = d3.select("body")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);
            
        // shift everything over by the margins
        var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        //yaxis
        let yMin = 0;
        if (+d3.max(data, d => +d.obesity) > 0 ? yMin = (+d3.max(data, d => +d.obesity)/2): yMin = 0 );
        var y = d3.scaleLinear()

            .domain([yMin,+d3.max(data, d => +d.obesity)])
            .range([chartHeight, 0]);
        chartGroup.append("g")
            .call(d3.axisLeft(y));

        //xScale
        var x = d3.scaleLinear()
            .domain(d3.extent(data, d => +d.poverty))
            .range([0, chartWidth]);
        chartGroup.append("g")
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(d3.axisBottom(x));

        // Add dots
        chartGroup.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cy", function (d) { return y(+d.obesity); } )
            .attr("cx", function (d) { return x(+d.poverty); } )
            .attr("r", 11)
            .style("fill", "#69b3a2");

            //Add state abbreviations
            chartGroup.append('g')
                .selectAll("text")
                .data(data)
                .enter()
                .append("text").text(function(d){return d.abbr;})
                .attr("x", function (d) {return x(+d.poverty) -7 ;})
                .attr("y", function (d) {return (y(+d.obesity) +3 );})
                .attr("font-weight","bold")
                .attr("font-size","10");

                chartGroup.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left)
                    .attr("x",0 - (chartHeight / 2))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text("% Obesity");
                chartGroup.append("text")
                    .attr("x", margin.left + (chartWidth / 2))
                    .attr("y",(chartHeight + (margin.bottom /2)))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text("% in Poverty");


    }).catch(function(error) {
        console.log(error);     
    });
}

plotTheData();

