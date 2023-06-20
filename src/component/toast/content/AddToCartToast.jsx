import clsx from "clsx";
import React from "react";
import s from "./addToCartTost.module.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Style from "../../../style/inline-style/style";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
const toastStatus = {
  success: {
    Icon: (
      <CheckCircleIcon
        sx={{ color: Style.color.$Dominant1, fontSize: "3rem" }}
      />
    ),
    title: "Success",
    message: "Already add to cart!",
    className: "success",
  },
  warning: {
    Icon: <WarningAmberIcon sx={{ color: "#b3ff00", fontSize: "3rem" }} />,
    title: "Warning",
    message: "Your cart has reached its stock capacity.",
    className: "warning",
  },
};
export const toastType = {
  SUCCESS: "success",
  WARNING: "warning",
  WARNING_INPUT: "warning",
};
export default function AddToCartToast({ type, msg }) {
  console.log(type);
  return (
    <div className={clsx(s[type])}>
      <div className={s.icon}>{toastStatus[type].Icon}</div>
      <div className={s.info}>
        <span className={s.title}>{toastStatus[type].title}</span>
        <span>{msg || toastStatus[type].message}</span>
      </div>
    </div>
  );
}
