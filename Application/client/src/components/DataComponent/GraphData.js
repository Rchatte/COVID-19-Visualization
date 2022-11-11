import React, { useEffect, useState } from "react";
import {
    Paper, Container, Box, Card, Typography,
    Button, Drawer, CardContent, Grid, CardActions,
    CardMedia, CardActionArea, CircularProgress,
    Divider, List, ListItemButton, ListItemText, ListItem, ButtonBase, Stack
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
import "./row.css";



export default function GraphData({ close, viz }) {

    { /* Gather all data needed to complete the graph? */ }
    { /* Button to close */ }

    // Contains the object in DATA with a specified title from home page.
    const [selectedVisual, setSelectedVisual] = useState(null);
    const [ graphs, setGraphs] = useState([])
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
                setGraphs(item.graphs)
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

                <Container sx={{ pt: 3 }}>
                    {/* <h2>All info on charts</h2> */}
                    {/* Call method to check which data source user picks */}
                    {/*checkDataSource(viz)*/}

                        {
                            selectedVisual === null ? (null) : (showVisualType(graphs[0].type, graphs[0].link1) )
                            
                        }

                       
                    <Box>
                        <h2>{"hello"}</h2>

                        <div className="row">
                            <Stack className="row__posters" direction="row" spacing={2}>
                                {graphs.map(visualization => (
                                    <img
                                        className={"row__poster"}
                                        src={visualization.img}
                                        alt={visualization} />
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