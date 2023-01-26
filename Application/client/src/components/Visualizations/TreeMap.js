import React, { Component, useState }  from 'react';
import * as d3 from 'd3';

// Using Fetch if needed


export default function Treemap(props){
    return(
        <g>
            <svg id={"my_dataviz_tree_map"} ref={setUP(props)}></svg>
            <div id="tooltip" className="hidden">
                <h2 id="tooltip_name"></h2>
                <p id="tooltip_value"></p>
            </div>
        </g>
    )
}

function setUP(props) {


    const colors = {barColor: "#00ffc4", parentColor: "#575278", childrenColor: "#27b694"};

    const margin = {top: 100, right: 5, bottom: 5, left: 5}

    let height = 600;//Default values
    let width =  800;
    let is_Interactive = true;

    let id = "treemapID"
    let svgName = "my_dataviz_tree_map"



    if(props.hasOwnProperty("height")){
        height = props.height
    }

    if(props.hasOwnProperty("width")){
        width = props.width //Defult values
    }


    if(props.hasOwnProperty("is_Interactive")){
        is_Interactive = props.is_Interactive
    }


    console.log("TreeMap")
    let temp = document.getElementById(id)
    console.log(temp)
    temp = document.getElementById(svgName)
    console.log(temp)


    // append the svg object to the body of the page
    const svg = d3.select("#"+ svgName)
        .attr("id", id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .style("font", "10px sans-serif");

    const tooltip_name = svg.append("h2")


    console.log("Start")
    console.log(svg)

    var tooltip = d3.select("#tooltip")

    // set the dimensions and margins of the graph
    height = props.height - margin.top - margin.bottom;
    width = props.width - margin.left - margin.right
    const url_data = "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv"//url_for_data.value


    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([0, height]);






    DrawTreemap()



    function DrawTreemap() {


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
            var treemap = d3.treemap()
                .size([width, height])
                .paddingTop(.5)
                .paddingRight(.5)
                .padding(.1)
                .round(true)
                (root)









            //Group is the svg itself that is being changed
            var group = svg.append("g")
            // .call(drawTreeMap, root)
            zoomin(root, group)

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
            .attr("stroke", "#00ffc4")
            .on("mouseover", function(event,d){
                console.log("X: " + event.clientX + " | " + "Y: " + event.clientY)
                document.getElementById("tooltip_name").innerHTML = d.data.name
                document.getElementById("tooltip_value").innerHTML = (d.value)


            });


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
            .data(d => (d === root ? name(d) : d.data.name).split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
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
    }

    Id.prototype.toString = function () {
        return "url(" + this.href + ")";
    };







}


