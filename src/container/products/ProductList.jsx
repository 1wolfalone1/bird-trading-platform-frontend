import { useParams } from "react-router-dom";
import s from "./productList.module.scss";

import React from "react";
import SideBarFilter from "../../component/side-bar-filter/SideBarFilter";
import ProductsPresentation from "../../component/products-presentation/ProductsPresentation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import productsPresentationSlices, { filterByAll } from "../../component/products-presentation/productsPresentationSlice";

export default function ProductList() {
  const { shopId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsPresentationSlices.actions.resetAllPageNumberShopId());
    dispatch(filterByAll());
  }, [])
  return (
    <div className={s.container}>
      <SideBarFilter />
      <ProductsPresentation />
    </div>
  );
}
