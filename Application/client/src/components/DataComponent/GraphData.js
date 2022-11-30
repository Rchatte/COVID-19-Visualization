import React, { useEffect, useState } from "react";
import {
    Paper, Container, Box, Card, Typography,
    Button, Drawer, CardContent, Grid, CardActions,
    CardMedia, CardActionArea, CircularProgress,
    Divider, List, ListItemButton, ListItemText, ListItem, ButtonBase, Stack, CardHeader
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import USAFactsData from "./USAFactsData";
import CDCData from "./CDCData";
import WHOData from "./WHOData";
import CDPHData from "./CDPHData";
import LineChartUSAFACTSTotalOverTime from "../Visualizations/LineChartUSAFACTSTotalOverTime";
import Treemap from "../Visualizations/TreeMap";
import PieChartContinentVaccines from "../Visualizations/PieChartContinentVaccines";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import VisualizationDisplay from "../VisualizationDisplay/VisualizationDisplay";
import { DATA } from "./DataExports.js";
import "./row.css";
import { select } from "d3";
import Filters from "../FiltersComponent/Filters.js"
import World_Map_Death_Cases from "../Visualizations/World_Map_Death_Cases";



export default function GraphData({ close, viz }) {

    { /* Gather all data needed to complete the graph? */ }
    { /* Button to close */ }

    // Contains the object in DATA with a specified title from home page.
    const [ selectedVisual, setSelectedVisual] = useState(null);
    const [ graphs, setGraphs] = useState([])
    const [ currentGraph, setCurrentGraph] = useState([]);
    const [ filter, setFilter] = useState({});
    const [ filtersTrigger, setOpenFilters] = useState();


    const handleButtonClose = () => {
        setSelectedVisual(null);
        close(true)
    }

    const updateGraph = (selected) => {
        graphs.map((items) => {
            if (items.type === selected) {

                setCurrentGraph(items)
                setFilter(items.filters)
            }
        })
    }

    // If new visual is selected look at values array above and fill in useState to update all values in 
    // react component return ()
    useEffect(() => {
        DATA.map((item) => {
            if (item.title === viz) {

                setSelectedVisual(item);
                setGraphs(item.graphs)
                setCurrentGraph(item.graphs[0]);
                setFilter(item.graphs[0].filters)
                return;
            }
        })
    }, [viz])


    const showVisualType = (type, url) => {
        switch (type) {
            case "line-chart-USA-FACTS-total-over-time":
                return <LineChartUSAFACTSTotalOverTime url={url} height={400} width={700} />

            case "tree-map":
                return <Treemap url={url} height={400} width={700} />

            case "World_Map":
                return <World_Map_Death_Cases url={url} height={400} width={700} />

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
            <Box>

                <Container sx={{ pt: 3 }}>
                    {/* <h2>All info on charts</h2> */}
                    {/* Call method to check which data source user picks */}
                    {/*checkDataSource(viz)*/}

                    <Drawer
                        anchor={"left"}
                        open={filtersTrigger}
                        onClose={() => setOpenFilters(false) }
                        onKeyDown={() => setOpenFilters(false) }

                    >
                        <Filters open={filtersTrigger} data={filter} />
                    </Drawer>


                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >

                        {
                            currentGraph === null ? (null) : (showVisualType(currentGraph.type, currentGraph.link1))
                            
                        }
                        <Container sx={{ pt: 1 }}>
                            <Card sx={{ minHeight: 200 }}>
                                <CardContent>
                                    <Typography variant="h3" gutterBottom>
                                        {currentGraph.type === null ? (null) : currentGraph.title}
                                    </Typography>

                                    <Typography variant="subtitle1" gutterBottom>
                                        {currentGraph === null ? (null) : currentGraph.description}
                                    </Typography>
                                    <Button variant="contained" onClick={() => setOpenFilters(true)}>Filter</Button>

                                </CardContent>

                            </Card>
                        </Container>
                    </Box>
                       
                    <Box>

                        <h2>{" Other Visualization"}</h2>

                        <div className="row">
                            <Stack
                                justifyContent="center"
                                alignItems="center"
                                className="row__posters" direction="row" spacing={2.5}>
                                {graphs.map(visualization => (
                                    <>
                                <Card>
                                    <CardContent>
                                        <Typography variant="subtitle1" gutterBottom>
                                            { visualization.title }
                                        </Typography>

                                        {
                                            /*
                                            Nov 28 2022: 
                                            Note: Once a new graph is clicked on the type is unique to each value in array (DataExports.js)
                                            Just need to differenciate the 'type' for each item in array.
                                            

                                            */
                                        }
                                        <img
                                            id={visualization.type}
                                            onClick={() => updateGraph(visualization.type)}
                                            className={"row__poster"}
                                            src={visualization.img}
                                                alt={visualization} />
                                    </CardContent>
                                </Card>
                                    </>
                                ))}
                            </Stack>
                        </div>
                    </Box>

                    <Button size="small" onClick={ handleButtonClose }>Return to Home Page</Button>
                </Container>
            </Box>
                
    
        </>
    )
}