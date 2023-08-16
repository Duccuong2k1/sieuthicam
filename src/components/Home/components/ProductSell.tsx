import { useEffect, useState } from "react";
import { PRODUCT_BEST_SELL } from "../ProductList";
import { ProductItem } from "@/components/shared/common/ProductItem";

export function ProductBestSell() {
    const [tabActive, setTabActive] = useState("PIG");
    const [products, setProducts] = useState<any[]>([]);
  
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
        <div className="flex flex-row items-center justify-start gap-5">
          {PRODUCT_BEST_SELL.map((tab, idx) => (
            <div
              key={idx}
              className={`border  text-black hover:bg-accent font-medium px-4 rounded-xl cursor-pointer py-1 ${
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
        <div className="mt-5">
          {!!products.length ? (
            <div className="grid lg:grid-cols-5 gap-5 grid-cols-2">
              {products.map((product, idx) => (
                <ProductItem key={idx} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center font-semibold">Không có sản phẩm nào</div>
          )}
        </div>
      </>
    );
  }
  