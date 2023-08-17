import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ProductItem } from "@/components/shared/common/ProductItem";
type Props = {
  products: any[];
};

export default function ProductSellMobile({ products }: Props) {
  return (
    <div>
      <Swiper
        className="h-full my-4"
        slidesPerView={2.1}
        spaceBetween={10}
   
    
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductItem product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
