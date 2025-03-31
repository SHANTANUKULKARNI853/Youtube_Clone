import React from "react";
import VideoList from "../components/VideoList";
import VideoCard from "../components/VideoCard";

function HomePage() {
  return (
    <div>
      <h2 style={{ color: "white", textAlign: "center" }}>Trending Videos</h2>
      <VideoList />
    </div>
  );
}

export default HomePage;
