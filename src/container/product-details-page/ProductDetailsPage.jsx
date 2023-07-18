import React, { useState } from "react";
import ProductDetails from "../product-details/ProductDetails";
import ProductSuggest from "../product-details/product-suggest/ProductSuggest";
import Rate from "../product-details/rate/Rate";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { backDropSelector } from "../../redux/global/globalConfigSlice";

export default function ProductDetailsPage() {
  const param = useParams();
  const containerRef = useRef(null);
  const [isFound, setIsFound] = useState(true);
  useEffect(() => {
    handleScrollToTop();
  }, [param]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isFound ? (
        <div className="productDetails" ref={containerRef}>
          <ProductDetails setIsFound={setIsFound} />
          <Rate />
          <ProductSuggest />
        </div>
      ) : (
        <Box sx={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
          <img
            src="https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/assetImage/asset/No_Product_Found.png"
            alt="item not found"
            style={{ width: "30vw" }}
          />
        </Box>
      )}
    </>
  );
}
