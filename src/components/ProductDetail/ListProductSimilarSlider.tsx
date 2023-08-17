"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ProductItem } from "../shared/common/ProductItem";
import { PRODUCT_POPULAR } from "@/libs/constants/product-popular";
import { BoxWarp } from "../shared/common/BoxWarp";
import { useScreen } from "@/libs/hooks/useScreen";
type Props = {};

export function ListProductSimilarSlider({}: Props) {
  const [productSimilar, setProductSimilar] = useState([]);
  const isLg = useScreen("lg");
  useEffect(() => {
    const product = PRODUCT_POPULAR.find(
      (item) => item.tab === "FOR_YOU"
    )?.listProduct;
    setProductSimilar(product as any);
  }, []);
  return (
    <section className="my-5">
      <BoxWarp>
        <div className="text-lg font-semibold mb-3">Sản phẩm tương tự</div>
        <Swiper
          className="h-full my-4"
          slidesPerView={isLg ? 5 : 2.1}
          spaceBetween={10}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Autoplay]}
          loop={true}
        >
          {productSimilar.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductItem product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </BoxWarp>
    </section>
  );
}
