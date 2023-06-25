import React from "react";
import ProductDetails from "../product-details/ProductDetails";
import ProductSuggest from "../product-details/product-suggest/ProductSuggest";
import Rate from "../product-details/rate/Rate";

export default function ProductDetailsPage() {
  return (
    <>
      <div className="productDetails">
        <ProductDetails />
        <Rate />
        <ProductSuggest />
      </div>
    </>
  );
}
