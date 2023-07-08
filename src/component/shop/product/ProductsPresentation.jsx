import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../api/server/API";
import ProductsSlider from "../../products-presentation/product-paging/ProductsSlider";
import Products from "../../products-presentation/products/Products";
import { filterByAll } from "../../products-presentation/productsPresentationSlice";
import { getProducts } from "../../products-presentation/productsSelector";
import s from "./productsPresentation.module.scss";

export default function ProductsPresentation() {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
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
    const k = async () => {
      await dispatch(filterByAll());
    };
    k();
  }, []);

  return (
    <div className={s.container}>
      {data ? (
        <Products products={data} />
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
      <ProductsSlider pageNumber={page} />
    </div>
  );
}
