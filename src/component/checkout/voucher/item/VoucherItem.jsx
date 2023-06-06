import React, { Fragment } from "react";
import clsx from "clsx";
import s from "./VoucherItem.module.scss";
import Grid from "@mui/material/Unstable_Grid2";

const VoucherItem = (props) => {
  const { id, image, name, reduce } = props;
  return (
    <Fragment>
      <Grid container columns={10} key={id} className={clsx(s.container)}>
        <Grid sm={6} md={6} xl={6} className={clsx(s.voucher)}>
          <Grid className={clsx(s.voucherImage)}>
            <img src={image} alt={name} />
          </Grid>
          <Grid className={clsx(s.voucherName)}>{name}</Grid>
        </Grid>
        <Grid sm={3} md={3} xl={3} className={clsx(s.reduce)}>
          Reduce {reduce}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default VoucherItem;
