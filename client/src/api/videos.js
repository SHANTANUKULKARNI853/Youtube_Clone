import API from "../utils/axios";

export const fetchVideos = async () => {
  try {
    const response = await API.get("/videos");
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};

export const fetchVideoById = async (videoId) => {
  try {
    const response = await API.get(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};
