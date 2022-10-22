import React, { useState, useEffect}  from 'react'
import { Grid, Button } from "@mui/material"
import Card from "../ContentComponent/Cards"

const CDCData = () => {
    //------------------------------------------
    const [currentCard, setCurrentCard ] = useState('');
    const [changeContent, setChangeContent] = useState(false)


    // Updates the value to know which graph to pull from
    const onButtonClick = (value) => {
        setCurrentCard(value)
        setChangeContent(true) 
        console.log(value)
    }
    
    const handleClose = () => {
        setChangeContent(false)
    }

    useEffect(() => {
        console.log("Change is being performed");
    }, [currentCard])

    //----------------------------------------

    // Contains viz component with prop info such as viz type and description
    const [visuals2, setVisuals] = useState([
        {
        id: 1,
        src: "A visualization",
        visualization: "A Visualization Type",
        description: "A Description"
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

export default CDCData
