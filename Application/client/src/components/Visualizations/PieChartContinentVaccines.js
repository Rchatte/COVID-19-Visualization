import * as d3 from 'd3';
import { csv, sort, svg, tsvParse } from 'd3';
import React, { useState, useRef, useEffect} from 'react'
import PieChartTotalContinentCases from './PieChartTotalContinentCases';

// needs to be reupdated once we are close to presenting
const csvUrl = 'https://gist.githubusercontent.com/Fran-cis-co/5e79b46342a561fa7a39a3793892e354/raw/e9c26a280e62c15ca09a27aa5e826cac362a3b1b/vaccination-data.csv';

const PieChartContinentVaccines = (props) => {
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
      var color = d3.scaleOrdinal(d3.schemePastel1)

      // variable which returns a specified data value to translate to the pie chart
      var pie = d3.pie().value(function(d){
        return d.vaccinationsPer100k;
      })

      // variables which create the skeleton perimiter of the pie chart
      var path = d3.arc()
          .outerRadius(radius - 40)
          .innerRadius(100);
      var label = d3.arc()
          .outerRadius(radius)
          .innerRadius(radius - 150);

      // d3 csv 
      d3.csv(props.link).then(
        function(data){
        const WHORegion = []
        const vaccinations = []
        const totalVaccinations = []
 
        // For each row grab the WHO region and avoid duplicates
        for(var i = 0; i < data.length; i++){
            if(!WHORegion.includes(data[i].WHO_REGION)){
                WHORegion.push(data[i].WHO_REGION)
            }
            // match each countries total vaccinations with the WHO region it's in
            vaccinations.push({region: data[i].WHO_REGION, vaccinationsPer100k: +data[i].TOTAL_VACCINATIONS_PER100})
        }

        // for each WHO Region, add up the total vaccinations per 100k for each country
        for(var i = 0; i < WHORegion.length; i++){
          var sum = 0;
          vaccinations.forEach((d) =>{
            if(d.region === WHORegion[i]){
              sum += Math.ceil(d.vaccinationsPer100k);
            }
          })
          totalVaccinations.push({region: WHORegion[i], vaccinationsPer100k: sum})
        }

        // variable which creats the tooltip to hover over each slice
        const tooldiv = d3.select('#chartArea')
                        .append('div')
                        .style('visibility', 'hidden')
                        .style('position', 'absolute')
                        .style('background-color', 'white')

        // Variable which sets the data for the pie
        var arc = g.selectAll('.arc')
        .data(pie(totalVaccinations))
        .enter().append('g')
        .attr('class', 'arc')

        // allows to hover over the mouse to see a tooltip which shows the continent name along with the total cases
        arc.append('path')
          .attr('d', path)
          .attr('fill', function(d){return color(d.data.region);})
          .attr('stroke', 'white')
          .on('mouseover', (e,d) => {
            tooldiv.style('visibility', 'visible')
                    .text(`${d.data.region}'s` + ` Total Vaccinations: ` + `${d.data.vaccinationsPer100k.toLocaleString("en-US")}`)
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
          .text(function(d){return d.data.region});
        
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
      <svg ref={svgRef} width={props.width} height={props.height}></svg>
      <ul>
        <li>AFRO: African Region</li>
        <li>EMRO: Eastern Mediterranean Region</li>
        <li>SEARO: South-East Asian Region</li>
        <li>EURO: European Region</li>
        <li>AMRO: Region of the Americas</li>
        <li>WPRO: Western Pacific Region</li>
        <li>OTHER: regions not part of the WHO</li>
      </ul>
    </div>
  )
}

export default PieChartContinentVaccines