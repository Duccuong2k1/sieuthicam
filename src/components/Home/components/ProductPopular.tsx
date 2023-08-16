import { useEffect, useState } from "react";
import { ProductItem } from "@/components/shared/common/ProductItem";
import { BoxWarp } from "@/components/shared/common/BoxWarp";
import Image from "next/image";
import { PRODUCT_POPULAR } from "../ProductList";

export function ProductPopular() {
  const [tabActive, setTabActive] = useState("PIG");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const productActive = PRODUCT_POPULAR.find(
      (item) => item.tab === tabActive
    )?.listProduct;
    if (productActive) {
      setProducts(productActive);
    }
  }, [tabActive]);
  return (
    <BoxWarp className="my-3">
      <div className="p-3">
        <div className="border-b border-accent sticky top-0 bg-white z-10">
          <div className="font-medium text-lg my-2">Gợi ý hôm nay</div>
          <div className="grid grid-cols-5 gap-5">
            {PRODUCT_POPULAR.map((tab, idx) => (
              <div
                key={idx}
                className={`  text-black hover:bg-accent font-normal text-sm p-4 flex flex-col items-center justify-center cursor-pointer ${
                  tabActive === tab.tab
                    ? " bg-primary-light font-medium text-primary border-b border-primary"
                    : "border-gray-300"
                }`}
                onClick={() => setTabActive(tab.tab)}
              >
                <Image
                  src={tab.imgTab}
                  alt="tab "
                  width={40}
                  height={40}
                  className="object-cover"
                />
                <span className="mt-2">{tab.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5">
          {!!products.length ? (
            <div className="grid lg:grid-cols-5 gap-5 grid-cols-2">
              {products.map((product, idx) => (
                <ProductItem key={idx} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center font-semibold">
              Không có sản phẩm nào
            </div>
          )}
        </div>
      </div>
    </BoxWarp>
  );
}
