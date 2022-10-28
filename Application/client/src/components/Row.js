import React,{useState,useEffect} from 'react'
import "./Row.css";
import Thing from './Thing/Thing';
import BasicMenu from './BasicMenu';






import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
function Row({vis1,vis2}) {


const [mainArr, setMainArr ] = useState(vis1);


  const [mainVisuaul, setMainVisuaul ] = useState(mainArr[0]);

    
    const handleClick = (visualization) => {
        setMainVisuaul(visualization)
    }







    const [anchorEl, setAnchorEl] = React.useState(null);
    const [current, setCurrent ] = useState("USA Facts");
    const open = Boolean(anchorEl);
    const handleClick2 = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (word) => {
      setAnchorEl(null);
      setCurrent(word);
      if (word == "CDC"){
        setMainArr(vis2)
      }
      if (word == "USA Facts"){
        setMainArr(vis1)
      }
    };
    return (

        





        <div>

            {/* <Thing image={mainVisuaul}/> */}
            <div className="display">
            {mainVisuaul.graph}
            </div>


            


            <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick2}
      >
        {current}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() =>handleClose(current)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() =>handleClose("USA Facts")}>USA Facts</MenuItem>
        <MenuItem onClick={() =>handleClose("World Health Organization")}>World Health Organization</MenuItem>
        <MenuItem onClick={() =>handleClose("CDC")}>CDC</MenuItem>
        <MenuItem onClick={() =>handleClose("California Department of Public Health")}>California Department of Public Health</MenuItem>
      </Menu>
    </div>



















            <div className="row">
                <h2>{"hello"}</h2>

                <div className="row__posters">


                    {mainArr.map(visualization =>(
                        //<Thing onClick = {() => handleClick(visualization)} className = {"row__poster"} image={visualization}/>
                        <img 
                        key={visualization.id} 
                        onClick = {() => handleClick(visualization)}
                        className ={"row__poster"} 
                        src={visualization.image} 
                        alt={visualization}/>   

                    ))}
                </div>

            </div>
        </div>


    )
}

export default Row

