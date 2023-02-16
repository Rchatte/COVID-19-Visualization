import React, { useEffect, useState, useReducer, setState, useContext } from "react";
import { Grid, Button, Container, Typography, Card, CardContent, CardActions, Drawer,Paper , CircularProgress, Box, CardActionArea } from "@mui/material";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import Filters from "../FiltersComponent/Filters";
import GeneralVisualTemplate from "./GeneralVisualTemplate";
import GeneralFilteredVisualTemplate from "./GeneralFilteredVisualTemplate";
import LineChart from "../Visualizations/LineChart";
import Treemap from "../Visualizations/TreeMap";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";

export default function DisplayVisual() {
    const { height, width } = useWindowDimensions();
    const { currentData, setCurrentData } = useContext(DataContext); 
    const navigate = useNavigate();

    const [data, setData] = useState(); // Graph selected
    const [graphs, setGraphs] = useState(null);
    const [filters, setFilters] = useState();

    const [filtersTrigger, setFiltersTrigger] = useState(false);


    useEffect(() => {  
        if(currentData === null) {
            navigate('/');
        }else {
            getCurrentData(currentData);
        }
    },[currentData]);

    const getCurrentData = (data) => {
        setData(data.graphs[0]);
        setGraphs(data.graphs);
        setFilters(data.graphs[0].filters) 
    }

    const updateChartData = (item) => {
        setData({ ...item});
    }

    const setFilterLocations = (list) => {

    }

    const GraphType = (props) => {
        switch(props.type){
            case "tree-map":
                return (
                    <Treemap url={props.data.link1} height={height/2} width={width/2} filters={props.filters} type={props.data.graph_type} />
                );
            case "line-chart":
                return(
                    <LineChart url={props.data.link1} height={height/2} width={width/2} filters={props.filters} type={props.data.graph_type} />
                )    
            default:
                return (
                    <CircularProgress />
                )
        }
    }

    const setNewFilters = (newFilters) =>{
        console.log(newFilters);
        setData(prevState => ({ ...prevState, filters: newFilters }));
        console.log(data);
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
                    <Grid item xs={12} md={8} lg={8}>
                        <Box xs={{ display: 'inline-flex'}}>
                            {
                                data && <GraphType type={data.type} data={data} filters={data.filters}/> 
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <Box>
                            
                            <Typography variant="h6" gutterBottom>
                                { data && data.title }
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                { data && data.description}
                            </Typography>
                            <Button variant="outlined" onClick={() => setFiltersTrigger(true)}>Filters</Button>
                        </Box>
                    </Grid>

                    <Grid item sx={{ p: 2}} xs={12} md={12} lg={12}>
                        <Box>
                            <Typography variant="h6">Other visuals available</Typography>
                        </Box>
                    </Grid>

                

                    <Grid item xs={12} md={12} sm={12}>
                        <Grid sx={{ p: 2}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
                                                {item.type_desc + " : " + item.description}
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