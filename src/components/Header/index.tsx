import React from "react";
import { InputSearch } from "./component/InputSearch";
import Link from "next/link";
import Image from "next/image";
import { HiHome } from "react-icons/hi2";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { Button } from "../shared/utils/form/Button";
import { MsgAds } from "./component/MsgAds";
import { useScreen } from "@/libs/hooks/useScreen";
type Props = {};

export function Header({}: Props) {
  // const isLg = useScreen("lg");
  return (
    <header className="bg-white">
      <div className="flex flex-row items-center justify-between container py-1">
        <div className="flex flex-row items-center justify-start gap-3 lg:gap-10 w-full">
          <Link href={"/"} className="text-xl font-semibold text-black">
            <Image
              src={"/img/logo-cam.png"}
              alt="logo shop"
              width={100}
              height={100}
              className="object-cover"
            />
          </Link>
          <div className="w-full lg:w-2/3">
            <InputSearch />
            <ul className="lg:flex flex-row items-center justify-start gap-3 mt-2 lg:block hidden">
              {MENU?.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.url || "#"}
                    className="text-gray-500 text-sm"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=" hidden lg:flex flex-row items-center justify-end gap-3 lg:w-1/4">
          <Button
            href="/"
            text={"Trang chủ"}
            icon={<HiHome />}
            iconPosition="start"
            iconClassName={"mr-2"}
            className={
              "border-none p-2 hover:bg-primary-light rounded-md text-primary font-medium"
            }
          />
          <Button
            text={"Tài khoản"}
            icon={<FaRegFaceSmileWink />}
            iconPosition="start"
            iconClassName={"mr-2"}
            className={
              "border-none p-2 hover:bg-primary-light rounded-md text-gray-400 font-medium"
            }
          />
        </div>
      </div>
      <MsgAds/>
    </header>
  );
}

export const MENU: {
  title: string;
  url?: string;
  submenu?: {
    title: string;
    url?: string;
  }[];
}[] = [
  {
    title: "Thức ăn chăn nuôi",
    url: "#",
    submenu: [
      {
        title: "",
        url: "#",
      },
    ],
  },
  {
    title: "Chăn nuôi heo",
    url: "#",
  },
  {
    title: "Gạo thơm",
    url: "#",
  },
  {
    title: "Tin tức",
    url: "#",
  },
];
