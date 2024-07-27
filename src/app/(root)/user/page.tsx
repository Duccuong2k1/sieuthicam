import { Button } from "@/components/shared/utils/form/Button";
import Link from "next/link";
import React from "react";

type Props = {};

export default function UserPage({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-3">Trang đăng phát triển</div>
      <Button text="Quay lại trang chủ" className={"bg-primary-light p-2"} href={"/"}/>
    </div>
  );
}
