import { useDispatch, useSelector } from "react-redux";
import ProductsSlider from "./product-paging/ProductsSlider";
import Products from "./products/Products";
import s from "./productsPresentation.module.scss";

import { Skeleton, Stack } from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { backDropSelector } from "../../redux/global/globalConfigSlice";
import { getProducts } from "./productsSelector";

export default function ProductsPresentation() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const products = useSelector(getProducts);
  const backDrop = useSelector(backDropSelector);
  const { data, page } = products;

  useEffect(() => {
    setLoading(!backDrop);
  }, [backDrop]);

  return (
    <div className={clsx(s.container)}>
      {data ? (
        <>
          {!loading ? (
            <Stack
              spacing={5}
              sx={{ alignItems: "center" }}
              className={s.skeletonContainer}
            >
              <div className={clsx(s.skeleton)}>
                <div className={clsx(s.row1)}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton variant="rounded" width={260} height={430} />
                  ))}
                </div>
                <div className={clsx(s.row2)}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton variant="rounded" width={260} height={430} />
                  ))}
                </div>
              </div>
            </Stack>
          ) : (
            <>
              <Products products={data} />
              <ProductsSlider pageNumber={page} />
            </>
          )}
        </>
      ) : (
        <>
          <div className={s.itemNotFound}>
            <img
              src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/assetImage/asset/No_Product_Found.png"
              alt="item not found"
            />
          </div>
        </>
      )}
    </div>
  );
}
