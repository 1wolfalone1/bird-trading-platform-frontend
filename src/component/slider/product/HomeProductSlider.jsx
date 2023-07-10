import { Thumbs } from "swiper";
import s from "./homeProductSlider.module.scss";

import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "swiper/css";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { homeDataStatus } from "../../../container/home/HomeSlice";
import ProductHomeCard from "../../card/bird-home-card/ProductHomeCard";
import globalConfigSlice from "./../../../redux/global/globalConfigSlice";
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
                <ProductHomeCard product={product} />
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
