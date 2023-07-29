import React from "react";
import { ServiceCategories } from "../Components";
import { Box } from "@mui/system";
import { Helmet } from "react-helmet";

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services </title>
        <meta
          property="og:title"
          content="How to Become an SEO Expert (8 Steps)"
        />
        <meta
          property="og:description"
          content="Get from SEO newbie to SEO pro in 8 simple steps."
        />
        <meta
          property="og:image"
          content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png"
        />
      </Helmet>
      <Box width="100%" marginTop={3}>
        <ServiceCategories />
      </Box>
    </>
  );
};

export default Services;
