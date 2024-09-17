import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import MainLayout from "./comonents/MainLayout";
import About from "./pages/About";
import Help from "./pages/Help";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import RoomDetails from "./pages/RoomDetails";
import SignUp from "./pages/SignUP";
import SignIn from "./pages/SignIn";
import PostRoom from "./pages/PostRoom";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoutes from "./comonents/ProtectedRoutes";
import LandlordDashboard from "./pages/LandlordDashboard";
import LandlordHome from "./pages/Landlord/LandlordHome";
import LandlordBookings from "./pages/Landlord/LandlordBookings";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <MainLayout>
                <SignUp />
              </MainLayout>
            }
          />
          <Route
            path="/signin"
            element={
              <MainLayout>
                <SignIn />
              </MainLayout>
            }
          />

          <Route
            path="/About"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/room-details/:roomId?"
            element={
              <MainLayout>
                <RoomDetails />
              </MainLayout>
            }
          />
          <Route
            path="/help"
            element={
              <MainLayout>
                <Help />
              </MainLayout>
            }
          />
          <Route
            path="/ContactUs"
            element={
              <MainLayout>
                <ContactUs />
              </MainLayout>
            }
          />
          <Route
            path="/FAQ"
            element={
              <MainLayout>
                <FAQ />
              </MainLayout>
            }
          />
          <Route
            path="landlord/postroom"
            element={
              <MainLayout>
                <ProtectedRoutes requiredRole="landlord">
                  <PostRoom />
                </ProtectedRoutes>
              </MainLayout>
            }
          />
          <Route
            path="/landlord/landlord-dashboard"
            element={
              <MainLayout>
                <ProtectedRoutes requiredRole="landlord">
                  <LandlordDashboard />
                </ProtectedRoutes>
              </MainLayout>
            }
          />
          <Route
            path="landlord/home"
            element={
              <MainLayout>
                <ProtectedRoutes requiredRole="landlord">
                  <LandlordHome />
                </ProtectedRoutes>
              </MainLayout>
            }
          />
          <Route
            path="landlord/bookings"
            element={
              <MainLayout>
                <ProtectedRoutes requiredRole="landlord">
                  <LandlordBookings />
                </ProtectedRoutes>
              </MainLayout>
            }
          />
          <Route
            path="/*"
            element={
              <MainLayout>
                <ErrorPage />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
