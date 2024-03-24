import { useQuery } from "@tanstack/react-query";
import Layout from "../../components/Layout";
import List from "../../components/List";
import { useEffect } from "react";
import { useAuth } from "../../stores";

const Explore = () => {
  return (
    <Layout>
      <div className="flex h-full w-full py-2">
        <div className="p-5 rounded-md bg-slate-400 w-full h-44"></div>
      </div>
    </Layout>
  );
};

export default Explore;
