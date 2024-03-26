import { ReactNode, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Input from "../Input";
import { RiAddLine, RiSearch2Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import {
  checkUserSavedTracks,
  getSearch,
  getUserPlaylist,
} from "../../services";
import Spinner from "../Spinner";
import { AnimatePresence, motion as m } from "framer-motion";
import { startCase, toNumber, toString } from "lodash";
import { Link } from "react-router-dom";
import { VscHeart } from "react-icons/vsc";
import { MdExplicit } from "react-icons/md";
import List from "../List";

const Layout = ({ children }: { children: ReactNode }) => {
  const [selectedType, setSelectedType] = useState(
    "artist,album,track,playlist"
  );
  const [trackIds, setTrackIds] = useState("");
  const methods = useForm({
    defaultValues: {
      search: "",
    },
  });

  const search = useWatch({
    control: methods.control,
    name: "search",
  });

  const { data: searchData, isLoading: isLoadingSearch } = useQuery({
    enabled: !!search,
    queryKey: ["get-explore", search, selectedType],
    queryFn: async () => {
      const res = await getSearch(search, selectedType);
      return res?.data;
    },
  });

  const { data: playlists, isLoading } = useQuery({
    queryKey: ["get-user-playlist"],
    queryFn: async () => {
      const res = await getUserPlaylist();
      return res?.data;
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
    if (searchData) {
      const ids = searchData?.tracks?.items.map((item: any) => item.id);
      setTrackIds(ids.join(","));
      console.log("searchData", searchData);
    }
  }, [searchData]);

  return (
    <div className="w-screen h-screen flex overflow-hidden relative">
      <div className="flex flex-col w-1/4 bg-white pt-5 pb-10 px-5 gap-2">
        <div className="flex">
          <h1 className="title-font text-4xl">Snekkk</h1>
          <p className="text-[0.5rem] border px-1 rounded-full m-0 h-fit">
            BETA
          </p>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">Your Playlists</p>
          <RiAddLine className="hover:scale-125 transition-all cursor-pointer" />
        </div>
        <div className="flex flex-col overflow-auto h-full">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {playlists.items.map((item: any, index: number) => (
                <m.div
                  key={index}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    ease: "easeInOut",
                    delay: toNumber(`0.${index}`),
                  }}
                  className="p-3 rounded-lg bg-white hover:bg-[#6023EB] hover:text-white text-slate-700 flex gap-3 transition-all cursor-pointer"
                >
                  <div className="rounded-sm overflow-hidden min-h-12 min-w-12 max-h-12 max-w-12">
                    <img
                      src={item?.images?.[0]?.url}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col truncate">
                    <p className="truncate text-md">{item?.name}</p>
                    <p className="truncate text-xs">
                      {item?.description || "..."}
                    </p>
                  </div>
                </m.div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-1 max-h-screen h-screen overflow-hidden p-5">
        <div className="flex flex-col w-full overflow-hidden">
          <FormProvider {...methods}>
            <div className="flex items-center gap-3 h-[5%]">
              <Input
                icon={<RiSearch2Line />}
                iconPosition="right"
                controllerName="search"
                isDebounce={true}
                debounceDelay={500}
              />
            </div>
          </FormProvider>
          <AnimatePresence mode="wait">
            {search ? (
              <AnimatePresence mode="wait">
                {isLoadingSearch || isLoadingCheckLikedSongs || isFetching ? (
                  <Spinner />
                ) : (
                  <m.div
                    key={"content"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-[95%] py-5"
                  >
                    <div className="h-[35%]">
                      <p className="font-semibold text-xl mb-2">Albums</p>
                      <div className="flex w-full gap-3 overflow-auto scrollbar-hide">
                        {searchData?.albums?.items?.map(
                          (item: any, index: number) => (
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
                              className="flex flex-col min-w-44 max-w-44 p-2 truncate hover:bg-[#6023EB] rounded-md hover:text-white transition-all cursor-pointer"
                            >
                              <div className="min-h-40 min-w-40 max-h-40 max-w-40 rounded-md overflow-hidden">
                                <img
                                  src={item?.images?.[0]?.url}
                                  alt=""
                                  className="object-cover"
                                />
                              </div>
                              <p className="font-semibold truncate">
                                {startCase(item?.name)}
                              </p>
                              <p className="text-sm">
                                {item?.artists?.[0]?.name}
                              </p>
                            </m.div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 h-[65%] overflow-hidde gap-3">
                      <div className="h-full w-full flex flex-col overflow-hidden">
                        <p className="font-semibold text-xl mb-2">Tracks</p>
                        <div className="flex flex-col overflow-y-scroll h-full scrollbar-hide">
                          {searchData?.tracks?.items?.map(
                            (item: any, index: number) => (
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
                                  item={item}
                                  isLiked={listOfLikedSongs?.[index]}
                                  refetch={refetch}
                                />
                              </m.div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="h-full w-full flex flex-col overflow-hidden">
                        <div className="h-[30%]">
                          <p className="font-semibold text-xl mb-2">Artists</p>
                          <div className="flex gap-3 overflow-auto h-fit pb-5 scrollbar-hide">
                            {searchData?.artists?.items?.map(
                              (item: any, index: number) => (
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
                                  <div className="min-h-24 min-w-24 max-h-24 max-w-24 rounded-full overflow-hidden cursor-pointer">
                                    <img
                                      src={item?.images?.[0]?.url}
                                      alt=""
                                      className="object-cover"
                                    />
                                  </div>
                                </m.div>
                              )
                            )}
                          </div>
                        </div>
                        <div className="h-[70%] flex flex-col">
                          <p className="font-semibold text-xl mt-4 mb-2">
                            Playlists
                          </p>
                          <div className="flex flex-col gap-3 overflow-y-scroll h-full scrollbar-hide">
                            {searchData?.playlists?.items?.map(
                              (item: any, index: number) => (
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
                                  <List item={item} type={"playlist"} />
                                </m.div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            ) : (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"children"}
                className="h-[95%] overflow-hidden"
              >
                {children}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Layout;
