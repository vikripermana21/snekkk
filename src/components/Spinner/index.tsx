import React from "react";
import { TbLoaderQuarter } from "react-icons/tb";
import { motion as m } from "framer-motion";

const Spinner = () => {
  return (
    <m.div
      key={"loader"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex w-full justify-center"
    >
      <TbLoaderQuarter className="animate-spin" />
    </m.div>
  );
};

export default Spinner;
