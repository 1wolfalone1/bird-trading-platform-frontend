import clsx from "clsx";
import React from "react";
import PackageOrder from "../packageOrder/PackageOrder";
import s from "./orderHistory.module.scss";

export default function OrderHistory() {
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.packageOrder)}>
        <PackageOrder />
      </div>
    </div>
  );
}
