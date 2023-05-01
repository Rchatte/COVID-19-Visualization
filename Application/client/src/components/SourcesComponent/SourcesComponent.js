import { Typography, Box, Container } from "@mui/material";
import React from "react";
import cdcLogo from '../images/CDC.png';
import factsLogo from '../images/USAFacts.png';
import whoLogo from '../images/WHO.png';
import cdphLogo from '../images/CDPH.png';
import owdLogo from '../images/OWID.png';
import wbLogo from '../images/WB.png';
import fiLogo from '../images/FraserIns.png';
import whrLogo from '../images/WHP.png';

export default function SourcesComponent() {

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Container>
            <Typography variant="h3" textAlign={"center"} paddingTop>Gathered Sources:</Typography>
            <Typography variant="h6" textAlign={"center"}>Our sources were gathered from reputable 
            government and private organizations that were directly involved with the gathering of 
            information pertaining to the Covid-19 pandemic.</Typography>

            <div class='container'>
                <img src={factsLogo} height="200" width="200" alt='USAFACTS'/>
                <Typography variant="h6">USA Facts: <br />USA Facts is a non-profit organization and website that probides 
                data and reports on the United States poulation, its government finances, and the governments 
                impact on society. The organization was launched in 2017.</Typography>
            </div>

            
            <div class='container'>
                <Typography variant="h6" paddingLeft={1}>World Health Organization (WHO): <br />The World Heatlh Organization is a specialized agency of 
                the United Nations responsible for international public health. Their headquarters is located in Geneva, 
                Switzerland, and has six regional offices and 150 field offices worldwide. The WHO was established on April 7th, 1948.</Typography>
                <img src={whoLogo} height="200" width="200" alt='WHO'/>
            </div>
            
            <div class='container'>
                <img src={cdcLogo} height="200" width="200" alt='CDC' class='margins'/>
                <Typography variant="h6">Center of Disease Control (CDC): <br />The Centers for Disease Control and Prevention is the national 
                public health agency of the United States. It is A federal agency under the Department of Health and Human 
                Services, with its headquarters based in Atlanta, Georgia.</Typography>
            </div>
            
            <div class='container' paddingBottom={2}>
                <Typography variant="h6" paddingLeft={1}>California Department of Public Health: <br /> The California Department of Public Health is the state department responsible for 
                the public health in California. It is a subdivision of the California Health and Human Services Agency and 
                it enforces of the laws in the California Health and Safety Codes, notably, the licensing of some types of healthcare facilities.</Typography>
                <img src={cdphLogo} height="200" width="200" alt='CDPH'/>
            </div>

            <div class='container'>
                <img src={owdLogo} height="200" width="250" alt='OWD' class='margins'/>
                <Typography variant="h6">Our World In Data (OWD): <br />"Our World In Data is a project of the Global Change Data Lab, 
                a registered charity in England and Whales." Data taken from OWD is used in teaching establishments such as: Harvard, Stanford, 
                Berkeley, etc..<br />
                <a href="https://github.com/owid/covid-19-data/blob/master/public/data/README.md">Data on COVID-19</a> <br />
                <a href="https://ourworldindata.org/grapher/share-of-individuals-using-the-internet">Share of the population using the Internet</a>
                </Typography>
            </div>
            
            <div class='container' paddingBottom={2}>
                <Typography variant="h6" paddingLeft={1}>World Bank: <br />"With 189 member countries, staff from more than 170 countries, and 
                offices in over 130 locations, the World Bank Group is a unique global partnership: five institutions working for sustainable 
                solutions that reduce poverty and build shared prosperity in developing countries."<br />
                <a href="https://data.worldbank.org/indicator/SP.URB.TOTL">Urban Population</a><br />
                <a href="https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?end=2021&start=2021">Worldwide GDP</a></Typography>
                <img src={wbLogo} height="200" width="200" alt='WB'/>
            </div>

            <div class='container'>
                <img src={fiLogo} height="200" width="200" alt='FI' class='margins'/>
                <Typography variant="h6">Fraser Institute: <br />"The Fraser Institute is an independent, non-partisan research and educational 
                organization based in Canada. We work to ensure that people become more knowledgeable about the outcomes of various public 
                policies and can then make more informed decisions"<br />
                <a href="https://www.fraserinstitute.org/resource-file?nid=14426&fid=17063">The Human Freedom Index</a></Typography>
            </div>
            
            <div class='container' paddingBottom={2}>
                <Typography variant="h6" paddingLeft={1}>The World Happiness Report: <br />"The World Happiness Report is a publication of the Sustainable 
                Development Solutions Network, powered by the World Poll data. The World Happiness Report reflects a worldwide demand for 
                more attention to happiness and well-being as a criteria for government policy. It reviews the state of happiness in the 
                world today and shows how the science of happiness explains personal and national variations in happiness."<br />
                <a href="https://worldhappiness.report/ed/2022/">World Happiness Report 2022</a></Typography>
                <img src={whrLogo} height="200" width="260" alt='WHR'/>
            </div>

            

            {// Used as improvised buffer
            }
            <Typography><br /></Typography>

            </Container>
        </Box>
        </>
    )
}