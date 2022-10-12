import React from 'react';
import {Box} from "@mui/material";
import LineChartWithZoom from './Visualizations/LineChartWithZoom';
import Grid from '@mui/material/Grid';

const LineChart = () => {
    var lineChartWidth = 1000;
    var lineChartHeight = 500;
  return (
    <Box
    component="main"
    sx={{ flexGrow: 1, bgcolor: 'background.default', pt: 10 }}
    >
        <Grid container>
            <Grid item xs={12}>
                <LineChartWithZoom height={lineChartHeight} width={lineChartWidth}/>
            </Grid>
        </Grid>
    </Box>
  )
}

export default LineChart
