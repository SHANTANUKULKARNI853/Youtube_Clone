import axios from "axios";

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

if (!API_KEY) {
  console.error("❌ Pexels API Key is missing! Check your .env file.");
}

const BASE_URL = "https://api.pexels.com/videos/search";

export const fetchVideos = async () => {
  try {
    const queries = ["entertainment", "nature", "sports", "travel", "food", "music", "lifestyle"];
    const randomQuery = queries[Math.floor(Math.random() * queries.length)]; // Pick a random category

    console.log("📡 Fetching videos for query:", randomQuery, "at", new Date().toISOString());

    const response = await axios.get(BASE_URL, {
      headers: { Authorization: API_KEY },
      params: { query: randomQuery, per_page: 40 }, 
    });

    let videos = response.data.videos || [];

    // Shuffle videos for randomness
    videos = videos.sort(() => Math.random() - 0.5);

    // Return only 20 videos
    return videos.slice(0, 20);
  } catch (error) {
    console.error(
      "❌ Error fetching videos:",
      error.response ? error.response.data : error.message
    );
    return [];
  }
};
