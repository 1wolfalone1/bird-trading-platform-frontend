import React, { Fragment } from "react";
import clsx from "clsx";
import s from "./VoucherItem.module.scss";
import Grid from "@mui/material/Unstable_Grid2";

const VoucherItem = ({ id, name, reduce }) => {
  const imageShipping =
    "https://img.meta.com.vn/Data/image/2020/10/29/freeship-la-gi-4.jpg";
  const imageDiscount =
    "https://www.pngall.com/wp-content/uploads/2016/04/Discount-PNG-Picture.png";
  return (
    <Fragment>
      <Grid container columns={10} key={id} className={clsx(s.container)}>
        <Grid sm={6} md={6} xl={6} className={clsx(s.voucher)}>
          <Grid className={clsx(s.voucherImage)}>
            {name.includes("Discount") ? (
              <img src={imageDiscount} alt={name} />
            ) : (
              <img src={imageShipping} alt={name} />
            )}
          </Grid>
          <Grid className={clsx(s.voucherName)}>{name}</Grid>
        </Grid>
        <Grid sm={3} md={3} xl={3} className={clsx(s.reduce)}>
          {name.includes("Discount") ? `Discount ${reduce}$` : "Freeship"}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default VoucherItem;
