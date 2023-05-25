import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import s from "./homeCarousel.module.scss";
import React, { useEffect, useId, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from "swiper";
import clsx from "clsx";
import "./custom.scss";
const carouselImags = [
   {
      img: "1.png",
      id: 1,
   },
   {
      img: "2.png",
      id: 2,
   },
   {
      img: "3.png",
      id: 3,
   },
   {
      img: "4.png",
      id: 4,
   },
];
export default function HomeCarousel() {
   return (
      <Swiper
         modules={[Navigation, Pagination, Autoplay, EffectFade]}
         effect={"fade"}
         slidesPerView={1}
         loop={true}
         navigation={{ clickable: true }}
         pagination={{ clickable: true }}
         onSwiper={() => {}}
         autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
         }}
         onSlideChange={(swiper) => {}}
      >
         {carouselImags.map((img, i) => (
            <SwiperSlide key={img.id}>
               <div className={clsx(s.container)}>
                  <img
                     src={require(`../../../asset/image/carousel/${img.img}`)}
                     alt=""
                  />
               </div>
            </SwiperSlide>
         ))}
      </Swiper>
   );
}
