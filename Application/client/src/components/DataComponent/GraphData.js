import React, { useState } from "react";
import { Paper, Container , Box, Card, Typography, Button, CardContent, CardActions, CardMedia } from "@mui/material"


export default function GraphData({close}) {

    { /* Gather all data needed to complete the graph? */}
    { /* Button to close */}

    const handleButtonClose = () => {
        close(true)
    }

    return(
        <>
            <Paper elevation={2}>
                <Container>
                    <h2>All info on charts</h2>
                    <Button size="small" onClick={handleButtonClose}>Close</Button>
                </Container>
            </Paper>
        </>
    )
}