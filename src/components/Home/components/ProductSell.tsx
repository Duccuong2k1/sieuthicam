import { useEffect, useState } from "react";

import { ProductItem } from "@/components/shared/common/ProductItem";
import { PRODUCT_BEST_SELL } from "@/libs/constants/product-sell";
import { useScreen } from "@/libs/hooks/useScreen";
import ProductSellMobile from "./ProductSellMobile";

export function ProductBestSell() {
  const [tabActive, setTabActive] = useState("PIG");
  const [products, setProducts] = useState<any[]>([]);
  const isLg = useScreen("lg");

  useEffect(() => {
    const productActive = PRODUCT_BEST_SELL.find(
      (item) => item.tab === tabActive
    )?.listProduct;
    if (productActive) {
      setProducts(productActive);
    }
  }, [tabActive]);
  return (
    <>
      <div className="flex flex-row items-center justify-start gap-5 overflow-x-auto lg:py-0 py-3">
        {PRODUCT_BEST_SELL.map((tab, idx) => (
          <div
            key={idx}
            className={`border  text-black hover:bg-accent font-medium px-4 rounded-xl whitespace-nowrap cursor-pointer py-1 ${
              tabActive === tab.tab
                ? "border-primary bg-primary-light font-semibold text-primary"
                : "border-gray-300"
            }`}
            onClick={() => setTabActive(tab.tab)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="mt-5 overflow-x-auto w-full">
        {!!products.length ? (
          <>
            {isLg ? (
              <div className="grid grid-cols-5 gap-5 ">
                {products.map((product, idx) => (
                  <ProductItem key={idx} product={product} />
                ))}
              </div>
            ) : (
              <ProductSellMobile products={products} />
            )}
          </>
        ) : (
          <div className="text-center font-semibold">Không có sản phẩm nào</div>
        )}
      </div>
    </>
  );
}
