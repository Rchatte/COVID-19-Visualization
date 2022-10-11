import React, { useEffect, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

import MuiAppBar from '@mui/material/AppBar';
import VizCardLayout from "./Components/VizCards/VizCardLayout";
import CardsContainer from "../CardsComponent/CardsContainer.js"
import {
    Button, CardActionArea, CardActions, Typography, Box, Card, CardContent,
    CardMedia, List, ListItem, Toolbar, Grid, Divider, ListItemText, ListItemButton, IconButton,
    CssBaseline, ListItemIcon
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/ChevronRight';

<<<<<<< HEAD
import VizCard from "./Components/VizCards/VizCard";
=======
import VizCardLayout from "./Components/VizCards/VizCardLayout";
>>>>>>> c66b8494384728f432c57795fdebd4e439da401f
import LineChartWithZoom from "../Visualizations/LineChartWithZoom";
import Sidebar from "../NavbarComponent/Sidebar";


      
const drawerWidth = 260;
  

export default function Homepage(){

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const [yAxis, setYaxis] = useState([]);
    const [region, setRegion] = useState();
    const [selectedCard, setSelectedCard] = useState('');

    { /* Functions are being passed to child component -> Navbar  */ }

    const handleYChange = (value) => {
        setYaxis(value)
    }
    const handleRegionChange = (value) => {
        setRegion(value)
    }   
    const handleDateChange = (value) =>{
        setDate(value)
    }

              
    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
        }),
    );
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

<<<<<<< HEAD
    const handleDrawerOpen = () => {
        setOpen(true);
    }
    
    const handleDrawerClose = () => {
        setOpen(false);
    }
    
    useEffect(() => {
        console.log(date)
        console.log(yAxis)
    },[yAxis, region, date]) 

    return(
        <>
 
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
            <AppBar position="fixed" open={open}>
                { /* Upper Toolbar */}
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Dashboard
                </Typography>
                </Toolbar>
            </AppBar>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                    <Sidebar handleDateChangeParent={handleDateChange}/>
                    {/* Navbar component.  */}
                    {/* Navbar Just holds the sidebar values.  */}

                <Divider />
            </Drawer>

        <Main open={open}>
        <DrawerHeader />

            <CardsContainer />


        </Main>
        </Box>  
=======
    return(
        <>
            <h1> Line Graph Example </h1>
            <LineChartWithZoom height={500} width={1000}></LineChartWithZoom>
            <Box sx={{ display: 'flex' }}>
                { /* Toolbar component is being imported from here.*/ }
                <Navbar handleXChangeParent={handleXChange} handleYChangeParent={handleYChange} handleRegionChangeParent={handleRegionChange}/>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >

                    { /* Luis Gonzalez 9/30/22 */}
                    { /* This is the main dashboard section of the webpage */}
                    { /* On changes to navbar, the values xAxis, yAxis, region are being updated and are ready to pass to children components.  */}
                    { /* Next step is to pass this data to Child Card Components and so on.... */}

                    {/* Francisco Contreras 9/30/22  */}
                    {/* Added visualization cards into homepage */}
                    <VizCardLayout/>             
                </Box>
            </Box>
>>>>>>> c66b8494384728f432c57795fdebd4e439da401f
        </>
    )
}