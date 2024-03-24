import { ReactNode, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Input from "../Input";
import { RiAddLine, RiSearch2Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getSearch, getUserPlaylist } from "../../services";
import { TbLoaderQuarter } from "react-icons/tb";
import Spinner from "../Spinner";
import { motion as m } from "framer-motion";
import { toNumber } from "lodash";

const Layout = ({ children }: { children: ReactNode }) => {
  const [selectedType, setSelectedType] = useState("artist");
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

  const typeSearch = useMemo(() => {
    return ["artist", "album", "playlist", "track", "show"];
  }, []);

  useEffect(() => {
    if (searchData) {
      console.log(searchData);
    }
  }, [searchData]);

  return (
    <div className="w-screen h-screen flex">
      <div className="flex flex-col w-1/4 bg-white py-10 px-5 gap-2">
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
      <div className="flex flex-1 p-5">
        <div className="flex flex-col w-full h-full">
          <FormProvider {...methods}>
            <div className="flex items-center gap-3">
              <Input
                icon={<RiSearch2Line />}
                iconPosition="right"
                controllerName="search"
                isDebounce={true}
                debounceDelay={500}
              />
            </div>
          </FormProvider>
          {searchData || isLoadingSearch ? (
            <>
              <div className="flex gap-2 mt-4">
                {typeSearch.map((item, index) => (
                  <div
                    key={index}
                    className={`py-1 px-3 rounded-full ${
                      selectedType === item ? "bg-[#6023EB]" : "bg-slate-500"
                    }  text-white cursor-pointer`}
                    onClick={() => setSelectedType(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
              {isLoadingSearch ? (
                <Spinner />
              ) : (
                <div className="w-full h-full py-5">
                  <div className="w-full grid grid-cols-4">
                    {searchData?.[`${selectedType}s`]?.items?.map(
                      (item: any, index: number) => (
                        <div key={index}>{item?.name}</div>
                      )
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>{children}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
