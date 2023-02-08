import React, { useEffect } from "react";
// Import your graphs here. 
// If you want to create a different graph do it under /Visualizations then import here to test.
import TestingLineChart from "../Visualizations/TestingLinechart";



export default function Testing() {



    // For now we can use static variables to test things out.
    const data = {
        link1: "https....",

    }

    const filters = {
        startDate: '',
        endDate: '',
    }

    useEffect(() => {

    }, [])


    return(
        <>
            <TestingLineChart url={"url"} filters={"filters"}/>
        </>
    )
}