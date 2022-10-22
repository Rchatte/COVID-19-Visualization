import React, { useState } from "react";
import { Paper, Container , Box, Card, Typography, Button, CardContent, CardActions, CardMedia } from "@mui/material"
import USAFactsData from "./USAFactsData";
import CDCData from "./CDCData";
import WHOData from "./WHOData";

export default function GraphData({close, viz}) {

    { /* Gather all data needed to complete the graph? */}
    { /* Button to close */}

    const handleButtonClose = () => {
        close(true)
    }

    // Function which chekcs which data source the user picks then returns a component which contains the visualization cards created from the data source
    const checkDataSource = (dataSource) => {
        switch(dataSource){
            case "USA Facts":
                return <USAFactsData/>
            case "World Health Organization":
                return <WHOData/>
            case "CDC":
                 return <CDCData/>
            case "California Department of Public Health":
                return "California Department of Public Health"
            default:
                return null
        }
    }

    return(
        <>
            <Paper elevation={2}>
                <Container>
                    {/* <h2>All info on charts</h2> */}
                    {/* Call method to check which data source user picks */}
                    {checkDataSource(viz)}
                    <Button size="small" onClick={handleButtonClose}>Return to Home Page</Button>
                </Container>
            </Paper>
        </>
    )
}