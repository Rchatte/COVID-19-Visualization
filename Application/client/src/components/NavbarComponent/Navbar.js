import React, { useState, useEffect, } from 'react';
import {
    Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem,
    ListItemText, Radio, RadioGroup, FormControlLabel, FormControl, Label, Checkbox,
    OutlinedInput, MenuItem, Select, InputLabel, Box, IconButton, Button
} from "@mui/material"
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import VizCardLayout from '../HomepageComponent/Components/VizCards/VizCardLayout';

export default function Navbar() {

    {
        /*  Nov 29, 2022
            This has been extracted from Homepage.js
            Navbar that our app.js serves in our app.js
        */
    }


    return (
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
                <Button color="inherit" onClick={() => window.location.href="/" } >Dashboard</Button>
                <Button color="inherit" onClick={() => window.location.href="/About"} >About</Button>
                <Button color="inherit" onClick={() => window.location.href="/Sources" }>Sources</Button>
                <Button color="inherit" onClick={() => window.location.href="/Sponsors" }>Sponsors</Button>
            </Toolbar>
            </AppBar>
        </Box>
            
        </>
    );
}
