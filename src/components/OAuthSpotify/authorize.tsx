import queryString from "query-string";
import { useEffect } from "react";

const Authorize = () => {
  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirect_uri = `http://localhost:5173/callback`;
  const scope =
    "user-read-private user-read-email user-library-read playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-top-read user-read-recently-played user-library-modify";

  const config = queryString.stringify({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
  });

  useEffect(() => {
    window.location.href = "https://accounts.spotify.com/authorize?" + config;
  }, []);
  return <div></div>;
};

export default Authorize;
