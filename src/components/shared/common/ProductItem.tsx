import { parseNumber } from "@/libs/helpers/parser";
import Image from "next/image";
import { BsPatchCheckFill } from "react-icons/bs";

export function ProductItem({ product }: { product: any }) {
  return (
    <div className="border border-accent rounded-lg hover:shadow-md">
      <Image
        className={"w-full h-auto rounded-lg"}
        loading="lazy"
        src={product?.img || "/img/default.jpg"}
        alt={product.title}
        // width={"0"}
        // height={"0"}
        // sizes="100vw"
        width={150}
        height={100}
      />
      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <span className="p-1  text-xs text-primary bg-primary-light uppercase rounded-md flex flex-row items-center whitespace-nowrap w-[100px]">
            <i className="mr-1">
              <BsPatchCheckFill />
            </i>
            <span>Còn hàng</span>
          </span>

          {product?.discount && (
            <span className="text-black bg-gray-200 rounded-full p-1 text-xs">
              -{product?.discount}%
            </span>
          )}
        </div>
        <div>{product?.title}</div>
        <div className="text-lg font-medium">
          {parseNumber(product?.price)}đ
        </div>
        <div className="border-t border-accent py-1 mt-1">
          <span className="text-red-500 font-semibold mr-2">Now</span>
          <span className="text-sm text-gray-500">Giao siêu tốc 24h</span>
        </div>
      </div>
    </div>
  );
}
