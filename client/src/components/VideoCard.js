import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const creatorId = video.user?.id || video.user?.name; // Ensure ID exists
  const creatorName = video.user?.name || "Unknown Creator";

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const followedCreators = JSON.parse(localStorage.getItem("subscriptions")) || [];
    setIsFollowing(followedCreators.some(creator => creator.id === creatorId));
  }, [creatorId]);

  const handleFollowToggle = (e) => {
    e.stopPropagation(); // Prevent video click event
    let followedCreators = JSON.parse(localStorage.getItem("subscriptions")) || [];

    if (isFollowing) {
      followedCreators = followedCreators.filter(creator => creator.id !== creatorId);
    } else {
      followedCreators.push({ id: creatorId, name: creatorName });
    }

    localStorage.setItem("subscriptions", JSON.stringify(followedCreators));
    setIsFollowing(!isFollowing);

    console.log("🔔 Updated Subscriptions:", JSON.parse(localStorage.getItem("subscriptions")));
  };

  const handleClick = () => {
    navigate(`/video/${video.id}`, { state: { video } });
  };

  return (
    <div className="video-card" onClick={handleClick}>
      <div className="video-thumbnail-container">
        <img src={video.image} alt={creatorName} className="video-thumbnail" />
      </div>
      <div className="video-info">
        <h3 className="video-title">{creatorName}</h3>
        <p className="video-channel">By: {creatorName}</p>
        <p className="video-views">Duration: {video.duration ? `${video.duration} sec` : "N/A"}</p>

        {/* Follow/Unfollow Button */}
        <button onClick={handleFollowToggle} className={isFollowing ? "unfollow-btn" : "follow-btn"}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
