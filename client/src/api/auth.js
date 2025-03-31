import API from "../utils/axios";

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await API.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};
