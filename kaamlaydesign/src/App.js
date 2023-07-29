import React, { useState } from "react";

import "./App.css";
import {
  Footer,
  Navbar,
  SignUp,
  PrivateComponent,
  Login,
  Sections,
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
  RequestService,
  PageNotFound,
  ServiceProviderSendOffer,
  ServiceProviderPrivateComponent,
  ServiceProviderVerificationMessage,
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
  ServiceProviderPendingServices,
  AdminDashboard,
  ServiceProviderRequestedServices,
  ClientRequestedServices,
  ServiceProviderCompletedServices,
  SeeOffers,
} from "./Containers";

import PlumbingService from "./Components/ServiceCategories/PlumbingServices";
import AdminLogin from "./Components/AdminLogin";
import Layout from "./Components/Layout";
import AdminPrivateComponent from "./Components/Admin/AdminPrivateComponent";

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
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
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
                path="/clientbookedservices"
                element={<ClientBookedServices />}
              />
              <Route
                exact
                path="/clientcompletedservices"
                element={<ClientCompletedServices />}
              />
              <Route element={<ServiceProviderPrivateComponent />}>
                <Route
                  exact
                  path="/serviceproviderprofile"
                  element={<ServiceProviderProfile />}
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
                <Route
                  exact
                  path="/serviceproviderpendingservices"
                  element={<ServiceProviderPendingServices />}
                />
                <Route
                  exact
                  path="/serviceprovidercompletedservices"
                  element={<ServiceProviderCompletedServices />}
                />
                <Route
                  exact
                  path="/serviceprovidersendoffer"
                  element={<ServiceProviderSendOffer />}
                />

                <Route
                  exact
                  path="/serviceproviderrequestedservices"
                  element={<ServiceProviderRequestedServices />}
                />
              </Route>
              <Route
                exact
                path="/clientbookservice"
                element={<BookService />}
              />
              <Route exact path="/seeoffers" element={<SeeOffers />} />
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

              <Route exact path="/acservices" element={<ACServices />} />
              <Route
                exact
                path="/requestservice"
                element={<RequestService />}
              />

              <Route
                exact
                path="/clientrequestedservices"
                element={<ClientRequestedServices />}
              />
            </Route>

            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route
              exact
              path="/serviceproviderverificationmessage"
              element={<ServiceProviderVerificationMessage />}
            />
          </Route>

          <Route element={<AdminPrivateComponent />}>
            <Route exact path="/admindashboard" element={<AdminDashboard />} />
          </Route>
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
