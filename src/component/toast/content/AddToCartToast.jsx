import clsx from "clsx";
import React from "react";
import s from "./addToCartTost.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Style from "../../../style/inline-style/style";
export default function AddToCartToast({ closeToast, toastProps }) {
   return (
      <div className={clsx(s.container)}>
         <div className={s.icon}>
            <CheckCircleIcon
               sx={{ color: Style.color.$Dominant1, fontSize: "3rem" }}
            />
         </div>
         <div className={s.info}>
            <span className={s.title}>Success</span>
            <span>Already add to cart!</span>
         </div>
      </div>
   );
}
