import React from "react";
import "../styles/MainContent.css";

const videos = [
  {
    id: 1,
    title: "React Tutorial for Beginners",
    channel: "Tech Guru",
    views: "1.2M views",
    timestamp: "2 days ago",
    thumbnail: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Mastering JavaScript in 2024",
    channel: "Code Academy",
    views: "850K views",
    timestamp: "1 week ago",
    thumbnail: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "AI & Machine Learning Explained",
    channel: "AI Insights",
    views: "500K views",
    timestamp: "3 days ago",
    thumbnail: "https://via.placeholder.com/300x200",
  },
];

const MainContent = () => {
  return (
    <main className="main-content">
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-channel">{video.channel}</p>
              <p className="video-stats">
                {video.views} • {video.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
