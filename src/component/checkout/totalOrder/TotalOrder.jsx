import React, { Fragment } from "react";
import clsx from "clsx";
import s from "./TotalOrder.module.scss";

const formatNumber = (q) => {
  return q?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export default function TotalOrder({ subTotal, shipTotal, promotion }) {
  return (
    <Fragment>
      <div className={clsx(s.container)}>
        <div className={clsx(s.title)}>Total Order</div>
        <div className={clsx(s.content)}>
          <div className={clsx(s.subtotal)}>
            <div>Merchandise Subtotal: </div>
            <div>{formatNumber(subTotal)}</div>
          </div>
          <div className={clsx(s.delivery)}>
            <div>Shipping Total: </div>
            <div>{formatNumber(shipTotal)}</div>
          </div>
          <div className={clsx(s.promotion)}>
            <div>Promotion: </div>
            <div>{formatNumber(promotion)}</div>
          </div>
        </div>
        <div className={clsx(s.total)}>
          <div>Total payment: </div>
          <div>
            {subTotal + shipTotal - promotion < 0
              ? "$0.00"
              : formatNumber(subTotal + shipTotal - promotion)}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
