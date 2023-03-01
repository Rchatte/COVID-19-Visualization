import { Typography, Container, Box } from "@mui/material";
import React from "react";
import Carousel, { CarouselItem } from "./Carousel";


export default function AboutComponent(props) {

    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography variant="h3" textAlign={"center"} paddingTop>About Us:</Typography>
                <Typography variant="h6" textAlign={"center"}>We are a group 
                consisting of undergraduate, senior-level students 
                whose primary goal is to observe all aspects of COVID-19 
                cases to discover hidden correlations between 
                medical/non-medical factors and their severity.</Typography>

                {/* To-do: 
                    Insert group Images and have them be clickable to showcase
                    member and bio.
                    Move buttons to be arrows on the sides of the display to make
                    it look modern.
                    

                */}
                <div className="Members">
                    <Carousel>
                        <CarouselItem>Professor</CarouselItem>
                        <CarouselItem>Group Member 1</CarouselItem>
                        <CarouselItem>Group Member 2</CarouselItem>
                        <CarouselItem>Group Member 3</CarouselItem>
                        <CarouselItem>Group Member 4</CarouselItem>
                        <CarouselItem>Group Member 5</CarouselItem>
                        <CarouselItem>Group Member 6</CarouselItem>
                        <CarouselItem>Group Member 7</CarouselItem>
                        <CarouselItem>Group Member 8</CarouselItem>
                        <CarouselItem>Group Member 9</CarouselItem>
                        <CarouselItem>Group Member 10</CarouselItem>
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
                <Typography variant="h6">Machine Learning was used to primarily focus on patients' comorbidity 
                and genetic factors in relation to their illness and severity of COVID-19. (I believe there was 
                a discussion of using logistic regression to study these correlations so a note is left here 
                to include later on) (Also include use of Boruta algorithm as being the main method of use)</Typography>

                <Typography variant="h4" paddingTop textAlign={"center"}>About Our Sponsors:</Typography>
                <Typography variant="h6" textAlign={"center"}>(Fill in)</Typography>

                <Typography variant="h4" paddingTop textAlign={"center"}>Gathered Sources:</Typography>
                <Typography variant="h6" textAlign={"center"}>(Fill in)</Typography>

            </Container>
        </Box>
        </>
    )
}