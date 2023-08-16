"use client";
import { useToast } from "@/libs/providers/toast-provider";
import React from "react";
import { FaPhoneVolume } from "react-icons/fa6";

type Props = {};

export function ContactPhoneNumber({}: Props) {
  const toast = useToast();

  return (
    <div
      className="rounded-full fixed right-4 bottom-16 p-3 text-white bg-primary shadow-xl text-xl animate-bounce z-20"
      onClick={() => {
        toast.info("Liên hệ ngay sđt 0348897993 để đặt hàng");
      }}
    >
      <i>
        <FaPhoneVolume />
      </i>
    </div>
  );
}
