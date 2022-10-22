import React, { useEffect, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

import MuiAppBar from '@mui/material/AppBar';
import VizCardLayout from "./Components/VizCards/VizCardLayout";
import CardsContainer from "../CardsComponent/CardsContainer.js"
import {
    Button, CardActionArea, CardActions, Typography, Box, Card, CardContent,
    CardMedia, List, ListItem, Toolbar, Grid, Divider, ListItemText, ListItemButton, IconButton,
    CssBaseline, ListItemIcon, Slide, Stack, Link
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/ChevronRight';

import LineChartWithZoom from "../Visualizations/LineChartWithZoom";
import Sidebar from "../NavbarComponent/Sidebar";


      
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

    { /* Functions are being passed to child component -> Navbar  */ }

    function switchMenu() {
        if(menu == false){setMenu(true);}
        else{setMenu(false);}
    }

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
            <></>
        <CssBaseline />

            <AppBar position="fixed" open={open} sx={{ overflow: 'hidden' }} ref={containerRef}>
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

                <Slide direction="up" in={menu} container={containerRef.current}>
                    <Stack direction="row" sx={{ ml:95, pr: 4 }}>
                        {tabs.map((name) => (
                            // Replaced the Link elemenet as a Link component for the Button specifically. This achieves the same goal.
                            <Button 
                              variant="text"
                              href={"/" + name}
                              component={Link}
                              to={'/' + name} 
                              sx={{ my: 1, color: 'white', display: 'block', fontSize:14 }}
                            > 
                                {name}
                            </Button>
                        ))}
                    </Stack>
                </Slide>
                        
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={switchMenu}
                  sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

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
        </>

    )
}