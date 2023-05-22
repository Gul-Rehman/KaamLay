import React, { useState } from "react";
import "./App.css";
import {
  Footer,
  Navbar,
  SignUp,
  PrivateComponent,
  Login,
  Sections,
  Profile,
  ServiceProviderPostService,
  PlumbingServices,
  ElectricianServices,
  PainterServices,
  CarpenterServices,
  CarWashServices,
  SofaCleaningServices,
  HomeAppliancesServices,
  ACServices,
  BookService,
} from "./Components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Services,
  About,
  ContactUs,
  ClientDashBoard,
  ClientBookedServices,
  ClientCompletedServices,
  ServiceProviderDashboard,
  ServiceProviderPostedServices,
  BrowseServices,
  BookedServices,
  ClientProfile,
  ServiceProviderProfile,
  AdminDashboard,
} from "./Containers";

import LoginContext from "./Contexts/LoginContext";
import PlumbingService from "./Components/ServiceCategories/PlumbingServices";
import CompletedService from "./Containers/Client/CompletedService";

// const theme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       mobiles: 320,
//       mobilem: 375,
//       mobilel: 425,
//       tablet: 768,
//       laptops: 1024,
//       laptopl: 1440,
//     },
//   },
// });

function App() {
  const [showProfile, setShowProfile] = useState(true);
  const [username, setUserName] = useState("Context Username Gul Rehman");

  const data = {
    username,
    showProfile,
    setShowProfile,
    setUserName,
  };

  return (
    <>
      {/* <LoginContext.Provider value={data}> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/sections" element={<Sections />} />
          <Route exact path="/contactus" element={<ContactUs />} />
          <Route element={<PrivateComponent />}>
            <Route
              exact
              path="/clientdashboard"
              element={<ClientDashBoard />}
            />
            <Route exact path="/clientprofile" element={<ClientProfile />} />
            <Route
              exact
              path="/serviceproviderprofile"
              element={<ServiceProviderProfile />}
            />
            <Route
              exact
              path="/clientbookedservices"
              element={<ClientBookedServices />}
            />
            <Route
              exact
              path="/clientcompletedservices"
              element={<ClientCompletedServices />}
            />
            <Route
              exact
              path="/serviceproviderdashboard"
              element={<ServiceProviderDashboard />}
            />
            <Route
              exact
              path="/serviceproviderpostedservices"
              element={<ServiceProviderPostedServices />}
            />
            <Route
              exact
              path="/serviceproviderpostservice"
              element={<ServiceProviderPostService />}
            />
            <Route exact path="/clientbookservice" element={<BookService />} />
            <Route
              exact
              path="/browsecategories"
              element={<BrowseServices />}
            />
            <Route
              exact
              path="/plumbingservices"
              element={<PlumbingServices />}
            />
            <Route
              exact
              path="/electricianservices"
              element={<ElectricianServices />}
            />
            <Route
              exact
              path="/painterservices"
              element={<PainterServices />}
            />
            <Route
              exact
              path="/carpenterservices"
              element={<CarpenterServices />}
            />
            <Route
              exact
              path="/carwashservices"
              element={<CarWashServices />}
            />
            <Route
              exact
              path="/sofacleaningservices"
              element={<SofaCleaningServices />}
            />
            <Route
              exact
              path="/homeappliancesservices"
              element={<HomeAppliancesServices />}
            />
            <Route
              exact
              path="/clientbookedservices"
              element={<BookedServices />}
            />
            <Route
              exact
              path="/clientcompletedservices"
              element={<CompletedService />}
            />
            <Route exact path="/acservices" element={<ACServices />} />
          </Route>

          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {/* </LoginContext.Provider>
      </ThemeProvider> */}
    </>
  );
}

export default App;
