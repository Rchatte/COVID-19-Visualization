import React, { useState, useEffect, } from 'react';
import {
    Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem,
    ListItemText, Radio, RadioGroup, FormControlLabel, FormControl, Label, Checkbox,
    OutlinedInput, MenuItem, Select, InputLabel, Box, IconButton, 
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import VizCardLayout from '../HomepageComponent/Components/VizCards/VizCardLayout';

const drawerWidth = 270;
const navBarTitle = "Navbar Title";

const yAxis = [
    'COVID Cases',
    'COVID Deaths',
    'Vaccinations',
    'COVID Survival Cases',
    'Age'
];

const xAxis = [
    'COVID Cases',
    'COVID Deaths',
    'Vaccinations',
    'COVID Survival Cases',
    'Age'
];

const region = [
    'North America',
    'Centeral America',
    'South America',
    'Europe',
    'Asia',
    'Africa',
    'Caribbean',
    'Oceania'
];

const tabs = [
    'Home Page',
    'Deaths', 
    'Vaccinations', 
    'Total'
];

export default function Navbar({ handleXChangeParent, handleYChangeParent, handleRegionChangeParent, goToHomePage}) {

    const [selectedIndex, setSelectedIndex] = useState(1);
    const [color, setColor] = React.useState('NONE');
    const [selectedY, setSelectedY] = useState([]);
    const [selectedX, setSelectedX] = useState([]);
    const [selectedRegion, setRegion] = useState("");

    const handleChange = (event) => {
        setColor(event.target.value);
    };

    const handleYChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedY(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        handleXChangeParent(
            typeof value === 'string' ? value.split(',') : value
        ); // Updating value to parent component
    }

    const handleXChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedX(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        handleYChangeParent(
            typeof value === 'string' ? value.split(',') : value,
        ); // Updating value to parent component
    }

    const handleRegionChange = (event) => {
        setRegion(event.target.value)
        handleRegionChangeParent(event.target.value) // Updating value to parent component
    }

    const [state, setState] = React.useState({ 
        left: false, 
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };
   
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 240,
            },
        },
    };

    useEffect(() => {
        console.log(selectedIndex)
        console.log(selectedY)
    }, [selectedIndex])

    return (
        <>
            <CssBaseline />
            
            <AppBar
                position="fixed"
                    /*sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }} 
                      ^ This is the old sx for the Appbar, temporarily removing this. */
                sx={{ width: `100%` }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" noWrap to="/">
                        {navBarTitle}
                    </Typography>

                    <Box sx={{ ml:130, pr: 5 }}>
                        {tabs.map((name) => (
                            <button class="navbutton"> 
                                {name}
                            </button>
                        ))}
                    </Box>
                        
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>


            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick = {toggleDrawer('left', true)}
              sx={{ pl:5 }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="temporary"
                anchor="left"
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" noWrap to="/">
                            {navBarTitle}
                    </Typography>
                </Toolbar>

                <Divider />
                    <Typography variant="subtitle2" gutterBottom>
                        Graph X axis
                    </Typography>

                    <FormControl sx={{ m: 1, width: 240 }}>
                        <InputLabel id="y-axis-label">X-Axis</InputLabel>
                        <Select
                            labelId="y-axis-label"
                            id="y-axis-id"
                            multiple
                            value={selectedX}
                            onChange={handleXChange}
                            input={<OutlinedInput label="X component" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {xAxis.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={selectedX.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br/>
                    <Divider />

                    <Typography variant="subtitle2" gutterBottom>
                        Graph Y axis
                    </Typography>

                    <FormControl sx={{ m: 1, width: 240 }}>
                        <InputLabel id="y-axis-label">Y-Axis</InputLabel>
                        <Select
                            labelId="y-axis-label"
                            id="y-axis-id"
                            multiple
                            value={selectedY}
                            onChange={handleYChange}
                            input={<OutlinedInput label="Y component" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {yAxis.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={selectedY.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />

                    <Divider />
                    <Typography variant="subtitle2" gutterBottom>
                        Region
                    </Typography>

                    <FormControl sx={{ m: 1 , width: 240 }}>
                        <InputLabel id="region-label">Region</InputLabel>
                        <Select
                            labelId="region-label"
                            id="region-id"
                            value={selectedRegion}
                            onChange={handleRegionChange}
                        >
                            {region.map((name, index) => (
                                <MenuItem key={index} value={name}>
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>



                    <Typography variant="subtitle2" gutterBottom>
                        Color Filters
                    </Typography>
                    <Divider />
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={color}
                            onChange={handleChange}
                        >
                            <List component="nav">
                                <ListItem>
                                    <FormControlLabel value="Blue" control={<Radio color="primary" />} label="Blue" />
                                </ListItem>
                                <ListItem>
                                    <FormControlLabel value="Green" control={<Radio color="success" />} label="Green" />
                                </ListItem>
                                <ListItem>
                                    <FormControlLabel value="Red" control={<Radio color="error" />} label="Red" />
                                </ListItem>
                                <ListItem>
                                    <FormControlLabel value="Orange" control={<Radio color="warning" />} label="Orange" />
                                </ListItem>

                            </List>
                        </RadioGroup>
                    </FormControl>

            </Drawer>
            
        </>
    );
}
