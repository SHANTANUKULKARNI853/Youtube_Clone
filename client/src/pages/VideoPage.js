import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchVideos } from "../api/pexelsService";
import "./VideoPage.css";

const VideoPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [video, setVideo] = useState(location.state?.video || null);
  const [loading, setLoading] = useState(!video);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (video) return; // Skip fetching if video is already available

    async function loadVideo() {
      try {
        console.log("🛠 Fetching video details for ID:", id);
        const fetchedVideos = await fetchVideos("technology");
        console.log("✅ Fetched videos in VideoPage:", fetchedVideos);

        const selectedVideo = fetchedVideos.find((v) => String(v.id) === String(id));

        if (!selectedVideo) {
          console.warn(`⚠️ Video not found for ID: ${id}`);
        } else {
          setVideo(selectedVideo);
          setLikes(Math.floor(Math.random() * 1000)); // Mock likes
          setDislikes(Math.floor(Math.random() * 200)); // Mock dislikes
          setComments([
            { username: "JohnDoe", text: "Awesome video! 🔥" },
            { username: "JaneDoe", text: "Very informative, thanks!" },
          ]);
        }
      } catch (error) {
        console.error("❌ Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    }
    loadVideo();
  }, [id, video]);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);
  
  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { username: "You", text: newComment }]);
      setNewComment("");
    }
  };

  if (loading) return <h2 className="loading-text">Loading video...</h2>;
  if (!video) return <h2 className="error-text">⚠️ Video not found</h2>;

  return (
    <div className="video-page">
      {/* Video Player */}
      <video controls autoPlay className="video-player">
        <source src={video.video_files?.[0]?.link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Info */}
      <h2 className="video-title">{video.video_files?.[0]?.filename || "YouTube Video"}</h2>
      <p className="video-channel">
        By: {video.user?.name || "Unknown Creator"} &bull; {video.views ? `${video.views} views` : "Views not available"}
      </p>

      {/* Like, Dislike, Subscribe Buttons */}
      <div className="video-actions">
        <button className="like-btn" onClick={handleLike}>👍 {likes}</button>
        <button className="dislike-btn" onClick={handleDislike}>👎 {dislikes}</button>
        <button className="subscribe-btn">🔴 Subscribe</button>
      </div>

      {/* Video Description */}
      <div className="video-description">
        <h3>Description</h3>
        <p>{video.description || "No description available."}</p>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        <div className="comment-box">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Post</button>
        </div>
        <ul className="comment-list">
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.username}</strong>: {comment.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoPage;
