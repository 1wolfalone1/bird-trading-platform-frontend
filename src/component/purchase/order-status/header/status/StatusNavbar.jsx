import clsx from "clsx";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import s from "./statusNavbar.module.scss";
import StatusButton from "./StatusButton";
const orderPlaced =
  "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/orderPlaced.png";
const orderShippedOut =
  "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/ship.png";
const orderReceived =
  "https://bird-trading-platform.s3.ap-southeast-1.amazonaws.com/image/received.png";

export default function StatusNavbar() {
  return (
    <Grid container className={clsx(s.container)}>
      <Grid sm={4} md={4} xl={4} className={clsx(s.orderPlaced)}>
        <StatusButton icon={orderPlaced} description="Order Placed" />
      </Grid>
      <Grid sm={4} md={4} xl={4} className={clsx(s.orderShippedOut)}>
        <StatusButton icon={orderShippedOut} description="Order Shipped Out" />
      </Grid>
      <Grid sm={4} md={4} xl={4} className={clsx(s.orderReceived)}>
        <StatusButton icon={orderReceived} description="Order Received" />
      </Grid>
      <Grid className={clsx(s.stepperLine1)}>
        <p></p>
      </Grid>
      <Grid className={clsx(s.stepperLine2)}>
        <p></p>
      </Grid>
    </Grid>
  );
}
