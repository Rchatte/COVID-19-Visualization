import React, { useEffect, useState } from "react";
import {
    Paper, Container, Box, Card, Typography,
    Button, Drawer, CardContent, Grid, CardActions,
    CardMedia, CardActionArea, CircularProgress,
    Divider, List, ListItemButton, ListItemText, ListItem, ButtonBase
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import USAFactsData from "./USAFactsData";
import CDCData from "./CDCData";
import WHOData from "./WHOData";
import CDPHData from "./CDPHData";
import LineChartWithZoom from "../Visualizations/LineChartWithZoom";
import Treemap from "../Visualizations/TreeMap";
import PieChartContinentVaccines from "../Visualizations/PieChartContinentVaccines";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import VisualizationDisplay from "../VisualizationDisplay/VisualizationDisplay";
import { DATA } from "./DataExports.js";


export default function GraphData({ close, viz }) {

    { /* Gather all data needed to complete the graph? */ }
    { /* Button to close */ }

    // Contains the object in DATA with a specified title from home page.
    const [ selectedVisual, setSelectedVisual] = useState(null);
    const [ largeView, setLargeView ] = useState(false);
    const [ visualData, setVisualData ] = useState(null);

    const openLargeVisual = (item) => {
        setLargeView(true);
        setSelectedVisual(null);
        setVisualData(item);
    }

    const handleButtonClose = () => {
        setSelectedVisual(null);
        close(true)
    }

    // If new visual is selected look at values array above and fill in useState to update all values in 
    // react component return ()
    useEffect(() => {
        setLargeView(false);
        DATA.map((item) => {
            if (item.title === viz) {
                console.log("Current OBJ: ",item);
                setSelectedVisual(item);
                return;
            }
        })
    }, [viz])


    const showVisualType = (type, url) => {
        switch (type) {
            case "line-chart":
                return <LineChartWithZoom url={url} height={400} width={400} />
            case "tree-map":
                return <Treemap url={url} height={400} width={400} />
            case "CDC":
                return <CDCData />
            case "California Department of Public Health":
                return <CDPHData/>
            default:
                return null
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 2 }}>
                <Container>
                    <Typography variant="h5">
                        Select visual
                    </Typography>
                </Container>
                <Container sx={{ pt: 3 }}>
                    {/* <h2>All info on charts</h2> */}
                    {/* Call method to check which data source user picks */}
                    {/*checkDataSource(viz)*/}
                    <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        { largeView ? ( <VisualizationDisplay data={visualData} /> ) : (null) }

                        {
                            selectedVisual === null ? (null): 
                                (
                                selectedVisual.graphs.map( (i) => {
                                    const Visual = showVisualType(i.type, i.link1);
                                    return (
                                        <>
                                        <Grid item xs={3} md={6}>
                                            <Card onClick={ () =>  openLargeVisual(i) }>
                                                <CardActionArea>
                                                    <Container sx={{ pt: 1, pl: 1, pb: 1, pr: 1 }}>
                                                        { Visual } 
                                                    </Container>
    
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            { i.type }
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
    
                                            </Card>
                                        </Grid>
                                        </>
                                    )
                                }))
                            
                        }

                    </Grid>
                    <Button size="small" onClick={ handleButtonClose }>Return to Home Page</Button>
                </Container>
            </Box>
                
    
        </>
    )
}