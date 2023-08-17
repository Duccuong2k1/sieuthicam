"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
type Props = {};

export function InputSearch({}: Props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    router.push(`/products?search=${searchKeyword}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
      setSearchKeyword("")
    }
  };
  return (
    <div className=" border rounded-md pl-4  flex flex-row items-center justify-between">
      <span>
        <FiSearch />
      </span>
      <input
        placeholder="Bạn tìm gì hôm nay"
        className=" w-full mx-2 outline-none focus:outline-none p-3"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <span
        className="whitespace-nowrap hover:bg-blue-100 p-3 text-sm font-medium hover:text-primary text-gray-500 cursor-pointer md:block hidden"
        onClick={handleSearch}
      >
        Tìm kiếm
      </span>
    </div>
  );
}
