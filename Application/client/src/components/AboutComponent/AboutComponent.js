import { Typography, Container, Box } from "@mui/material";
import React from "react";
import Carousel, { CarouselItem } from "./Carousel";

import amini from "../images/Amini.png"
import carlos from "../images/CarlosHernandez.png"
import chen from "../images/Chen_Ching.png"
import emily from "../images/Emily.png"
import francisco from "../images/Francisco.png"
import jimuel from "../images/Jimuel.png"
import juan from "../images/Juan.png"
import luis from "../images/Luis.png"
import riese from "../images/Riese.png"
import rohan from "../images/Rohan_Chatterjee.jpg"
import ting from "../images/Ting_Fung.png"

export default function AboutComponent(props) {

    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography variant="h3" textAlign={"center"} paddingTop>About Us:</Typography>
                <Typography variant="h6" textAlign={"center"} paddingBottom={3}>We are a group 
                consisting of undergraduate, senior-level students 
                whose primary goal is to observe all aspects of COVID-19 
                cases to discover hidden correlations between 
                medical/non-medical factors and their severity.</Typography>

                <div className="Members">
                    <Carousel>
                        <CarouselItem><div class='carouselContainer'>
                        <img src={amini} height="200" width="200" alt='Navid Amini' class='margins'/>
                        <Typography variant="h6">Doctor Navid Amini <br />
                        Dr Navid Amini is our advisor for this project and we are grateful and thank him for aiding us <br />
                        throughout the project.</Typography>
                        </div></CarouselItem>

                        <CarouselItem><div class='carouselContainer'>
                        <img src={rohan} height="200" width="200" alt='Rohan Chatterjee' class='margins'/>
                        <Typography variant="h6">Rohan Chatterjee (22), Project Lead <br />
                        Plans After Graduation: Plans to get a PhD and work in research related to the use of Computer <br />
                        Science in the Medical Field.</Typography>
                        </div></CarouselItem>

                        <CarouselItem><div class='carouselContainer'>
                        <img src={juan} height="200" width="200" alt='Juan Hernandez' class='margins'/>
                        <Typography variant="h6">Juan Hernandez (25), Tableau/Machine Learning Teams <br />
                        Plans After Graduation: Plans to work full-time as a back-end software engineer.</Typography>
                        </div></CarouselItem>

                        <CarouselItem><div class='carouselContainer'>
                        <img src={francisco} height="200" width="200" alt='Francisco Contreras' class='margins'/>
                        <Typography variant="h6">Francisco Contreras (21), JavaScript Application Team <br />
                        Plans After Graduation: Plans to work full-time or part-time as a software engineer.</Typography>
                        </div></CarouselItem>

                        <CarouselItem><div class='carouselContainer'>
                        <img src={jimuel} height="200" width="200" alt='Jimuel Cedrick Julaton' class='margins'/>
                        <Typography variant="h6">Jimuel Cedrick Julaton (22), Tableau/JavaScript Application Teams <br />
                        Plans After Graduation: Plans to work full-time as a software engineer.</Typography>
                        </div></CarouselItem>

                        <CarouselItem><div class='carouselContainer'>
                        <img src={chen} height="200" width="200" alt='Chen-Ching Lin' class='margins'/>
                        <Typography variant="h6">Chen-Ching Lin (25), Tableau/JavaScript Application Teams <br />
                        Plans After Graduation: Plans to work full-time as a software engineer.</Typography>
                        </div></CarouselItem>

                        <CarouselItem><div class='carouselContainer'>
                        <img src={carlos} height="200" width="200" alt='Carlos Alberto Hernandez' class='margins'/>
                        <Typography variant="h6">Carlos Alberto Hernandez (24), JavaScript Application <br />
                        Plans After Graduation: Plans to apply to the EMT course at USLA and eventually become a <br />
                        paramedic.</Typography>
                        </div></CarouselItem>

                        <CarouselItem><div class='carouselContainer'>
                        <img src={riese} height="200" width="200" alt='Riese Atianzar' class='margins'/>
                        <Typography variant="h6">Riese Atianzar (23), JavaScript Application <br />
                        Plans After Graduation: Plans to work full-time as a back-end software engineer.</Typography>
                        </div></CarouselItem>

                        <CarouselItem><div class='carouselContainer'>
                        <img src={emily} height="200" width="200" alt='Emily Gonzalez' class='margins'/>
                        <Typography variant="h6">Emily Gonzalez (23), Tableau/JavaScript Application <br />
                        Plans After Graduation: Plans to work full-time as a software engineer.</Typography>
                        </div></CarouselItem>

                        <CarouselItem><div class='carouselContainer'>
                        <img src={luis} height="200" width="200" alt='Luis Gonzales' class='margins'/>
                        <Typography variant="h6">Luiz Gonzales (26), JavaScript Application <br />
                        Plans After Graduation: Plans to work full-time as a developer for his own online <br />
                        business.</Typography>
                        </div></CarouselItem>

                        <CarouselItem><div class='carouselContainer'>
                        <img src={ting} height="200" width="200" alt='Ting Fung Ha' class='margins'/>
                        <Typography variant="h6">Ting Fung Ha (--), -- <br />
                        Plans After Graduation: --</Typography>
                        </div></CarouselItem>

                    </Carousel>
                </div>
                
                <Typography variant="h4" paddingTop>Tableau Information:</Typography>
                <Typography variant="h6">The purpose of the Tableau 
                Portal is to create multiple, simply designed, visualizations and experiment 
                with them to help determine which aspects of COVID have hidden, relevant, 
                correlations that we can display in chart forms on our JavaScript Application.</Typography>
                
                <Typography variant="h4" paddingTop textAlign={"right"}>JavaScript Application Information:</Typography>
                <Typography variant="h6" textAlign={"right"}>A JavaScript Application was implemented 
                to acquire greater efficiency when traversing our data with more straightforward navigation 
                and increased interactivity with each correlation chart. This application is designed to 
                be used alongside the Tableau Portal because of some of the drawbacks that Tableau has, 
                such as the low accessibility and high data usage that Tableau requires.</Typography>

                <Typography variant="h4" paddingTop>Machine Learning Information:</Typography>
                <Typography variant="h6" paddingBottom={3}>Machine Learning was used to primarily focus on patients' comorbidity 
                and genetic factors in relation to their illness and severity of COVID-19. (I believe there was 
                a discussion of using logistic regression to study these correlations so a note is left here 
                to include later on) (Also include use of Boruta algorithm as being the main method of use)</Typography>
            </Container>
        </Box>
        </>
    )
}