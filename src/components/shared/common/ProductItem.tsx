import { useScreen } from "@/libs/hooks/useScreen";
import Image from "next/image";
import Link from "next/link";
import { BsPatchCheckFill } from "react-icons/bs";

export function ProductItem({ product }: { product: any }) {
  const isLg = useScreen("lg");
  const randomInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <Link href={`/products/${product?.id}?title=${product?.desc}`}>
      <div className="border border-accent rounded-lg hover:shadow-md">
        <Image
          className={"w-full h-auto rounded-lg"}
          loading="lazy"
          src={product?.img || "/img/default.jpg"}
          alt={product.title}
          // width={"0"}
          // height={"0"}
          // sizes="100vw"
          width={350}
          height={100}
        />
        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <span className="p-1  text-xs text-primary bg-primary-light uppercase rounded-md flex flex-row items-center whitespace-nowrap w-auto lg:w-[100px]">
              <i className="mr-1">
                <BsPatchCheckFill />
              </i>
              <span className="text-[8px]">Còn hàng</span>
            </span>

            {product?.discount && (
              <span className="text-black bg-gray-200 rounded-full p-1  text-[9px] lg:text-xs">
                -{product?.discount}%
              </span>
            )}
          </div>
          <div>{product?.title}</div>
          <div className="text-sm truncate line-clamp-2">{product?.desc}</div>
          {product?.tag === "SELL" ? (
            <div className="relative w-full rounded-full bg-red-300 h-5 mt-2">
              <div className="text-white text-[9px] text-center absolute top-1 left-0 right-0 font-medium">
                Đã bán {product?.amount}
              </div>
              <div
                style={{ width: `${randomInRange(10, 100)}%` }}
                className="bg-red-500 w-full h-5 rounded-full"
              ></div>
              <img
                src={"/img/fire_icon.svg"}
                alt="icon fire"
                className="absolute left-1 -top-2"
                style={{ width: !isLg ? "20px" : "25px" }}
              />
            </div>
          ) : (
            <div className="border-t border-accent py-1 mt-1 text-xs whitespace-nowrap">
              <span className="text-red-500 font-semibold mr-2">Now</span>
              <span className="lg:text-sm text-gray-500 text-[9px]">
                Giao siêu tốc 24h
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
