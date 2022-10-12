import logo from './logo.svg';
import './App.css';
import Navbar from './components/NavbarComponent/Navbar';
import Footer from './components/FooterComponent/Footer';
import Homepage from './components/HomepageComponent/Homepage';
import React, { useEffect, useState } from "react";
import {Route, Routes, Router} from "react-router-dom";
import {Box} from "@mui/material";
import VizCardLayout from './components/HomepageComponent/Components/VizCards/VizCardLayout';
import LineChart from './components/LineChart';


/* Folder structure is divided as follows: client (Front end) and server (Backend) */
/* We might not need a backend so ignore for now. */

/*  Note the way we create components and add them to our this page APP.  */
/*  Generally, this is the way we can create and work on components seperatly. */
/*  To add new component, create file with TitleComponent and inside create a page called Title.js inside each component we can also add CSS page.*/


/*
Packages added so far: (NPM)
-@mui/material 
-@emotion/react 
-@emotion/styled
-@mui/icons-material 9/30/2022
-react-bootstrap bootstrap
-react-router-dom
*/



function App() {
  const [xAxis, setXaxis] = useState([]);
  const [yAxis, setYaxis] = useState([]);
  const [region, setRegion] = useState();

  { /* Functions are being passed to child component -> Navbar  */ }
  const handleXChange = (value) => {
      setXaxis(value)
  }
  const handleYChange = (value) => {
      setYaxis(value)
  }
  const handleRegionChange = (value) => {
      setRegion(value)
  }
  { /* End  */ }


  useEffect(() => {
      console.log(xAxis)
      console.log(yAxis)
      console.log(region)
  },[xAxis, yAxis, region])


  return (
    <>
      <div className='App'>
      <Box sx={{display: 'flex'}}>
        <Navbar handleXChangeParent={handleXChange} handleYChangeParent={handleYChange} handleRegionChangeParent={handleRegionChange} sticky="top"/>
        <Routes>
          <Route path="/COVID-19-Visualization" element={<Homepage/>}/>
          <Route path="/LineChart" element={<LineChart/>}/>
        </Routes>
      </Box>
      </div>
        {/* <div className="App">
            <Homepage />
        </div> */}
    </>
  );
}

export default App;
