import React, { useEffect, useState, useReducer, setState, useContext } from "react";
import { Grid, Button, Container, Typography, Card, CardContent, Paper, Drawer,CardActionArea , CircularProgress, Box, Stack } from "@mui/material";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import Filters from "../FiltersComponent/Filters";
import LineChart from "../Visualizations/LineChart";
import Treemap from "../Visualizations/TreeMap";
import TreemapPop from "../Visualizations/Percent_of_Pop_Over_60_and_COVID_death";
import TreemapVax from "../Visualizations/COVID_case_VS_people_Vaccinated";
import TreemapFullVax from "../Visualizations/COVID_Death_VS_people_fully_Vaccinated";
import TreemapFreedomCase from "../Visualizations/Freedom_Score_and_Total_Cases_Treemap";
import TreemapFreedomDeath from "../Visualizations/Freedom_Score_and_Total_Deaths_Treemaps";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import UserSelectedGraphs from "../CustomDashboardComponent/UserSelectedGraphs";
import { DATA_UPDATE } from "../DataComponent/DataExports";
import './displayVisual.css';
import TreemapMedian from "../Visualizations/Median_Age_VS_COVID_Deaths";

export default function DisplayVisual(props) {
    const { height, width } = useWindowDimensions();
    const { currentData, currentRegion } = useContext(DataContext); 
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState();
    const [visuals, setVisuals] = useState(); // All Available graphs prev: graphData
    const [currentVisual, setCurrentVisual] = useState(); // Current visual selected and show, also will update on click. 
    const [filtersTrigger, setFiltersTrigger] = useState(false);


    var container = document.getElementById("container");
    

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
        setFilters(item.filters)
    }

    const GraphType = (props) => {
        var containerWidth = container.clientWidth;
        switch(props.data.title){
            case "US COVID-19 Deaths By State":
                return (
                    <Treemap height={height/2} width={containerWidth} filters={props.data.filters}  />
                );
            case "US COVID-19 Deaths Over Time":
                return(
                    <LineChart url={props.data.link_source} height={height/2} width={containerWidth} filters={props.data.filters} />
                )
            case "COVID-19 Deaths and Percent of Population Over 60":
                return (
                    <TreemapPop height={height/2} width={containerWidth} filters={props.data.filters}  />
                );
            case "COVID-19 Cases VS People Vaccinated Worldwide":
                return (
                    <TreemapVax height={height/2} width={containerWidth} filters={props.data.filters}  />
                );
            case "COVID-19 Deaths and People Fully Vaccinated":
                return (
                    <TreemapFullVax height={height/2} width={containerWidth} filters={props.data.filters}  />
                );
            case "Country's Freedom Score And Total COVID-19 Cases":
                return (
                    <TreemapFreedomCase height={height/2} width={containerWidth} filters={props.data.filters}  />
                ); 
            case "Country's Freedom Score And Total COVID-19 Deaths":
                return (
                    <TreemapFreedomDeath height={height/2} width={containerWidth} filters={props.data.filters}  />
                ); 
            case "Country's Median Age Vs COVID-19 Deaths":
                return (
                    <TreemapMedian height={height/2} width={containerWidth} filters={props.data.filters}  />
                );        
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

        console.log(UserSelectedGraphs);
        window.localStorage.setItem("selected-graphs", JSON.stringify(UserSelectedGraphs));
        // const data = JSON.parse(window.localStorage.getItem('selected-graphs')).concat(UserSelectedGraphs);
        // window.localStorage.setItem("selected-graphs", JSON.stringify(data));
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
                        <Box id="container" xs={{ position: 'relative', overflow: 'auto'}}>
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
                                    <Button variant="outlined" size="small" onClick={() => setFiltersTrigger(true)}>Filters</Button>
                                    <Button variant="outlined" size="small" onClick={() => addToCustomDashboard(currentVisual)}>Add to Your Dashboard</Button>
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