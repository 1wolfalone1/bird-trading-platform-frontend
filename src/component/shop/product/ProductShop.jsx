import clsx from "clsx";
import React from "react";
import SideBarFilter from "../../side-bar-filter/SideBarFilter";
import ProductsPresentation from "./ProductsPresentation";
import s from "./productShop.module.scss";

export default function ProductShop() {
  return (
    <div className={clsx(s.container)}>
      <SideBarFilter />
      <ProductsPresentation />
    </div>
  );
}
