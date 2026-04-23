import { createRoot } from "react-dom/client";
import "./styles/common.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import { Api } from "./api";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Background from "./components/Background";

// Фикс для сброса скролла при перехода между страницами
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <Header />
      <Background />
      <ScrollToTop />
      <Outlet />
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
