import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import "./SubscriptionsPage.css";


const SubscriptionsPage = ({ allVideos }) => {
  const [subscribedVideos, setSubscribedVideos] = useState([]);

  useEffect(() => {
    if (!allVideos || allVideos.length === 0) return;

    // Get followed creators from localStorage
    const followedCreators = JSON.parse(localStorage.getItem("subscriptions")) || [];
    const followedIds = followedCreators.map(creator => creator.id);

    console.log("🔎 Followed Creators:", followedCreators);
    console.log("🎥 All Videos:", allVideos);

    // Filter videos based on followed creators
    const filteredVideos = allVideos.filter(video => 
      video.user?.id && followedIds.includes(video.user.id)
    );

    console.log("✅ Subscribed Videos:", filteredVideos);
    setSubscribedVideos(filteredVideos);
  }, [allVideos]);

  return (
    <div className="subscriptions-page">
      <h2>Your Subscriptions</h2>
      {subscribedVideos.length === 0 ? (
        <p>No subscriptions yet. Follow creators to see their videos.</p>
      ) : (
        <div className="videos-container">
          {subscribedVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionsPage;
