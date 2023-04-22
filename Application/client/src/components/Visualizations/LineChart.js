import React, { Component, useState, useEffect } from 'react';
import { Button } from "@mui/material"
import * as d3 from 'd3';
import { filter } from 'd3';
import moment from 'moment';

// Using Fetch if needed
var today = new Date(); //today's date
var lastUpdated = new Date('2022-10-27T10:55:00'); //the last date of the dataset, to be updated
var betweenDates = (Math.abs(lastUpdated.getTime() - today.getTime())) / (60 * 60 * 1000); //get the Hours between these two dates ^
let sorted_data = [];

export default function LineChart(props) {
    const [filters, setFilters] = useState(props.filters);

    today = new Date(); //today's date
    const svgRef = React.useRef(null);


    useEffect(() => {
        //console.log(props);
        //console.log(props.filters.endDate);
        console.log(props.width);
        console.log(props.filters);
        createLineGraph(props.url,  props.width, props.height, props.filters)
    }, [props.filters.start_date, props.filters.start_date])



    const createLineGraph = function (url_value, width, height, filters) {
        let id = "lineGraph"
        let tagName = "my_dataviz_line"
        if (betweenDates > 24 || sorted_data.length == 0) {
            lastUpdated = today;
            d3.csv(url_value).then(data => {

                const dates = data.columns.splice(4)
                sorted_data = [] //empty sorted_data, outdated data
                //TODO: Modify to make more effecent Later
                dates.forEach(date => {
                    let value = { date: d3.timeParse("%Y-%m-%d")(date), sum_to_date: (d3.sum(data, d => d[date])) };
                    sorted_data.push(value)

                })
                // label.innerHTML = show_text   
                // append the svg object to the body of the page
                // checks if the filter prop has user selected dates to actually start filtering
                // if the filters prop actually has user selected data, the filtered data will get sent
                // else, the default data will

                
                if (filters.end_date !== '' && filters.start_date !== '') {
                    console.log(filters.start_date); // 3/10/2023
                    console.log(filters.end_date);// 3/10/2023
                    // filtered data from selected dates   
                    const filteredData = sorted_data.filter(function (entry) {
                        // formatted all the dates to be the same date format
                        const formattedEntry = moment(entry.date).format('MM-DD-YYYY');
                        const startDate = moment(filters.start_date).format('MM-DD-YYYY');
                        const endDate = moment(filters.end_date).format('MM-DD-YYYY');
                        return (formattedEntry >= startDate) && (formattedEntry <= endDate);
                    });
                    console.log(filteredData);

                    draw_linegraph_over_time(id, tagName, filteredData, width, height);
                } else {
                    // returns regular data if user doesn't select anything
                    draw_linegraph_over_time(id, tagName, sorted_data, width, height);
                }
            });
        }
        else {
            d3.csv(url_value).then(data => {
                draw_linegraph_over_time(id, tagName, sorted_data, width, height)
            })
        }
    }



    const draw_linegraph_over_time = function (id, tagName, data, width, height) {
        const margin = { top: 10, right: 30, bottom: 30, left: 60 }
       
        // d3.select("#"+id).remove(); //What does this do?
        const svg = d3.select(svgRef.current)
            //.append("svg")
            .attr("id", id)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);

        // Add X axis --> it is a date format
        const x = d3.scaleTime()
            .domain(d3.extent(data, function (d) { return d.date; }))
            .range([0, width]);
        let xAxis = svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return +d.sum_to_date; })])
            .range([height, 0]);
        let yAxis = svg.append("g")
            .call(d3.axisLeft(y));

        // Add a clipPath: everything out of this area won't be drawn.
        const clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        // Add brushing
        const brush = d3.brushX()                   // Add the brush feature using the d3.brush function
            .extent([[0, 0], [width, height]])  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

        // Create the line variable: where both the line and the brush take place
        const line = svg.append('g')
            .attr("clip-path", "url(#clip)")

        // Add the line
        line.append("path")
            .datum(data)
            .attr("class", "line")  // I add the class line to be able to modify this line later on.
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return x(d.date) })
                .y(function (d) { return y(d.sum_to_date) })
            )

        // Add the brushing
        line
            .append("g")
            .attr("class", "brush")
            .call(brush);

        // A function that set idleTimeOut to null
        let idleTimeout
        function idled() { idleTimeout = null; }

        // A function that update the chart for given boundaries
        function updateChart(event, d) {

            // What are the selected boundaries?
            let extent = event.selection

            // If no selection, back to initial coordinate. Otherwise, update X axis domain
            if (!extent) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                x.domain([4, 8])
            } else {
                x.domain([x.invert(extent[0]), x.invert(extent[1])])
                line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
            }

            // Update axis and line position
            xAxis.transition().duration(1000).call(d3.axisBottom(x))
            line
                .select('.line')
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(function (d) { return x(d.date) })
                    .y(function (d) { return y(d.sum_to_date) })
                )
        }

        // If user double click, reinitialize the chart
        svg.on("dblclick", function () {
            x.domain(d3.extent(data, function (d) { return d.date; }))
            xAxis.transition().call(d3.axisBottom(x))
            line
                .select('.line')
                .transition()
                .attr("d", d3.line()
                    .x(function (d) { return x(d.date) })
                    .y(function (d) { return y(d.sum_to_date) })
                )
        });


        /*Hovering
    
        svg.on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseout', mouseout)
    
    
    
        const zeroPad = (num, places) => String(num).padStart(places, '0')
    
        // What happens when the mouse move -> show the annotations at the right positions.
        var focus = svg
            .append('g')
            .append('circle')
            .style("fill", "none")
            .attr("stroke", "black")
            .attr('r', 8.5)
            .style("opacity", 0)
    
        // Create the text that travels along the curve of chart
        var focusText = svg
            .append('g')
            .append('text')
            .style("opacity", 0)
            .attr("text-anchor", "left")
            .attr("alignment-baseline", "middle")
    
    
        var bisect = d3.bisector(function (d) { return d.date; }).right;
    
        /*
        function mouseover() {
            focus.style("opacity", 1)
            focusText.style("opacity", 1)
        }
    
        function mousemove(event) {
            // recover coordinate we need
            var x0 = x.invert(d3.pointer(event)[0]);
    
            var i = bisect(data, x0, 1);
    
            let selectedData = data[i]
            focus
                .attr("cx", x(selectedData.date))
                .attr("cy", y(selectedData.sum_to_date))
            focusText
                .html("x:" + zeroPad(selectedData.date.getDate(), 2) + "/" + zeroPad((selectedData.date.getMonth(), 2)) + "/" + selectedData.date.getFullYear() + " | " + selectedData.sum_to_date)
                .attr("x", 0)
                .attr("y", 1)
        }
        function mouseout() {
            focus.style("opacity", 0)
            focusText.style("opacity", 0)
        }
        */
    }

    return (
        <>
            <svg height="100%" width="100%" ref={svgRef}></svg>
        </>

    )

}


