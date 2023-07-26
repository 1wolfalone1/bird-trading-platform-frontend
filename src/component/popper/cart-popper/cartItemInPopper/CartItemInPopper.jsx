import clsx from "clsx";
import React from "react";
import s from "./cartItemInPopper.module.scss";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import cartSlice from "../../../../container/order/cartSlice";
import { formatNumber } from "../../../../utils/myUtils";

export default function CartItemInPopper({ item, className }) {
  const dispatch = useDispatch();
  return (
    <div className={clsx(s.container, className)}>
      <div className={s.image}>
        <img src={item.imgUrl} alt="" />
      </div>
      <div className={s.content}>
        <div className={s.left}>
          <div className={s.productName}>
            <span>{item.name}</span>
          </div>
          <div className={s.shopName}>
            <span>{item.shopOwner?.shopName}</span>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.price}>
            {formatNumber(item.discountedPrice)} x{" "}
            {item.cartQuantity.toLocaleString({
              minimumFractionDigits: 0,
            })}
          </div>
          <div className={s.remove}>
            <IconButton
              color="Accent1"
              sx={{ fontSize: "3rem" }}
              onClick={() => {
                return dispatch(cartSlice.actions.removeItem(item));
              }}
            >
              <DisabledByDefaultIcon
                sx={{ fontSize: "3rem", color: "rgb(238, 77, 45)" }}
              />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
