import VizCard from "./VizCard";

// We pass the visualizations and the width and height to test with
const VizCards = ({ visuals}) => {
  return (
    <>
    {/* This file maps all the visualizations into a visualization card component */}
      {visuals.map((visuals) =>(
        <VizCard key={visuals.id} visual={visuals}/>
      ))}
    </>
  )
}

export default VizCards