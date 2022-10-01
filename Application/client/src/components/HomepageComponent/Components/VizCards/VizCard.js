import React from "react";
import {
  Button, CardActionArea, CardActions, Typography, Box, Card, CardContent,
  CardMedia
} from "@mui/material"
import { borders } from '@mui/system';

// Function to show the full size image to test showing a full sized visualization
function changeViz(link){
    var img = document.querySelector(".testImg");
    img.setAttribute("src", link);
}

// This is the visualization card component which contains the small visualization preview
// with the option to click on it to fully show it
const VizCard = ({ visual, imgMinWidth, imgMinHeight}) => {

  return (
    <Card variant="outlined" sx={{ maxWidth: 345, mb: 4, mt: 6, borderRadius: 1 , borderColor: 'text.primary', backgroundColor: "lightgrey"}} onClick={() => changeViz(visual.link)}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="250"
                image={visual.link}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {visual.viz}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {visual.desc}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default VizCard