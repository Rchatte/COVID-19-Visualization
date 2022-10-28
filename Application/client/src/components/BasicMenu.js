
import React,{useState,useEffect} from 'react'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [current, setCurrent ] = useState("USA Facts");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (word) => {
    setAnchorEl(null);
    setCurrent(word);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
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
  );
}
