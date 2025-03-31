import React, { useEffect, useState } from "react";
import { fetchVideos } from "../api/pexelsService";
import VideoCard from "./VideoCard"; // Import VideoCard component
import "./VideoList.css";

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      const fetchedVideos = await fetchVideos(); // Fetch random videos
      setVideos(fetchedVideos);
    }
    loadVideos();
  }, []);

  return (
    <div className="video-list">
      {videos.length > 0 ? (
        videos.map((video) => <VideoCard key={video.id} video={video} />)
      ) : (
        <p className="loading-text">Fetching videos... ⏳</p>
      )}
    </div>
  );
}

export default VideoList;
