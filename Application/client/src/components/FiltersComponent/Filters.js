import React, { useEffect, useState } from "react";
import {
    Box, List, Drawer, Divider, ListItemText,
    ListItemButton, ListItemIcon, ListItem, Typography, TextField, Stack, Button
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

    // Depending on the filters associated with the chart click
    useEffect(() => {
        setFilters(props.data);
    }, [props.data]);

    const appendFilters = () => {
        console.log(filters);
        props.setNewFilters(filters)
        props.closeFilters(false); // Close filters to show new visual.
    }

    const returnInputType = (title) => {
        switch (title) {
            case "dateStart":
                return (
                    <>
                        <DesktopDatePicker
                            label="Start Date"
                            value={filters.startDate}
                            onChange={(e) => setFilters((prev) => ({ ...prev, startDate: moment(e) }))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </>
                )
            case "dateEnd":
                return (
                    <>
                        <DesktopDatePicker
                            label="End Date"
                            value={filters.endDate}
                            onChange={(e) => setFilters((prev) => ({ ...prev, endDate: moment(e) }))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </>
                )
            case "color1":
                return (
                    <>
                        <Stack spacing={2}>
                            <Typography variant="subtitle1">
                                Color 1:
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
                                Color 2:
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
                                Color 3:
                            </Typography>
                            <TwitterPicker color={filters.color3} onChangeComplete={(e) => setFilters((prev) => ({ ...prev, color3: e.hex }))} />
                        </Stack>
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
                            <Button variant="contained" onClick={appendFilters}>Filter</Button>
                        </ListItem>
                    </List>
                </LocalizationProvider>
            </Box>
        </>

    )
}