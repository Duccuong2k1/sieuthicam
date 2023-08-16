import React from "react";
import { FiSearch } from "react-icons/fi";
type Props = {};

export function InputSearch({}: Props) {
  return (
    <div className=" border rounded-md pl-4  flex flex-row items-center justify-between">
      <span>
        <FiSearch />
      </span>
      <input
        placeholder="Bạn tìm gì hôm nay"
        className=" w-full mx-2 outline-none focus:outline-none p-3"
      />
      <span className="whitespace-nowrap hover:bg-blue-100 p-3 text-sm font-medium hover:text-primary text-gray-500 cursor-pointer md:block hidden">
        Tìm kiếm
      </span>
    </div>
  );
}
