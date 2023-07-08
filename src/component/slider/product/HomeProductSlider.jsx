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
import globalConfigSlice, {
  globalConfigSliceSelector,
} from "./../../../redux/global/globalConfigSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
export default function HomeProductSlider({ products, title }) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(products.status);
    const flag = products.status === 1 ? false : true;
    dispatch(globalConfigSlice.actions.changeBackDrops(flag));
  }, [products.status]);
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
            onSlideChange={() => {}}
            onSwiper={(swiper) => {}}
          >
            {products.data.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductHomeCard product={product}  />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
