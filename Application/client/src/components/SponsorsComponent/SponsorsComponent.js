import React from "react";
import { Typography, Box, Container } from "@mui/material";
import csuperb from "../images/CSUPERBLogo.png";


export default function SponsorsComponent() {

    return (
        <>
<       Box sx={{ flexGrow: 1 }}>
            <Container>
            <Typography variant="h3" textAlign={"center"} paddingTop paddingBottom={2}>About Our Sponsors:</Typography>
            <img src={csuperb} alt='perb' class='center'/>
            <Typography variant="h5" textAlign={"center"} paddingTop>We are sponsored by the California State University
            Program for Education and Research in Biotechnology. Not only have they sponsored us, but they have also 
            given us the data we needed to accurately calibrate our machine learning program to help us with our research. </Typography>

            <Typography variant="h5" textAlign={"center"} paddingTop>
            Their mission statement is as follows, "The California 
            State University Program for Education and Research in Biotechnology (CSUPERB) mission is to develop a professional 
            biotechnology workforce by mobilizing and supporting collaborative CSU student and faculty research, innovating 
            educational practices, and partnering with the life science industry. CSUPERB provides seed grant funding, organizes 
            an annual biotechnology symposium, sponsors industry-responsive curriculum, and serves as a liaison for the CSU 
            with government, philanthropic, educational, and biotechnology industry partners. The program involves students 
            and faculty from Life, Physical, Computer and Clinical Science, Engineering, Agriculture, Math and Business 
            departments at all 23 CSU campuses."</Typography>

            <Typography variant="h5" textAlign={"center"} paddingTop paddingBottom={2}>We are proud to be sponsored by CSUPERB and thank them 
            for giving us the opportunity to grow and further our careers.</Typography>
            </Container>
        </Box>
        </>
    )
}