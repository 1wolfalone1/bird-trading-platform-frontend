import { A11y, Navigation, Pagination, Thumbs } from "swiper";
import s from "./homeProductSlider.module.scss";

import React, { useState } from "react";
import clsx from "clsx";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/thumbs";
import BirdHomeCard from "../../card/bird-home-card/ProductHomeCard";
import ProductHomeCard from "../../card/bird-home-card/ProductHomeCard";
import { homeDataStatus } from "../../../container/home/HomeSlice";
export default function HomeProductSlider({ products, title }) {
   return (
      <>
         {products.status === homeDataStatus.FULFILLED ? (
            <div className={clsx(s.container)}>
               <div className={s.title}>
                  <span>{title}</span>
               </div>
               <Swiper
                  spaceBetween={"0rem"}
                  slidesPerView={4.5}
                  modules={[Thumbs]}
                  watchSlidesProgress
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
               >
                  {products.data.map((product) => (
                     <SwiperSlide key={product.id}>
                        <ProductHomeCard product={product} />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         ) : (
            "fasdfasfasdfasdf"
         )}
      </>
   );
}
