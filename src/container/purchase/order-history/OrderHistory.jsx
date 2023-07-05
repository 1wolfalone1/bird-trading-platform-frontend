import clsx from "clsx";
import React from "react";
import s from "./orderHistory.module.scss";
import PackageOrder from "../packageOrder/PackageOrder";

export default function OrderHistory() {
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.packageOrder)}>
        <PackageOrder />
      </div>
    </div>
  );
}
