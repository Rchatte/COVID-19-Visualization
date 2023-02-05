import React, { useEffect, useState } from 'react'
import { CircularProgress } from "@mui/material";
import LineChartTotalCases from '../Visualizations/LineChartTotalCases';
import LineChartUSAFACTSTotalOverTime from '../Visualizations/LineChartUSAFACTSTotalOverTime';
import Treemap from '../Visualizations/TreeMap';

// Props: filters, chartType, 
const GeneralVisualTemplate = (props) => {


    const [data, setData] = useState(null);
    // If data changes dependiong on click from DisplayVisual then this will trigger rerender.
    // In part will update GraphType.
    useEffect(() => {
        console.log(props.data);
        setData(props.data);
    }, [props.data]);


    const GraphType = (props) => {
        switch(props.type){
            case "tree-map":
                return (
                    <Treemap url={data.link1} height={400} width={400} filters={data.filters}/>
                );
            default:
                return(
                    <CircularProgress />
                )
        }
    }

    return (
        <div>
            { data && <GraphType type={data.type} /> } 
        </div>
    )
}

export default GeneralVisualTemplate
