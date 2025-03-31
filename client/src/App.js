import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import VideoPage from "./pages/VideoPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchPage from "./pages/SearchPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import { fetchVideos } from "./api/pexelsService"; // ✅ Import fetchVideos
import "./App.css";

function MainLayout({ allVideos }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isVideoPage = location.pathname.startsWith("/video/");

  return (
    <>
      <Navbar />
      <div className="main-layout">
        {!isAuthPage && !isVideoPage && <Sidebar />}
        <div className={`content ${isAuthPage ? "centered-auth" : ""}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage allVideos={allVideos} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

function App() {
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    const loadVideos = async () => {
      const videos = await fetchVideos();
      setAllVideos(videos);
    };
    loadVideos();
  }, []);

  return (
    <Router>
      <MainLayout allVideos={allVideos} />
    </Router>
  );
}

export default App;
