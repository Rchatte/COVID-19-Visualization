import logo from './logo.svg';
import './App.css';
import Footer from './components/FooterComponent/Footer';
import Homepage from './components/HomepageComponent/Homepage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GraphData from './components/DataComponent/GraphData';
import VisualizationDisplay from './components/VisualizationDisplay/VisualizationDisplay';
import Navbar from './components/NavbarComponent/Navbar';
import SourcesComponent from './components/SourcesComponent/SourcesComponent';
import AboutComponent from './components/AboutComponent/AboutComponent';
import SponsorsComponent from './components/SponsorsComponent/SponsorsComponent';

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


/*
  Nov 29 2022: 
  About page
  Sources page 
  Sponsor page 

  All have been added and ready to work on.



*/



function App() {
  return (
    <div className="app">
      { /* Navbar has been added in the form of a component. So all routes will include the navbar. Nov 29, 2022 */ }
      <Navbar/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage/>}></Route>  
          <Route exact path="/About" element={<AboutComponent/>}></Route>  
          <Route exact path="/Sources" element={<SourcesComponent/>}></Route>  
          <Route exact path="/Sponsors" element={<SponsorsComponent/>}></Route>  
        </Routes>
      </Router>
   </div>
  );
}

export default App;
