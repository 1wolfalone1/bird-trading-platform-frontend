import { Rating } from "@mui/material";
import s from "./productHomeCard.module.scss";
import React, { useState } from "react";

export default function ProductHomeCard({ product }) {
   const [value, setValue] = useState(2);
   return (
      <div className={s.container} onClick={() => console.log("123123123123")}>
         <div className={s.img}>
            <img src={product.imgUrl} alt="" />
            <div className={s.floatContent}>
               <div className={s.price}>
                  <span>{product.quantity}$</span>
               </div>
               <div className={s.saleOff}>
                  <span>20% off</span>
               </div>
            </div>
         </div>
         <div className={s.info}>
            <div className={s.name} title={product.name}>
               <span>{product.name}</span>
            </div>
            
            <div className={s.shop}>
               <div className={s.shopAvatar}>
                  <img src={product.imgUrl} alt="" />
               </div>
               <dir className={s.shopName}>
                  <span>{product.name}</span>
               </dir>
            </div>
            <div className={s.star}>
               <Rating
                  name="simple-controlled"
                  value={4.5}
                  precision={0.5}
                  onChange={(event, newValue) => {
                     setValue(newValue);
                  }}
                  size="medium"
                  readOnly={true}
                  color="Dominant1"
               />
            </div>
         </div>
      </div>
   );
}
