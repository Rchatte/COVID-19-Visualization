import React, { useEffect, useState } from "react";
import {
    Paper, Container, Box, Card, Typography,
    Button, Drawer, CardContent, Grid, CardActions,
    CardMedia, CardActionArea, CircularProgress,
    Divider, List, ListItemButton, ListItemText, ListItem
} from "@mui/material"
import USAFactsData from "./USAFactsData";
import CDCData from "./CDCData";
import WHOData from "./WHOData";
<<<<<<< HEAD
import CDPHData from "./CDPHData";
=======
import LineChartWithZoom from "../Visualizations/LineChartWithZoom";
import Treemap from "../Visualizations/TreeMap";



const values = [
    {
        title: "USA Facts",
        url: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
        ulr2: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
        image: "img"
    },
    {
        title: "World Health Organization",
        url: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
        ulr2: "NA",
        image: "img"
    },
    {
        title: "CDC",
        url: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
        ulr2: "NA",
        image: "img"
    },
    {
        title: "California Department of Public Health",
        url: "https://static.usafacts.org/public/data/covid-19/covid_deaths_usafacts.csv",
        ulr2: "NA",
        image: "img"
    },
]


export default function GraphData({ close, viz }) {

    { /* Gather all data needed to complete the graph? */ }
    { /* Button to close */ }

    const [selectedVisual, setSelectedVisual] = useState(null);
    const [showLargeVisual, setShowLargeVisual] = useState(false);
    const [visualType, setVisualType] = useState('');



    const removeVisualType = () => { setVisualType('') }
>>>>>>> GUI-OLD



    const handleButtonClose = () => {
        close(true)
    }




    // If new visual is selected look at values array above and fill in useState to update all values in 
    // react component return ()
    useEffect(() => {
        values.map((item) => {
            if (item.title === viz) {
                setSelectedVisual(item);
                console.log("Found")
                return
            }
        })
        console.log(selectedVisual);
    }, [viz])

    // Function which chekcs which data source the user picks then returns a component which contains the visualization cards created from the data source
    const checkDataSource = (dataSource) => {
        switch (dataSource) {
            case "USA Facts":
                return <USAFactsData />
            case "World Health Organization":
                return <WHOData />
            case "CDC":
                return <CDCData />
            case "California Department of Public Health":
                return <CDPHData/>
            default:
                return null
        }
    }


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                

                <Container>
                    <Typography variant="h5">
                        Select visual
                    </Typography>
                </Container>


                <Container sx={{ pt: 3 }}>
                    {/* <h2>All info on charts</h2> */}
                    {/* Call method to check which data source user picks */}
                    {/*checkDataSource(viz)*/}

                    <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {
                            selectedVisual === null ? <CircularProgress /> :
                                (<>
                                    <Grid item xs={3} md={6}>
                                        <Card>
                                            <CardActionArea onClick={() => { setVisualType('line-chart') }} >
                                                <Container sx={{ pt: 1, pl: 1, pb: 1, pr: 1 }}>
                                                    <LineChartWithZoom url={selectedVisual.url} height={400} width={400} />
                                                </Container>

                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Line graph
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>

                                        </Card>
                                    </Grid>
                                    <Grid item xs={3} md={6}>
                                        <Card>
                                            <CardActionArea onClick={() => { setVisualType('tree-map') }}>

                                                <Container sx={{ pt: 1, pl: 1, pb: 1, pr: 1 }}>
                                                    <Treemap url={selectedVisual.url} height={400} width={400} />
                                                </Container>

                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                         Tree map
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>

                                        </Card>
                                    </Grid>
                                    <Grid item xs={3} md={6}>
                                        <Card>
                                            <Container sx={{ pt: 1, pl: 1, pb: 1, pr: 1 }}>
                                                <LineChartWithZoom url={selectedVisual.url} height={400} width={400} />
                                            </Container>

                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {selectedVisual.title}
                                                </Typography>
                                            </CardContent>

                                        </Card>
                                    </Grid>
                                    <Grid item xs={3} md={6}>
                                        <Card>
                                            <Container sx={{ pt: 1, pl: 1, pb: 1, pr: 1 }}>
                                                <LineChartWithZoom url={selectedVisual.url} height={400} width={400} />
                                            </Container>

                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {selectedVisual.title}
                                                </Typography>
                                            </CardContent>

                                        </Card>
                                    </Grid>

                                </>)

                        }




                    </Grid>
                    <Button size="small" onClick={handleButtonClose}>Return to Home Page</Button>
                </Container>

                <Container>
                    <Container>
                        <Typography variant="h5">
                            Select visual
                        </Typography>
                    </Container>

                    <Button variant="contained" onClick={() => console.log("Show filter")}>Show filters</Button>

                </Container>


            </Box>
        </>
    )
}