import React, { useEffect, useState, useReducer, setState, useContext } from "react";
import { Grid, Button, Container, Typography, Card, CardContent, CardActions, Drawer,Paper , CircularProgress, Box, CardActionArea } from "@mui/material";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { DataContext } from "../../App";
import { useNavigate } from "react-router-dom";
import LineChart from "../Visualizations/LineChart";
import Treemap from "../Visualizations/TreeMap";

const CustomDashboard = (props) => {
    const { height, width } = useWindowDimensions();
    const [data, setData] = useState();
    const [graphs, setGraphs] = useState(null);
    const [currentData, setCurrentData] = useState();
    const navigate = useNavigate();

    useEffect(() => {  
        if(currentData === null) {

        }else {
            getCurrentData(props.selectedGraphs);
        }
    },[props.selectedGraphs]);

    const getCurrentData = (data) => {
        setData(data[0]);
        setGraphs(data); 
    }

    const updateChartData = (item) => {
        setData({ ...item});
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

    const deleteFromDashboard = (graph) => {
        let index = 0;
        if(data === graphs[0]){
            graphs.shift();
            getCurrentData(graphs);
        } else {
            for(let i = 0; i < graphs.length; i++){
                if((graphs[i].graph_type === data.graph_type) && (graphs[i].title === data.title) && (graphs[i].description === data.description)){
                    index = i;
                    break;
                }
            }
            getCurrentData(graphs.splice(0, index).concat(graphs.slice(index + 1)));
        }
    }

  return (
    <>
            <Container>
                {graphs.length != 0 ? 
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
                            <Button variant="outlined" onClick={() => deleteFromDashboard(data)}>Remove From Your Dashboard</Button>
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
                </Grid>}
            </Container>
    </>
  )
}

export default CustomDashboard
