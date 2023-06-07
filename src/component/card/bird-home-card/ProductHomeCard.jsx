import { Rating } from "@mui/material";
import s from "./productHomeCard.module.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductHomeCard({ product }) {
   const [value, setValue] = useState(2);
   const navigate = useNavigate();
   return (
      <div
         className={s.container}
         onClick={() => navigate(`/product/${product.id}`)}
      >
         <div className={s.img}>
            <img src={product.imgUrl} alt="" />
            <div className={s.floatContent}>
               <div className={s.price}>
                  <span>
                     <span style={{ textDecoration: "line-through", color: '#70ab75' }}>
                        {product.price}$
                     </span>{" "}
                     {product.discountedPrice}$
                  </span>
               </div>
               <div className={s.saleOff}>
                  <span>{(product.discountRate * 100).toFixed(0)}%</span>
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
