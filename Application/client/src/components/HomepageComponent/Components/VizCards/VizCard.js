import React from "react";
import {
  Button, CardActionArea, CardActions, Typography, Box, Card, CardContent,
  CardMedia
} from "@mui/material"
import { borders } from '@mui/system';

// This is the visualization card component which contains the small visualization preview
// with the option to click on it to fully show it
const VizCard = ({ visual }) => {

  return (
    <Card variant="outlined" sx={{ maxWidth: 500, mb: 4, mt: 6, borderRadius: 1 , borderColor: 'text.primary', backgroundColor: "lightgrey"}}>
        <CardActionArea>
            {visual.src}
            <Typography gutterBottom variant="h5" component="div">
                {visual.visualization}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {visual.description}
            </Typography>
        </CardActionArea>
    </Card>
  )
}

export default VizCard