import clsx from "clsx";
import s from "./productPageHeader.module.scss";

import React from "react";
import { useParams } from "react-router-dom";

export default function ProductPageHeader() {
   const { shopId } = useParams();

   return (
      <>
         {shopId ? (
            <div className={clsx(s.container)}> shop ne {shopId}</div>
         ) : (
            <div className={clsx(s.containerAllShop)}>
               <div className={clsx(s.slogan)}>
                  <p>"Feathered Fantasies: Unleash Your Passion</p>
                  <p>for Ornamental Birds!"</p>
               </div>
               <div className={s.dash}>-</div>
               <div className={s.shopName}>
                  <span> -  Bird Store 2nd </span>
               </div>
            </div>
         )}
      </>
   );
}
