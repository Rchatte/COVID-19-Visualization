import React, { useState } from "react" 
import VizCards from "./VizCards";
import {
  Button, CardActionArea, CardActions, Typography, Box, Card, CardContent,
  CardMedia
} from "@mui/material"
import {route, Switch} from 'react-router-dom';
import Grid from '@mui/material/Grid';

// Vizualisation imports
import LineChartWithZoom from "../../../Visualizations/LineChartWithZoom";
   
const VizCardLayout = () => {
  // Starting visualization cards
  // For now all of them are the line chart but once we get more graphs, we can replace some with those
  // NOTE: for the other src ones, replace them with other graph components once we get those
  const [visuals, setVisuals] = useState([
      {
      id: 1,
      src: <LineChartWithZoom height={500} width={800}/>,
      visualization: "Line Chart",
      description: "U.S COVID-19 deaths since 2020"
      },
      {
      id: 1,
      src: "A visualization",
      visualization: "A Visualization Type",
      description: "A Description"
      },
      {
      id: 3,
      src: "A visualization",
      visualization: "A Visualization Type",
      description: "A Description"
      },
      {
      id: 4,
      src: "A visualization",
      visualization: "A Visualization Type",
      description: "A Description"
      },
  ]); 

  // Used for when a card gets clicked on, the cards disappear and the main visualization of the selected card shows up
  // the default view is all the cards
  const [currentVisual, setCurrentVisual] = useState('home');
  const changeVisualization = (visual) =>{
    setCurrentVisual(visual); // changes to the selected visual
  }
  // split the visuals in half to show them evenly column by column
  var middle = Math.floor(visuals.length / 2);
  var leftVisuals = visuals.slice(0, middle);
  var rightVisuals = visuals.slice(middle); 

  return (
    // By using the mui grid layout, it gives the cards a nice layout
    <>
      {/* Checks if the currentVisual is set to default then it will show the default card view. If not, it'll show the visualization the user clicks on */}
      {currentVisual === 'home' ? 
      <Grid container spacing={0}>
        <Grid item xs={6}>
          {/* First half of the visuals */}
          <VizCards visuals={leftVisuals} changeVisualization={changeVisualization}/> 
        </Grid>
        <Grid item xs={6}>
          {/* Second half of the visuals */}
          <VizCards visuals={rightVisuals} changeVisualization={changeVisualization}/>
        </Grid>
      </Grid>
      :
      currentVisual
      }
    </>
  )
}

export default VizCardLayout
