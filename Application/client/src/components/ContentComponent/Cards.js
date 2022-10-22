import React, { useState } from "react";
import { Grid, Card, Typography, Button, CardContent, CardActions, CardMedia } from "@mui/material"


export default function Cards({setCardView, title, image, body}) {

    { /* Template, passing in title, body, image and later on we will configure the button actions */}

    const handleButtonClick = () => {
        var t = title
        setCardView(t)
    }
    console.log(typeof(image))
    return(
        <>
            <Card>
                {/* Checks if image type is a string and if so, it will show cardmedia which is one 
                of the logos of our data sources */}
                {typeof(image) === 'string' ?
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={image}
                />
                :
                // if it's not a string type, then it is our visualization component
                <div>
                    {image}
                </div>
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleButtonClick}>Open</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </>
    )
}