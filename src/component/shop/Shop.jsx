import clsx from "clsx";
import React from "react";
import { Outlet } from "react-router-dom";
import ProductPageSideBar from "../../container/layout/product-page/sidebar/ProductPageSideBar";
import ProductShop from "./product/ProductShop";
import s from "./shop.module.scss";
import ShopOverview from "./shopOverview/ShopOverview";

export default function Shop() {
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
