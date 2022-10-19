import {
  scaleLinear,
  scaleTime,
  max,
  format,
  timeFormat,
  extent,
  histogram as bin,
  timeMonths,
  sum
} from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const margin = { top: 50, right: 40, bottom: 20, left: 100 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 40;

const DateHistogram = ({data, width, height }) => {
  const xValue = d => d['Date_reported'];
  const xAxisLabel = 'Time';

  const yValue = d => d['Cumulative_cases'];
  const yAxisLabel = 'Total Confirmed Cases';

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xAxisTickFormat = timeFormat('%m/%d/%Y');
  const yAxisTickFormat = format(".2s");

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map(array => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0]);

  return (
    <>
      <h3>Global Total Confirmed Cases</h3>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill='white'/>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={5}
          />
          <text
            className="axis-label"
            textAnchor="middle"
            transform={`translate(${-yAxisLabelOffset},${innerHeight /
              2}) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} tickFormat={yAxisTickFormat}/>
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <Marks
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            tooltipFormat={d => d}
            circleRadius={2}
            innerHeight={innerHeight}
            labelFormat={yAxisTickFormat}
          />
        </g>
      </svg>
    </>
  );
};

export default DateHistogram