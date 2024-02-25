import { ReactNode, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import Input from "../Input";
import { RiSearch2Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getExplore } from "../../services";

type menuInterface = {
  title: string;
  children: {
    name: string;
    path: string;
  }[];
};

const menu = [
  {
    title: "Library",
    children: [
      {
        name: "Browse",
        path: "/browse",
      },
      {
        name: "Songs",
        path: "/songs",
      },
    ],
  },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const methods = useForm({
    defaultValues: {
      search: "",
    },
  });

  const search = useWatch({
    control: methods.control,
    name: "search",
  });

  const { data } = useQuery({
    queryKey: ["get-explore", search],
    queryFn: async () => {
      const res = await getExplore({ q: search });
      console.log(res);
      return res?.data;
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="w-screen h-screen flex">
      <div className="flex w-1/4 bg-[#585352] rounded-r-2xl p-10">
        {menu?.map((item: menuInterface, index: number) => (
          <div key={index}>
            <p className="text-white">{item.title}</p>
            <div className="flex flex-col gap-1 py-4">
              {item.children?.map((child, index) => (
                <Link
                  key={index}
                  to={child.path}
                  className={`py-3 px-5 rounded-full text-white hover:bg-[#3c3a3a] hover:text-yellow-200 transition-all ${
                    location.pathname.includes(child.path) &&
                    "bg-[#3c3a3a] text-yellow-200"
                  }`}
                >
                  {child?.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 p-5">
        <div className="flex flex-col w-full h-full">
          <FormProvider {...methods}>
            <div className="flex items-center gap-3">
              <Breadcrumbs />
              <Input
                icon={<RiSearch2Line />}
                iconPosition="right"
                controllerName="search"
                isDebounce={true}
                debounceDelay={500}
              />
            </div>
          </FormProvider>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
