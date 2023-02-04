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
import Filters from "../FiltersComponent/Filters.js"
import World_Map_Death_Cases from "../Visualizations/World_Map_Death_Cases";
import useWindowDimensions from "../Hooks/useWindowDimensions";



export default function GraphData(props) {

    { /* Gather all data needed to complete the graph? */ }
    { /* Button to close */ }

    const { width, height } = useWindowDimensions();
    // Contains the object in DATA with a specified title from home page.
    const [selectedVisual, setSelectedVisual] = useState(null);
    const [graphs, setGraphs] = useState([])
    const [currentGraph, setCurrentGraph] = useState({});
    const [filters, setFilter] = useState({});
    const [filtersTrigger, setOpenFilters] = useState();
    const [loading, setLoading] = useState(true);

    // used to store the starting date for the filter
    const [startDate, setBeginningDate] = useState(Date());
    // used to store the ending date for the filter
    const [endDate, setEndingDate] = useState(Date());


    const handleButtonClose = () => {
        setSelectedVisual(null);
        props.close(true)
    }

    const updateGraph = (selected) => {
        graphs.map((items) => {
            if (items.type === selected) {
                setCurrentGraph(items)
                setFilter(items.filters)
            }
        })
    }


    const getLocalStorage = () => {
        if (window) {
            const currentObject = window.sessionStorage.getItem("data") || "NA";
            setCurrentGraph(currentObject);
        }
    }

    useEffect(() => {
        getLocalStorage();
    }, [currentGraph])





    // If new visual is selected look at values array above and fill in useState to update all values in 
    useEffect(() => {
        getLocalStorage()
    }, [props.viz])


    const showVisualType = (type, url) => {
        switch (type) {
            case "line-chart-USA-FACTS-total-over-time":
                return <LineChartUSAFACTSTotalOverTime url={url} height={400} width={400} filters={filters} loadingStatus={setLoading} />
            case "tree-map":
                return <Treemap url={url} height={400} width={400} filters={filters} loadingStatus={setLoading} />
            case "World_Map":
                return <World_Map_Death_Cases url={url} height={400} width={400} filters={filters} loadingStatus={setLoading} />
            case "CDC":
                return <CDCData />
            case "California Department of Public Health":
                return <CDPHData />
            default:
                return null
        }
    }

    const GenerateList = () => {
        return (
            <>
                <List>
                    {
                        graphs.map(item => (
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => updateGraph(item.type)}
                                >
                                    <ListItemText primary={item.title} secondary={item.type_desc + " : " + item.description} />
                                </ListItemButton>
                            </ListItem>

                        ))
                    }
                </List>
            </>
        )
    }

    const LoadingSpinner = () => {
        return (
            <>
                <Box justify="center" align="center" sx={{ pt: 2 }} >
                    <CircularProgress />
                </Box>
            </>
        )
    }

    return (
        <>

            <Container sx={{ pt: 3 }}>
                {/* <h2>All info on charts</h2> */}
                {/* Call method to check which data source user picks */}
                {/*checkDataSource(viz)*/}

                <Drawer
                    anchor={"left"}
                    open={filtersTrigger}
                    onClose={() => setOpenFilters(false)}
                    onKeyDown={() => setOpenFilters(false)}

                >
                    {/* Send the useStates to the filters file to recieve the information */}
                    <Filters open={filtersTrigger} data={filters} updatedFilters={setFilter} setBeginningDate={setBeginningDate}
                        setEndingDate={setEndingDate} />
                </Drawer>


                <Grid
                    container
                    direction="row"
                    sx={{ p: 1 }}
                >
                    <Grid item xs={12} md={6} sm={6} lg={6}>
                        <Box>
                            <Container sx={{ pt: 1, height: (height / 2) }}>
                                <Card sx={{ minHeight: 200 }}>

                                    {
                                        loading && <LoadingSpinner />
                                    }
                                    {
                                        currentGraph && showVisualType(currentGraph.type, currentGraph.link1, filters)
                                    }

                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>
                                            {currentGraph.type === null ? (null) : currentGraph.title}
                                        </Typography>

                                        <Typography variant="subtitle1" gutterBottom>
                                            {currentGraph === null ? (null) : currentGraph.description}
                                        </Typography>
                                        <Button variant="contained" onClick={() => setOpenFilters(true)}>Open Filters</Button>

                                    </CardContent>

                                </Card>
                            </Container>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} sm={6} lg={6}>
                        <Container>
                            <Card>
                                <CardContent>
                                    <Typography variant="subtitle1">
                                        Visuals Available
                                    </Typography>
                                    <Typography variant="subtitle2">

                                    </Typography>
                                    <GenerateList />
                                </CardContent>
                            </Card>

                        </Container>
                    </Grid>
                </Grid>

                <Button size="small" onClick={handleButtonClose}>Return to Home Page</Button>
            </Container>
        </>
    )
}