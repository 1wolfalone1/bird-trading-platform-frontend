import clsx from "clsx";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import ProductPageSideBar from "../../container/layout/product-page/sidebar/ProductPageSideBar";
import ProductShop from "./product/ProductShop";
import s from "./shop.module.scss";
import ShopOverview from "./shopOverview/ShopOverview";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import productsPresentationSlices, {
  filterByAll,
} from "../products-presentation/productsPresentationSlice";

export default function Shop() {
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const shopId = param.id;
    dispatch(productsPresentationSlices.actions.resetAllPageNumberShopId());
    dispatch(productsPresentationSlices.actions.changeShopId(shopId));
    dispatch(filterByAll());
  }, []);

  return (
    <>
      <ProductPageSideBar />
      <div className={clsx(s.container)}>
        <ShopOverview />
        <ProductShop />
        <Outlet />
      </div>
    </>
  );
}
