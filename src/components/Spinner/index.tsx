import React from "react";
import { TbLoaderQuarter } from "react-icons/tb";

const Spinner = () => {
  return (
    <div className="flex w-full justify-center">
      <TbLoaderQuarter className="animate-spin" />
    </div>
  );
};

export default Spinner;
