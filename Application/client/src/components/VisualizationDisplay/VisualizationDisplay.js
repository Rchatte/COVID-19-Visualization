import React, { useEffect, useState } from "react";
import {
    Paper, Container, Box, Card, Typography,
    Button, Drawer, CardContent, Grid, CardActions,
    CardMedia, CardActionArea, Stack,
    Divider, List, ListItemButton, ListItemText, ListItem, ButtonBase
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LineChartWithZoom from "../Visualizations/LineChartWithZoom";
import Treemap from "../Visualizations/TreeMap";



export default function VisualizationDisplay(props) {

    const [openNavigationBar, setOpenNavigationBar] = useState(false);
    const [data, setData] = useState({});
    const [filters, setFilters] = useState(null);
    const [visualState, setVisualState] = useState(null); 
    

    const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={() => setOpenNavigationBar(false) }
          onKeyDown={() => setOpenNavigationBar(false) }
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );

      useEffect(() => {
        console.log(props.data) // The entire json 
        setData(props.data);
        //setVisualState(props.visual); // 
        //setFilters(props.objectData);
      }, [])


      // Hold object of selected Visual
      // Type: 'graph-type'
      // Links: 'link to various sources'
      // Filters are then applied to charts

      const showVisualType = (data, filters) => {
        console.log(filters);
        switch (data.type) {
            case "line-chart":
                return <LineChartWithZoom url={data.link1} height={400} width={600} />
            case "tree-map":
                return <Treemap url={data.link1} height={400} width={600} />
            default:
                return null
        }
    }

    return(
        <> 
            <Box>
                <Drawer
                        anchor={"left"}
                        open={openNavigationBar}
                        onClose={() => setOpenNavigationBar(false) } 
                    >
                    {list("left")}
                </Drawer>


                <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={ () => setOpenNavigationBar(true) } >Show filters</Button>
                <Button variant="contained" onClick={ () => setOpenNavigationBar(true) } >Show filters</Button>
                <Button variant="contained" onClick={ () => setOpenNavigationBar(true) } >Show filters</Button>
                </Stack>
                <Container>

                        <Container>
                            {
                                data === null ? (null) :
                                (
                                    showVisualType(data, data.filters)
                                )
                            }
                        </Container>
                </Container>


            </Box>

        </>
    )
}