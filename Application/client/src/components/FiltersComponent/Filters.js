import React, { useEffect, useState } from "react";
import {
    Box, List, Drawer ,Divider, ListItemText,
    ListItemButton, ListItemIcon, ListItem
} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


export default function Filters(props) {

    const [filters, setFilters] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);



    useEffect(() => {

        setFilters(props.data);
        console.log(props.data);
        
    }, [props.data])

    const RenderList = () => {

        return (
            <Box
                sx={{ width: 250  }}
                role="presentation"

            >
                <List>
                    {
                        console.log(filters)
                    }
                </List>
                <Divider />

            </Box>
        );
    }


    return (
        <>
            <Drawer
                anchor={"left"}
                open={props.open}
                onClose={ () => console.log("Close Drawer") }
            >
                {
                    filters === null ? (null) : Object.keys(filters).map((key, index) => {
                        return (
                            <>
                                <p> { key } </p>
                            </>
                            )
                    })

                }
            </Drawer>
        </>
            
    )
}