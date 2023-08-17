"use client";
import { PRODUCT_POPULAR } from "@/libs/constants/product-popular";
import { flatListProduct } from "@/libs/helpers/flat-list-product";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProductItem } from "../shared/common/ProductItem";

type Props = {};

export function CategoriesProductList({}: Props) {
  const params = useSearchParams();
  const searchInput = params.get("search");
  const listProduct = flatListProduct(PRODUCT_POPULAR);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  useEffect(() => {
    if (searchInput && !!listProduct?.length) {
      const filteredProducts = listProduct.filter(
        (product) =>
          product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          product.desc.toLowerCase().includes(searchInput.toLowerCase())
      );

      setSearchResults(filteredProducts);
    }
  }, [searchInput, listProduct?.length]);

  return (
    <div>
      <div className="my-3 text-lg font-semibold">
        {searchInput
          ? `Sản phẩm tìm kiếm ${searchInput}`
          : "Danh sách sản phẩm"}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {searchResults?.length > 0 ? (
          <>
            {searchResults.map((item, idx) => (
              <ProductItem product={item} key={idx} />
            ))}
          </>
        ) : (
          <>
            {listProduct.map((item, idx) => (
              <ProductItem product={item} key={idx} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
