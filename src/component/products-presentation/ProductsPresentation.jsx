import { useDispatch, useSelector } from "react-redux";
import ProductsSlider from "./product-paging/ProductsSlider";
import Products from "./products/Products";
import s from "./productsPresentation.module.scss";

import React, { useEffect, useState } from "react";
import { callFirstPage } from "./productsPresentationSlice";
import { getProducts } from "./productsSelector";

export default function ProductsPresentation() {
   const [listProduct, setListProduct] = useState([]);
   const dispatch = useDispatch();
   const products = useSelector(getProducts);
   const { data, page } = products;
   useEffect(() => {
      const k = async () => {
         await dispatch(callFirstPage());
      };
      k();
   }, []);
   return (
      <div className={s.container}>``
         <Products products={data} />
         <ProductsSlider pageNumber={page} />
      </div>
   );
}
