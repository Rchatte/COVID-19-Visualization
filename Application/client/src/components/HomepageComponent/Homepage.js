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

import LineChartUSAFACTSTotalOverTime from "../Visualizations/LineChartUSAFACTSTotalOverTime";
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
    const [refresh, setRefresh] = useState(false);
    
    useEffect(() => {
        setRefresh(false);
    },[refresh]) 

    return(
        <>  
        {
            /*  Nov 29, 2022
                Removed the Navbar from here. 
                The navbar is not called from Navbar.js at app.js
            */
        }

        <Container sx={{ mt: 3 } }>
            <CardsContainer />
        </Container>
        </>

    )
}