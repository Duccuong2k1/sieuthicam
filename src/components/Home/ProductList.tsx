import React, { useEffect, useState } from "react";
import { BoxWarp } from "../shared/common/BoxWarp";

import { ProductBestSell } from "./components/ProductSell";
import { ProductPopular } from "./components/ProductPopular";

type Props = {};

export function ProductList({}: Props) {
  return (
    <div>
      <BoxWarp className="my-3">
        <div className="p-3">
          <div className="font-medium text-lg my-2">Sản phẩm bán chạy</div>
          <ProductBestSell />
        </div>
      </BoxWarp>
      <ProductPopular />
    </div>
  );
}

export const PRODUCT_BEST_SELL: {
  tab: string;
  title: string;
  listProduct: any[];
}[] = [
  {
    tab: "PIG",
    title: "Cám heo con",
    listProduct: [
      ,
      { title: "HP 02", img: "/img/product/hp01.png", price: 120000 },
      { title: "HP 05", img: "/img/product/hp02.png", price: 356666 },
    ],
  },
  {
    tab: "CHICKEN",
    title: "Cám gà",
    listProduct: [
      { title: "HP 05", img: "/img/product/hp20.png", price: 450000 },
    ],
  },
  {
    tab: "RICE",
    title: "Gạo thơm lài",
    listProduct: [
      { title: "Thơm lài 16", img: "/img/product/hp01.png", price: 250000 },
    ],
  },
];

export const PRODUCT_POPULAR: {
  tab: string;
  title: string;
  imgTab: string;
  listProduct: any[];
}[] = [
  {
    tab: "PIG",
    title: "Dành cho bạn",
    imgTab: "/img/tab-1.png",

    listProduct: [
      ,
      { title: "HP 02", img: "/img/product/hp01.png", price: 120000 ,discount:20},
      { title: "HP 05", img: "/img/product/hp02.png", price: 356666 ,discount:10},
      { title: "HP 05", img: "/img/product/hp02.png", price: 140098 ,discount:10},
      { title: "HP 05", img: "/img/product/hp20.png", price: 128000 ,discount:10},
      { title: "HP 05", img: "/img/product/hp01.png", price: 356666 ,discount:11},
      { title: "HP 15", img: "/img/product/hp02.png", price: 356666 ,discount:14},
      { title: "HP 25", img: "/img/product/hp02.png", price: 344445 ,discount:16},
      { title: "HP 09", img: "/img/product/hp01.png", price: 555533 ,discount:15},
      { title: "HP 04", img: "/img/product/hp20.png", price: 129999 ,discount:15},
      { title: "HP 02", img: "/img/product/hp01.png", price: 356666 ,discount:20},
      { title: "HP 01", img: "/img/product/hp02.png", price: 356666 ,discount:12},
      { title: "HP 05", img: "/img/product/hp02.png", price: 223303 ,discount:10},
      { title: "HP 03", img: "/img/product/hp02.png", price: 356666 ,discount:10},
      { title: "HP 06", img: "/img/product/hp02.png", price: 350000 ,discount:20},
      { title: "HP 05", img: "/img/product/hp20.png", price: 409999 ,discount:10},
      { title: "HP 12", img: "/img/product/hp01.png", price: 356666 ,discount:10},
    ],
  },
  {
    tab: "CHICKEN",
    title: "Rẻ mỗi ngày",
    imgTab: "/img/tab-2.png",

    listProduct: [
      { title: "HP 05", img: "/img/product/hp20.png", price: 450000 ,discount:25},
    ],
  },
  {
    tab: "RICE",
    title: "Mua 5 tặng 1",
    imgTab: "/img/tab-3.png",

    listProduct: [
      { title: "Thơm lài 16", img: "/img/product/hp01.png", price: 250000 ,discount:15},
    ],
  },
];
