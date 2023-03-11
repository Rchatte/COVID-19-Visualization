import React, { useEffect, useState, useReducer, setState, useContext } from "react";
import { Grid, Button, Container, Typography, Card, CardContent, CardActions, Drawer,Paper , CircularProgress, Box, CardActionArea, Stack, CardHeader } from "@mui/material";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { DataContext } from "../../App";
import { useNavigate } from "react-router-dom";
import UserSelectedGraphs from "./UserSelectedGraphs";
import LineChart from "../Visualizations/LineChart";
import Treemap from "../Visualizations/TreeMap";

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
        const data = window.localStorage.getItem('selected-graphs');
        if(data){
           getCurrentData(JSON.parse(data));
        }
        console.log(graphs);
    }, [])

    const getCurrentData = (data) => {
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
                    <Treemap height={height / 2} width={width / 3} filters={props.data.filters}  />
                );
            case "US COVID-19 Deaths Over Time":
                return(
                    <LineChart url={props.data.link_source} height={height / 2} width={width / 2} filters={props.data.filters} />
                )    
            default:
                return (
                    <CircularProgress />
                )
        }
    }

    const deleteFromDashboard = (graph) => {
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

        window.localStorage.setItem('selected-graphs', JSON.stringify(data));
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
                                            sx={{borderRadius: '16px', border: 1}}
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
