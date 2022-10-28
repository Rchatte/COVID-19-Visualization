import React from 'react';
import {makeStyles,Card,Typography,Button,CardMedia,CardContent,CardActions,CardActionArea} from "@mui/material"

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });




export default function Thing({image}) {
    //const classes = useStyles();

  return (
    <div>
        <Card >
        <CardActionArea>
            <CardMedia
            component="img"
            image={image}
            title="Contemplative Reptilessss"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Lizardsss
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
        </Card>
    </div>
  );
}

