import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { RiCircleLine } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getToken } from "../../services";

const CallbackOauth = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!params.get("code")) {
      getSpotifyToken.mutate({
        code: params.get("code"),
        redirect_uri: `${import.meta.env.VITE_WEB_APP}/callback`,
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
