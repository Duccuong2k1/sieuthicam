import React from "react";

export type TabGroupProps = {
  tabHeader?: JSX.Element;
};

export function TabGroup({ children, ...props }: TabGroupProps & ReactProps) {
  return (
    <div>
      <div className="flex flex-row items-center justify-around gap-3 p-3 bg-black">
        {props.tabHeader}
      </div>
      <div>{children}</div>
    </div>
  );
}
