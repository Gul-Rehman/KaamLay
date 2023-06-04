import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import Plumber from "../Assets/ServiceCategoriesImages/plumber.svg";
import Electrician from "../Assets/ServiceCategoriesImages/electrician.svg";
import Painter from "../Assets/ServiceCategoriesImages/painter.svg";
import Carpenter from "../Assets/ServiceCategoriesImages/carpenter.svg";
import CarWash from "../Assets/ServiceCategoriesImages/car-service.svg";
import HomeAppliances from "../Assets/ServiceCategoriesImages/appliance-repair.svg";
import AC from "../Assets/ServiceCategoriesImages/ac.svg";
import Sofa from "../Assets/ServiceCategoriesImages/sofa.svg";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";

import { styled } from "@mui/material";
import ColorConfigs from "../Configs/ColorConfigs";
import { SofaCleaningServices } from ".";
const CustomizedCard = styled(Card)({
  // maxWidth: 450,
  width: "100%",
  justifyContent: "center",
  borderRadius: 30,
  boxShadow: 4,
  height: "auto",

  // margin: 10,

  border: "1px solid #fa541c",
});
const CustomizedButton = styled(Button)({
  color: `${ColorConfigs.primary}`,
});
const CustomizedBox = styled(Box)({
  margin: 20,
  // ml: 10,
});
export default function MultiActionAreaCard() {
  const navigate = useNavigate();
  return (
    <>
      {/* <Box sx={{ margin: 5, mb: 15 }}>
        <Typography
          sx={{
            fontSize: 50,
            textAlign: "center",
          }}
        >
          Services
        </Typography>
        <Typography
          sx={{
            fontSize: 30,
            textAlign: "center",
            color: "GrayText",
          }}
        >
          Browse From Our Wide Range Of Services
        </Typography>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            mt: 10,
          }}
        >
          <CustomizedCard sx={{}}>
            <CardActionArea
              onClick={() => {
                navigate("/plumbingservices");
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={Plumber}
                alt="green iguana"
              />
              <CardContent sx={{}}>
                <Typography gutterBottom variant="h5" component="div">
                  Plumbing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Plumbers install and repair pipes and fixtures that carry
                  water, gas, or other fluids in homes
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{}}>
              <CustomizedButton
                size="small"
                color="primary"
                onClick={() => {
                  navigate("/plumbingservices");
                }}
              >
                Browse Services
              </CustomizedButton>
            </CardActions>
          </CustomizedCard>

          <CustomizedCard sx={{}}>
            <CardActionArea
              onClick={() => {
                navigate("/electricianservices");
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={Electrician}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Electrician
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Installs and repairs electrical wiring, systems, and fixtures
                  in buildings.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{}}>
              <CustomizedButton
                size="small"
                color="primary"
                onClick={() => {
                  navigate("/electricianservices");
                }}
              >
                Browse Services
              </CustomizedButton>
            </CardActions>
          </CustomizedCard>

          <CustomizedCard sx={{}}>
            <CardActionArea
              onClick={() => {
                navigate("/painterservices");
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={Painter}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Painter
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Apply color on walls and other objects around a home, such as
                  furniture pieces or doors.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <CustomizedButton
                size="small"
                color="primary"
                onClick={() => {
                  navigate("/painterservices");
                }}
              >
                Browse Services
              </CustomizedButton>
            </CardActions>
          </CustomizedCard>

          <CustomizedCard sx={{}}>
            <CardActionArea
              onClick={() => {
                navigate("/carpenterservices");
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={Carpenter}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Carpenter
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Carpenter works with wooden stuff, adjust and repair wood
                  frameworks in furniture projects.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <CustomizedButton
                size="small"
                color="primary"
                onClick={() => {
                  navigate("/carpenterservices");
                }}
              >
                Browse Services
              </CustomizedButton>
            </CardActions>
          </CustomizedCard>
        </Stack>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            mt: 5,
          }}
        >
          <CustomizedCard sx={{}}>
            <CardActionArea
              onClick={() => {
                navigate("/carwashservices");
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={CarWash}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Car Wash
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A car wash, carwash, or auto wash is a facility used to clean
                  the exterior, and in some cases the interior of cars.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <CustomizedButton
                size="small"
                color="primary"
                onClick={() => {
                  navigate("/carwashservices");
                }}
              >
                Browse Services
              </CustomizedButton>
            </CardActions>
          </CustomizedCard>

          <CustomizedCard sx={{}}>
            <CardActionArea
              onClick={() => {
                navigate("/sofacleaningservices");
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={Sofa}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sofa Cleaning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The service starts with a deep vacuuming of your sofas to get
                  rid of any dust, mites, or dirt lodged inside the stuffing and
                  upholstery.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <CustomizedButton
                size="small"
                color="primary"
                onClick={() => {
                  navigate("/sofacleaningservices");
                }}
              >
                Browse Services
              </CustomizedButton>
            </CardActions>
          </CustomizedCard>

          <CustomizedCard sx={{}}>
            <CardActionArea
              onClick={() => {
                navigate("/homeappliancesservices");
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={HomeAppliances}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Home Appliances
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Appliance Repair Technicians repair damaged or malfunctioning
                  home appliances as well as instal and maintain functioning
                  appliances.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <CustomizedButton
                size="small"
                color="primary"
                onClick={() => {
                  navigate("/homeappliancesservices");
                }}
              >
                Browse Services
              </CustomizedButton>
            </CardActions>
          </CustomizedCard>

          <CustomizedCard sx={{}}>
            <CardActionArea
              onClick={() => {
                navigate("/acservices");
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={AC}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  AC Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Technician will service and clean the system and change the
                  air conditioning filter. Cleaning and changing out the air
                  filter.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <CustomizedButton
                size="small"
                color="primary"
                onClick={() => {
                  navigate("/acservices");
                }}
              >
                Browse Services
              </CustomizedButton>
            </CardActions>
          </CustomizedCard>
        </Stack>
      </Box> */}
      {/*  */}
      {/* Grid */}
      {/*  */}
      <Typography
        sx={{
          fontSize: 50,
          textAlign: "center",
        }}
      >
        Services
      </Typography>
      <Typography
        sx={{
          fontSize: 30,
          textAlign: "center",
          color: "GrayText",
        }}
      >
        Browse From Our Wide Range Of Services
      </Typography>
      <Box
        sx={{
          margin: 5,
        }}
      >
        <Grid container spacing={4} width={"100%"}>
          <Grid item laptopl={3} laptops={4} tablet={6}>
            <CustomizedCard sx={{}}>
              <CardActionArea
                onClick={() => {
                  navigate("/plumbingservices");
                }}
              >
                <Box justifyContent={"center"} display={"flex"}>
                  <img src={`${Plumber}`} style={{ height: 350 }} />
                </Box>
                <CardContent sx={{ height: 110 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Plumbing
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Plumbers install and repair pipes and fixtures that carry
                    water, gas, or other fluids in homes
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{}}>
                <CustomizedButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    navigate("/plumbingservices");
                  }}
                >
                  Browse Services
                </CustomizedButton>
              </CardActions>
            </CustomizedCard>
          </Grid>
          <Grid item laptopl={3} laptops={4} tablet={6}>
            <CustomizedCard sx={{}}>
              <CardActionArea
                onClick={() => {
                  navigate("/electricianservices");
                }}
              >
                <Box justifyContent={"center"} display={"flex"}>
                  <img src={`${Electrician}`} style={{ height: 350 }} />
                </Box>
                <CardContent sx={{ height: 110 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Electrician
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Installs and repairs electrical wiring, systems, and
                    fixtures in buildings.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{}}>
                <CustomizedButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    navigate("/electricianservices");
                  }}
                >
                  Browse Services
                </CustomizedButton>
              </CardActions>
            </CustomizedCard>
          </Grid>
          <Grid item laptopl={3} laptops={4} tablet={6}>
            <CustomizedCard sx={{}}>
              <CardActionArea
                onClick={() => {
                  navigate("/painterservices");
                }}
              >
                <Box justifyContent={"center"} display={"flex"}>
                  <img src={`${Painter}`} style={{ height: 350 }} />
                </Box>
                <CardContent sx={{ height: 110 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Painter
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Apply color on walls and other objects around a home, such
                    as furniture pieces or doors.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <CustomizedButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    navigate("/painterservices");
                  }}
                >
                  Browse Services
                </CustomizedButton>
              </CardActions>
            </CustomizedCard>
          </Grid>
          <Grid item laptopl={3} laptops={4} tablet={6}>
            <CustomizedCard sx={{}}>
              <CardActionArea
                onClick={() => {
                  navigate("/carpenterservices");
                }}
              >
                <Box justifyContent={"center"} display={"flex"}>
                  <img src={`${Carpenter}`} style={{ height: 350 }} />
                </Box>
                <CardContent sx={{ height: 110 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Carpenter
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Carpenter works with wooden stuff, adjust and repair wood
                    frameworks in furniture projects.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <CustomizedButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    navigate("/carpenterservices");
                  }}
                >
                  Browse Services
                </CustomizedButton>
              </CardActions>
            </CustomizedCard>
          </Grid>
          <Grid item laptopl={3} laptops={4} tablet={6}>
            <CustomizedCard sx={{}}>
              <CardActionArea
                onClick={() => {
                  navigate("/carwashservices");
                }}
              >
                <Box justifyContent={"center"} display={"flex"}>
                  <img src={`${CarWash}`} style={{ height: 350 }} />
                </Box>
                <CardContent sx={{ height: 110 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Car Wash
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    A car wash, carwash, or auto wash is a facility used to
                    clean the exterior, and in some cases the interior of cars.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <CustomizedButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    navigate("/carwashservices");
                  }}
                >
                  Browse Services
                </CustomizedButton>
              </CardActions>
            </CustomizedCard>
          </Grid>
          <Grid item laptopl={3} laptops={4} tablet={6}>
            <CustomizedCard sx={{}}>
              <CardActionArea
                onClick={() => {
                  navigate("/sofacleaningservices");
                }}
              >
                <Box justifyContent={"center"} display={"flex"}>
                  <img src={`${Sofa}`} style={{ height: 350 }} />
                </Box>
                <CardContent sx={{ height: 110 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Sofa Cleaning
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The service starts with a deep vacuuming of your sofas to
                    get rid of any dust, mites, or dirt lodged inside the
                    stuffing and upholstery.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <CustomizedButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    navigate("/sofacleaningservices");
                  }}
                >
                  Browse Services
                </CustomizedButton>
              </CardActions>
            </CustomizedCard>
          </Grid>
          <Grid item laptopl={3} laptops={4} tablet={6}>
            <CustomizedCard sx={{}}>
              <CardActionArea
                onClick={() => {
                  navigate("/homeappliancesservices");
                }}
              >
                <Box justifyContent={"center"} display={"flex"}>
                  <img src={`${HomeAppliances}`} style={{ height: 350 }} />
                </Box>
                <CardContent sx={{ height: 110 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Home Appliances
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Appliance Repair Technicians repair damaged or
                    malfunctioning home appliances as well as instal and
                    maintain functioning appliances.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <CustomizedButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    navigate("/homeappliancesservices");
                  }}
                >
                  Browse Services
                </CustomizedButton>
              </CardActions>
            </CustomizedCard>
          </Grid>
          <Grid item laptopl={3} laptops={4} tablet={6}>
            <CustomizedCard sx={{}}>
              <CardActionArea
                onClick={() => {
                  navigate("/acservices");
                }}
              >
                <Box justifyContent={"center"} display={"flex"}>
                  <img src={`${AC}`} style={{ height: 350 }} />
                </Box>
                <CardContent sx={{ height: 110 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    AC Services
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Technician will service and clean the system and change the
                    air conditioning filter. Cleaning and changing out the air
                    filter.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <CustomizedButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    navigate("/acservices");
                  }}
                >
                  Browse Services
                </CustomizedButton>
              </CardActions>
            </CustomizedCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
