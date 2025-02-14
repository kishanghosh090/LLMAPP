import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Home from "./components/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Resgister from "./components/Resgister.jsx";
import Settings from "./components/Settings.jsx";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
const GoogleAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId="731107839553-7ark5o8l0abuqoeg4k2741gkuj3ahbi9.apps.googleusercontent.com">
      {window.location.pathname === "/login" ? <Login /> : <Resgister />}
    </GoogleOAuthProvider>
  );
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/register" element={<GoogleAuthWrapper />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
