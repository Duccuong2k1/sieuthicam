import React from "react";
import { BoxWarp } from "../shared/common/BoxWarp";
import Link from "next/link";

type Props = {};

export function Categories({}: Props) {
  return (
    <BoxWarp className="my-3 p-2">
      <div className="font-semibold px-3 my-2">Danh mục</div>
      <ul>
        {CATEGORIES.map((cate, idx) => (
          <li key={idx} className="px-3 py-2 w-full hover:bg-accent rounded-md">
            <Link href={"#"} className="font-normal text-sm">{cate.title}</Link>
          </li>
        ))}
      </ul>
    </BoxWarp>
  );
}

const CATEGORIES: {
  icon?: JSX.Element;
  title: string;
  tabName?: string;
  url?: string;
}[] = [
  {
    icon: <></>,
    title: "Thức ăn hoàn chỉnh cho heo",
  },
  {
    icon: <></>,
    title: "Thức ăn hoàn chỉnh gà",
  },
  {
    icon: <></>,
    title: "Thức ăn hoàn chỉnh vịt",
  },
  {
    icon: <></>,
    title: "Thức ăn hoàn chỉnh bò",
  },
  {
    icon: <></>,
    title: "Thức ăn hoàn chỉnh dê",
  },
  {
    icon: <></>,
    title: "Gạo thơm",
  },
];
