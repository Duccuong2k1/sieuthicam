"use client";
import React, { useEffect, useState } from "react";
import { BoxWarp } from "../shared/common/BoxWarp";
import Image from "next/image";
import {
  BsFacebook,
  BsFillStarFill,
  BsMessenger,
  BsStarHalf,
} from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { flatListProduct } from "@/libs/helpers/flat-list-product";
import { PRODUCT_POPULAR } from "@/libs/constants/product-popular";
import { randomInRange } from "@/libs/helpers/random-number";

type Props = {
  productId: string;
};

export function InfoProduct({ productId }: Props) {
  const product = flatListProduct(PRODUCT_POPULAR);
  const [infoProduct, setInfoProduct] = useState<any>(null);

  useEffect(() => {
    if (productId && !!product?.length) {
      const info = product?.find((pro, idx) => pro?.id === productId);

      setInfoProduct(info);
    }
  }, [productId, product]);
  if (!infoProduct) return <div>Loading ... </div>;
  return (
    <BoxWarp className="">
      <div className=" grid lg:grid-cols-3 grid-cols-1 gap-8">
        <div className="lg:col-span-1 ">
          <Image
            className={"mx-auto rounded-lg"}
            loading="lazy"
            src={infoProduct?.img || "/img/default.jpg"}
            alt={infoProduct?.desc}
            width={300}
            height={400}
            
          />
        </div>
        <div className="border-l pl-2 lg:pl-8 lg:col-span-2 w-full">
          <h2 className="mb-3 text-lg lg:text-2xl">{infoProduct?.title}</h2>
          <p className="mb-3 text-sm lg:text-lg text-gray-700">
            {infoProduct?.desc}
          </p>
          <div className="flex flex-row items-center justify-start gap-2 text-yellow-400">
            <i>
              <BsFillStarFill />
            </i>
            <i>
              <BsFillStarFill />
            </i>
            <i>
              <BsFillStarFill />
            </i>
            <i>
              <BsFillStarFill />
            </i>
            <i>
              <BsStarHalf />
            </i>
          </div>
          <div className="my-2 text-gray-500  ">Đã bán {randomInRange(10,1000)}</div>
          <div className="p-2 border rounded-lg w-full lg:w-1/2">
            <div className="text-green-600 font-semibold">
              <span className="text-red-500">Now </span> | Giao hàng trong 24h
            </div>
            <div className="text-gray-600 text-sm">
              Miễn phí vận chuyển với đơn nhỏ hơn 10km
            </div>
          </div>
          <div className="flex flex-row items-center justify-start my-2 gap-4">
            <span>Chia sẻ:</span>
            <span className=" rounded-full text-xl text-primary cursor-pointer">
              <BsFacebook />
            </span>
            <span className="rounded-full text-xl text-blue-500 cursor-pointer">
              <BsMessenger />
            </span>
            <span className="rounded-full text-xl text-red-500 cursor-pointer">
              <FaYoutube />
            </span>
          </div>
        </div>
      </div>
    </BoxWarp>
  );
}
