import { debounce } from "lodash";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type paramsInterface = {
  icon?: React.ReactNode;
  iconPosition?: "right" | "left";
  controllerName: string;
  isDebounce?: boolean;
  debounceDelay?: number;
};

const Input = ({
  icon,
  iconPosition,
  controllerName,
  isDebounce,
  debounceDelay,
}: paramsInterface) => {
  const methods = useFormContext();

  const { control } = methods;
  return (
    <Controller
      control={control}
      name={controllerName}
      render={({ field: { onChange } }) => (
        <div className="relative flex w-fit items-center">
          <input
            type="text"
            className={`py-1 border rounded-full peer focus:border-slate-600 outline-none ${
              iconPosition === "right" ? "pr-7 pl-3" : "pl-7 pr-3"
            }`}
            onChange={isDebounce ? debounce(onChange, debounceDelay) : onChange}
          />
          {icon && (
            <div
              className={`absolute ${
                iconPosition == "right" ? "right-0" : "left-0"
              }  mr-2 text-slate-600 peer-focus:text-black`}
            >
              {icon}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default Input;
