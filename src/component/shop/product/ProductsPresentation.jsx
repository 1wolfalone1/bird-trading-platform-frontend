import { Skeleton, Stack } from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../api/server/API";
import { backDropSelector } from "../../../redux/global/globalConfigSlice";
import ProductsSlider from "../../products-presentation/product-paging/ProductsSlider";
import Products from "../../products-presentation/products/Products";
import { getProducts } from "../../products-presentation/productsSelector";
import s from "./productsPresentation.module.scss";

export default function ProductsPresentation() {
  const products = useSelector(getProducts);
  const [loading, setLoading] = useState(false);
  const backDrop = useSelector(backDropSelector);
  const { data, page } = products;

  const getShopProducts = async () => {
    try {
      const response = await api.get("");
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShopProducts();
  }, []);

  useEffect(() => {
    setLoading(!backDrop);
  }, [backDrop]);

  return (
    <div className={s.container}>
      {data ? (
        <>
          {!loading ? (
            <Stack
              spacing={5}
              sx={{ alignItems: "center" }}
              className={s.skeletonContainer}
            >
              <div className={clsx(s.skeleton)}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton variant="rounded" width={260} height={420} />
                ))}
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
