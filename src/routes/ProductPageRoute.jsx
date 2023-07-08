import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductList from "../container/products/ProductList";
import ProductPageLayout from "../container/layout/product-page/ProductPageLayout";

export default function ProductPageRoute() {
  return (
    <Routes>
      <Route path="/" element={<ProductPageLayout />}>
        <Route index element={<ProductList />} />
        <Route path="shop/:shopId" element={<ProductList />} />
        <Route path="shop/:shopId/collection" element={<ProductList />} />
      </Route>
    </Routes>
  );
}
