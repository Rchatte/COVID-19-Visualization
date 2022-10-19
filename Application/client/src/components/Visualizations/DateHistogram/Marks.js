export const Marks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight,
  labelFormat
}) =>
  binnedData.map(d => (
    <rect
      className="mark"
      x={xScale(d.x0)}
      y={yScale(d.y)}
      width={xScale(d.x1) - xScale(d.x0)}
      height={innerHeight - yScale(d.y)}
    >
      <title>Total Confirmed Cases: {tooltipFormat(labelFormat(d.y).replace("G","M"))}</title>
    </rect>
  ));
