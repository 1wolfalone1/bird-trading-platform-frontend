import clsx from "clsx";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import s from "./statusNavbar.module.scss";
import StatusButton from "./StatusButton";
import orderPlaced from "../../../../../asset/image/orderPlaced.png";
import orderShippedOut from "../../../../../asset/image/ship.png";
import orderReceived from "../../../../../asset/image/received.png";

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
