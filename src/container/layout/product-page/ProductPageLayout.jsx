import { Outlet, useParams } from "react-router-dom";
import ProductPageHeader from "./header/ProductPageHeader";
import s from "./productPageLayout.module.scss";
import React from "react";
import clsx from "clsx";
import ProductPageSideBar from "./sidebar/ProductPageSideBar";

export default function ProductPageLayout() {
   const { shopId } = useParams();
   return (
      <>
         <ProductPageSideBar />
         <div className={clsx(s.content)}>
            <ProductPageHeader />
            <Outlet />
         </div>
      </>
   );
}
