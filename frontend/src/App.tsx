import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/layout";
import RegisterForm from "./pages/register";
import SignInForm from "./pages/SignIn";
import AddHotel from "./pages/addHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/myHotels";
import EditHotel from "./pages/editHotel";
import Search from "./pages/search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import HotelDetails_Admin from "./pages/HotelDetails_Admin";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  const { isLoggedIn, role } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* ----------------------------------------Public Routes---------------------------------------- */}
        <Route
          path="/"
          element={
            <Layout>
              {isLoggedIn && role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Home />
              )}
            </Layout>
          }
        />

        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <RegisterForm />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignInForm />
            </Layout>
          }
        />
        <Route
          path="/verify-email"
          element={
            <Layout>
              <VerifyEmail />
            </Layout>
          }
        />
        {/* ----------------------------------------Protected Routes---------------------------------------- */}
        {isLoggedIn && (
          <>
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
            {/* ---------------------------------------- Admin Routes---------------------------------------- */}
            {role === "admin" && (
              <>
                <Route
                  path="/admin"
                  element={
                    <Layout>
                      <Admin />
                    </Layout>
                  }
                />

                <Route
                  path="/admin/hotels/:hotelId"
                  element={
                    <Layout>
                      <HotelDetails_Admin />
                    </Layout>
                  }
                />
              </>
            )}
          </>
        )}

        {/* ----------------------------------------Fallback Routes---------------------------------------- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
