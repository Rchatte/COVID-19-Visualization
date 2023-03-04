import React, { useState, useContext, createContext, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './components/FooterComponent/Footer';
import Homepage from './components/HomepageComponent/Homepage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GraphData from './components/DataComponent/GraphData';
import VisualizationDisplay from './components/VisualizationDisplay/VisualizationDisplay';
import Navbar from './components/NavbarComponent/Navbar';
import SourcesComponent from './components/SourcesComponent/SourcesComponent';
import CustomDashboard from './components/CustomDashboardComponent/CustomDashboard';
import AboutComponent from './components/AboutComponent/AboutComponent';
import SponsorsComponent from './components/SponsorsComponent/SponsorsComponent';
import DisplayVisual from "./components/DisplayVisual/DisplayVisual";
import Testing from './components/TestingComponent/Testing';

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

*/

export const DataContext = createContext();


function App() {

  const [currentData, setCurrentData] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [selectedGraphs, setSelectedGraphs] = useState([]);

  window.localStorage.setItem('selected-graphs', JSON.stringify(selectedGraphs));
  return (
    <div className="app">
      <Navbar />
      <DataContext.Provider value={{ currentData, setCurrentData, currentRegion, setCurrentRegion }}>
      <Router>
        <Routes>
            <Route exact path="/" element={<Homepage />}></Route>
            <Route exact path="/COVID-19-Visualization" element={<Homepage />}></Route>
            <Route exact path="/Visual" element={<DisplayVisual setSelectedGraphs={setSelectedGraphs}/>}></Route>
            <Route exact path="/CustomDashboard" element={<CustomDashboard selectedGraphs={selectedGraphs} />}></Route>
            <Route exact path="/About" element={<AboutComponent />}></Route>
            <Route exact path="/Sources" element={<SourcesComponent />}></Route>
            <Route exact path="/Sponsors" element={<SponsorsComponent />}></Route>
            <Route exact path="/Testing" element={<Testing />}></Route>
        </Routes>
      </Router>
      </DataContext.Provider> 

    </div>
  );
}

export default App;
