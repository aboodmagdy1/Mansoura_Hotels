import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout";

const App = () => {
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
