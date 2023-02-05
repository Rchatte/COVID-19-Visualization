import React, { useEffect, useState, useReducer } from "react";
import { Grid, Button, Container, Typography, Card, CardContent, CardActions, Drawer } from "@mui/material";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import Filters from "../FiltersComponent/Filters";
import GeneralVisualTemplate from "./GeneralVisualTemplate";
import GeneralFilteredVisualTemplate from "./GeneralFilteredVisualTemplate";


export default function DisplayVisual(props) {
    const { height, width } = useWindowDimensions();
    const [currentData, setCurrentData] = useState();
    const [graphs, setGraphs] = useState();


    const [filters, setFilter] = useState();
    const [filtersTrigger, setOpenFilters] = useState();

    // Get current data stored in key value "data"
    // Set object to variable currentData.
    const getLocalStorage = () => {
        if (window) {
            try {
                const currentObject = window.sessionStorage.getItem("data");
                const objectParse = JSON.parse(currentObject);
                setCurrentData(objectParse.graphs[0]); // Get first graph by defualt
                setGraphs(objectParse.graphs);
                setFilter(objectParse.graphs.filters);
                console.log()
            } catch (error) {
                console.log(error)
            }


        }
    }

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

    // At render get the current information in browser data
    useEffect(() => {
        getLocalStorage();
    }, [])
    return (
        <>

            <Container>

                <Drawer
                    anchor={"left"}
                    open={filtersTrigger}
                    onClose={() => setOpenFilters(false)}
                    onKeyDown={() => setOpenFilters(false)}

                >
                    {/* Send the useStates to the filters file to recieve the information */}
                    <Filters open={filtersTrigger} data={filters} updatedFilters={setFilter} updateData={setCurrentData} currentData={currentData} />
                </Drawer>

                <Grid
                    container sx={{ p: 1, pt: 5, height: (height / 2) }}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Container>
                            { currentData && <GeneralVisualTemplate data={currentData} /> }
                        </Container>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Container>
                            <Typography variant="h6" gutterBottom>
                                { currentData  && currentData.title }
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                { currentData && currentData.description}
                            </Typography>
                            <Button variant="outlined" onClick={() => setOpenFilters(true)}>Filters</Button>
                        </Container>
                    </Grid>
                </Grid>


                <Grid sx={{ p: 2 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {graphs && <RenderCards />}

                </Grid>


            </Container>


        </>
    )

}