import logo from './logo.svg';
import './App.css';
import Footer from './components/FooterComponent/Footer';
import Navbar from './components/NavbarComponent/Navbar';
import Homepage from './components/HomepageComponent/Homepage';


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
-react-bootstrap bootstrap

*/



function App() {
  return (
    <>
        <div className="App">
            <Navbar />
            <Homepage />
            <Footer />
        </div>
    </>
  );
}

export default App;
