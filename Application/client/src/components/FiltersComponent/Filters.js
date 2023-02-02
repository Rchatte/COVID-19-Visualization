import React, { useEffect, useState } from "react";
import {
    Box, List, Drawer ,Divider, ListItemText,
    ListItemButton, ListItemIcon, ListItem, Typography, TextField, Stack
} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from "moment";
import { TwitterPicker, CirclePicker } from 'react-color'



export default function Filters(props) {

    const [filters, setFilters] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [ startDate, setStartDate] = useState(moment());
    const [ endDate, setEndDate] = useState(moment(Date()));
    const [filterData, setFilterData] = useState(filters);
    const [color1, setColor1] = useState({ h: 0, s: 0, v: 68, a: 1 });
    const [color2, setColor2] = useState({ h: 0, s: 0, v: 68, a: 1 });

    





    useEffect(() => {
        setFilters(props.data);
    }, [props.data])


    const handleChange = (newValue) => {
        setStartDate(newValue);
    };

    const returnInputType = (title) => {
        switch(title) {
            case "dateStart":
                return (
                    <>
                        <DesktopDatePicker
                        label="Start Date"
                        inputFormat="mm/dd/yyyy"
                        value={startDate}
                        onChange={(e) => setFilters() }
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </>
                )
            case "dateEnd": 
                return (
                    <>
                    <DesktopDatePicker
                        label="End Date"
                        inputFormat="mm/dd/yyyy"
                        value={endDate}
                        onChange={(e) => setEndDate(e) }
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
                            <TwitterPicker />
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
                        <TwitterPicker />
                    </Stack>
                </>
            )           

        }
    }

    const renderList = (list) => {

        return (
            <Box
                sx={{ width: 300, pl: 1.5  }}
                role="presentation"
            >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Typography variant="h5" sx={{ pl: 2, pt: 2, pb: 2}}>
                Filters
            </Typography>
            <Divider />
                <List>
                    {
                        Object.keys(list).map((key, index) => {
                            return (
                                <>
                                    <ListItem key={index}>
                                        { returnInputType(key) }

                                    </ListItem>
                                </>
                                )
                        })
                    }
                </List>
            </LocalizationProvider>
            </Box>
        );
    }


    return (
        <>
            {
                filters === null ? (null) : renderList(filters)
            }
        </>
            
    )
}