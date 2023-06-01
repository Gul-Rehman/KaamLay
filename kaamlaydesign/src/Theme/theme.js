import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fa541c",
    },
    secondary: {
      main: "#ffffff",
    },
  },

  typography: {
    body1: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  link: {
    fontFamily: "Roboto",
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
});

export default theme;
