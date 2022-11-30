import { Typography, Container, Box } from "@mui/material";
import React from "react";


export default function AboutComponent(props) {

    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography variant="subtitle1">About Page</Typography>
            </Container>
        </Box>
        </>
    )
}