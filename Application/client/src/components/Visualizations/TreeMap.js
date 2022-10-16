import React, { Component, useState }  from 'react';
import {Button} from "@mui/material"
import * as d3 from 'd3';

// Using Fetch if needed
let url_value = "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv"//url_for_data.value



export default function Treemap(props){
    const handleButtonClose = () => {
        props.close(true);
    }

    return(


        <g>


            <div id={"my_dataviz_tree_map"} ></div>
            <svg ref={drawTreeMap()}></svg>

            <Button size="small" onClick={handleButtonClose}>Return to Visualizations</Button>
        </g>

    )


}

function drawTreeMap(){

    let height = 1200
    let width = 800
    let url_data= "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv"//url_for_data.value

    // set the dimensions and margins of the graph
    const margin = {top: 100, right: 10, bottom: 10, left: 10}
    width = width - margin.left - margin.right
    height = height - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz_tree_map")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            `translate(${margin.left}, ${margin.top})`);

    // read json data
    let lists = {};
    d3.csv(url_data).then( function(data) {

        //Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 3))
            .attr("text-anchor", "middle")
            .style("font-size", "25px")
            .style("text-decoration", "underline")
            .text("Deaths Per States and Counties");

        var focusText = svg
            .append('g')
            .attr("height", 75 )
            .attr("width", 100 )
            .join("rect")
            .style("background-color","black")
            .append('text')
            .style("opacity", 1)
            .attr("text-anchor", "left")
            .attr("alignment-baseline", "middle")
            .html("Text HERE")
            .attr("x", 0)
            .attr("y", 0 -10 )
            .style("font-size", "20px")


        //DATA SETUP May need to be changes -----------------------------------------------------------------------------
        const latest_date = data.columns[data.columns.length-1]
        var states = [];
        var stateNames = []
        var sorted_data = [];
        for (var i = 0; i < data.length; i++) {
            var x = {name:data[i]['County Name'],value:data[i][latest_date]}



            if( data[i][latest_date] == 0){
                continue;
            }


            if(lists[data[i]['State']] == null){

                lists[data[i]['State']] = [x]
                lists[data[i]['State']].total = parseInt(x.value)
                stateNames.push(data[i]['State'])
                states.push({name: data[i]['State'], children:lists[data[i]['State']]})
            }

            else {
                lists[data[i]['State']].push(x)
                lists[data[i]['State']].total = parseInt(lists[data[i]['State']].total) + parseInt(x.value)
            }
        }


        //sorting states / middle layer
        states.sort(function(a, b){ return (lists[b.name].total - lists[a.name].total)});

        //Top layer
        sorted_data = {name: "USA", children:states }


        //DATA Sorted -----------------------------------------------------------------------------------------------

        let root = d3.hierarchy(sorted_data).sort(function(a,b){
            return b.data.value - a.data.value

        });

        root = root.sum(function(d){ return d.value})

        d3.treemap()
            .size([width, height])
            .paddingTop(.5)
            .paddingRight(.5)
            .padding(.1)
            (root)

        // prepare a color scale
        var colors = []
        const change = 255/states.length
        var letters = '0123456789ABCDEF';
        //Setting seed for random number Math.random() * 16
        let number = 0;
        for(var x = 0; x < states.length; x=x+1){

            let color = '#';
            for (var i = 0; i < 6; i++) {
                number = (number*number * x /.321 +13.2) % 16
                color += letters[Math.floor(number)];
            }
            colors.push(color)
        }



        const color = d3.scaleOrdinal()
            .domain(stateNames)
            .range(colors)

        // And a opacity scale
        const opacity = d3.scaleLinear()
            .domain([10, 40])
            .range([.5,1])




        // use this information to add rectangles:
        svg
            .selectAll("rect")
            .data(root.leaves())
            .join("rect")
            .attr('x', function (d) {return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })

            .on('mouseover', function (event,d) {
                //Setting text for mouseover

                focusText.html("State: "+d.parent.data.name+" | Total Deaths:"+lists[d.parent.data.name]['total']
                    +"\t County: "+d.data.name+" | Total: "+d.data.value)
                d3.select(this)
                    .style("opacity", .3)
                //change appear on hover:
            })
            .on('mouseout', function (event,d) {
                //Setting text for mouseover
                //
                d3.select(this)
                    .style("opacity", function(d){ return opacity(d.data.value)})
            })

            .style("stroke", "black")
            .style("fill", function(d){return color(d.parent.data.name)} )
            .style("opacity", function(d){ return opacity(d.data.value)})





    })

}









