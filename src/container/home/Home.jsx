import clsx from "clsx";
import s from "./home.module.scss";

import React, { useEffect } from "react";
import HomeCarousel from "./../../component/slider/carousel/HomeCarousel";
import { getBirds, getBirdsSelector } from "./HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import HomeProductSlider from "../../component/slider/product/HomeProductSlider";
export default function Home() {
   const dispatch = useDispatch();
   const birds = useSelector(getBirdsSelector);

   useEffect(() => {
      const birds = dispatch(getBirds());
      console.log(birds, "asdfasdfadsfasdfasdasdfsdf");
   }, []);

   return (
      <div className={clsx(s.container)}>
         <div className={clsx(s.carosel)}>
            <HomeCarousel />
         </div>
         <div className={clsx(s.content)}>
            {birds? <HomeProductSlider products={birds} title={'Top product'}/>: 'loading...'}
            {birds? <HomeProductSlider products={birds} title={'Top product'}/>: 'loading...'}
            {birds? <HomeProductSlider products={birds} title={'Top product'}/>: 'loading...'}
            {birds? <HomeProductSlider products={birds} title={'Top product'}/>: 'loading...'}
         </div>
      </div>
   );
}
