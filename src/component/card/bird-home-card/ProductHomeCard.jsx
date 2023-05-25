import s from "./birdHomeCard.module.scss";
import React from "react";

export default function ProductHomeCard({ product }) {
   return (
      <div className={s.container}>
         <div className={s.img}>
            <img src={product.imgUrl} alt="" />
            <div className={s.floatContent}>
               <div className={s.price}>
                  <span>{product.quantity}$</span>
               </div>
               <div className={s.saleOff}>
                  <span>20%</span>
               </div>
            </div>
         </div>
         <div className={s.info}>
            <div className={s.name}>
               <span>{product.name}</span>
            </div>
            <div className={s.star}>5sao</div>
            <div className={s.shop}>
               <div className={s.shopAvatar}>
                  <img src={product.imgUrl} alt="" />
               </div>
               <dir className={s.shopName}>
                  <span>{product.name}</span>
               </dir>
            </div>
         </div>
      </div>
   );
}
