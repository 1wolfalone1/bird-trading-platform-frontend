import clsx from "clsx";
import React from "react";
import s from "./orderHistory.module.scss";
import PackageOrder from "../packageOrder/PackageOrder";
import ProductsSlider from "../../../component/products-presentation/product-paging/ProductsSlider";
import { useSelector } from "react-redux";
import { getProducts } from "../../../component/products-presentation/productsSelector";

export default function OrderHistory() {
  // const packages = useSelector(getProducts);
  // const { page } = packages;
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.packageOrder)}>
        <PackageOrder />
        {/* <ProductsSlider pageNumber={page} /> */}
      </div>
    </div>
  );
}
