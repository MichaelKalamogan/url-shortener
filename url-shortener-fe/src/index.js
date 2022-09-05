import React from "react";
import "./index.css";
import App from "./App";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuccessPage from "./pages/SuccessPage";
// import your route components too

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/success" element={<SuccessPage />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
