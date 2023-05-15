import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Theme ki properties yahan define karein
  palette: {
    primary: {
      main: "#fa541c", // Primary color ka hex code yahan specify karein
    },
    secondary: {
      main: "#00ff00", // Secondary color ka hex code yahan specify karein
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      mobiles: 320,
      mobilem: 375,
      mobilel: 425,
      tablet: 768,
      laptops: 1024,
      dnavbar: 1200,
      laptopl: 1440,
    },
  },
  // Aur baki theme ki properties bhi add kar sakte hain
});

export default theme;
