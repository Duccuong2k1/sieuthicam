"use client"
import { Banner } from "@/components/Home/Banner";
import { Categories } from "@/components/Home/Categories";
import { ProductList } from "@/components/Home/ProductList";
import { BoxWarp } from "@/components/shared/common/BoxWarp";
import { BsPatchCheck, BsPhoneVibrate } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
export default function Home() {
  return (
    <main className="  container flex justify-between items-start gap-5">
      <div className="w-1/6">
        <Categories />
      </div>
      <div className="flex-1 w-full">
        <Banner />
        <BoxWarp>
          <div className="flex flex-row items-center justify-start gap-8 font-medium p-2">
            <span className="flex flex-row items-center gap-2">
              <BsPatchCheck className={"text-primary font-semibold text-lg"} />
              100% hàng chính hãng 
            </span>
            |
            <span className="flex flex-row items-center gap-2">
              <BsPhoneVibrate
                className={"text-primary font-semibold text-lg"}
              />
              Hỗ trợ 24/7 
            </span>
            |
            <span className="flex flex-row items-center gap-2">
              <LiaShippingFastSolid
                className={"text-primary font-semibold text-lg"}
              />
              Giao nhanh & đúng hẹn
            </span>
          </div>
        </BoxWarp>
        <ProductList />
      </div>
    </main>
  );
}
