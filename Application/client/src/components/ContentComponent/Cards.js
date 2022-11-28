import React, { useState } from "react";
import { Grid, Card, Typography, Button, CardContent, CardActions, CardActionArea, CardMedia } from "@mui/material"


export default function Cards({setCardView, title, image, body}) {

    { /* Template, passing in title, body, image and later on we will configure the button actions */}

    const handleButtonClick = () => {
        var t = title
        setCardView(t)
    }
    return(
        <>
            <Card onClick={handleButtonClick}>
                {/* Checks if image type is a string and if so, it will show cardmedia which is one 
                of the logos of our data sources */}
                <CardActionArea>
                {typeof(image) === 'string' ?
                <CardMedia
                    component="img"
                    height="170"
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
                    <Typography variant="h5" component="div">
                        {title}
                        </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {body}
                    </Typography>

                    </CardContent>
                </CardActionArea>

            </Card>
        </>
    )
}