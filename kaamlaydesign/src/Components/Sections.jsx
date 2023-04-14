// import React from 'react'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import {  Button } from '@mui/material';
// import { Box, Stack } from '@mui/system';
// import CardActions from '@mui/material/CardActions';
// import DoorStepServiceImage from '../Assets/Untitled-2.svg';

// const Sections = () => {
//   return (
//     <>
//     <Box sx={{
//         padding:"100px",
//         backgroundColor:"white",
//         //backgroundColor:"#ff5722",
//         display:'flex',
//         justifyContent:"center"

//     }}>

//     <Stack direction="row" spacing={6}>
//     <Card sx={{ maxWidth: 345 , border:"1px solid #ff5722", padding:"20px", color:"#ff5722" }}>
//       <CardMedia
//         component="img"
//         alt="green iguana"

//         image={DoorStepServiceImage}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div" sx={{color:"#ff5722"}}>
//           Cleaning Services
//         </Typography>
//         <Typography variant="body2" color="#ff5722">
//           Kaam lay provides vairety of cleaning services at your doorstep
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Share</Button>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//     <Card sx={{ maxWidth: 345 , border:"1px solid #ff5722" , padding:"20px" }}>
//       <CardMedia
//         component="img"
//         alt="green iguana"

//         image={DoorStepServiceImage}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Plumbing Services
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Kaam lay provides vairety of plumbing services at your doorstep
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Share</Button>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//     <Card sx={{ maxWidth: 345 , border:"1px solid #ff5722", padding:"20px"}}>
//       <CardMedia
//         component="img"
//         alt="green iguana"

//         image={DoorStepServiceImage}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Carpenting Services
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Kaam lay provides vairety of carpenting services at your doorstep
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Share</Button>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//       </Stack>
//   </Box>
//   </>
//   )
// }

// export default Sections;

import React from "react";
import { Box } from "@mui/system";
import "./Sections.css";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import ReliabilityIcon from "../Assets/QualitySectionImages/Reliability.png";
import FastService from "../Assets/QualitySectionImages/FastService.png";
import FairCharges from "../Assets/QualitySectionImages/Fair Charges.png";

const CustomizedBox = styled(Box)({
  margin: "40px 20px",
  height: "auto",
  width: "30%",
  border: "2px solid #fa541c",
  borderRadius: "4px",
  backgroundColor: "#fff",
  boxShadow: "0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)",

  padding: "40px 40px",
});

const CustomizedTypography = styled(Typography)({
  // color: "#fa541c",
  color: "GrayText",
  marginTop: 30,
});

const Sections = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,300,400,600,700,900"
        rel="stylesheet"
      />

      <Box
        className="container"
        component={Stack}
        direction="row"
        
        sx={{
          justifyContent: "center",
        }}
      >
        <CustomizedBox
          // className="card card-1"
          sx={{ justifyContent: "center" }}
        >
          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            <img
              src={ReliabilityIcon}
              alt="Icon"
              style={{
                width: 100,
                alignSelf: "center",
              }}
            />

            <CustomizedTypography
              variant="h3"
              sx={{
                fontSize: 30,
              }}
            >
              Reliable
            </CustomizedTypography>
            <CustomizedTypography
              sx={{
                fontSize: 16,
                textAlign: "center",
                // textJustify: "auto",
              }}
            >
              Our service-based company specializes in providing reliable
              solutions to our clients. We understand the importance of
              reliability in today's fast-paced world.
            </CustomizedTypography>
          </Stack>
        </CustomizedBox>
        <CustomizedBox sx={{}}>
          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            <img
              src={FastService}
              alt="Icon"
              style={{
                width: 100,
                alignSelf: "center",
              }}
            />
            <CustomizedTypography
              variant="h3"
              sx={{
                fontSize: 30,
              }}
            >
              Fast Service
            </CustomizedTypography>
            <CustomizedTypography sx={{ fontSize: 16, textAlign: "center" }}>
              Tabs, buttons, inputs, lists, cards, and more! A comprehensive
              library of mobile UI components, ready to go.
            </CustomizedTypography>
          </Stack>
        </CustomizedBox>

        <CustomizedBox
          // className="card card-1"
          sx={{ justifyContent: "center" }}
        >
          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            <img
              src={FairCharges}
              alt="Icon"
              style={{
                width: 100,
                alignSelf: "center",
              }}
            />

            <CustomizedTypography
              variant="h3"
              sx={{
                fontSize: 30,
              }}
            >
              Fair Charges
            </CustomizedTypography>
            <CustomizedTypography
              sx={{
                fontSize: 16,
                textAlign: "center",
                // textJustify: "auto",
              }}
            >
              Our service-based company specializes in providing reliable
              solutions to our clients. We understand the importance of
              reliability in today's fast-paced world.
            </CustomizedTypography>
          </Stack>
        </CustomizedBox>
      </Box>
    </>
  );
};

export default Sections;
