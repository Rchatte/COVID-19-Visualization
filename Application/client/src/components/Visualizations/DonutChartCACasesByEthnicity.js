import * as d3 from 'd3';
import { csv, sort, svg, tsvParse } from 'd3';
import React, { useState, useRef, useEffect} from 'react'

// REMINDER: update this as presentation gets closer
const csvUrl = "https://gist.githubusercontent.com/Fran-cis-co/34c0d9e706462fabccf5fb3913905c72/raw/0c39964d3963b9dab63c73ddc99e02651a1dfc8f/CA_COVID19_Cases_and_Deaths_by_Race_and_Ethnicity.csv"

const DonutChartCACasesByEthnicity = ({width, height}) => {
    const svgRef = useRef();

    useEffect(() => {
      var svg = d3.select(svgRef.current),
      width = svg.attr('width'),
      height = svg.attr('height'),
    radius = Math.min(width, height) / 2;
      
      // variable which creats a group tag and sets a width and height for the pie chart
      var g = svg.append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
      // color scaled used to have different colors for each slice
      var color = d3.scaleOrdinal(d3.schemeCategory10)
      // variable which returns a specified data value to translate to the pie chart
      var pie = d3.pie().value(function(d){
        return d.cases;
      })

      // variables which create the skeleton perimiter of the pie chart
      var path = d3.arc()
          .outerRadius(radius - 40)
          .innerRadius(100);
      var label = d3.arc()
          .outerRadius(radius)
          .innerRadius(radius - 150);

      // d3 csv 
      d3.csv(csvUrl).then(
        function(data){
        const ethnicityRaceCases = []
        // for each row, grab the ethnicity/race and the total cases
        // This is a constantly updated data source
        for(var i = 0; i < data.length; i++){
            if(!(data[i].Race_Ethnicity.includes("Total with data"))){
                ethnicityRaceCases.push({ethnicityRace: data[i].Race_Ethnicity, cases: +data[i].Number_of_Cases});
            }
        }


        // variable which creats the tooltip to hover over each slice
        const tooldiv = d3.select('#chartArea')
                        .append('div')
                        .style('visibility', 'hidden')
                        .style('position', 'absolute')
                        .style('background-color', 'white')

        // Variable which sets the data for the pie
        var arc = g.selectAll('.arc')
        .data(pie(ethnicityRaceCases))
        .enter().append('g')
        .attr('class', 'arc')

        // allows to hover over the mouse to see a tooltip which shows the continent name along with the total cases
        arc.append('path')
          .attr('d', path)
          .attr('fill', function(d){return color(d.data.ethnicityRace);})
          .attr('stroke', 'white')
          .on('mouseover', (e,d) => {
            tooldiv.style('visibility', 'visible')
                    .text(`${d.data.ethnicityRace} Total Cases: ` + `${d.data.cases.toLocaleString("en-US")}`)
          })
          .on('mousemove', (e,d) => {
              tooldiv.style('top', (e.pageY-50) + 'px')
                      .style(`left`, (e.pageX-50) + 'px')
          })
          .on('mouseout', () =>{
              tooldiv.style('visibility', 'hidden')
          })

        

        // Adds the text on the slices; in this case it's the continent
        // arc.append('text')
        //   .attr('transform', function(d){return 'translate(' + label.centroid(d) + ')';})
        //   .text(function(d){return d.data.ethnicityRace});
        
        // This was the title, we can include this elsewhere maybe
        // svg.append('g')
        //   .attr('transform', 'translate(' + (width / 2 - 120) + ',' + 20 + ')')
        //   .append('text')
        //   .attr('class', 'title')
        
        }
      );

    });
  
  return (
    <div id='chartArea'>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  )
}

export default DonutChartCACasesByEthnicity
