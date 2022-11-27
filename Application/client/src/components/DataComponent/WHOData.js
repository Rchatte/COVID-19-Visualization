import React, { useState, useEffect}  from 'react'
import { Grid, Button } from "@mui/material"
import Card from "../ContentComponent/Cards"
import ShowVisualization from './ShowVisualization';

// visualization imports
import PieChartContinentVaccines from '../Visualizations/PieChartContinentVaccines';
import World_Map_Death_Cases from "../Visualizations/World_Map_Death_Cases";

const WHOData = () => {
    //------------------------------------------
    const [currentCard, setCurrentCard ] = useState('');
    const [changeContent, setChangeContent] = useState(false)


    // Updates the value to know which graph to pull from
    const onButtonClick = (value) => {
        setCurrentCard(value)
        setChangeContent(true)
    }
    
    const handleClose = () => {
        setChangeContent(false)
    }

    useEffect(() => {

    }, [currentCard])

    //----------------------------------------

    // Contains viz component with prop info such as viz type and description
    const [visuals2, setVisuals] = useState([
        {
            id: 1,
            src: <PieChartContinentVaccines  width="900" height="900"/>,
            visualization: "Donut Chart",
            description: "Total Continent Vaccinations Per 100 Thousand by WHO region"
        },
        {
            id: 2,
            src: <World_Map_Death_Cases/>,
            visualization: "World Map",
            description: "Total COVID-19 Deaths"
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

  return (
    <Grid 
    container
    rowSpacing={3}
    columnSpacing={2}
    direction="row"
    justifyContent="center"
    alignItems="center"
    >
        {/* If changeContent is not false, then display all the cards */}
        {
        !changeContent ?  
        visuals2.map((visuals) => (
            <Grid item xs={6}>
                <Card setCardView={onButtonClick} image={visuals.src} body={visuals.description} title={visuals.visualization}/>
            </Grid>
        ))
        :
        // Else, go through the visuals and show the visualization the card was clicked on
        visuals2.map((visuals) => (
            currentCard === visuals.visualization ?
            <Grid item xs={6}>
                {visuals.src}
            </Grid>
            : null
        ))
        }
    </Grid>
  )
}

export default WHOData
