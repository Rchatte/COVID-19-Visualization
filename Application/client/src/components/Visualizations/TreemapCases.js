import React, { Component, useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';



{/* 
    To make this scalable we can try:
    props: url={props.data.link1} height={height/2.5} width={width/2.5} filters={props.filters} type={props.data.graph_type}
*/}


export default function TreemapCases(props) {
    const svgRef = useRef(null);
    const [data, setData] = useState();
    const url_data = "https://static.usafacts.org/public/data/covid-19/covid_confirmed_usafacts.csv" //url_for_data.value
    


    

    useEffect(() => { 
        console.log(props);
        // Check the (type)
        // const appropriateData = func1() .. over time
        // const appropriateData = func2() .. total deaths
        // const appropriateData = func3() .. total vacinations
        // setUP(appropriateData, svgRef) 
        setUP(props, svgRef)
    }, [props.filters])

    {/* 
        func1()
        func2()
        func3()
    */}
    
    function setUP(props, svgRef) {
        const filters = props.filters;
        console.log(filters);
        const colors = { barColor: filters.color1, parentColor: filters.color2, childrenColor: filters.color3 };
        const margin = { top: 100, right: 5, bottom: 5, left: 5 }
    
        let height = 600;//Default values
        let width = 800;
        let is_Interactive = true;
    
        let id = "treemapID"
        let svgName = "my_dataviz_tree_map"

        if (props.hasOwnProperty("height")) {
            height = props.height
        }
    
        if (props.hasOwnProperty("width")) {
            width = props.width //Defult values
        }

        if (props.hasOwnProperty("is_Interactive")) {
            is_Interactive = props.is_Interactive
        }

        // append the svg object to the body of the page
        let svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //.select("#"+id).remove()
        //svg

        if(!svg.select("#"+id).empty()){
            svg.select("#"+id).remove()
        }
        svg=svg.append("g")
            .attr("id",id)
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("font", "10px sans-serif");
        
    
    
        //Tooltips to display text on hover
        d3.select("#tooltip")
            .style("position", "absolute")
            .style("top", 0)
            .style("left", 0);

        var tooltip_name = d3.select("#tooltip_name")
        var tooltip_value = d3.select("#tooltip_value")
            .style("font-size", "20px");

        // set the dimensions and margins of the graph
        height = props.height - margin.top - margin.bottom;
        width = props.width - margin.left - margin.right
        console.log(width)

        const x = d3.scaleLinear().rangeRound([0, width]);
        const y = d3.scaleLinear().rangeRound([0, height]);
        DrawTreemap();


        function DrawTreemap() {
            // read json data

            d3.csv(url_data).then(function (data) {
                //DATA SETUP May need to be changes -----------------------------------------------------------------------------
                var State_County_Data_lists = {};
                const latest_date = data.columns[data.columns.length - 1]
                var sorted_data = [];
                var stateNames = []
                for (var i = 0; i < data.length; i++) {
                    var x = { name: data[i]['County Name'], value: data[i][latest_date] }
    
                    if (data[i][latest_date] == 0) {
                        continue;
                    }
                    if (State_County_Data_lists[data[i]['State']] == null) {
    
                        State_County_Data_lists[data[i]['State']] = [x]
                        State_County_Data_lists[data[i]['State']].total = parseInt(x.value)
                        stateNames.push(data[i]['State'])
                        sorted_data.push({ name: data[i]['State'], children: State_County_Data_lists[data[i]['State']] })
                    } else {
                        State_County_Data_lists[data[i]['State']].push(x)
                        State_County_Data_lists[data[i]['State']].total = parseInt(State_County_Data_lists[data[i]['State']].total) + parseInt(x.value)
                    }
                }
    
                //parent level
                sorted_data = { name: "USA", children: sorted_data }    
                console.log("Sorted Data")

                console.log(sorted_data)
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
                    .round(false)
                    (root)
    
    
                //Group is the svg itself that is being changed
                var group = svg.append("g")
                svg
                   .on("mouseenter", (event) => {
                        d3.select("#tooltip").style("opacity", 1)
                   })
                   .on("mouseleave", (event) => {
                        d3.select("#tooltip").style("opacity", 0)
                   })
                d3.select("#vizFrame") //Todo change to selecting the svg later
                    .on("mousemove", function (event) {
                        var coords = d3.pointer(event);
                        d3.select("#tooltip")
                           .style("top", (coords[1] - 50) + "px")
                           .style("left", (coords[0] + 20) + "px");
                    });

                // Width gathered from here.  
                //const width = d3.select("#vizFrame").node().offsetWidth;
                //props.setWidth(width);
                
                zoomin(root, group)
                })
            
        }
    

        function drawTreeMap(group, root) {
            //------------------------- SVG HERE --------------------------------------------------------------------------
            setData(root)
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
                .on("mouseover", function (event, d) {
                    tooltip_name.text(d.data.name)
                    tooltip_value.text(d.value)
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
            console.log(d);
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

        function getName(d){

            if((d.x1-d.x0)/5 <  d.data.name.length){
                return "..."
            }
            else{
                return d.data.name
            }

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

        return svg
    }

    return (
        <div id="vizFrame">
            <div id="tooltip">
                <h2 id="tooltip_name"></h2>
                <p id="tooltip_value"></p>
            </div>
            <svg height="100%" width="100%" ref={svgRef}></svg>
        </div>
    )
}



