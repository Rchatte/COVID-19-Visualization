import VizCard from "./VizCard";

// We pass the visualizations and the width and height to test with
const VizCards = ({ visuals, imgMinWidth, imgMinHeight}) => {
  return (
    <>
    {/* This file maps all the visualizations into a visualization card component */}
      {visuals.map((visuals, index) =>(
        // visuals.link is temporary to show the images from the project folder
        <VizCard key={visuals.id} visual={visuals} link={visuals.link} imgMinWidth={imgMinWidth} imgMinHeight={imgMinHeight}/>
      ))}
    </>
  )
}

export default VizCards