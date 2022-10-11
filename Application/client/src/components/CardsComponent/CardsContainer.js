import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material"
import Card from "../ContentComponent/Cards" // This is class
import GraphData from "../DataComponent/GraphData";
import img1 from "../images/WHO.png"


export default function CardsContainer(props) {

    { /* Props passed in here should be the filter options */}

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


    return(
        <>
        { /* What this is doing is checking if changeCcontent is true or false.  */}
        { /* True: updates the current container view -> Show all graphs to user.  */}
        { /* False: Continue showing the grid of options to click from. */}


        { changeContent ? (<GraphData close={handleClose}/>) : 
           <Grid 
           container
           rowSpacing={3}
           columnSpacing={2}
           direction="row"
           justifyContent="center"
           alignItems="center"
           >
                <Grid item xs={6}>
                    <Card setCardView={onButtonClick} image={img1} body={"Body message goes here"} title={"Title"} />
                </Grid>
                <Grid item xs={6}>
                <   Card setCardView={onButtonClick}  image={img1} body={"Body message goes here"} title={"Title"} />
                </Grid>
                <Grid item xs={6}>
                    <Card setCardView={onButtonClick}  image={img1} body={"Body message goes here"} title={"Title"} />
                </Grid>
                <Grid item xs={6}>
                    <Card setCardView={onButtonClick}  image={img1} body={"Body message goes here"} title={"Title"} />
                </Grid>
            </Grid>
        }
        </>
    )
}