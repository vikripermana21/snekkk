import { MdExplicit } from "react-icons/md";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { millisToMinutesAndSeconds } from "../../helper";
import { AnimatePresence, motion as m } from "framer-motion";
import { useState } from "react";
import { IoClose, IoWarning } from "react-icons/io5";
import Modal from "../Modal";
import { useMutation } from "@tanstack/react-query";
import { removeTrack, saveTrack } from "../../services";
import toast from "react-hot-toast";

const List = ({ item, type = "track", isLiked = false, refetch }: any) => {
  const [isOpen, setIsOpen] = useState({ open: false, type: "" });

  const saveTrackMutation = useMutation({
    mutationKey: ["save-song"],
    mutationFn: async (id: any) => {
      const res = await saveTrack(id.split(","));
      return res;
    },
    onSuccess: (res: any) => {
      setIsOpen({ open: false, type: "" });
      toast.success("The song was successfully added to your liked list");
      refetch();
    },
  });

  const unsaveTrackMutation = useMutation({
    mutationKey: ["save-song"],
    mutationFn: async (id: any) => {
      const res = await removeTrack(id.split(","));
      return res;
    },
    onSuccess: (res: any) => {
      setIsOpen({ open: false, type: "" });
      toast.success("The song was successfully removed from your liked list");
      refetch();
    },
  });

  const submit = () => {
    if (isOpen.type === "save") {
      saveTrackMutation.mutate(item.id);
    } else {
      unsaveTrackMutation.mutate(item.id);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen.open && (
          <Modal
            type="warning"
            close={() => setIsOpen({ open: false, type: "" })}
            submitButtonAction={submit}
            isLoading={
              saveTrackMutation.isPending || unsaveTrackMutation.isPending
            }
          >
            <p>This will affect your actual spotify account</p>
          </Modal>
        )}
      </AnimatePresence>
      <div className="w-full group flex p-3 gap-3 hover:bg-[#6023EB] hover:text-white transition-all rounded-md justify-between items-center truncate cursor-pointer">
        <div className="flex gap-3 truncate">
          <div
            className={`${
              type === "track"
                ? "min-w-14 min-h-14 max-w-14 max-h-14"
                : "min-w-10 min-h-10 max-w-10 max-h-10"
            } rounded-md overflow-hidden`}
          >
            <img
              src={
                type === "track"
                  ? item?.album?.images?.[0]?.url
                  : item?.images?.[0]?.url
              }
              alt=""
              className="object-cover"
            />
          </div>
          <div
            className={`flex flex-col truncate ${
              type === "track" ? "justify-between" : "justify-center"
            } `}
          >
            <div className="flex items-center gap-2">
              {item?.explicit && <MdExplicit className="text-xl" />}
              <p className="font-semibold truncate">{item?.name}</p>
            </div>
            {type === "track" ? (
              <>
                <p className="text-xs">
                  {millisToMinutesAndSeconds(item?.duration_ms)}
                </p>
                <div className="flex text-xs gap-3">
                  <Link to={"#"} className="hover:underline">
                    {item?.artists?.[0]?.name}
                  </Link>
                  <Link to={"#"} className="hover:underline truncate">
                    {item?.album?.name}
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <p className="text-xs">{item?.tracks?.total} Songs</p>
                <Link to="#" className="text-xs hover:underline">
                  {item?.owner?.display_name}
                </Link>
              </div>
            )}
          </div>
        </div>
        {type === "track" && (
          <div>
            {isLiked ? (
              <VscHeartFilled
                className="cursor-pointer hover:scale-125 transition-all text-[#6023EB] group-hover:text-white"
                onClick={() => setIsOpen({ open: true, type: "remove" })}
              />
            ) : (
              <VscHeart
                className="cursor-pointer hover:scale-125 transition-all"
                onClick={() => setIsOpen({ open: true, type: "save" })}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default List;
