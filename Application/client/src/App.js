import logo from './logo.svg';
import './App.css';
import Footer from './components/FooterComponent/Footer';
import Homepage from './components/HomepageComponent/Homepage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GraphData from './components/DataComponent/GraphData';
import VisualizationDisplay from './components/VisualizationDisplay/VisualizationDisplay';


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



function App() {
  return (
    <div className="app">
      <Homepage/>
   </div>
  );
}

export default App;
