import React, { useEffect, useState } from "react";
import Navbar from '../NavbarComponent/Navbar';
import {
    Button, CardActionArea, CardActions, Typography, Box, Card, CardContent,
    CardMedia,
    Grid
} from "@mui/material"

import VizCardLayout from "./Components/VizCards/VizCardLayout";
import LineChartWithZoom from "../Visualizations/LineChartWithZoom";


export default function Homepage(){

    // const [xAxis, setXaxis] = useState([]);
    // const [yAxis, setYaxis] = useState([]);
    // const [region, setRegion] = useState();

    { /* Functions are being passed to child component -> Navbar  */ }
    // const handleXChange = (value) => {
    //     setXaxis(value)
    // }
    // const handleYChange = (value) => {
    //     setYaxis(value)
    // }
    // const handleRegionChange = (value) => {
    //     setRegion(value)
    // }
    { /* End  */ }


    // useEffect(() => {
    //     console.log(xAxis)
    //     console.log(yAxis)
    //     console.log(region)
    // },[xAxis, yAxis, region])

    return(
        <>
            {/* <h1> Line Graph Example </h1>
            <LineChartWithZoom height={500} width={1000}></LineChartWithZoom> */}
            { /* Toolbar component is being imported from here.*/ }
            {/* <Navbar handleXChangeParent={handleXChange} handleYChangeParent={handleYChange} handleRegionChangeParent={handleRegionChange}/> */}
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >

                { /* Luis Gonzalez 9/30/22 */}
                { /* This is the main dashboard section of the webpage */}
                { /* On changes to navbar, the values xAxis, yAxis, region are being updated and are ready to pass to children components.  */}
                { /* Next step is to pass this data to Child Card Components and so on.... */}

                {/* Francisco Contreras 9/30/22  */}
                {/* Added visualization cards into homepage */}
                <VizCardLayout/>             
            </Box>
        </>
    )
}