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

const CustomDashboard = (props) => {
    const { height, width } = useWindowDimensions();
    const [data, setData] = useState();
    const [graphs, setGraphs] = useState(null);
    const [currentData, setCurrentData] = useState();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState();
    const [visuals, setVisuals] = useState(); // All Available graphs prev: graphData
    const [currentVisual, setCurrentVisual] = useState(); // Current visual selected and show, also will update on click. 
    const [filtersTrigger, setFiltersTrigger] = useState(false);

    useEffect(() => {
        // const data = window.localStorage.getItem('selected-graphs');
        const data = JSON.parse(sessionStorage.getItem('selected-graphs'));
        if(data){
           getCurrentData(data);
        }
    }, [])

    const getCurrentData = (data) => {
        console.log(data);
        setCurrentData(data[0]);
        setGraphs(data);
    }

    const updateChartData = (item) => {
        setCurrentData({ ...item});
    }

    const GraphType = (props) => {
        switch(props.data.title){
            case "US COVID-19 Deaths By State":
                return (
                    <Treemap height={height/2} width={width/2} filters={props.data.filters}  />
                );
            case "US COVID-19 Deaths Over Time":
                return(
                    <LineChart url={props.data.link_source} height={height/2} width={width/2} filters={props.data.filters} />
                );
            case "Country's Happiness Vs. Mortality":
                return (
                    <TreemapHappinessMort height={height/2} width={width/2} filters={props.data.filters}  />
                );
            case "COVID-19 Deaths and Percent of Population Over 60":
                return (
                    <TreemapPop height={height/2} width={width/2} filters={props.data.filters}  />
                );
            case "COVID-19 Cases VS People Vaccinated Worldwide":
                return (
                    <TreemapVax height={height/2} width={width/2} filters={props.data.filters}  />
                );
            case "COVID-19 Deaths and People Fully Vaccinated":
                return (
                    <TreemapFullVax height={height/2} width={width/2} filters={props.data.filters}  />
                );
            case "Country's Freedom Score And Total COVID-19 Cases":
                return (
                    <TreemapFreedomCase height={height/2} width={width/2} filters={props.data.filters}  />
                );
            case "Country's Freedom Score And Total COVID-19 Deaths":
                return (
                    <TreemapFreedomDeath height={height/2} width={width/2} filters={props.data.filters}  />
                );
            case "Country's Median Age Vs COVID-19 Deaths":
                return (
                    <TreemapMedian height={height/2} width={width/2} filters={props.data.filters}  />
                );
            case "COVID-19 Cases Per Million Vs Gross Domestic Product":
                return (
                    <TreemapGDPCases height={height/2} width={width/2} filters={props.data.filters}  />
                );
            case "Gross Domestic Product Vs COVID-19 Deaths":
                return (
                    <TreemapGDPDeaths height={height/2} width={width/2} filters={props.data.filters}   />
                );
            case "Country's Gross Domestic Product Affect On COVID-19 Vaccinations Per Hundred":
                return (
                    <TreemapGDPVaccinations height={height/2} width={width/2} filters={props.data.filters}   />
                );
            case "Urban Population Vs Total COVID-19 Cases Per Million":
                return (
                    <TreemapUrbanPop height={height/2} width={width/2} filters={props.data.filters}   />
                );
            case "Urban Population Vs Total COVID-19 Deaths Per Million":
                return (
                    <TreemapUrbanPopDeath height={height/2} width={width/2} filters={props.data.filters}   />
                );
            case "Total COVID-19 Cases Vs Personal Freedom Score":
                return (
                    <TreemapTotalFreedom height={height/2} width={width/2} filters={props.data.filters}   />
                );
            case "Percent of Populations Using The Internet Vs COVID-19 Cases":
                return (
                    <TreemapInternetCases height={height/2} width={width/2} filters={props.data.filters}   />
                );
            case "Country's Happiness Vs COVID-19 Cases":
                return (
                    <TreemapHappinessScore height={height/2} width={width/2} filters={props.data.filters}   />
                );
            case "US COVID-19 Cases Over Time":
                return (
                    <LineChart url={props.data.link_source} height={height/2} width={width/2} filters={props.data.filters}  />
                );
            default:
                return (
                    <CircularProgress />
                )
        }
    }

    const deleteFromDashboard = (graph) => {
        console.log(graph);
        let index = 0;
        if(graph === graphs[0]){
            graphs.shift();
            getCurrentData(graphs);
        } else {
            for(let i = 0; i < graphs.length; i++){
                if((graphs[i].graph_type === graph.graph_type) && (graphs[i].title === graph.title) && (graphs[i].description === graph.description) && (graphs[i].filters === graph.filters)){
                    index = i;
                    break;
                }
            }
            getCurrentData(graphs.splice(0, index).concat(graphs.slice(index + 1)));
        }

        // window.localStorage.setItem('selected-graphs', JSON.stringify(data));
        sessionStorage.setItem('selected-graphs', JSON.stringify(data));
    }


  return (
    <>
            {/* <Container>
                {graphs !== null ? 
                    graphs.length > 0 ? 
                    <Grid
                    container sx={{ p:1, pt: 5, height: (height / 2) }}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Box xs={{ position: 'relative', overflow: 'auto'}}>
                            {
                                currentData ? <GraphType data={currentData}/>: (
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
                                    <Button variant="outlined" size="small" onClick={() => deleteFromDashboard(currentData)}>Remove from Your Dashboard</Button>
                                </Stack>
                            </Container>
                        </Box>
                    </Grid>

                    <Grid item xs={8} md={8} lg={8}>
                        <Box sx={{ pt: 2}}>
                            <Container sx={{textAlign: 'end'}}>
                                <Typography variant="h6" gutterBottom>
                                    { currentData && currentData.title }
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom>
                                    { currentData && currentData.description}
                                </Typography>
                               
                            </Container>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12} sm={12}>
                        <Typography variant="h5" sx={{ pt: 3}}>More visuals</Typography>
                        <Grid sx={{ pt: 2}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            graphs && graphs.map((item, i) => (
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
                    :
                        <Grid 
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '100vh' }}
                        >
                            <Box xs={{ display: 'inline-flex'}}>
                                There are currently no visualizations in Your Dashboard.
                                Those you have selected will show up here.
                            </Box>
                        </Grid>

                : 
                    <CircularProgress />
                }
            </Container> */}
            <Box m="20px">
                { graphs !== null ?
                    graphs.length > 0 ?
                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(12, 1fr)"
                            gridAutoRows="140px"
                            gap="20px"
                        >   
                            {
                                graphs && graphs.map((item, i) => (
                                    <Box 
                                        gridColumn="span 6"
                                        gridRow="span 5"
                                    >
                                        <Box
                                            mt="50px"
                                            p="0 30px"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{borderRadius: '16px', border: 1, bgcolor: '#e0e0e0'}}
                                        >
                                            <Box>
                                                <Typography
                                                    variant="h5"
                                                    fontWeight="600"
                                                    mb="25px"                                                 
                                                >
                                                    {item.title}
                                                </Typography>
                                                <Typography
                                                    variant="h5"
                                                    fontWeight="600"
                                                    mb="25px"
                                                >
                                                    <Stack spacing={0.5}>
                                                        <Button variant="outlined" size="small" onClick={() => deleteFromDashboard(item)}>Remove from Your Dashboard</Button>
                                                    </Stack>
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <GraphType data={item}/>
                                            </Box>
                                        </Box>
                                    </Box>
                                    
                                ))
                            }
                        </Box>
                        :
                        <Grid 
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '100vh' }}
                        >
                            <Box xs={{ display: 'inline-flex'}}>
                                There are currently no visualizations in Your Dashboard.
                                Those you have selected will show up here.
                            </Box>
                        </Grid>

                    :
                    <Grid 
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Box xs={{ display: 'inline-flex'}}>
                            There are currently no visualizations in Your Dashboard.
                            Those you have selected will show up here.
                        </Box>
                    </Grid>
                }
            </Box>
    </>
  )
}

export default CustomDashboard
