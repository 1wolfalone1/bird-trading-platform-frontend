import { A11y, Navigation, Pagination, Thumbs } from "swiper";
import s from "./homeProductSlider.module.scss";

import React from "react";
import clsx from "clsx";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/thumbs";
import BirdHomeCard from "../../card/bird-home-card/ProductHomeCard";
import ProductHomeCard from "../../card/bird-home-card/ProductHomeCard";
export default function HomeProductSlider({ products, title }) {
   return (
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
               {products.map((product) => (
                  <SwiperSlide key={product.id}>
                     <ProductHomeCard product={product} />
                  </SwiperSlide>
               ))}
         </Swiper>
      </div>
   );
}
