"use client"
import React from "react";
import { BiSolidHome, BiSolidUser } from "react-icons/bi";
import { BsFillGridFill } from "react-icons/bs";
import { IoNewspaper } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { useToast } from "@/libs/providers/toast-provider";
type Props = {};

export function FloatingMenu({}: Props) {
  const pathname = usePathname();
  const toast = useToast();
  return (
    <div className="fixed bottom-0 w-full p-2 bg-white shadow z-10 border-t border-accent">
      <div className="grid grid-cols-4 gap-3">
        {FLOATING_MENU?.map((menu, idx) => (
          <div
          key={idx}
            className={`flex items-center justify-center flex-col gap-2  ${
              menu.url == "/" ? "text-primary" : "text-gray-500"
            }`}
            onClick={() => {
              if (pathname !== menu.url) {
                toast.info("Tính năng đang phát triển");
              }
            }}
          >
            <i>{menu.icon}</i>
            <span className="text-xs">{menu.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const FLOATING_MENU = [
  {
    icon: <BiSolidHome />,
    title: "Trang chủ",
    url: "/",
  },
  {
    icon: <BsFillGridFill />,
    title: "Danh mục",
    url: "",
  },
  {
    icon: <IoNewspaper />,
    title: "Tin tức",
    url: "#",
  },
  {
    icon: <BiSolidUser />,
    title: "Tài khoản",
    url: "#",
  },
];
