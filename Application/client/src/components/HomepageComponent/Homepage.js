import React, { useEffect, useState } from "react"
import Navbar from '../NavbarComponent/Navbar';
import {
    Button, CardActionArea, CardActions, Typography, Box, Card, CardContent,
    CardMedia
} from "@mui/material"


export default function Homepage(){

    const [xAxis, setXaxis] = useState([]);
    const [yAxis, setYaxis] = useState([]);
    const [region, setRegion] = useState();


    { /* Functions are being passed to child component -> Navbar  */ }
    const handleXChange = (value) => {
        setXaxis(value)
    }
    const handleYChange = (value) => {
        setYaxis(value)
    }
    const handleRegionChange = (value) => {
        setRegion(value)
    }
    { /* End  */ }


    useEffect(() => {
        console.log(xAxis)
        console.log(yAxis)
        console.log(region)
    },[xAxis, yAxis, region])

    return(
        <>
            <Box sx={{ display: 'flex' }}>
                { /* Toolbar component is being imported from here.*/ }
                <Navbar handleXChangeParent={handleXChange} handleYChangeParent={handleYChange} handleRegionChangeParent={handleRegionChange} />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    { /* Luis Gonzalez 9/30/22 */}
                    { /* This is the main dashboard section of the webpage */}
                    { /* On changes to navbar, the values xAxis, yAxis, region are being updated and are ready to pass to children components.  */}
                    { /* Next step is to pass this data to Child Card Components and so on.... */}

                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                        </CardActions>
                    </Card>

                    <br/>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                        </CardActions>
                    </Card>
                
                </Box>
            </Box>

        </>
    )
}