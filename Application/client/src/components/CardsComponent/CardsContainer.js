import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material"
import Card from "../ContentComponent/Cards" // This is class
import GraphData from "../DataComponent/GraphData";
import img1 from "../images/WHO.png"
import img2 from "../images/USAFacts.png"
import img3 from "../images/CDC.png"
import img4 from "../images/CDPH.png"


export default function CardsContainer(props) {

    { /* Props passed in here should be the filter options */}

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

   
    return(
        <>
        { /* What this is doing is checking if changeCcontent is true or false.  */}
        { /* True: updates the current container view -> Show all graphs to user.  */}
        { /* False: Continue showing the grid of options to click from. */}

        { changeContent ? 
        
           (<GraphData close={handleClose} viz={currentCard}/>) : 
           <Grid 
            container
            rowSpacing={3}
            columnSpacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            >

                <Grid item xs={6}>
                        <Card
                            setCardView={onButtonClick}
                            image={img1}
                            body={"Visualizations from World Health Organization Data"}
                            title={"World Health Organization"} />
                </Grid>
                <Grid item xs={6}>
                        <Card
                            setCardView={onButtonClick}
                            image={img2}
                            body={"Visualizations from USA Facts Data"}
                            title={"USA Facts"} />
                </Grid>
                <Grid item xs={6}>
                        <Card setCardView={onButtonClick}
                            image={img3}
                            body={"Visualizations from CDC Data"}
                            title={"CDC"} />
                </Grid>
                <Grid item xs={6}>
                        <Card setCardView={onButtonClick}
                            image={img4} 
                            body={"Visualizations from California Department of Public Health Data"} title={"California Department of Public Health"} />
                </Grid>
            </Grid>
        }
        </>
    )
}