import { useMutation } from "@tanstack/react-query";
import queryString from "query-string";
import React, { useEffect } from "react";
import { RiCircleFill, RiCircleLine } from "react-icons/ri";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getToken } from "../../services";
import { useAuth } from "../../stores";

const CallbackOauth = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const setToken = useAuth((state) => state.setToken);

  useEffect(() => {
    if (!!params.get("code")) {
      getSpotifyToken.mutate({
        code: params.get("code"),
        redirect_uri: "http://localhost:5173/callback",
        grant_type: "authorization_code",
      });
    }
  }, [params]);

  const getSpotifyToken = useMutation({
    mutationKey: ["post-token-spotify"],
    mutationFn: async (payload: any) => {
      const res = await getToken(payload);
      return res?.data;
    },
    onSuccess: (res: any) => {
      if (res) {
        // setToken(res);
        localStorage.setItem("token", JSON.stringify(res));
        navigate("/explore");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <RiCircleLine className="animate-spin" />
      <p>Loading...</p>
    </div>
  );
};

export default CallbackOauth;
