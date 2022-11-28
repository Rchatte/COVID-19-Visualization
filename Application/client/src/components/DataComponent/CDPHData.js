import React, { useState, useEffect} from 'react'
import { Grid, Button } from "@mui/material"
import Card from "../ContentComponent/Cards"
import ShowVisualization from './ShowVisualization';

import DonutChartCACasesByEthnicity from '../Visualizations/DonutChartCACasesByEthnicity';

const CDPHData = () => {
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
    const [visuals, setVisuals] = useState([
        // view section is a component which contains the visualization along with the button to return to the main viz cards
        // src section is the visualization component which goes to the card component to display a preview of the visualization
        {
        id: 1,
        src: <DonutChartCACasesByEthnicity  height={900} width={900} />,
        visualization: "Donut Chart",
        description: "California COVID-19 Cases by Race and Ethnicity"
        },
        {
        id: 2,
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
        visuals.map((visuals) => (
            <Grid item xs={6}>
                <Card setCardView={onButtonClick} image={visuals.src} body={visuals.description} title={visuals.visualization}/>
            </Grid>
        ))
        :
        // Else, go through the visuals and pass the visual to a component which will show the visual and include a button to return to the card view
        visuals.map((visuals) => (
            currentCard === visuals.visualization ?
            <Grid item xs={6}>
                {/* Send visualization to component which contains button to also close it */}
                <ShowVisualization close={handleClose} visual={visuals.src} />
            </Grid>
            : null
        ))
        }
    </Grid>
  )
}

export default CDPHData
