import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import Background from "./components/Background";


export default function App() {
  return (
    <>
      <Header />
      <Background />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}
