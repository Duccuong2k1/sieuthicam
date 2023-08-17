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

