import React, { useEffect, useState, useReducer, setState } from "react";
import { Grid, Button, Container, Typography, Card, CardContent, CardActions, Drawer, CircularProgress, Box } from "@mui/material";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import Filters from "../FiltersComponent/Filters";
import GeneralVisualTemplate from "./GeneralVisualTemplate";
import GeneralFilteredVisualTemplate from "./GeneralFilteredVisualTemplate";
import LineChart from "../Visualizations/LineChart";
import Treemap from "../Visualizations/TreeMap";

export default function DisplayVisual() {
    const { height, width } = useWindowDimensions();
    const [currentData, setCurrentData] = useState(null);
    const [graphs, setGraphs] = useState();

    const [filters, setFilter] = useState();
    const [filtersTrigger, setFiltersTrigger] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading]= useState(false);

    // Get current data stored in key value "data"
    // Set object to variable currentData.
    useEffect(() => {  
        getLocalStorage();
    },[refresh]);


    const getLocalStorage = async () => {
        setLoading(true);
        let objectParse;
        const arrayGraphs = "graphs";
        if (window) {
          try {
            const currentObject = await window.sessionStorage.getItem("data");
            objectParse = JSON.parse(currentObject);
            console.log(objectParse);
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        }
        // IF first time clicking on source, pick the first graph.
        if ("graphs" in objectParse){
            setCurrentData(objectParse.graphs[0]);
            setGraphs(objectParse.graphs);
            setFilter(objectParse.filters);
            setLoading(false);
        }else {
            // Otherwise the value that has been selected and updated via sessionStorage. 
            setCurrentData(objectParse);
            setFilter(objectParse.filters);
            setLoading(false);
        } 
    };
    // When selecting a new card update the session storage and variables.
    const updateChartData = (item) => {
        if(window) {
            try {
                window.sessionStorage.setItem("data", JSON.stringify(item));
                setCurrentData(item);
                setFilter(item.filters);
            }catch (error) {
                console.log(error);
            }
        }
    }
    const RenderCards = () => {
        return (
            <>
                {
                    graphs.map((item, i) => (
                        <Grid item xs={2} sm={4} md={4} key={i}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>

                                    <Typography variant="subtitle1" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ mb: 1.5 }} color="text.secondary">
                                        {item.type_desc + " : " + item.description}
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" onClick={() => updateChartData(item)}>Visual</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </>
        )
    }

    {/* 
        Exmaple of a prop coming into this function
        data: 
            {
            type: "line-chart",
            graph_type: 'death-over-time',
            title: "US COVID-19 Deaths Over Time",
            img: LineGraphImg,
            type_desc: 'Line Graph',
            description: "Total COVID-19 Deaths in the USA over time",
            link1: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
            link2: "",
            filters: {
                requires_dates: 'true',
                endDate: "01-01-2023",
                startDate: "01-01-2020",
                color1: "#27b694",
                color2: "#27b694",
                height: 400,
                width: 800,
            },
    }

    */}

    const GraphType = (props) => {
        console.log(props);
        switch(props.type){
            case "tree-map":
                return (
                    <Treemap url={props.data.link1} height={height/2.5} width={width/2.5} filters={props.filters} type={props.data.graph_type} />
                );
            case "line-chart":
                return(
                    <LineChart url={props.data.link1} height={height/2.5} width={width/2.5} filters={props.filters} type={props.data.graph_type} />
                )
            
            
            default:
                return(
                    <CircularProgress />
                )
        }
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
                    <Filters open={filtersTrigger} close={filtersTrigger} closeFilters={setFiltersTrigger} data={filters} updatedFilters={setFilter} refresh={setRefresh} />
                </Drawer>

                <Grid
                    container sx={{ p: 1, display: 'flex', pt: 5, height: (height / 2) }}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Box sx={{ display: 'flex', alignContent: 'center'}}>
                            {
                                currentData !== null ? <GraphType type={currentData.type} data={currentData} filters={currentData.filters}/> : (<CircularProgress />)  
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                { currentData && currentData.title }
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                { currentData && currentData.description}
                            </Typography>
                            <Button variant="outlined" onClick={() => setFiltersTrigger(true)}>Filters</Button>
                        </Box>
                    </Grid>

                </Grid>


                <Grid sx={{ p: 2}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {graphs && <RenderCards />}

                </Grid>


            </Container>


        </>
    )

}