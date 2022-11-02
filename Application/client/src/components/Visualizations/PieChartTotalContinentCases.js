import * as d3 from 'd3';
import { csv, sort, svg, tsvParse } from 'd3';
import React, { useState, useRef, useEffect} from 'react'

// url with raw version of the data set
const csvUrl = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv';

const PieChartTotalContinentCases = ({width, height}) => {
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
      var color = d3.scaleOrdinal(['#C7CEEA','#B5EAD7','#FFDAC1', '#FF9AA2', ])
      const continents = []
      const cases = []
      const totalCases = []
      var latestUpdated;
      // variable which returns a specified data value to translate to the pie chart
      var pie = d3.pie().value(function(d){
        return d.totalCases;
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
        const continents = []
        const cases = []
        const totalCases = []
        
        // for each row not containing the ISO code OWID, grab the continent names and not include the duplicates
        for(var i = 0; i < data.length; i++){
          if(!data[i].iso_code.includes("OWID")){
            if(!continents.includes(data[i].continent)){
              continents.push(data[i].continent)
            }
            // match each countries total cases with the continent it's in
            cases.push({continent: data[i].continent, totalCases: +data[i].total_cases})
          }
        }

        // for each continent, add up the total cases for each country
        for(var i = 0; i < continents.length; i++){
          var sum = 0;
          cases.forEach((d) =>{
            if(d.continent === continents[i]){
              sum += d.totalCases;
            }
          })
          totalCases.push({continent: continents[i], totalCases: sum})
        }

        // variable which creats the tooltip to hover over each slice
        const tooldiv = d3.select('#chartArea')
                        .append('div')
                        .style('visibility', 'hidden')
                        .style('position', 'absolute')
                        .style('background-color', 'white')

        // Variable which sets the data for the pie
        var arc = g.selectAll('.arc')
        .data(pie(totalCases))
        .enter().append('g')
        .attr('class', 'arc')

        // allows to hover over the mouse to see a tooltip which shows the continent name along with the total cases
        arc.append('path')
          .attr('d', path)
          .attr('fill', function(d){return color(d.data.continent);})
          .attr('stroke', 'white')
          .on('mouseover', (e,d) => {
            tooldiv.style('visibility', 'visible')
                    .text(`${d.data.continent}'s` + ` Total Cases: ` + `${d.data.totalCases}`)
          })
          .on('mousemove', (e,d) => {
              tooldiv.style('top', (e.pageY-50) + 'px')
                      .style(`left`, (e.pageX-50) + 'px')
          })
          .on('mouseout', () =>{
              tooldiv.style('visibility', 'hidden')
          })

        // Adds the text on the slices; in this case it's the continent
        arc.append('text')
          .attr('transform', function(d){return 'translate(' + label.centroid(d) + ')';})
          .text(function(d){return d.data.continent});
        
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

export default PieChartTotalContinentCases