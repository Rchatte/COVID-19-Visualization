import React, { useEffect, useState, useReducer, setState, useContext } from "react";
import { Grid, Button, Container, Typography, Card, CardContent, Paper, Drawer,CardActionArea , CircularProgress, Box, Stack } from "@mui/material";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import Filters from "../FiltersComponent/Filters";
import LineChart from "../Visualizations/LineChart";
import Treemap from "../Visualizations/TreeMap";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import UserSelectedGraphs from "../CustomDashboardComponent/UserSelectedGraphs";
import { DATA_UPDATE } from "../DataComponent/DataExports";
import './displayVisual.css';

export default function DisplayVisual(props) {
    const { height, width } = useWindowDimensions();
    const { currentData, currentRegion } = useContext(DataContext); 
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState();
    const [visuals, setVisuals] = useState(); // All Available graphs prev: graphData
    const [currentVisual, setCurrentVisual] = useState(); // Current visual selected and show, also will update on click. 
    const [filtersTrigger, setFiltersTrigger] = useState(false);

    useEffect(() => {
        if (!currentRegion) { navigate('/'); return; }
        getRegionJSON(currentRegion);
    }, [currentRegion])


    // Set region and pick JSON based on region
    const getRegionJSON = (region) => {
        const object = DATA_UPDATE[region];
        setCurrentVisual(object[0]); // Initial visual.
        setFilters(object[0].filters); // Inital filters.
        setVisuals(object); // All visuals in a region.
        setLoading(false);
    }
    
    const updateChartData = (item) => {
        setCurrentVisual({ ...item});
    }

    const GraphType = (props) => {
        switch(props.data.graph_type){
            case "tree-map":
                return (
                    <Treemap url={props.data.link_source} height={height/2} width={width}  filters={props.data.filters} type={props.data.graph_type} />
                );
            case "line-chart":
                return(
                    <LineChart url={props.data.link_source} height={height/2} width={width} filters={props.data.filters} type={props.data.graph_type} />
                )    
            default:
                return (
                    <CircularProgress />
                )
        }
    }

    const setNewFilters = (newFilters) =>{
        console.log(newFilters);
        setCurrentVisual(prevState => ({ ...prevState, filters: newFilters }));
    }

    
    const addToCustomDashboard = (graphData) => {
        props.setSelectedGraphs(element => [...element, graphData]);
        UserSelectedGraphs.push(graphData);
        window.localStorage.setItem("selected-graphs", JSON.stringify(UserSelectedGraphs));
        const data = JSON.parse(window.localStorage.getItem('selected-graphs')).concat(UserSelectedGraphs);
        window.localStorage.setItem("selected-graphs", JSON.stringify(data));
    }


    return (
        <>
            <Container>
                <Drawer
                    anchor={"left"}
                    open={filtersTrigger}
                    onClose={() => setFiltersTrigger(false)}
                    onKeyDown={() => setFiltersTrigger(false)} >
                    {/* Send the useStates to the filters file to recieve the information */}
                    <Filters open={filtersTrigger} close={filtersTrigger} closeFilters={setFiltersTrigger} setNewFilters={setNewFilters} data={filters} />
                </Drawer>

                <Grid
                    container sx={{ p:1, pt: 5, height: (height / 2) }}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Box xs={{ position: 'relative', overflow: 'auto'}}>
                            {
                                currentVisual ? <GraphType data={currentVisual}/>: (
                                    <Box xs={{ display: 'flex', alignContent: 'center'}}>
                                        <CircularProgress/>
                                    </Box>
                                )
                            }
                        </Box>
                    </Grid>

                    <Grid item xs={4} md={4} lg={4}>
                        <Box sx={{ pt: 2}}>
                            <Container>
                                <Stack spacing={0.5}>
                                    <Button variant="outlined" size="small" onClick={() => setFiltersTrigger(true)}>Filters</Button><br/>
                                    <Button variant="outlined" size="small" onClick={() => addToCustomDashboard(currentVisual)}>Add to Your Dashboard</Button><br/>
                                    <Button variant="outlined" size="small" onClick={() => navigate("/CustomDashboard")}>Go to Your Dashboard</Button>
                                </Stack>
                            </Container>
                        </Box>
                    </Grid>

                    <Grid item xs={8} md={8} lg={8}>
                        <Box sx={{ pt: 2}}>
                            <Container sx={{textAlign: 'end'}}>
                                <Typography variant="h6" gutterBottom>
                                    { currentVisual && currentVisual.title }
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    { currentVisual && currentVisual.description}
                                </Typography>
                               
                            </Container>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12} sm={12}>
                        <Typography variant="h5" sx={{ pt: 3}}>More visuals</Typography>
                        <Grid sx={{ pt: 2}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            visuals && visuals.map((item, i) => (
                                <Grid item xs={2} sm={4} md={4} key={i}>
                                    <Card sx={{ height: '100%' }} onClick={() => updateChartData(item)}>
                                        <CardActionArea>
                                        <CardContent>

                                            <Typography variant="subtitle1" component="div">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                                                {item.graph_desc + " : " + item.description}
                                            </Typography>

                                        </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))
                        }
                        </Grid>
                    </Grid>
                </Grid>



            </Container>


        </>
    )

}