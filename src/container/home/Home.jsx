import clsx from "clsx";
import s from "./home.module.scss";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeProductSlider from "../../component/slider/product/HomeProductSlider";
import globalConfigSlice, {
  backDropSelector,
} from "../../redux/global/globalConfigSlice";
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
} from "./HomeSlice";
import { useState } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const birds = useSelector(getBirdsSelector);
  const food = useSelector(getFoodSelector);
  const topProduct = useSelector(getTopProductsSelector);
  const accessories = useSelector(getAccessoriesSelector);
  const backDrop = useSelector(backDropSelector);
  useEffect(() => {
    dispatch(getBirds());
    dispatch(getFood());
    dispatch(getAccessories());
    dispatch(getTopProducts());
    dispatch(globalConfigSlice.actions.changeNavigateValue(1));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 500);
  }, [backDrop]);
  console.log(backDrop);
  return (
    <div>
      {!loading ? (
        <Stack
          spacing={5}
          sx={{ alignItems: "center" }}
          className={s.skeletonContainer}
        >
          <Skeleton variant="rectangular" width={"100%"} height={450} margin />
          <Box
            width={1235}
            height={240}
            sx={{ backgroundColor: "rgba(0, 0, 0, 0.11)" }}
          >
            <div className={clsx(s.title)}>
              <Skeleton variant="text" width={300} height={80} />
            </div>
            <div className={clsx(s.skeleton)}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton variant="rectangular" width={224} height={120} />
              ))}
              <Skeleton variant="rectangular" width={112} height={120} />
            </div>
          </Box>
        </Stack>
      ) : (
        <>
          <div className={clsx(s.container)}>
            <div className={clsx(s.carosel)}>
              <HomeCarousel />
            </div>
            <div className={clsx(s.content)}>
              <HomeProductSlider products={topProduct} title={"Top Sales"} />
              <HomeProductSlider products={birds} title={"Top Birds"} />
              <HomeProductSlider products={food} title={"Top Foods"} />
              <HomeProductSlider
                products={accessories}
                title={"Top Accessories"}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
