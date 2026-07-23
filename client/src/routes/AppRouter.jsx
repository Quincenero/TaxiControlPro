import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import ForgotPassword from "@/pages/Auth/ForgotPassword/ForgotPassword";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route 
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;