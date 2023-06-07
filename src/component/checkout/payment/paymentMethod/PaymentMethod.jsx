import React, { Fragment, useState } from "react";
import clsx from "clsx";
import s from "./PaymentMethod.module.scss";
import Grid from "@mui/material/Unstable_Grid2";

export default function PaymentMethod(props) {
  const { id, image, method, discount, children } = props;

  return (
    <Fragment>
      <Grid container columns={8} key={id} className={clsx(s.container)}>
        <Grid sm={2} md={2} xl={2} className={clsx(s.methodImage)}>
          <img src={image} alt={method} />
        </Grid>
        <Grid sm={4} md={4} xl={4} className={clsx(s.methodName)}>
          <h3>{method}</h3>
        </Grid>

        <Grid sm={1} md={1} xl={1} className={clsx(s.methodDiscount)}>
          <Grid className={clsx(s.discount)}>
            <h3>{discount}$</h3>
          </Grid>
        </Grid>

        <Grid sm={1} md={1} xl={1} className={clsx(s.buttonContainer)}>
          <Grid className={clsx(s.button)}>{children}</Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
