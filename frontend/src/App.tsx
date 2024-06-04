import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/layout";
import RegisterForm from "./pages/register";
import SignInForm from "./pages/SignIn";
import AddHotel from "./pages/addHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/myHotels";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <h1>home</h1>
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
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
