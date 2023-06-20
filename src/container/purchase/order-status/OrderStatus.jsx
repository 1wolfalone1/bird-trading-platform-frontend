import React, { useState } from "react";
import clsx from "clsx";
import s from "./orderStatus.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { useSelector } from "react-redux";
import { getCartSelector } from "../../order/cartSlice";
import { userInfoSelector } from "../../../redux/global/userInfoSlice";
import StatusNavbar from "../../../component/purchase/order-status/header/status/StatusNavbar";
import Action from "../../../component/purchase/order-status/header/action/Action";

export default function OrderStatus() {
  const { items, voucherSelected } = useSelector(getCartSelector);
  const [paymentType, setPaymentType] = useState();
  const { info } = useSelector(userInfoSelector);

  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.headerContainer)}>
        <div className={clsx(s.statusNavbar)}>
          <StatusNavbar />
          <Action></Action>
        </div>
        <div className={clsx(s.action)}></div>
      </div>
      <div className={clsx(s.productContainer)}>
        <div className={clsx(s.deliveryAddress)}></div>
        <div className={clsx(s.productInfo)}></div>
        <div className={clsx(s.totalPrice)}></div>
      </div>
    </div>
  );
}
