import React from "react";
import { motion as m } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Spinner from "../Spinner";

const Modal = ({ close, submitButtonAction, isLoading = false }: any) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 w-full h-full bg-black/30 z-20 flex items-center justify-center"
    >
      <m.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="p-5 rounded-lg bg-white w-1/3 flex flex-col"
      >
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center">
            <p className="font-bold text-xl text-yellow-500">Warning</p>
          </div>
          <IoClose
            onClick={close}
            className="cursor-pointer transition-all hover:scale-125"
          />
        </div>
        <div className="py-5">This will affect your actual spotify account</div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              className="w-full p-2 border rounded-md cursor-pointer"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="w-full p-2 border rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition-all"
              onClick={submitButtonAction}
            >
              Confirm
            </button>
          </div>
        )}
      </m.div>
    </m.div>
  );
};

export default Modal;
