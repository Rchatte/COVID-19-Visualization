import React, { Component, useState }  from 'react';
import {Button} from "@mui/material"

const ShowVisualization = (props) => {
    const handleButtonClose = () => {
        props.close(true);
    }
  return (
    <div>
        {/* Shows visualization */}
        {props.visual}
        {/* Button which will return back to the main card view */}
        <Button size="small" onClick={handleButtonClose}>Return to Visualizations</Button>
    </div>
  )
}

export default ShowVisualization
