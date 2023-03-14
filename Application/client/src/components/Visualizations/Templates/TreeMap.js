import React, { Component, useState }  from 'react';
import {Button} from "@mui/material"
import * as d3 from 'd3';

// Using Fetch if needed


export default function Treemap(props){
    console.log("Tree Map URL")
    console.log(props.url)
    return(
        <g>
            {/*<div id={"my_dataviz_tree_map"}  ref={Treemap_Setup(props)} ></div>*/}
            <svg id={"my_dataviz_tree_map"}  ref={setUP()} ></svg>
        </g>
    )
}
// setUP()
function setUP(props) {
    let colors = {barColor: "#00ffc4", parentColor: "#575278", childrenColor: "#27b694"};

    //Comment out then in for working treemap, see why that is
    console.log('A')

    // set the dimensions and margins of the graph
    const margin = {top: 100, right: 10, bottom: 10, left: 10}
    const height = 800 - margin.top - margin.bottom;
    const width = 1200 - margin.left - margin.right
    const url_data = "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv"//url_for_data.value


    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([0, height]);


    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz_tree_map")
        // .append("svg")
        .attr("id", "TreeMapID1")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .style("font", "10px sans-serif");


    var c = 0
    console.log('B')
    DrawTreemap()

    console.log("svg")
    console.log(svg)


    function DrawTreemap() {
        console.log('C' + c)
        c = c + 1

        // read json data
        d3.csv(url_data).then(function (data) {
            var State_County_Data_lists = {};


            //DATA SETUP May need to be changes -----------------------------------------------------------------------------
            const latest_date = data.columns[data.columns.length - 1]
            var sorted_data = [];
            var stateNames = []


            for (var i = 0; i < data.length; i++) {
                var x = {name: data[i]['County Name'], value: data[i][latest_date]}

                if (data[i][latest_date] == 0) {
                    continue;
                }
                if (State_County_Data_lists[data[i]['State']] == null) {

                    State_County_Data_lists[data[i]['State']] = [x]
                    State_County_Data_lists[data[i]['State']].total = parseInt(x.value)
                    stateNames.push(data[i]['State'])
                    sorted_data.push({name: data[i]['State'], children: State_County_Data_lists[data[i]['State']]})
                } else {
                    State_County_Data_lists[data[i]['State']].push(x)
                    State_County_Data_lists[data[i]['State']].total = parseInt(State_County_Data_lists[data[i]['State']].total) + parseInt(x.value)
                }
            }

            //parent level
            sorted_data = {name: "USA", children: sorted_data}

            //sorting states / middle layer
            sorted_data.children.sort(function (a, b) {
                return (State_County_Data_lists[b.name].total - State_County_Data_lists[a.name].total)
            });


            //DATA sorted from now on -----------------------------------------------------------------------------------------------


            // Root is the data tree hierarchy
            var root = d3.hierarchy(sorted_data).sort(function (a, b) {
                return b.data.value - a.data.value
            });

            root = root.sum(function (d) {
                return d.value
            })
            console.log('D')
            var treemap = d3.treemap()
                .size([width, height])
                .paddingTop(.5)
                .paddingRight(.5)
                .padding(.1)
                (root)


            //Group is the svg itself that is being changed
            var group = svg.append("g")
            // .call(drawTreeMap, root)
            console.log('E')
            zoomin(root, group)
            console.log('F')

        })
    }



    function drawTreeMap(group, root) {


        //------------------------- SVG HERE --------------------------------------------------------------------------

        const node = group
            .selectAll("g")
            .data(root.children.concat(root))
            .join("g");

        node.filter(d => d === root ? d.parent : d.children)
            .attr("cursor", "pointer")
            .on("click", (event, d) => d === root ? zoomout(root, group) : zoomin(d, group));

        node.append("title")
            .attr("width", width)
            .attr("dy", ".3")
            .text(d => `${name(d)}\n${format(d.value)} `)


        node.append("rect")
            .attr("id", d => (d.leafUid = uid("leaf")).id)
            .attr("fill", d => d === root ? colors.barColor : d.children ? colors.parentColor : colors.childrenColor)
            .attr("stroke", "#00ffc4");

        node.append("clipPath")
            .attr("id", d => (d.clipUid = uid("clip")).id)
            .append("use")
            .attr("xlink:href", d => d.leafUid.href);


        node.append("text")
            .attr("clip-path", d => d.clipUid)
            .attr("font-weight", d => d === root ? "bold" : null)
            .style("font", d => d === root ? "bold 10pt sans-serif " : "10px sans-serif")
            .selectAll("tspan")
            //top nav area links
            .data(d => (d === root ? name(d) : getName(d)).split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
            .join("tspan")
            .attr("x", ".5em")
            .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
            .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
            .attr("font-weight", (d, i, nodes) => i === nodes.length - 1 ? "normal" : null)
            .text(d => d);


        group.call(position, root);
    }

    // When zooming in, draw the new nodes on top, and fade them in.
    function zoomin(d, group) {
        console.log('Z')
        const group0 = group.attr("pointer-events", "none");
        const group1 = group = svg.append("g").call(drawTreeMap, d);

        x.domain([d.x0, d.x1]);
        y.domain([d.y0, d.y1]);

        svg.transition()
            .duration(750)
            .call(t => group0.transition(t).remove()
                .call(position, d.parent))
            .call(t => group1.transition(t)
                .attrTween("opacity", () => d3.interpolate(0, 1))
                .call(position, d));
    }

    // When zooming out, draw the old nodes on top, and fade them out.
    function zoomout(d, group) {
        const group0 = group.attr("pointer-events", "none");
        const group1 = group = svg.insert("g", "*").call(drawTreeMap, d.parent);

        x.domain([d.parent.x0, d.parent.x1]);
        y.domain([d.parent.y0, d.parent.y1]);

        svg.transition()
            .duration(750)
            .call(t => group0.transition(t).remove()
                .attrTween("opacity", () => d3.interpolate(1, 0))
                .call(position, d))
            .call(t => group1.transition(t)
                .call(position, d.parent));
    }


    function position(group, root) {
        //This function sets the position of the boxes and bar
        group.selectAll("g")
            .attr("transform", d => d === root ? `translate(0,-50)` : `translate(${x(d.x0)},${y(d.y0)})`)
            .select("rect")
            .attr("width", d => d === root ? width : x(d.x1) - x(d.x0))
            .attr("height", d => d === root ? 45 : y(d.y1) - y(d.y0));
    }


    function name(d) {
        return d.ancestors().reverse().map(d => d.data.name).join("/")

    }

    var format = d3.format(",d");

    var UIDcount = 0;

    function uid(name) {
        return new Id("O-" + (name == null ? "" : name + "-") + ++UIDcount);
    }

    function Id(id) {
        this.id = id;
        this.href = new URL(`#${id}`, document.location) + "";
        console.log("loc" + document.location)
    }

    Id.prototype.toString = function () {
        return "url(" + this.href + ")";
    };


}


// function Treemap_Setup(props){
//
//     let height;
//     let width;
//     let is_Interactive;
//
//     let id = "treemap"
//     let svgName = "my_dataviz_tree_map"
//
//
//     if(props.height == null){
//
//         height = 200
//     }
//     else{
//         height = props.height
//     }
//
//     if(props.width == null){
//         width = 200
//     }
//     else{
//         width = props.width
//     }
//
//     if(props.is_Interactive == null){
//         is_Interactive = true
//     }
//     else{
//         is_Interactive = props.is_Interactive
//     }
//
//     // set the dimensions and margins of the graph
//     const margin = {top: 100, right: 10, bottom: 10, left: 10}
//     width = width - margin.left - margin.right
//     height = height - margin.top - margin.bottom;
//
//
//
//
//     // read json data
//     d3.csv(props.url).then( function(data) {
//
//
//         let State_County_Data_lists = {};
//
//
//         //DATA SETUP May need to be changes -----------------------------------------------------------------------------
//         const latest_date = data.columns[data.columns.length-1]
//         var states = [];
//         var stateNames = []
//         var sorted_data = [];
//         for (var i = 0; i < data.length; i++) {
//             var x = {name:data[i]['County Name'],value:data[i][latest_date]}
//
//
//
//             if( data[i][latest_date] == 0){
//                 continue;
//             }
//
//
//             if(State_County_Data_lists[data[i]['State']] == null){
//
//                 State_County_Data_lists[data[i]['State']] = [x]
//                 State_County_Data_lists[data[i]['State']].total = parseInt(x.value)
//                 stateNames.push(data[i]['State'])
//                 states.push({name: data[i]['State'], children:State_County_Data_lists[data[i]['State']]})
//             }
//
//             else {
//                 State_County_Data_lists[data[i]['State']].push(x)
//                 State_County_Data_lists[data[i]['State']].total = parseInt(State_County_Data_lists[data[i]['State']].total) + parseInt(x.value)
//             }
//         }
//
//
//         //sorting states / middle layer
//         states.sort(function(a, b){ return (State_County_Data_lists[b.name].total - State_County_Data_lists[a.name].total)});
//
//         //Top layer
//         sorted_data = {name: "USA", children:states }
//
//         //DATA Sorted -----------------------------------------------------------------------------------------------
//
//         let root = d3.hierarchy(sorted_data).sort(function(a,b){
//             return b.data.value - a.data.value
//
//         });
//
//
//         root = root.sum(function(d){ return d.value})
//
//
//         // let title = "Deaths Per States and Counties"
//         drawTreeMap(root,width,height,margin,stateNames,State_County_Data_lists,id,svgName,is_Interactive)
//     })
// }
//
// function drawTreeMap(root,width,height,margin,middleLayerNames,lowerLayerData,id,svgName,is_Interactive){
//     //------------------------- SVG HERE --------------------------------------------------------------------------
//
//     // append the svg object to the body of the page
//     const svg = d3.select("#"+svgName)
//         // .append("svg")
//         .attr("id", id)
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform",
//             `translate(${margin.left}, ${margin.top})`);
//
//
//     if(is_Interactive){
//         var focusText = svg
//             .append('g')
//             .attr("height", 75 )
//             .attr("width", 100 )
//             .join("rect")
//             .style("background-color","black")
//             .append('text')
//             .style("opacity", 1)
//             .attr("text-anchor", "left")
//             .attr("alignment-baseline", "middle")
//             .html("--- ---")
//             .attr("x", 0)
//             .attr("y", 0 -10 )
//             .style("font-size", "20px")
//     }
//     d3.treemap()
//         .size([width, height])
//         .paddingTop(.5)
//         .paddingRight(.5)
//         .padding(.1)
//         (root)
//
//     // prepare a color scale
//     let colors = []
//     let change = 255/root.children.length
//     let start = 254
//     var letters = '0123456789ABCDEF';
//     //Setting seed for random number Math.random() * 16
//     let number = 0;
//     for(var x = 0; x < root.children.length; x=x+1){
//
//         let color = '#';
//         for (var i = 0; i < 6; i++) {
//             number = (number*number * x /.321 +13.2) % 16
//             color += letters[Math.floor(number)];
//         }
//         colors.push(color)
//     }
//
//
//
//     const color = d3.scaleOrdinal()
//         .domain(middleLayerNames)
//         .range(colors)
//
//     // And a opacity scale
//     const opacity = d3.scaleLinear()
//         .domain([10, 40])
//         .range([.5,1])
//
//
//
//
//     // use this information to add rectangles:
//     svg
//         .selectAll("rect")
//         .data(root.leaves())
//         .join("rect")
//         .attr('x', function (d) {return d.x0; })
//         .attr('y', function (d) { return d.y0; })
//         .attr('width', function (d) { return d.x1 - d.x0; })
//         .attr('height', function (d) { return d.y1 - d.y0; })
//
//         .on('mouseover', function (event,d) {
//             //Setting text for mouseover
//             if(is_Interactive){
//                 focusText.html("State: "+d.parent.data.name+" | Total :"+lowerLayerData[d.parent.data.name]['total']
//                     +"\t County: "+d.data.name+" | Total: "+d.data.value)
//                 d3.select(this)
//                     .style("opacity", .3)
//             }
//
//         })
//         .on('mouseout', function (event,d) {
//             //Setting text for mouseover
//             if(is_Interactive){
//                 d3.select(this)
//                     .style("opacity", function(d){ return opacity(d.data.value)})
//             }
//         })
//
//         .style("stroke", "black")
//         .style("fill", function(d){return color(d.parent.data.name)} )
//         .style("opacity", function(d){ return opacity(d.data.value)})
//
// }
//

