import React, { useEffect, useState, useReducer, setState, useContext } from "react";
import { Grid, Button, Container, Typography, Card, CardContent, Paper, Drawer,CardActionArea , CircularProgress, Box, Stack } from "@mui/material";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import Filters from "../FiltersComponent/Filters";
import LineChart from "../Visualizations/LineChart";
import Treemap from "../Visualizations/TreeMap";
import TreemapHappinessMort from "../Visualizations/Happiness_vs_Mortality_Rate_Treemap";
import TreemapPop from "../Visualizations/Percent_of_Pop_Over_60_and_COVID_death";
import TreemapVax from "../Visualizations/COVID_case_VS_people_Vaccinated";
import TreemapFullVax from "../Visualizations/COVID_Death_VS_people_fully_Vaccinated";
import TreemapFreedomCase from "../Visualizations/Freedom_Score_and_Total_Cases_Treemap";
import TreemapFreedomDeath from "../Visualizations/Freedom_Score_and_Total_Deaths_Treemaps";
import TreemapGDPCases from "../Visualizations/CovidCasesPerMillionVsGDP";
import TreemapGDPDeaths from "../Visualizations/GDPVsCovidDeaths";
import TreemapGDPVaccinations from "../Visualizations/CountrysGDPAffectOnVaccinationsPerHundered";
import TreemapUrbanPop from "../Visualizations/UrbanPopulationVsTotalCOVIDCasesPerMillion";
import TreemapUrbanPopDeath from "../Visualizations/UrbanPopulationVsTotalCOVIDDeathsPerMillion";
import TreemapTotalFreedom from "../Visualizations/TotalCovidCasesVsFreedomScore";
import TreemapInternetCases from "../Visualizations/PercentUsingInternetvsCovidCases";
import TreemapHappinessScore from "../Visualizations/CountrysHappinessVsCOVIDCase";
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
                );
            case "Country's Happiness Vs. Mortality":
                return (
                    <TreemapHappinessMort height={height/2} width={containerWidth} filters={props.data.filters}  />
                );
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
            case "COVID-19 Cases Per Million Vs Gross Domestic Product":
                 return (
                     <TreemapGDPCases height={height/2} width={containerWidth} filters={props.data.filters}  />
                 );
            case "Gross Domestic Product Vs COVID-19 Deaths":
                return (
                    <TreemapGDPDeaths height={height/2} width={containerWidth} filters={props.data.filters}  />
                );
            case "Country's Gross Domestic Product Affect On COVID-19 Vaccinations Per Hundred":
                return (
                    <TreemapGDPVaccinations height={height/2} width={containerWidth} filters={props.data.filters}  />
                );
            case "Urban Population Vs Total COVID-19 Cases Per Million":
                return (
                    <TreemapUrbanPop height={height/2} width={containerWidth} filters={props.data.filters}  />
                );
            case "Urban Population Vs Total COVID-19 Deaths Per Million":
                return (
                    <TreemapUrbanPopDeath height={height/2} width={containerWidth} filters={props.data.filters}  />
                );
             case "Total COVID-19 Cases Vs Personal Freedom Score":
                 return (
                     <TreemapTotalFreedom height={height/2} width={containerWidth} filters={props.data.filters}  />
                 );
            case "Percent of Populations Using The Internet Vs COVID-19 Cases":
                return (
                    <TreemapInternetCases height={height/2} width={containerWidth} filters={props.data.filters}  />
                );
            case "Country's Happiness Vs COVID-19 Cases":
                return (
                    <TreemapHappinessScore height={height/2} width={containerWidth} filters={props.data.filters}  />
                );
            case "US COVID-19 Cases Over Time":
                return (
                    <LineChart url={props.data.link_source} height={height/2} width={containerWidth} filters={props.data.filters} />
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

        if(!UserSelectedGraphs.includes(graphData)){
            UserSelectedGraphs.push(graphData);
        }

        // window.localStorage.setItem("selected-graphs", JSON.stringify(UserSelectedGraphs));
        // const data = JSON.parse(window.localStorage.getItem('selected-graphs')).concat(UserSelectedGraphs);
        // window.localStorage.setItem("selected-graphs", JSON.stringify(data));

        try{
            const data = JSON.parse(sessionStorage.getItem('selected-graphs')).concat(UserSelectedGraphs);
            sessionStorage.setItem("selected-graphs", JSON.stringify(data)); 
        } catch (e){
            sessionStorage.setItem("selected-graphs", JSON.stringify(UserSelectedGraphs)); 
        }
        //sessionStorage.setItem("selected-graphs", JSON.stringify(UserSelectedGraphs));
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


                <Container sx={{pt: 2}}>
                    <Box id="container" xs={{ position: 'relative', overflow: 'auto'}}>
                        {
                            loading ? (<Box xs={{ display: 'flex', alignContent: 'center'}}>
                                <CircularProgress/>
                            </Box>): null 
                        }
                        {
                            currentVisual && <GraphType data={currentVisual}/>
                        }
                    </Box>
                </Container>
                
                    <Grid 
                    container 
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                    
                    >
                        <Grid item xs={4} md={4} lg={4} id="FIRST">
                            <Card sx={{ height: '100%', p: 2 }}>
                                <Stack spacing={0.5}>
                                    <Button variant="outlined" size="small" onClick={() => setFiltersTrigger(true)}>Filters</Button>
                                    <Button variant="outlined" size="small" onClick={() => addToCustomDashboard(currentVisual)}>Add to Your Dashboard</Button>
                                    <Button variant="outlined" size="small" onClick={() => navigate("/CustomDashboard")}>Go to Your Dashboard</Button>
                                </Stack>
                            </Card>
                        </Grid>
                        <Grid item xs={8} md={8} lg={8} >
                            <Card sx={{ height: '100%', p: 2 }}>
                                <Container sx={{textAlign: 'end'}}>
                                    <Typography variant="h6" gutterBottom>
                                        { currentVisual && currentVisual.title }
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom>
                                        { currentVisual && currentVisual.description}
                                    </Typography>
                                </Container>
                            </Card>
                        </Grid>
                    </Grid>
                    
                <Grid
                    container sx={{ p:1, height: (height / 2) }}>
                    <Grid item xs={12} md={12} sm={12}>
                        <Typography variant="h5" sx={{ pt: 4}}>More visuals</Typography>
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