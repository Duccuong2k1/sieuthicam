import React from "react";
import { ColumnProps } from "./table";

type TableHeaderProps = {
  columns: ColumnProps[];
  align?:string;
};

export function TableHeader({ columns,align }: TableHeaderProps) {
  return (
    <thead className={`rounded-xl bg-white py-2 text-${align} text-[#4B525A]`}>
      <tr className="">
        {columns.map((column, index) => (
          <th key={index} className="p-2 text-sm font-semibold border">
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
