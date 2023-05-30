import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import ServiceIllustration from "../Assets/Serviceillustration.svg";
// import HeroBackground from '../Assets/herobackground.svg';
// import { useNavigate } from 'react-router';
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
// import Herolandscape from '../Assets/wave-haikei3.svg'
// import Herolandscape2 from '../Assets/wave-haikei7.svg'
// import Herolandscape3 from '../Assets/wave-haikei8.svg'
import Herolandscape4 from "../Assets/wave-haikei9.svg";
// import {Sections} from '../Components/Sections';

// import backgroundImage from '../Assets/Asset 3serviceillustration.svg'
import { createTheme, ThemeProvider } from "@mui/material/";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mobiles: 320,
      mobilem: 375,
      mobilel: 425,
      tablet: 768,
      laptops: 1024,
      laptopl: 1440,
    },
  },
});

const CustomizedButton = new styled(Button)({
  fontSize: "20px",
  color: "black",
  // width: "250px",
  width: "100%",
  padding: "10px",
  textAlign: "center",
  backgroundColor: "white",
  margin: 20,
  marginTop: 50,
  //border: "1px solid black",
  borderRadius: 10,
  "&:hover": {
    backgroundColor: "black",
    color: "white",
  },
});
const Hero = () => {
  const navigate = useNavigate();
  const opensignup = () => {
    navigate("/signup");
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            // backgroundColor:"#fa541c",
            // backgroundImage:`url(${Herobg})`,
            // backgroundImage:`url(${Herobgleft})`,
            // backgroundImage:`url(${Herobggradient})`,
            // backgroundImage:`url(${Herolandscape})`,
            // backgroundImage:`url(${Herolandscape2})`,
            // backgroundImage:`url(${Herolandscape3})`,
            backgroundImage: { tablet: `url(${Herolandscape4})` },
            backgroundSize: "cover",
            backgroundPosition: "center center",
            // backgroundPositionX:{tablet:"-350px",laptops:"0px",laptopl:"0px"},
            // backgroundPositionX:{md:"-10px",lg:"-60px"},
            // backgroundPositionX:"cover",
            // backgroundPositionX:"-200px",
            backgroundPositionY: { laptopl: "-150px", tablet: "-0px" },
            height: "90vh",
            // height:{laptops:"90vh",tablet:"50vh"},
            width: "100%",
            backgroundRepeat: "no-repeat",
            // backgroundColor:{lg:"whitesmoke",md:"whitesmoke",xs:"#fa541c"}
            backgroundColor: {
              laptopl: "whitesmoke",
              laptops: "whitesmoke",
              tablet: "whitesmoke",
              xs: "#fa541c",
            },
          }}
        >
          <Stack
            direction="row"
            spacing={14}
            sx={{ pt: { laptops: "100px", tablet: "50px" } }}
          >
            {/* sx={{ pt:{laptopl:"100px", laptops:"100px"}  }} */}
            <Stack sx={{ pt: "40px", pl: "60px" }}>
              <Typography
                fontFamily="DenseLetters"
                color="white"
                fontSize={{
                  laptopl: "65px",
                  laptops: "45px",
                  tablet: "30px",
                  mobilel: "30px",
                }}
                letterSpacing={5}
                sx={{}}
              >
                {" "}
                Kaam Lena Hai
                <span style={{ fontFamily: "Roboto, Arial, Tahoma, Serif" }}>
                  ?
                </span>{" "}
              </Typography>
              {/* <Typography fontSize={{lg:"78px",md:"70px",xs:"50px"} } display="inline" color="white"> ? </Typography> */}
              <Typography
                fontSize={{ laptopl: "40px", laptops: "25px", tablet: "17px" }}
                letterSpacing={2}
              >
                Don't Worry Kaam Lay Se Kaam Lo
              </Typography>
              <Stack direction="row" sx={{ marginLeft: "-20px", mt: "auto" }}>
                <CustomizedButton onClick={opensignup}>SignUp</CustomizedButton>

                <CustomizedButton onClick={() => {}}>
                  Browse More
                </CustomizedButton>
              </Stack>
            </Stack>
            <Stack>
              <Stack
                sx={{
                  display: {
                    xs: "none",
                    // md:"none",
                    laptopl: "flex",
                  },
                }}
              >
                <img
                  src={ServiceIllustration}
                  alt="Service Illustration"
                  style={{
                    width: "500px",
                    position: "absolute",
                    right: "70px",
                  }}
                />
              </Stack>
              <Stack
                sx={{
                  display: {
                    xs: "none",
                    laptops: "flex",
                    laptopl: "none",
                  },
                }}
              >
                <img
                  src={ServiceIllustration}
                  alt="Service Illustration"
                  style={{
                    width: "400px",
                    position: "absolute",
                    right: "70px",
                  }}
                />
              </Stack>
              <Stack
                sx={{
                  display: {
                    xs: "none",
                    laptops: "none",
                    laptopl: "none",
                    tablet: "flex",
                  },
                }}
              >
                <img
                  src={ServiceIllustration}
                  alt="Service Illustration"
                  style={{
                    width: "250px",
                    position: "absolute",
                    right: "70px",
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Hero;
