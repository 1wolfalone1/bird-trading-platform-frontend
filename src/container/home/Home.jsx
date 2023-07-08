import clsx from "clsx";
import s from "./home.module.scss";

import React, { useEffect } from "react";
import HomeCarousel from "./../../component/slider/carousel/HomeCarousel";
import {
  getAccessories,
  getAccessoriesSelector,
  getBirds,
  getBirdsSelector,
  getFood,
  getFoodSelector,
  getTopProducts,
  getTopProductsSelector,
  homeDataStatus,
} from "./HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import HomeProductSlider from "../../component/slider/product/HomeProductSlider";
import Accessories from "./../../asset/icons/Accessories";
import globalConfigSlice from "../../redux/global/globalConfigSlice";
import PopupMessage from "../../component/message/PopupMessage";
export default function Home() {
  const dispatch = useDispatch();
  const birds = useSelector(getBirdsSelector);
  const food = useSelector(getFoodSelector);
  const topProduct = useSelector(getTopProductsSelector);
  const accessories = useSelector(getAccessoriesSelector);

  useEffect(() => {
    dispatch(getBirds());
    dispatch(getFood());
    dispatch(getAccessories());
    dispatch(getTopProducts());
    dispatch(globalConfigSlice.actions.changeNavigateValue(1));
  }, []);

  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.carosel)}>
        <HomeCarousel />
      </div>
      <div className={clsx(s.content)}>
        <HomeProductSlider products={topProduct} title={"Top Products"} />
        <HomeProductSlider products={birds} title={"Top Birds"} />
        <HomeProductSlider products={food} title={"Top Food"} />
        <HomeProductSlider products={accessories} title={"Top Accessories"} />
      </div>
    </div>
  );
}
