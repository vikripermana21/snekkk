import { useQuery } from "@tanstack/react-query";
import Layout from "../../components/Layout";
import List from "../../components/List";
import { useEffect, useState } from "react";
import {
  checkUserSavedTracks,
  getRecentlyPlayed,
  getTopUser,
} from "../../services";
import { motion as m } from "framer-motion";
import { toNumber, toString } from "lodash";
import Spinner from "../../components/Spinner";
import { MdOutlineWaves } from "react-icons/md";
import {
  GiAbstract082,
  GiAbstract116,
  GiFlameSpin,
  GiFluffyTrefoil,
} from "react-icons/gi";
import toast from "react-hot-toast";

const Explore = () => {
  const [trackIds, setTrackIds] = useState("");

  const { data: recentlyList, isLoading } = useQuery({
    queryKey: ["get-recently-played"],
    queryFn: async () => {
      const res = await getRecentlyPlayed();
      return res.data;
    },
  });

  const { data: topTrack, isLoading: isLoadingTopTrack } = useQuery({
    queryKey: ["get-top-track"],
    queryFn: async () => {
      const res = await getTopUser("tracks");
      return res.data.items;
    },
  });

  const { data: topArtist, isLoading: isLoadingTopArtist } = useQuery({
    queryKey: ["get-top-artist"],
    queryFn: async () => {
      const res = await getTopUser("artists");
      return res.data.items;
    },
  });

  const {
    data: listOfLikedSongs,
    isLoading: isLoadingCheckLikedSongs,
    isFetching,
    refetch,
  } = useQuery({
    enabled: !!trackIds,
    queryKey: ["check-user-liked-tracks", trackIds],
    queryFn: async () => {
      const res = await checkUserSavedTracks(trackIds);
      return res?.data;
    },
  });

  useEffect(() => {
    if (recentlyList) {
      const ids = recentlyList?.items?.map((item: any) => item?.track?.id);
      setTrackIds(ids.join(","));
    }
  }, [recentlyList, topTrack, topArtist]);

  return (
    <Layout>
      {isLoading || isFetching || isLoadingCheckLikedSongs ? (
        <div className="flex w-full h-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col h-full w-full py-2 gap-3">
          <div className="h-[25%] w-full grid grid-cols-2 gap-3">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full h-full bg-gradient-to-br from-[#6023EB] to-[#a37ef9] rounded-lg relative overflow-hidden pr-3 flex flex-col"
            >
              <GiFlameSpin className="absolute -bottom-10 -right-10 text-[12rem] p-0 m-0 font-extrabold text-[#6023EB]" />
              <div className="flex h-full">
                <div className="h-full max-w-[180px] min-w-[180px]">
                  <div className={`h-full w-full overflow-hidden`}>
                    <img
                      src={topTrack?.[0]?.album?.images?.[0]?.url}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-2">
                  <p className="font-semibold text-white text-end text-xl">
                    Your Top Songs
                  </p>
                  <div className="flex flex-col w-full h-full z-20">
                    {topTrack?.map((item: any, index: number) => (
                      <div className="text-white flex gap-2">
                        <p
                          className={`${index == 0 && "font-bold text-xl"}`}
                        >{`${index + 1}.`}</p>
                        <p className={`${index == 0 && "font-bold text-xl"}`}>
                          {" "}
                          {item?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full h-full rounded-lg bg-gradient-to-br from-blue-700 to-blue-500 relative overflow-hidden flex flex-col justify-between"
            >
              <GiFluffyTrefoil className="absolute -bottom-10 -right-10 text-[12rem] p-0 m-0 font-extrabold text-blue-700" />
              <div className="flex h-full">
                <div className="h-full max-w-[180px] min-w-[180px]">
                  <div className={`h-full w-full overflow-hidden`}>
                    <img
                      src={topArtist?.[0]?.images?.[0]?.url}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-2">
                  <p className="font-semibold text-white text-end text-xl">
                    Your Top Artists
                  </p>
                  <div className="flex flex-col w-full h-full z-20">
                    {topArtist?.map((item: any, index: number) => (
                      <div className="text-white flex gap-2">
                        <p
                          className={`${index == 0 && "font-bold text-xl"}`}
                        >{`${index + 1}.`}</p>
                        <p className={`${index == 0 && "font-bold text-xl"}`}>
                          {" "}
                          {item?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>
          </div>
          <div className="h-[75%] w-full flex flex-col">
            <p className="text-xl font-semibold">Recently Played</p>
            <div className="w-full h-full overflow-y-scroll scrollbar-hide">
              {recentlyList?.items?.map((item: any, index: number) => (
                <m.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay:
                      index < 10
                        ? toNumber(`0.${index}`)
                        : toNumber(
                            `${toString(index).split("")[0]}.${
                              toString(index).split("")[1]
                            }`
                          ),
                  }}
                >
                  <List
                    item={item?.track}
                    refetch={refetch}
                    isLiked={listOfLikedSongs?.[index]}
                  />
                </m.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Explore;
