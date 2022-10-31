import React, { useState, useEffect, } from 'react';
import {
    Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem,
    ListItemText, Radio, RadioGroup, FormControlLabel, FormControl, Label, Checkbox,
    OutlinedInput, MenuItem, Select, InputLabel, Box, IconButton, ListItemButton, Stack, TextField
} from "@mui/material"
import { styled, useTheme } from '@mui/material/styles';
import moment from "moment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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
    'Deaths', 
    'Vaccinations', 
    'Total'
];

export default function Sidebar({ handleYChangeParent, handleRegionChangeParent, handleDateChangeParent }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [color, setColor] = React.useState('NONE');
    const [selectedY, setSelectedY] = useState([]);
    const [selectedRegion, setRegion] = useState("");

    const currentDate = moment()
    const [selectedDate, setSelectedDate ] = useState(currentDate)
    const [selectedTime, setSelectedTime ] = useState(new Date('2022-08-18T21:11:54'))

    const handleDateChange = ( value ) => {
        const v = value.format("LL")
        setSelectedDate(value);
        handleDateChangeParent(v)
    }
    const handleTimeChange = ( value ) => {
        setSelectedTime(value)
    } 
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
        handleYChangeParent(
            typeof value === 'string' ? value.split(',') : value
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

                <Typography variant="subtitle2" gutterBottom>
                    Filters
                </Typography>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Stack spacing={2} sx={{m:1}} >
                    <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/DD/YYYY"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        />

                    <TimePicker
                        label="Time"
                        value={setSelectedTime}
                        onChange={handleTimeChange}
                        renderInput={(params) => <TextField {...params} />}
                    />

                    </Stack>
                </LocalizationProvider>
                <br/>
                <Divider />
                <br/>

                <FormControl sx={{ m: 1 }}>
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
                <br />


                <FormControl sx={{ m: 1 }}>
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
   



            
        </>
    );
}
