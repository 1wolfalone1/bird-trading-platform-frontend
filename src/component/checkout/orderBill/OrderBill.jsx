import React from "react";
import clsx from "clsx";
import s from "./orderBill.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Checkbox, FormControlLabel, Stack } from "@mui/material";

const bill = [
  {
    id: 1,
    nameProduct: "Blue Jay Blue Jay",
    price: 10,
    quantity: 3,
    discount: 0,
  },
  {
    id: 2,
    nameProduct: "Cardinal Cardinal",
    price: 18,
    quantity: 2,
    discount: 3,
  },
  {
    id: 3,
    nameProduct: "Bird Bath",
    price: 8,
    quantity: 1,
    discount: 1,
  },
  {
    id: 4,
    nameProduct: "Peckish Complete Seed Mix",
    price: 10,
    quantity: 5,
    discount: 5,
  },
];

let totalPrice = 0;
bill.map((item) =>
  item.discount === 0
    ? (totalPrice += item.price * item.quantity)
    : (totalPrice += item.discount)
);

const handleSubmitBtn = () => {};
// eslint-disable-next-line import/no-anonymous-default-export
export default function OrderBill({ close }) {
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.header)}>
        <div className={clsx(s.title)}>Your bill</div>
        <div className={clsx(s.closeButton)}>
          <button onClick={close}>&times;</button>
        </div>
      </div>
      <div className={clsx(s.headerContainer)}>
        <Grid container columns={12} className={clsx(s.headerContent)}>
          <Grid sm={8} md={8} xl={8} className={clsx(s.headerName)}>
            Product Name
          </Grid>
          <Grid sm={2} md={2} xl={2} className={clsx(s.headerPrice)}>
            Price
          </Grid>
          <Grid sm={1} md={1} xl={1} className={clsx(s.headerDiscount)}>
            Discount
          </Grid>
        </Grid>
      </div>
      <div className={clsx(s.billContainer)}>
        {bill.map((item) => (
          <Grid className={clsx(s.billInfo)}>
            <Grid container columns={12} key={item.id} className={clsx(s.bill)}>
              <Grid sm={8} md={8} xl={8} className={clsx(s.name)}>
                {item.nameProduct}
              </Grid>
              <Grid sm={2} md={2} xl={2} className={clsx(s.price)}>
                {item.price}$
              </Grid>
              <Grid sm={1} md={1} xl={1} className={clsx(s.discount)}>
                {item.discount}$
              </Grid>
            </Grid>
          </Grid>
        ))}
      </div>
      <div className={clsx(s.total)}>Total bill: {totalPrice}$</div>
      <div className={clsx(s.submitBtn)}>
        <Button onClick={handleSubmitBtn}>Place Order</Button>
      </div>
    </div>
  );
}
