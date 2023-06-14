import React, { Fragment } from "react";
import clsx from "clsx";
import s from "./TotalOrder.module.scss";

export default function TotalOrder({ subTotal, shipTotal, promotion }) {
  return (
    <Fragment>
      <div className={clsx(s.container)}>
        <div className={clsx(s.title)}>Total Order</div>
        <div className={clsx(s.content)}>
          <div className={clsx(s.subtotal)}>
            <div>Merchandise Subtotal: </div>
            <div>{subTotal}$</div>
          </div>
          <div className={clsx(s.delivery)}>
            <div>Shipping Total: </div>
            <div>{shipTotal}$</div>
          </div>
          <div className={clsx(s.promotion)}>
            <div>Promotion: </div>
            <div>{promotion}$</div>
          </div>
        </div>
        <div className={clsx(s.total)}>
          <div>Total payment: </div>
          <div>{Number(subTotal + shipTotal - promotion).toFixed(1)}$</div>
        </div>
      </div>
    </Fragment>
  );
}
