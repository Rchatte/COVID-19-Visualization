import { CircularProgress } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react'
import ShowVisualization from '../DataComponent/ShowVisualization';
import { DATA } from '../DataComponent/DataExports';

import LineChartUSAFACTSTotalOverTime from '../Visualizations/LineChartUSAFACTSTotalOverTime';

const GeneralFilteredVisualTemplate = (props) => {
    const checkGraphType = (graph) => {
        switch (graph.type) {
            case "line-chart-USA-FACTS-total-over-time":
                return <LineChartUSAFACTSTotalOverTime url={graph.link1} height={400} width={400} filters={graph.filters} />
        }
    }

    const showVisualization = () => {
        return checkGraphType(props.vizType);
    }
    return (
        <div>
            {
                props.vizType !== undefined ? showVisualization() : <CircularProgress />
            }
        </div>
    )
}

export default GeneralFilteredVisualTemplate
