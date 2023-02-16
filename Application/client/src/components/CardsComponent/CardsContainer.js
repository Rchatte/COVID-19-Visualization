import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, CardActions,CardMedia, CardActionArea } from "@mui/material"
import GraphData from "../DataComponent/GraphData";

import { DATA } from "../DataComponent/DataExports.js";
import { DataContext } from "../../App";


export default function CardsContainer(props) {

    const { setCurrentData } = useContext(DataContext);
    const navigate = useNavigate();


    const onButtonClick = (value, e) => {
        e.preventDefault();
        console.log(value);
        setCurrentData(value)
        navigate('/Visual');
    }   
    return(
        <>     
           <Grid 
            sx={{ p: 2}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
            >

                {
                    DATA.map((item, i) => (
                        <Grid item xs={2} sm={4} md={4} key={i}>
                            <Card sx={{ height: '100%' }} onClick={(e) => onButtonClick(item, e)}>
                                <CardActionArea>
                                <CardMedia
                                    sx={{ height: 160 }}
                                    image={item.cover_image}
                                    title="green iguana"
                                />
                                <CardContent>

                                    <Typography variant="subtitle1" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
                                        {item.source}
                                    </Typography>

                                </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                }
                </Grid>        
        </>
    )
}