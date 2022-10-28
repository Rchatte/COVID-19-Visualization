import logo from './logo.svg';
import React, { useEffect, useState } from "react";

import './App.css';
import Footer from './components/FooterComponent/Footer';
import Row from './components/Row';
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

import img1 from "./components/images/one.png"
import img2 from "./components/images/two.png"
import img3 from "./components/images/three.png"
import img4 from "./components/images/four.png"
import bannerimg from "./components/images/WHO.png"

import LineChartWithZoom from './components/Visualizations/LineChartWithZoom';
import Treemap from './components/Visualizations/TreeMap';
import Thing from './components/Thing/Thing';
import Banner from './components/Banner';

function App() {


  const [changeContent, setChangeContent] = useState(false)


  // Updates the value to know which graph to pull from

  
  const handleClose = () => {
      setChangeContent(false)
  }

  const [arr1, setArr1 ] = useState([
    {
      id:1,
      image:img1,
      graph:<LineChartWithZoom height={400} width={800} />

    },
    {
      id:2,
      image:img2,
      graph:<Treemap close={handleClose} height={400} width={800} />

    },
    {
      id:3,
      image:img3,
      graph:<Thing image={img3}/>

    },
    {
      id:4,
      image:img4,
      graph:<Thing image={img4}/>
    },
    {
      id:5,
      image:img1,
      graph:<Thing image={img1}/>
    },
    {
      id:6,
      image:img2,
      graph:<Thing image={img2}/>
    },
    {
      id:7,
      image:img3,
      graph:<Thing image={img3}/>
    },
    {
      id:8,
      image:img4,
      graph:<Thing image={img4}/>
    }
  ]);




  const [arr2, setArr2 ] = useState([
    {
      id:1,
      image:img1,
      graph:<LineChartWithZoom height={400} width={800} />

    },
    {
      id:2,
      image:img2,
      graph:<Treemap close={handleClose} height={400} width={800} />

    }

  ]);




  return (
    <>
        <Banner image={bannerimg}/>
        <div className="App">
          <Row vis1= {arr1} vis2= {arr2}/>
          <p>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
          </p>
        </div>
    </>
  );
}

export default App;
///Users/juan/Downloads/COVID-19-Visualization-GUI-2/Application/client/src/components/images/USAFacts.png





