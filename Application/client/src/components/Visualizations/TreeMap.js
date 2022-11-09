import React, { Component, useState }  from 'react';
import {Button} from "@mui/material"
import * as d3 from 'd3';

// Using Fetch if needed
let url_value = "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv"//url_for_data.value



export default function Treemap(props){
    return(
        <g>
            <svg id={"my_dataviz_tree_map"}  ref={Treemap_Setup(props)} ></svg>
        </g>
    )
}


function Treemap_Setup(props){

    let height;
    let width;
    let is_Interactive;

    let id = "treemap"
    let svgName = "my_dataviz_tree_map"
    let url_data= "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv"//url_for_data.value

    if(props.height == null){
        console.log("NULLL")
        height = 200
    }
    else{
        console.log("NOt NULLL")
        height = props.height
    }

    if(props.width == null){
        width = 200
    }
    else{
        width = props.width
    }

    if(props.is_Interactive == null){
        is_Interactive = true
    }
    else{
        is_Interactive = props.is_Interactive
    }

    // set the dimensions and margins of the graph
    const margin = {top: 100, right: 10, bottom: 10, left: 10}
    width = width - margin.left - margin.right
    height = height - margin.top - margin.bottom;

    console.log(props.url);


    // read json data
    d3.csv(props.url).then( function(data) {


        let State_County_Data_lists = {};


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


            if(State_County_Data_lists[data[i]['State']] == null){

                State_County_Data_lists[data[i]['State']] = [x]
                State_County_Data_lists[data[i]['State']].total = parseInt(x.value)
                stateNames.push(data[i]['State'])
                states.push({name: data[i]['State'], children:State_County_Data_lists[data[i]['State']]})
            }

            else {
                State_County_Data_lists[data[i]['State']].push(x)
                State_County_Data_lists[data[i]['State']].total = parseInt(State_County_Data_lists[data[i]['State']].total) + parseInt(x.value)
            }
        }


        //sorting states / middle layer
        states.sort(function(a, b){ return (State_County_Data_lists[b.name].total - State_County_Data_lists[a.name].total)});

        //Top layer
        sorted_data = {name: "USA", children:states }

        //DATA Sorted -----------------------------------------------------------------------------------------------

        let root = d3.hierarchy(sorted_data).sort(function(a,b){
            return b.data.value - a.data.value

        });


        root = root.sum(function(d){ return d.value})


        let title = "Deaths Per States and Counties"
        drawTreeMap(root,width,height,margin,stateNames,State_County_Data_lists,id,svgName,is_Interactive,title)
    })
}

function drawTreeMap(root,width,height,margin,middleLayerNames,lowerLayerData,id,svgName,is_Interactive,title){
    //------------------------- SVG HERE --------------------------------------------------------------------------

    // append the svg object to the body of the page
    const svg = d3.select("#"+svgName)
        // .append("svg")
        .attr("id", id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            `translate(${margin.left}, ${margin.top})`);

    //Title
    //Dont show title if not interactive TEMP
    if(is_Interactive){
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 3))
            .attr("text-anchor", "middle")
            .style("font-size", "25px")
            .style("text-decoration", "underline")
            .text(title);
    }
    if(is_Interactive){
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
            .html("--- ---")
            .attr("x", 0)
            .attr("y", 0 -10 )
            .style("font-size", "20px")
    }
    d3.treemap()
        .size([width, height])
        .paddingTop(.5)
        .paddingRight(.5)
        .padding(.1)
        (root)

    // prepare a color scale
    let colors = []
    let change = 255/root.children.length
    let start = 254
    var letters = '0123456789ABCDEF';
    //Setting seed for random number Math.random() * 16
    let number = 0;
    for(var x = 0; x < root.children.length; x=x+1){

        let color = '#';
        for (var i = 0; i < 6; i++) {
            number = (number*number * x /.321 +13.2) % 16
            color += letters[Math.floor(number)];
        }
        colors.push(color)
    }



    const color = d3.scaleOrdinal()
        .domain(middleLayerNames)
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
            if(is_Interactive){
                focusText.html("State: "+d.parent.data.name+" | Total Deaths:"+lowerLayerData[d.parent.data.name]['total']
                    +"\t County: "+d.data.name+" | Total: "+d.data.value)
                d3.select(this)
                    .style("opacity", .3)
            }

        })
        .on('mouseout', function (event,d) {
            //Setting text for mouseover
            if(is_Interactive){
                d3.select(this)
                    .style("opacity", function(d){ return opacity(d.data.value)})
            }
        })

        .style("stroke", "black")
        .style("fill", function(d){return color(d.parent.data.name)} )
        .style("opacity", function(d){ return opacity(d.data.value)})

}


