"use client";
import React, { useEffect, useState } from "react";
import { BoxWarp } from "../shared/common/BoxWarp";
import Image from "next/image";

type Props = {};

export function DescriptionProduct({}: Props) {
  const [tabName, setTabName] = useState("FEATURE");
  const [descTab, setDescTab] = useState<string>("");

  useEffect(() => {
    const desc = TAB_DESC.find((item) => item.tabName === tabName)?.children;
    setDescTab(desc as string);
  }, [tabName]);
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-5">
      <BoxWarp className="col-span-2">
        <div className="flex flex-row items-center gap-2 justify-start">
          {TAB_DESC?.map((tab, idx) => (
            <div
              key={idx}
              className={`p-2 ${
                tabName === tab.tabName
                  ? "bg-primary-light text-primary border-b border-primary"
                  : ""
              } rounded cursor-pointer text-sm lg:text-base`}
              onClick={() => setTabName(tab.tabName)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div
          className="w-full p-2 mt-5 text-sm lg:text-base"
          dangerouslySetInnerHTML={{ __html: descTab }}
        />
      </BoxWarp>
      <div className="text-center">
        <Image
          src={"/img/poster-ads.png"}
          alt="siêu sale thức ăn chăn nuôi cám heo con HP02"
          className="rounded-md"
          width={300}
          height={300}
        />
      </div>
    </section>
  );
}

const TAB_DESC: {
  tabName: string;
  title: string;
  children: string;
}[] = [
  {
    tabName: "FEATURE",
    title: "Đặc tính kỹ thuật",
    children: ` <p> - Nguồn nguyên liệu nhập khẩu và được chọn lọc kỹ tạo ra sản phẩm chất lượng ổn định</p>
        <p>- Nguồn protein hợp lý 15% và cân đối năng lượng giúp bò tăng trọng nhanh, tiết kiệm chi phí chăn nuôi</p>
        <p>- Cân đối khoáng vi lượng cần thiết cho sự phát triển hệ vi sinh vật có lợi trong dạ cỏ giúp tiêu hóa chất xơ tốt hơn</p>
        <p>- Bổ sung vị ngọt kích thích thèm ăn giúp bộ máy tiêu hóa tăng cường hoạt động làm tăng hiệu quả sử dụng thức ăn, tăng lợi nhuận chăn nuôi</p>
       `,
  },
  {
    tabName: "TUTORIAL",
    title: "Hướng dẫn sử dụng",
    children: ` <p>- Cho ăn nhiều lần trong ngày, không cần pha trộn với các loại nguyên liệu khác.</p>
        <p>- Cung cấp đầy đủ nước uống sạch và mát cho vật nuôi.</p>
        <p>- Màu sắc sản phẩm thay đổi không ảnh hưởng đến chất lượng sản phẩm</p>
        `,
  },
  {
    tabName: "INFO",
    title: "Thông tin dinh dưỡng",
    children: ` <p>-Độ ẩm (max) % 14</p>
        <p>-Năng lượng TĐ (min) Kcal/kg 2300</p>
        <p>-Protein thô (min) % 14</p>
        <p>-Xơ thô (max) % 18</p>
        <p>-Canxi (min-max) % 0.5-2.0</p>
        <p>-Phospho tổng số (min- max) % 0.4-1.5</p>
        <p>-Lysine tổng số (min) % 0.4</p>
        <p>-Methionine + cystine tổng số (min) % 0.35</p>`,
  },
];
