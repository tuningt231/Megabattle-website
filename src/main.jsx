import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { Api } from "./api";
import Background from "./components/Background";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import "./styles/common.css";

function App() {
  return (
    <>
      <Header />
      <Background />
      <Outlet />
      <ScrollRestoration />
      <Footer />
    </>
  );
}

// Создание роутов
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
  { basename: Api.normalizeURL("/") },
);

// Создание всего приложения
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
