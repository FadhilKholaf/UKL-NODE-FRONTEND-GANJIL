import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import Login from "./pages/Login.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./middlewares/ProtectedRoute.tsx";
import Menu from "./pages/Menu.tsx";
import Navbar from "./components/Navbar.tsx";
import View from "./pages/View.tsx";
import Customer from "./pages/Customer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/menu" element={<Menu />} />
          <Route path="/view" element={<View />} />
        </Route>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Customer />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={<h1 className="text-center">Not Found 404</h1>}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
