import { Typography, Box, Container } from "@mui/material";
import React from "react";
import cdcLogo from '../images/CDC.png';
import factsLogo from '../images/USAFacts.png';
import whoLogo from '../images/WHO.png';
import cdphLogo from '../images/CDPH.png';

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
                <Typography variant="h6">World Health Organization (WHO): <br />The World Heatlh Organization is a specialized agency of 
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
                <Typography variant="h6">California Department of Public Health: <br /> The California Department of Public Health is the state department responsible for 
                the public health in California. It is a subdivision of the California Health and Human Services Agency and 
                it enforces of the laws in the California Health and Safety Codes, notably, the licensing of some types of healthcare facilities.</Typography>
                <img src={cdphLogo} height="200" width="200" alt='CDPH'/>
            </div>

            {// Used as improvised buffer
            }
            <Typography><br /></Typography>

            </Container>
        </Box>
        </>
    )
}