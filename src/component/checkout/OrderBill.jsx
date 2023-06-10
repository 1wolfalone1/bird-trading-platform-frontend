import React from "react";
import clsx from "clsx";
import s from "../../container/order/cartContainer.module.scss";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Checkbox, FormControlLabel, Stack } from "@mui/material";

const bill = [
  {
    id: 1,
    nameProduct: "Blue Jay Blue Jay Blue Jay",
    price: 10,
    discount: 5,
  },
  {
    id: 2,
    nameProduct: "Cardinal Cardinal Cardinal",
    price: 18,
    discount: 0,
  },
];

let totalPrice = 0;
bill.map((item) => (totalPrice += item.price * item.discount));

const handleSubmitBtn = () => {};
// eslint-disable-next-line import/no-anonymous-default-export
export default function OrderBill({ close }) {
  
  return (
    <div className={clsx(s.container)}>
      <div className={clsx(s.header)}>
        <div className={clsx(s.title)}>Your bill</div>
        <button className={clsx(s.close)} onClick={close}>
          &times;
        </button>
      </div>
  
      {bill.map((item) => (
        <Grid className={clsx(s.billContainer)}>
          <Grid container key={item.id} className={clsx(s.bill)}>
            <Grid sm={4} md={4} xl={4} className={clsx(s.name)}>
              {item.nameProduct}
            </Grid>
            <Grid sm={4} md={4} xl={4} className={clsx(s.price)}>
              {item.price}$
            </Grid>
            <Grid sm={4} md={4} xl={4} className={clsx(s.discount)}>
              {item.discount}(discount)
            </Grid>
          </Grid>
        </Grid>
      ))}
      <div className={clsx(s.total)}>Total price: {totalPrice}</div>
      <div>
        <Button className={clsx(s.submitBtn)} onClick={handleSubmitBtn}>
          Done
        </Button>
      </div>
    </div>
  );
}
