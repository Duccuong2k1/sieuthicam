import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MENU } from "../Header";
import { LiaMapMarkerSolid } from "react-icons/lia";
import { FiPhoneIncoming } from "react-icons/fi";

type Props = {};

export function Footer({}: Props) {
  return (
    <footer className="w-full lg:w-1/2 mx-auto p-3  lg:mt-5 mb-16 lg:mb-0">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 place-items-start">
        <Link href={"/"} className="text-xl font-semibold text-black block">
          <Image
            src={"/img/logo-cam.png"}
            alt="logo shop"
            width={300}
            height={100}
            className="object-cover"
          />
        </Link>
        <ul className="flex flex-col items-start justify-start gap-3  lg:pt-8 pt-0">
          {MENU?.map((item, idx) => (
            <li key={idx}>
              <Link href={item.url || "#"} className="text-gray-800 text-sm">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="lg:col-span-1 col-span-2 lg:pt-8 pt-0">
          <p className="flex flex-row items-start gap-2 justify-start text-sm text-gray-800">
            <i className="text-xl font-semibold">
              <LiaMapMarkerSolid />
            </i>
            Quốc lộ 25, Thôn phú cường, xã IAPAL , huyện Chư Sê, tỉnh Gia Lai
          </p>
          <div className="flex flex-row items-center gap-2 justify-start text-gray-800 mt-3 text-sm">
            <i className="font-semibold">
              <FiPhoneIncoming />
            </i>
            +0348897993
          </div>
        </div>
      </div>
    </footer>
  );
}
