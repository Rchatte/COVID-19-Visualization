import VizCard from "./VizCard";
import {
  Button, CardActionArea, CardActions, Typography, Box, Card, CardContent,
  CardMedia
} from "@mui/material"
import { borders } from '@mui/system';
import LineChartWithZoom from "../../../Visualizations/LineChartWithZoom";

// We pass the visualizations and the width and height to test with
const VizCards = ({ visuals, changeVisualization}) => {
  return (
    <>
    {/* This file maps all the visualizations into a visualization card component */}
      {visuals.map((visuals) =>(
        // <VizCard key={visuals.id} visual={visuals} changeCurrentVisualization={changeCurrentVisualization}/>
        <Card variant="outlined" sx={{ maxWidth: 700, m: 6, borderRadius: 1 , borderColor: 'text.primary', backgroundColor: "lightgrey"}} className="card" onClick={() => changeVisualization(visuals.src)}>
        <CardActionArea>
            {visuals.src}
            <Typography gutterBottom variant="h5" component="div">
                {visuals.visualization}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {visuals.description}
            </Typography>
        </CardActionArea>
        </Card>
      ))}
    </>
  )
}

export default VizCards