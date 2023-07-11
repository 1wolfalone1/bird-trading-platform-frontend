import { Outlet, useParams } from "react-router-dom";
import ProductPageHeader from "./header/ProductPageHeader";
import s from "./productPageLayout.module.scss";
import React from "react";
import clsx from "clsx";
import ProductPageSideBar from "./sidebar/ProductPageSideBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import globalConfigSlice from "../../../redux/global/globalConfigSlice";

export default function ProductPageLayout() {
  const { shopId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(globalConfigSlice.actions.changeNavigateValue(2));
  }, []);
  return (
    <>
      <ProductPageSideBar />
      <div className={clsx(s.content)}>
        {/* <ProductPageHeader /> */}
        <Outlet />
      </div>
    </>
  );
}
