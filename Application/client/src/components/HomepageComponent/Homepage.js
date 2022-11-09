import React, { useEffect, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

import MuiAppBar from '@mui/material/AppBar';
import VizCardLayout from "./Components/VizCards/VizCardLayout";
import CardsContainer from "../CardsComponent/CardsContainer.js"
import {
    Button, Container , CardActionArea, CardActions, Typography, Box, Card, CardContent,
    CardMedia, AppBar, List, ListItem, Toolbar, Grid, Divider, ListItemText, ListItemButton, IconButton,
    CssBaseline, ListItemIcon, Slide, Stack, Link
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/ChevronRight';

import LineChartWithZoom from "../Visualizations/LineChartWithZoom";
import Sidebar from "../NavbarComponent/Sidebar";
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";



      
const drawerWidth = 260;
const tabs = [
    'World Health Organization',
    'USA Facts', 
    'CDC', 
    'CDPH'
];
  

export default function Homepage(){

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const [yAxis, setYaxis] = useState([]);
    const [region, setRegion] = useState();
    const [selectedCard, setSelectedCard] = useState('');
    const [menu, setMenu] = useState(true);
    const containerRef = React.useRef(null);
    
    useEffect(() => {

    },[]) 

    return(
        <>

        <Box sx={{ flexGrow: 1 }}>
            
            <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                </IconButton>

                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        Senior Design
          </Typography>
                <Button color="inherit">Dashboard</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Data types</Button>
            </Toolbar>
            </AppBar>
        </Box>

           
                

        <Container sx={{ mt: 3 } }>
            <CardsContainer />
        </Container>
        </>

    )
}