import React from "react";
import clsx from "clsx";
import s from "./shopOverview.module.scss";

export default function ShopOverview() {
  return (
    <>
      <div>
        <div className={clsx(s.container)}>
          <div className={clsx(s.contact)}></div>
          <div className={clsx(s.information)}></div>
        </div>
      </div>
    </>
  );
}
