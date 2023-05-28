import { useParams } from "react-router-dom";
import s from "./productList.module.scss";

import React from "react";
import SideBarFilter from "../../component/side-bar-filter/SideBarFilter";
import ProductsPresentation from "../../component/products-presentation/ProductsPresentation";

export default function ProductList() {
   const { shopId } = useParams();
   return (
      <div className={s.container}>
         <SideBarFilter />
         <ProductsPresentation />
      </div>
   );
}
