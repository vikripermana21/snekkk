import axios from "axios";

type IAuth = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
};

const localStorageItems = localStorage.getItem("token") || "{}";
const token: IAuth = JSON.parse(localStorageItems);

console.log(token);

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
  return axios.get(`https://api.spotify.com/v1/search`, {
    params: {
      q,
      type,
    },
    headers: {
      Authorization: `Bearer ${token?.access_token}`,
    },
  });
};

export const getUserPlaylist = () => {
  return axios.get(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      Authorization: `Bearer ${token?.access_token}`,
    },
  });
};
