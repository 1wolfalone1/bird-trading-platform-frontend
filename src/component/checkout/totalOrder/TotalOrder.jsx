import React, { Fragment } from "react";
import clsx from "clsx";
import s from "./TotalOrder.module.scss";
import { Button } from "@mui/material";
import Popup from "reactjs-popup";
import OrderBill from "../orderBill/OrderBill";

export default function TotalOrder() {
  const totalOrder = {
    subtotal: 22,
    delivery: 5,
    promotion: 7,
  };

  const totalPrice =
    totalOrder.subtotal + totalOrder.delivery - totalOrder.promotion;
  return (
    <Fragment>
      <div className={clsx(s.container)}>
        <div className={clsx(s.title)}>Total Order</div>
        <div className={clsx(s.content)}>
          <div className={clsx(s.subtotal)}>
            <div>Merchandise Subtotal: </div>
            <div>{totalOrder.subtotal}$</div>
          </div>
          <div className={clsx(s.delivery)}>
            <div>Shipping Total: </div>
            <div>{totalOrder.delivery}$</div>
          </div>
          <div className={clsx(s.promotion)}>
            <div>Promotion: </div>
            <div>{totalOrder.promotion}$</div>
          </div>
        </div>
        <div className={clsx(s.total)}>
          <div>Total payment: </div>
          <div>{totalPrice}$</div>
        </div>
        <div className={clsx(s.orderButton)}>
          <Popup
            className="addButton"
            modal
            trigger={<Button>Checkout</Button>}
          >
            {(close) => <OrderBill close={close} />}
          </Popup>
        </div>
      </div>
    </Fragment>
  );
}
