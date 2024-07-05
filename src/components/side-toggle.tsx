import React, { FC } from "react";
import { SideType } from "../types/side-type";
import { Tab } from "./tab";



type EntityToggleProps = {
  side: SideType;
  toggleSideValue: (side: SideType) => void;
};

export const SideToggle: FC<EntityToggleProps> = ({
  side,
  toggleSideValue,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Tab
          title="BUY"
          isActive={side === "BUY"}
          onClick={() => toggleSideValue("BUY")}
        />
        <Tab
          title="SELL"
          isActive={side === "SELL"}
          onClick={() => toggleSideValue("SELL")}
        />
      </div>
    </div>
  );
};
