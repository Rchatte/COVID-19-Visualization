import React, { useEffect, useState, useContext } from "react";
import { styled, useTheme } from '@mui/material/styles';
import {
    Button, Container , CardActionArea, Typography, Box, Card,
    CardMedia, Grid, Paper
} from "@mui/material";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import US_IMAGE from "../images/USA.png"
import WORLD_IMGAGE from "../images/WORLD.png";
import { DataContext } from "../../App";

const drawerWidth = 260;
const tabs = [
    'World Health Organization',
    'USA Facts', 
    'CDC', 
    'CDPH'
];
  

export default function Homepage(){

    
    const theme = useTheme();
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const { setCurrentRegion } = useContext(DataContext);

    
    useEffect(() => {
        setRefresh(false);
    },[refresh]) 


    const handleRegionChange = (event) => {
        event.preventDefault();
        const id = event.currentTarget.id;
        setCurrentRegion(id); // Sets the region
        navigate('/Visual'); // Send to visuals

    }

    return(
        <>  
        {
            /*  Nov 29, 2022
                Removed the Navbar from here. 
                The navbar is not called from Navbar.js at app.js
                <CardsContainer />
            */
        }

        <Container sx={{ mt: 3 } }>

            <Container sx={{ pb: 5, width: '100%'}}>
                <Paper sx={{ p: 2}}>
                    <Typography variant="h4">Data Driven Documents</Typography>
                    <Typography variant="subtitle2">
                        Select from the following sources.
                    </Typography>
                </Paper>

            </Container>
            <Grid container spacing={2} sx ={{ width: '100%', height: '100%', paddingInlineStart: '24px'}}>
                <Grid item xs={6} md={8}>
                    <Card sx={{ height: '100%' }} id="USA" onClick={handleRegionChange}>
                    <CardActionArea>

                    <CardMedia
                            sx={{ height: '300px'}}
                            image={US_IMAGE}
                            title="USA"
                            children={<Typography variant="h5" color="white" sx={{ pt: 2, pl: 2}}>United States</Typography>}
                        />
                        </CardActionArea>

                    </Card>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Paper>
                    <Container sx={{ pt: 2, height: '300px'}}>
                        <Typography variant="subtitle2">Contains all visualizations within the united states given all local sources. </Typography>

                    </Container>
                    </Paper>
                </Grid>
                <Grid item xs={6} md={8}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} boxShadow="initial">

                    <Card sx={{ height: '100%' }} id="WORLDWIDE"  onClick={handleRegionChange }>
                        <CardActionArea>
                            <CardMedia
                                sx={{height: '300px'}}
                                image={WORLD_IMGAGE}
                                title="WORLD"
                                children={<Typography variant="h5" color="white" sx={{pt: 2, pl: 2}}>World Map</Typography>}
                            />                        
                        </CardActionArea>

                    </Card>
                </Box>
                </Grid>
                <Grid item xs={6} md={4} sx={{height: '100%'}}>
                    <Paper>
                    <Container sx={{ pt: 2, height: '300px'}}>
                        <Typography variant="subtitle2">Contains all visualizations across the world given all world wide sources. </Typography>    
                    </Container>
                    </Paper>
                </Grid>
            </Grid>
            
        </Container>
        </>

    )
}