import React from "react";
import ProductDetails from "../product-details/ProductDetails";
import ProductSuggest from "../product-details/product-suggest/ProductSuggest";
import Rate from "../product-details/rate/Rate";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

export default function ProductDetailsPage() {
  const param = useParams();
  const containerRef = useRef(null);
  useEffect(() => {
    handleScrollToTop();
  }, [param]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="productDetails" ref={containerRef}>
        <ProductDetails />
        <Rate />
        <ProductSuggest />
      </div>
    </>
  );
}
