import axios from "axios";
import axiosInstance from "../config/axiosInstance";

export const getToken = (payload: string) => {
  return axios.post(`https://accounts.spotify.com/api/token`, payload, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        btoa(
          `${
            import.meta.env.VITE_SPOTIFY_CLIENT_ID +
            ":" +
            import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
          }`
        ),
    },
  });
};

export const getSearch = (q: string, type: string) => {
  return axiosInstance.get(`/search`, {
    params: {
      q,
      type,
    },
  });
};

export const getUserPlaylist = () => {
  return axiosInstance.get(`/me/playlists`);
};
