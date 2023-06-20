import React, { Fragment, useState } from "react";
import clsx from "clsx";
import s from "./PaymentMethod.module.scss";
import Grid from "@mui/material/Unstable_Grid2";

export default function PaymentMethod(props) {
  const { id, image, method, children } = props;

  return (
    <Fragment>
      <Grid container columns={9} key={id} className={clsx(s.container)}>
        <Grid sm={2} md={2} xl={2} className={clsx(s.methodImage)}>
          <img src={image} alt={method} />
        </Grid>
        <Grid sm={5} md={5} xl={5} className={clsx(s.methodName)}>
          <h3>{method}</h3>
        </Grid>

        <Grid sm={1} md={1} xl={1} className={clsx(s.buttonContainer)}>
          <Grid className={clsx(s.button)}>{children}</Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
