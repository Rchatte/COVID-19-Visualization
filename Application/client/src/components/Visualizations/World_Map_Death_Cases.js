import React, { Component, useState }  from 'react';
import {Button} from "@mui/material"
import * as d3 from 'd3';

// Using Fetch if needed




export default function World_Map_Death_Cases(props){

    return(
        <g>
            <svg id={"my_dataviz_World_Map_Total_Death"}  ref={Map_Setup(props,"my_dataviz_World_Map_Total_Death")} ></svg>
        </g>
    )


}

function Map_Setup(props,id){
    const margin = {top: 100, right: 10, bottom: 10, left: 10}
    let height = 600
    let width = 400


    // The svg
    const svg = d3.select("#"+id)
        // .append("svg")
        .attr("id", id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            `translate(${margin.left}, ${margin.top})`);

    // Map and projection
    const path = d3.geoPath();
    const projection = d3.geoMercator()
        .scale(70)
        .center([0,20])
        .translate([width / 2, height / 2]);




    const map_viz = new Map();


    let max = 0


    // Load external data and boot
    Promise.all([
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),

        d3.csv("https://covid.ourworldindata.org/data/owid-covid-data.csv", function(d) {
            // let convert_2_3 = { "AF" : "AFG", "AL" : "ALB", "DZ" : "DZA", "AS" : "ASM", "AD" : "AND", "AO" : "AGO", "AI" : "AIA", "AQ" : "ATA", "AG" : "ATG", "AR" : "ARG", "AM" : "ARM", "AW" : "ABW", "AU" : "AUS", "AT" : "AUT", "AZ" : "AZE", "BS" : "BHS", "BH" : "BHR", "BD" : "BGD", "BB" : "BRB", "BY" : "BLR", "BE" : "BEL", "BZ" : "BLZ", "BJ" : "BEN", "BM" : "BMU", "BT" : "BTN", "BO" : "BOL", "BO" : "BOL", "BA" : "BIH", "BW" : "BWA", "BV" : "BVT", "BR" : "BRA", "IO" : "IOT", "BN" : "BRN", "BN" : "BRN", "BG" : "BGR", "BF" : "BFA", "BI" : "BDI", "KH" : "KHM", "CM" : "CMR", "CA" : "CAN", "CV" : "CPV", "KY" : "CYM", "CF" : "CAF", "TD" : "TCD", "CL" : "CHL", "CN" : "CHN", "CX" : "CXR", "CC" : "CCK", "CO" : "COL", "KM" : "COM", "CG" : "COG", "CD" : "COD", "CK" : "COK", "CR" : "CRI", "CI" : "CIV", "CI" : "CIV", "HR" : "HRV", "CU" : "CUB", "CY" : "CYP", "CZ" : "CZE", "DK" : "DNK", "DJ" : "DJI", "DM" : "DMA", "DO" : "DOM", "EC" : "ECU", "EG" : "EGY", "SV" : "SLV", "GQ" : "GNQ", "ER" : "ERI", "EE" : "EST", "ET" : "ETH", "FK" : "FLK", "FO" : "FRO", "FJ" : "FJI", "FI" : "FIN", "FR" : "FRA", "GF" : "GUF", "PF" : "PYF", "TF" : "ATF", "GA" : "GAB", "GM" : "GMB", "GE" : "GEO", "DE" : "DEU", "GH" : "GHA", "GI" : "GIB", "GR" : "GRC", "GL" : "GRL", "GD" : "GRD", "GP" : "GLP", "GU" : "GUM", "GT" : "GTM", "GG" : "GGY", "GN" : "GIN", "GW" : "GNB", "GY" : "GUY", "HT" : "HTI", "HM" : "HMD", "VA" : "VAT", "HN" : "HND", "HK" : "HKG", "HU" : "HUN", "IS" : "ISL", "IN" : "IND", "ID" : "IDN", "IR" : "IRN", "IQ" : "IRQ", "IE" : "IRL", "IM" : "IMN", "IL" : "ISR", "IT" : "ITA", "JM" : "JAM", "JP" : "JPN", "JE" : "JEY", "JO" : "JOR", "KZ" : "KAZ", "KE" : "KEN", "KI" : "KIR", "KP" : "PRK", "KR" : "KOR", "KR" : "KOR", "KW" : "KWT", "KG" : "KGZ", "LA" : "LAO", "LV" : "LVA", "LB" : "LBN", "LS" : "LSO", "LR" : "LBR", "LY" : "LBY", "LY" : "LBY", "LI" : "LIE", "LT" : "LTU", "LU" : "LUX", "MO" : "MAC", "MK" : "MKD", "MG" : "MDG", "MW" : "MWI", "MY" : "MYS", "MV" : "MDV", "ML" : "MLI", "MT" : "MLT", "MH" : "MHL", "MQ" : "MTQ", "MR" : "MRT", "MU" : "MUS", "YT" : "MYT", "MX" : "MEX", "FM" : "FSM", "MD" : "MDA", "MC" : "MCO", "MN" : "MNG", "ME" : "MNE", "MS" : "MSR", "MA" : "MAR", "MZ" : "MOZ", "MM" : "MMR", "MM" : "MMR", "NA" : "NAM", "NR" : "NRU", "NP" : "NPL", "NL" : "NLD", "AN" : "ANT", "NC" : "NCL", "NZ" : "NZL", "NI" : "NIC", "NE" : "NER", "NG" : "NGA", "NU" : "NIU", "NF" : "NFK", "MP" : "MNP", "NO" : "NOR", "OM" : "OMN", "PK" : "PAK", "PW" : "PLW", "PS" : "PSE", "PA" : "PAN", "PG" : "PNG", "PY" : "PRY", "PE" : "PER", "PH" : "PHL", "PN" : "PCN", "PL" : "POL", "PT" : "PRT", "PR" : "PRI", "QA" : "QAT", "RE" : "REU", "RO" : "ROU", "RU" : "RUS", "RU" : "RUS", "RW" : "RWA", "SH" : "SHN", "KN" : "KNA", "LC" : "LCA", "PM" : "SPM", "VC" : "VCT", "VC" : "VCT", "VC" : "VCT", "WS" : "WSM", "SM" : "SMR", "ST" : "STP", "SA" : "SAU", "SN" : "SEN", "RS" : "SRB", "SC" : "SYC", "SL" : "SLE", "SG" : "SGP", "SK" : "SVK", "SI" : "SVN", "SB" : "SLB", "SO" : "SOM", "ZA" : "ZAF", "GS" : "SGS", "SS" : "SSD", "ES" : "ESP", "LK" : "LKA", "SD" : "SDN", "SR" : "SUR", "SJ" : "SJM", "SZ" : "SWZ", "SE" : "SWE", "CH" : "CHE", "SY" : "SYR", "TW" : "TWN", "TW" : "TWN", "TJ" : "TJK", "TZ" : "TZA", "TH" : "THA", "TL" : "TLS", "TG" : "TGO", "TK" : "TKL", "TO" : "TON", "TT" : "TTO", "TN" : "TUN", "TR" : "TUR", "TM" : "TKM", "TC" : "TCA", "TV" : "TUV", "UG" : "UGA", "UA" : "UKR", "AE" : "ARE", "GB" : "GBR", "US" : "USA", "UM" : "UMI", "UY" : "URY", "UZ" : "UZB", "VU" : "VUT", "VE" : "VEN", "VE" : "VEN", "VN" : "VNM", "VN" : "VNM", "VG" : "VGB", "VI" : "VIR", "WF" : "WLF", "EH" : "ESH", "YE" : "YEM", "ZM" : "ZMB", "ZW" : "ZWE"}

            if(d.total_deaths > max) { max = d.total_deaths}

            map_viz.set(d.iso_code, d.total_deaths)

        })]).then(function(loadData){



        // Data and color scale
        const colorScale = d3.scaleThreshold()
            .domain([1,max/1000,max/100,max/10,max/2,max/1.5,max/1.2])
            // .range([ "gray",'dark gray'])
            .range(d3.schemeGreys[9]);





        let topo = loadData[0]







        // Draw the map
        svg.append("g")
            .selectAll("path")
            .data(topo.features)
            .enter()
            .append("path")
            // draw each country
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            // set the color of each country
            .attr("fill", function (d) {
                d.total = map_viz.get(d.id) || 0;

                return colorScale(d.total);
            })
            .style("stroke", "transparent")
            .attr("class", function(d){ return "Country" } )
            .style("opacity", .8)


            .on("mousemove",function(event,d) {
                // recover coordinate we need



                d3.select(this).moveToBack()
                focusText
                    .html( d.id + " | "+d.total )
                //CANT UNDERSTAND HOW TO BRING TO FRONT
                // .attr("x", event.pageX)
                // .attr("y", event.pageY)



            })

            .on("mouseover", function(event,d) {
                focusText.style("opacity",1)

                d3.selectAll(".Country")
                    .transition()
                    .duration(200)
                // .style("opacity", 1)
                d3.select(this)
                    .transition()
                    .duration(200)
                // .style("opacity", 1)
                // .style("stroke", "black")

                d3.select(this)
                    .style("opacity", .3)
            })
            .on("mouseleave", function(event,d) {
                focusText.style("opacity", 0)
                d3.selectAll(".Country")
                    .transition()
                    .duration(200)

                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("stroke", "transparent")

                d3.select(this)
                    .style("opacity", 1)
            } )




        d3.selection.prototype.moveToFront = function() {
            return this.each(function(){
                this.parentNode.appendChild(this);
            });
        };

        d3.selection.prototype.moveToBack = function() {
            return this.each(function() {
                var firstChild = this.parentNode.firstChild;
                if (firstChild) {
                    this.parentNode.insertBefore(this, firstChild);
                }
            });
        };

        var focusText = svg
            .append('g')
            .append('text')
            .style("opacity", 0)
            .attr('id',"Text Area Details")
            .attr("text-anchor", "left")
            .attr("alignment-baseline", "middle")
            .attr("fill", "black")
            .attr("x", 10)
            .attr("y", 20)
            .raise();





    })



}




