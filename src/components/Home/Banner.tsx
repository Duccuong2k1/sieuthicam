"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
type Props = {};

export function Banner({}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-3">
      <div className="lg:col-span-2 w-full">
        <SliderBanner />
      </div>
      <div className="lg:block hidden">
        <Image
          src={"/img/ads-01.png"}
          alt="ads"
          width={"0"}
          height={"0"}
          sizes="100vw"
          className="w-full h-[370px] rounded-lg"
        />
      </div>
    </div>
  );
}

function SliderBanner() {
  const [bannerSlide, setBannerSlide] =
    useState<{ image: string; url?: string }[]>(BANNER);

  return (
    <Swiper
      className=""
      spaceBetween={10}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={true}
      modules={[Autoplay, Pagination]}
      loop={true}
    >
      {!!bannerSlide?.length &&
        bannerSlide.map((banner, index) => (
          <SwiperSlide key={index} className="rounded-lg">
            <Link href={banner?.url || "/"}>
              <Image
                src={banner?.image}
                alt="banner"
                width={"0"}
                height={"0"}
                sizes="100vw"
                className="w-full h-auto rounded-lg"
                loading={"lazy"}
              />
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

const BANNER = [
  {
    image: "/img/banner-01.png",
    url: "#",
  },
  {
    image: "/img/banner-02.png",
    url: "#",
  },
  {
    image: "/img/banner-03.png",
    url: "#",
  },
];
