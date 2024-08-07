"use client";
import { parseNumber } from "@/libs/helpers/parser";
import Image from "next/image";
import { Button } from "../utils/form/Button";
import { ProductType } from "@/libs/constants/product";
import { useToast } from "@/libs/providers/toast-provider";
import { useRouter } from "next/navigation";

export function ProductItem({ product }: { product: ProductType }) {
  const toast = useToast();
  const router = useRouter();
  return (
    <div className="p-2 rounded-lg bg-white shadow-lg">
      <div className="h-[250px] w-full rounded-lg overflow-y-hidden image-animation">
        <Image
          src={product?.img || "/img/product-1.jpg"}
          alt=""
          loading={"lazy"}
          sizes="100vw"
          width={0}
          height={0}
          className="w-full h-auto object-cover rounded-md "
        />
      </div>
      <div className="p-3 flex flex-col gap-2 bg-white z-10">
        <div className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
          {product?.title}
        </div>
        {product?.type === "FREE" ? (
          <div className="text-primary uppercase font-semibold">Miễn phí</div>
        ) : (
          <div className="flex flex-row items-center justify-start gap-2 ">
            <span className="text-xl text-primary font-semibold">
              {parseNumber(product?.price)}
            </span>
            đ /{" "}
            <del className="text-base">{parseNumber(product?.oldPrice)}</del>
          </div>
        )}
        <div className="flex flex-row items-center justify-start xl:gap-8 gap-3 ">
          <Button
            onClick={() => {
              if (product?.url === "#") {
                toast.info(
                  "Giao diện đang được hoàn thành. hiện tại là mẫu thiết kế"
                );
              } else {
                router.push(`${product?.url}`);
              }
            }}
            text="Xem thử"
            className={
              "lg:px-7 lg:py-2 px-4 py-1 rounded-full bg-primary text-white  whitespace-nowrap"
            }
          />
          <Button
            href={`/detail?pageid=${product?.id}`}
            text="Chi tiết"
            className={
              "lg:px-7 lg:py-2 px-4 py-1 rounded-full border border-primary whitespace-nowrap"
            }
          />
        </div>
      </div>
    </div>
  );
}
