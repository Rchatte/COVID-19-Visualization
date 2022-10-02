import React, { useState } from "react" 
import VizCards from "./VizCards";
import Grid from '@mui/material/Grid';

   
const VizCardLayout = () => {
    const [showCards, setShowCards] = useState(true); // useState to show and hide viz cards
    // variables to set the size of the images as a placeholder for the visualizations
    const imgMinWidth = 250;
    const imgMinHeight =  150;

    var imgShown = true;

    // Testers for the visualization cards
    const [visuals, setVisuals] = useState([
        {
        id: 1,
        link: 'images\\horizontal-bars-confirmed-cases-in-us-states.png',
        viz: 'Horizontal Bars',
        desc: 'Cases in U.S States',
        },
        {
        id: 2,
        link: 'images\\map-highest-us-cases-counties.png',
        viz: 'Map',
        desc: 'U.S Confirmed cases',
        },
        {
        id: 3,
        link: 'images\\map-highest-confirmed-cases-globally.png',
        viz: 'Map',
        desc: 'Global Confirmed Cases',
        },
        {
        id: 4,
        link: 'images\\map-confirmed-recoveries-globally.png',
        viz: 'Map',
        desc: 'Global Confirmed Recoveries',
        },
    ]);
    
  return (
    // By using the mui grid layout, it gives the cards a nice layout
    <>
      <Grid container>
        {/* First grid item conntains first 2 cards */}
        <Grid item xs={6}>
            <VizCards visuals={visuals.slice(0, 1 + 1)}/>   
        </Grid>
        {/* Second grid item contains last 2 cards */}
        <Grid item xs={6}>
            <VizCards visuals={visuals.slice(2, 3 + 1)}/>   
        </Grid>
        <Grid item xs={12}>
          <span><img className="testImg"></img></span>
        </Grid> 
      </Grid>
    </>
  )
}

export default VizCardLayout
