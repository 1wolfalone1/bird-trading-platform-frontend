import clsx from "clsx";
import s from "./productPageHeader.module.scss";

import React from "react";
import { useParams } from "react-router-dom";
import ShopOverview from "../../../../component/shop/ShopOverview";

export default function ProductPageHeader() {
  const { shopId } = useParams();

  return (
    <>
      {shopId ? (
        <div className={clsx(s.container)}>
          <ShopOverview />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
