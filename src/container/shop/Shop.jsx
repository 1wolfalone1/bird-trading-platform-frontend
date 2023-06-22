import React from "react";
import s from "./shop.module.scss";
import SideBarFilter from "../../component/side-bar-filter/SideBarFilter";
import ProductPageLayout from "../layout/product-page/ProductPageLayout";

export default function Shop() {
  return (
    <div className={s.container}>
      <ProductPageLayout />
      <SideBarFilter />
    </div>
  );
}
