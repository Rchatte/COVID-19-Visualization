import React, { useEffect, useState } from "react";
import {
    Box, List, Drawer, Divider, ListItemText,
    ListItemButton, ListItemIcon, ListItem, Typography, TextField, Stack, Button, FormControl, InputLabel, MenuItem, Select
} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from "moment";
import { TwitterPicker, CirclePicker } from 'react-color'
import GraphData from "../DataComponent/GraphData";


export default function Filters(props) {
    const [filters, setFilters] = useState(null);
    const continent = ["Asia", "Europe", "North America", "South America", "Antarctica", "Oceania", "Africa"];

    // Depending on the filters associated with the chart click
    useEffect(() => {
        setFilters(props.data);
    }, [props.data]);

    const appendFilters = () => {
        console.log(filters);
        props.setNewFilters(filters)
        props.closeFilters(false); // Close filters to show new visual.
    }

    const onContinentChange = (e) => {
        setFilters((prev) => ({ ...prev, continents: e.target.value }))
    }

    const returnInputType = (title) => {
        switch (title) {
            case "start_date":
                return (
                    <>
                        <DesktopDatePicker
                            label="Start Date"
                            value={filters.start_date}
                            onChange={(e) => setFilters((prev) => ({ ...prev, start_date: moment(e).format("MM-DD-YYYY") }))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </>
                )
            case "end_date":
                return (
                    <>
                        <DesktopDatePicker
                            label="End Date"
                            value={filters.end_date}
                            onChange={(e) => setFilters((prev) => ({ ...prev, end_date: moment(e).format("MM-DD-YYYY") }))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </>
                )
            case "color1":
                return (
                    <>
                        <Stack spacing={2}>
                            <Typography variant="subtitle1">
                                Primary Color:
                            </Typography>
                            <TwitterPicker color={filters.color1} onChangeComplete={(e) => setFilters((prev) => ({ ...prev, color1: e.hex }))} />
                        </Stack>
                    </>
                )
            case "color2":
                return (
                    <>
                        <Stack spacing={2}>
                            <Typography variant="subtitle1">
                                Secondary Color:
                            </Typography>
                            <TwitterPicker color={filters.color2} onChangeComplete={(e) => setFilters((prev) => ({ ...prev, color2: e.hex }))} />
                        </Stack>
                    </>
                )
            case "color3":
                return (
                    <>
                        <Stack spacing={2}>
                            <Typography variant="subtitle1">
                                Highlight:
                            </Typography>
                            <TwitterPicker color={filters.color3} onChangeComplete={(e) => setFilters((prev) => ({ ...prev, color3: e.hex }))} />
                        </Stack>
                    </>
                )
            
            case "continents":
                return(
                    <>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Continents</InputLabel>
                        <Select
                            labelId="Continents"
                            id="Continents"
                            value={filters.continents}
                            label="Continent"
                            onChange={onContinentChange}
                        >
                            {
                                continent.map((item) => {
                                    return (
                                        
                                            <MenuItem value={item}>{item}</MenuItem>
                                        
                                    )
                                })
                            }
                        </Select>
                        </FormControl>
                    
                    </>
                )

        }
    }
    
    return (
        <>
            <Box
                sx={{ width: 300, p: 1 }} role="presentation">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Typography variant="h6" sx={{ pl: 2, pt: 2, pb: 2 }}>
                        Filters
                    </Typography>
                    <Divider />
                    <List>
                        {filters &&
                            Object.keys(filters).map((key, index) => {
                                return (
                                    <>
                                        <ListItem key={index}>
                                            { returnInputType(key) }
                                        </ListItem>
                                    </>
                                )
                            })
                        }
                        {/* Added button at the bottom to click once the user selects the desired filters
                        so that once it's clicked, we can grab that info from the useState(s) we have with an onClick
                        
                        This is basically a prototype of what I have in mind, but the next step with this method is to figure
                        out a way to pass the info into the visualization file*/}
                        <ListItem key={"FilterClick"}>
                            <Button variant="contained" onClick={appendFilters}>Update</Button>
                        </ListItem>
                    </List>
                </LocalizationProvider>
            </Box>
        </>

    )
}